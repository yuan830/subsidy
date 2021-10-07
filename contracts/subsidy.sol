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
//0914在查詢函數中可以輸入多個值
//0914將function的輸入降載到4個
//0914解決前後端串接問題
//0914重新修正subsidyMotc之邏輯
//0914subsidyMotc不再支援查詢全公司補貼總額
/////////////
//0917營運收入直接算一起
//0917將司機名字改為搭乘人數
//0917成本需更新為29
//0917對搭乘人數進行加總
//0919期別跨年度的設定
//0919增加當前顏色紀錄顯示
/////////////
//0925加入hash

///////////需再增加功能///////////
//不用每個都填業者



/////////嘗試增加但未做更改//////////
//總里程、總補貼金額 //stack too deep
//目前編號、是否已填完 //以顏色顯示

///////////////限制////////////////



/////////bug、待處理事項////////////


contract subsidy{
    struct operate_in{   //搭乘資料輸入
        uint8 _number;  //路線編號
        uint8 _operator;  //營運單位
        uint16 _year;    //上車年份   
        uint8 _month;  //上車月份
        uint8 _day;   //上車日期
        uint16 _time; //上車時間
        uint16 _people; //搭乘人數        
        uint8 _plate; //車號        
    }

    struct money_in{
        uint16 _money_all;  //路線營收
        uint32 _mileage;  //行駛里程
        uint16 _year_of_season; //年期        
        uint8 _season; //期數
        uint16 _disable;    //愛心營收
        uint16 _disable_actual; //愛心實際收入
        uint16 _elder;    //敬老營收
        uint16 _elder_actual; //敬老實際收入

    }

    struct data_in{   //文書資料輸入
        uint16 _data_year_of_season; //年度
        uint8 _data_season; //期數        
        uint8 _data_operator;  //業者
        bytes32  _hash;  //hash
    }
    
    mapping (uint => operate_in) map_operate_in;
    mapping (uint => money_in) map_money_in;
    mapping (uint => data_in) map_data_in;
    uint16 count_operate=0; //目前跑到多少片
    uint16 count_money=0; //目前跑到多少片
    uint16 count_data=0; //目前跑到多少片

    function operate(uint8 _number, uint8 _operator, uint16 _year, uint8 _month, uint8 _day, uint16 _time, uint16 _people, uint8 _plate) public {  //營運資料輸入
        operate_in storage c = map_operate_in[count_operate];  //進去哪一個slide
        c._number=_number;
        c._operator=_operator;
        c._year=_year;
        c._month=_month;
        c._day=_day;
        c._time=_time;            
        c._people=_people;
        c._plate=_plate;   
        count_operate=count_operate+1; 
    }

    function money(uint16 _money_all, uint32 _mileage, uint16 _year_of_season, uint8 _season, uint16 _disable, uint16 _disable_actual, uint16 _elder, uint16 _elder_actual) public {  //營運資料輸入
        money_in storage c = map_money_in[count_money];  //進去哪一個slide
        c._money_all=_money_all;
        c._mileage=_mileage;
        c._year_of_season=_year_of_season;
        c._season=_season;
        c._elder=_elder;
        c._elder_actual=_elder_actual;
        c._disable=_disable;
        c._disable_actual=_disable_actual;         
        count_money=count_money+1;
    }

    function data(uint16 _data_year_of_season, uint8 _data_season, uint8 _data_operator, bytes32 _hash) public {  //搭乘資料輸入
        data_in storage c = map_data_in[count_data];  //進去哪一個slide
        c._data_year_of_season=_data_year_of_season;
        c._data_season=_data_season;
        c._data_operator=_data_operator;
        c._hash=_hash; 
        count_data=count_data+1;  
    }

    function subsidyMotc(uint16 year, uint8 season, uint8 number, uint8 operator) public view returns(uint32, uint32, uint16){ //更新虧損補貼
        uint32 subsidys=0;   //補貼
        uint32 cost=0; //成本
        uint32 revenue=0; //營收 
        uint32 mileage=0; //路線里程(已被*1000)
        uint16 people=0;   //搭乘人數
        //uint32 count=0;
        for(uint16 i=0; i<count_operate; i++){  //算(路線)總里程
            if(operator==map_operate_in[i]._operator){ //若營運單位相同
                if(year==map_money_in[i]._year_of_season){ //若年份相同
                    if(season==map_money_in[i]._season){//若在同期
                        if(number==map_operate_in[i]._number){//若同路線
                            mileage=mileage+map_money_in[i]._mileage; //直接就會是車次*里程(因直接加總)
                            revenue=revenue+map_money_in[i]._money_all;//總收益加總
                            people=people+map_operate_in[i]._people;
                        }
                    }
                }
            }
        }
        cost=(mileage*29)/1000;//1000:單位還原
        subsidys=cost-revenue;
        return(subsidys, (mileage/1000), people);
    }    


    function subsidyPt(uint16 year, uint8 month, uint8 number, uint8 operator) public view returns(uint32, uint32, uint32, uint32){
        //what:愛心或敬老
        uint32 disable_subsidy; //路線愛心補貼總和
        uint32 disable_total_subsidy;   //公司愛心補貼總和
        uint32 elder_subsidy; //路線敬老補貼總和
        uint32 elder_total_subsidy;   //公司敬老補貼總和
        for(uint16 j=0; j<count_operate; j++){//遍歷所有票證資料
            if(operator==map_operate_in[j]._operator){ //若營運單位相同
                if(year==map_operate_in[j]._year){ //若年份相同
                    if(month==map_operate_in[j]._month){    //若月份相同
                        disable_total_subsidy=disable_total_subsidy+map_money_in[j]._disable-map_money_in[j]._disable_actual;  //總補貼金額
                        elder_total_subsidy=elder_total_subsidy+map_money_in[j]._elder-map_money_in[j]._elder_actual;  //總補貼金額
                        if(number==map_operate_in[j]._number){
                            disable_subsidy=disable_subsidy+map_money_in[j]._disable-map_money_in[j]._disable_actual;  //總補貼金額
                            elder_subsidy=elder_subsidy+map_money_in[j]._elder-map_money_in[j]._elder_actual;  //總補貼金額                          
                        }
                    }
                }
            }
        }
        return(disable_subsidy, disable_total_subsidy, elder_subsidy, elder_total_subsidy);
    }

    function find_hash(uint16 year, uint8 month, uint8 data_operator, bytes32 data_hash) public view returns(uint8){
        for(uint16 i=0; i<count_data; i++){
            if(year==map_data_in[i]._data_year_of_season){
                if(month==map_data_in[i]._data_season){
                    if(data_operator==map_data_in[i]._data_operator){
                        if(data_hash==map_data_in[i]._hash)
                            return(1);                            
                    }
                }
            }
        }
        return(0);
    }
}