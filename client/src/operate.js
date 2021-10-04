import React from "react";


class operate extends React.Component {
  state = { stackId: null ,stackId1: null , para1: null , para2: "1", para3: null, para4: null, para5: null , para6: null, para7: null, para8: null
    , para11: null , para12: null, para13: new Date().getFullYear(), para14: null, para15: null , para16: null, para17: null, para18: null};
  
  year = () =>{
    return new Date().getFullYear();
  }
  handleKeyDown1 = e1 => {
    this.setState({para1:e1.target.value});
  };

  handleKeyDown2 = e2 => {
    this.setState({para2:e2.target.value});
  };

  handlecalender = ec =>{
    this.setState({para3:ec.target.value.slice(0,4),para4:ec.target.value.slice(5,7),para5:ec.target.value.slice(8,10)});    
  }

  // handleKeyDown3 = e3 => {
  //    
  //   this.setState({para3:e3.target.value});
  // };

  // handleKeyDown4 = e4 => {
  //    
  //   this.setState({para4:e4.target.value});
  // };

  // handleKeyDown5 = e5 => {
  //    
  //   this.setState({para5:e5.target.value});
  // };

  handleKeyDown6 = e6 => {
    this.setState({para6:e6.target.value.replace(/:/g, '')});
  };

  handleKeyDown7 = e7 => {
    this.setState({para7:e7.target.value});
  };

  handleKeyDown8 = e8 => {
    this.setState({para8:e8.target.value});
  };

  handleKeyDown11 = e11 => {
    this.setState({para11:e11.target.value});
  };

  handleKeyDown12 = e12 => {
     
    this.setState({para12:e12.target.value});
  };

  handleKeyDown13 = e13 => {
    this.setState({para13:e13.target.value});
  };

  handleKeyDown14 = e14 => {
    this.setState({para14:e14.target.value});
  };

  handleKeyDown15 = e15 => {
    this.setState({para15:e15.target.value});
  };

  handleKeyDown16 = e16 => {
    this.setState({para16:e16.target.value});
  };

  handleKeyDown17 = e17 => {
    this.setState({para17:e17.target.value});
  };

  handleKeyDown18 = e18 => {
    this.setState({para18:e18.target.value});
  };

  go = () => {
    this.setValue(this.state.para1,this.state.para2,this.state.para3,this.state.para4,this.state.para5,this.state.para6,this.state.para7,this.state.para8,
      this.state.para11,this.state.para12,this.state.para13,this.state.para14,this.state.para15,this.state.para16,this.state.para17,this.state.para18)
    console.log(this.state.para1,this.state.para2,this.state.para3,this.state.para4,this.state.para5,this.state.para6,this.state.para7,this.state.para8,
      this.state.para11,this.state.para12,this.state.para13,this.state.para14,this.state.para15,this.state.para16,this.state.para17,this.state.para18)
    };

  setValue = (value1,value2,value3,value4,value5,value6,value7,value8,value11,value12,value13,value14,value15,value16,value17,value18) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.subsidy;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["operate"].cacheSend(value1, value2, value3, value4, value5, value6, value7, value8,{
      from: drizzleState.accounts[0]
    });

    const stackId1 = contract.methods["money"].cacheSend(value11, value12*1000, value13, value14, value15, value16, value17, value18,{
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId, stackId1 });
  };



  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <aa>路線資料輸入</aa>
        <p>路線編號：</p>  
        <p>
          <select onChange={this.handleKeyDown1}>
            <option value="0" selected disabled hidden>請選擇路線標號</option>
            <option value="1">龍脊</option>
            <option value="2">龍身</option>
            <option value="3">龍爪</option>
          </select>
        </p>

        <p>營運單位：</p>  
        <p>
          <select onLoad={this.handleKeyDown2} onChange={this.handleKeyDown2} >
            {/* <option value="0" selected disabled hidden>請選擇營運單位</option> */}
            <option value="1"selected>一粒麥子基金會</option>
            <option value="2">屏東客運</option>
            <option value="3">高雄客運</option>
          </select> 
        </p>

        {/* <p>搭乘年份：</p>  
        <p>
          <select onChange={this.handleKeyDown3}>
            <option value={this.year()} selected>{this.year()}</option>
            <option value={this.year()-1}>{this.year()-1}</option>
            <option value={this.year()-2}>{this.year()-2}</option>
          </select> 
        </p> */}
        <p>發車日期：</p>  
        <p><input id="date" type="date" onChange={this.handlecalender}/></p>
        
        {/* <p>搭乘月份：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown4} /></p>
        <p>搭乘日期：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown5} /></p> */}
        <p>發車時間：</p>  
        <p><input id="time" type="time" name="appt-time" min="5:00" max="21:00" onChange={this.handleKeyDown6}/></p>
        <p>搭乘人數：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown7} /></p>
        
        <p>車號：</p>  
        <p>
          <select onChange={this.handleKeyDown8}>
            <option value="0" selected disabled hidden>請選擇車輛</option>
            <option value="1">kaa-966</option>
            <option value="2">nes-548</option>
            <option value="3">bak-866</option>
          </select>  
        </p>

        <p>路線營收：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown11} /></p>
        <p>行駛里程：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown12} /></p>
        <p>補貼年度：</p>  
        <p>
          <select onLoad={this.handleKeyDown13} onChange={this.handleKeyDown13}>
            <option value={this.year()} selected>{this.year()}年</option>
            <option value={this.year()-1}>{this.year()-1}年</option>
            <option value={this.year()-2}>{this.year()-2}年</option>
          </select> 
        </p>

        <p>補貼期數：</p>  
        <p>
          <select onChange={this.handleKeyDown14}>
            <option value="0" selected disabled hidden>請選擇期數</option>
            <option value="1">第一期(5~10月)</option>
            <option value="2">第二期(11~隔年4月)</option>
          </select>  
        </p>
    
        <p>愛心營收：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown15} /></p>
        <p>愛心實際收入：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown16} /></p>
        <p>敬老營收：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown17} /></p>
        <p>敬老實際收入：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown18} /></p>
        
        <p className="btn"><input id="apply" type="button" value="紀錄" onClick={this.go}/></p>    
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default operate;

