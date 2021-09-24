// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
pragma abicoder v2;
//import "./Ownable.sol";

//block.timestamp獲取當前時間
//全票20，半票10

///////////功能增加紀錄////////////
//0908補貼計算
//0909身障、愛心補貼
//0912改為整車票證資料整合輸入
//0912將搭乘資料與營運資料整合輸入


///////////需再增加功能///////////
//不用每個都填業者


/////////嘗試增加但未做更改//////////


///////////////限制////////////////
//身障陪同半票/全票如何區分


/////////bug、待處理事項////////////
//TODO 每個輸入降載到4個


contract subsidy{
    struct operate_in{   //搭乘資料輸入
        uint8 _number;  //路線編號
        uint8 _operator;  //營運單位
        uint8 _season; //期數
    }

    struct passenger_in{   //搭乘資料輸入
        uint16 _elder;    //敬老營收
        uint16 _elder_actual; //敬老實際收入
        uint16 _disable;    //愛心營收
        uint16 _disable_actual; //愛心實際收入
    }    

    struct time_in{   //搭乘資料輸入
        uint16 _year;    //上車年份   
        uint8 _month;  //上車月份
        uint8 _day;   //上車日期
        uint16 _time; //上車時間
    }    

    struct driver_in{   //搭乘資料輸入
        uint16 _normal;  //一般陪同身分別營收 //1->一般、身心障礙陪同(只有虧損補貼)，2->敬老，3->身心障礙
        uint32 _mileage;  //行駛里程 //需乘以1000
        string _plate; //車號
        string _driver; //司機
    }

    mapping (uint => operate_in) map_operate_in;
    mapping (uint => driver_in) map_driver_in;
    mapping (uint => passenger_in) map_passenger_in;
    mapping (uint => time_in) map_time_in;
    uint32 count_operate=0; //目前跑到多少片
    uint32 count_driver=0; //目前跑到多少片
    uint32 count_passenger=0; //目前跑到多少片
    uint32 count_time=0; //目前跑到多少片

    function operate(uint8 _number, uint8 _operator, uint8 _season) public {  //營運資料輸入
        operate_in storage c = map_operate_in[count_operate];  //進去哪一個slide
        c._number=_number;
        c._operator=_operator;
        c._season=_season;
        count_operate=count_operate+1; 
    }

    function driver(uint16 _normal, uint32 _mileage, string memory _plate, string memory _driver) public {  //營運資料輸入
        driver_in storage c = map_driver_in[count_driver];  //進去哪一個slide
        c._normal=_normal;
        c._mileage=_mileage;
        c._plate=_plate;
        c._driver=_driver; 
        count_driver=count_driver+1;     

    }

    function passenger(uint16 _elder, uint16 _elder_actual, uint16 _disable, uint16 _disable_actual) public {  //搭乘資料輸入
        passenger_in storage c = map_passenger_in[count_passenger];  //進去哪一個slide
        c._elder=_elder;
        c._elder_actual=_elder_actual;
        c._disable=_disable;
        c._disable_actual=_disable_actual; 
        count_passenger=count_passenger+1; 

    }

    function time(uint16 _year, uint8 _month, uint8 _day, uint16 _time) public {  //營運資料輸入
        time_in storage c = map_time_in[count_time];  //進去哪一個slide   
        c._year=_year;
        c._month=_month;
        c._day=_day;
        c._time=_time;
        count_time=count_time+1;
    }

    function subsidyMotc(uint16 year, uint8 season, uint8 number, uint8 operator) public view returns(uint32){ //更新虧損補貼
        uint32 subsidys=0;   //補貼
        uint32 cost=0; //成本
        uint32 revenue=0; //營收 
        uint32 mileage=0; //路線里程(已被*1000)
        //uint32 count=0;
        if(count_time!=count_driver)
            return(0);
        for(uint16 i=0; i<count_time; i++){  //算(路線)總里程
            if(operator==map_operate_in[i]._operator){ //若營運單位相同
                if(year==map_time_in[i]._year){ //若年份相同
                    if(season==map_operate_in[i]._season){//若在同期
                        if(number==map_operate_in[i]._number){//若同路線
                            mileage=mileage+map_driver_in[i]._mileage; //直接就會是車次*里程(因直接加總)
                            revenue=revenue+map_driver_in[i]._normal+map_passenger_in[i]._elder+map_passenger_in[i]._disable;//總收益加總
                        }
                    }
                }
            }
        }
        cost=(mileage*24)/1000;//假設成本24元每公里 //1000000:單位還原
        subsidys=cost-revenue;
        return(subsidys);    
    }    


    function subsidyPt(uint16 year, uint8 month, uint8 number, uint8 operator) public view returns(uint32, uint32, uint32, uint32){
        //what:愛心或敬老
        uint32 disable_subsidy; //路線愛心補貼總和
        uint32 disable_total_subsidy;   //公司愛心補貼總和
        uint32 elder_subsidy; //路線敬老補貼總和
        uint32 elder_total_subsidy;   //公司敬老補貼總和
        if(count_time!=count_driver)
            return(0,0,0,0);
            
        for(uint16 j=0; j<count_time; j++){//遍歷所有票證資料
            if(operator==map_operate_in[j]._operator){ //若營運單位相同
                if(year==map_time_in[j]._year){ //若年份相同
                    if(month==map_time_in[j]._month){    //若月份相同
                        disable_total_subsidy=disable_total_subsidy+map_passenger_in[j]._disable-map_passenger_in[j]._disable_actual;  //總補貼金額
                        elder_total_subsidy=elder_total_subsidy+map_passenger_in[j]._elder-map_passenger_in[j]._elder_actual;  //總補貼金額
                        if(number==map_operate_in[j]._number){
                            disable_subsidy=disable_subsidy+map_passenger_in[j]._disable-map_passenger_in[j]._disable_actual;  //總補貼金額
                            elder_subsidy=elder_subsidy+map_passenger_in[j]._elder-map_passenger_in[j]._elder_actual;  //總補貼金額                          
                        }
                    }
                }
            }
        }
        return(disable_subsidy, disable_total_subsidy, elder_subsidy, elder_total_subsidy);
    }
}