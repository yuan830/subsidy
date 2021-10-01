import React from "react";

class operate extends React.Component {
  state = { stackId: null , para1: null , para2: null, para3: null, para4: null};

  handleKeyDown1 = e1 => {
    // if the enter key is pressed, set the value with the string
    this.setState({para1:e1.target.value});
  };

  handleKeyDown2 = e2 => {
    // if the enter key is pressed, set the value with the string
    this.setState({para2:e2.target.value});
  };

  handleKeyDown3 = e3 => {
    // if the enter key is pressed, set the value with the string
    this.setState({para3:e3.target.value});
  };

  handleKeyDown4 = e4 => {
    // if the enter key is pressed, set the value with the string
    this.setState({para4:e4.target.value});
  };

  handleKeyDown5 = e5 => {
    // if the enter key is pressed, set the value with the string
    this.setState({para5:e5.target.value});
  };

  handleKeyDown6 = e6 => {
    // if the enter key is pressed, set the value with the string
    this.setState({para6:e6.target.value});
  };

  handleKeyDown7 = e7 => {
    // if the enter key is pressed, set the value with the string
    this.setState({para7:e7.target.value});
  };

  handleKeyDown8 = e8 => {
    // if the enter key is pressed, set the value with the string
    this.setState({para8:e8.target.value});
  };


  go = () => {
    this.setValue(this.state.para1,this.state.para2,this.state.para3,this.state.para4,this.state.para5,this.state.para6,this.state.para7,this.state.para7)
  };

  setValue = (value1,value2,value3,value4,value5,value6,value7,value8) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.subsidy;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["operate"].cacheSend(value1, value2, value3, value4, value5, value6, value7, value8, {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
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
        <p><input type="text" onKeyUp={this.handleKeyDown1} /></p>
        <p>營運單位：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown2} /></p>
        <p>搭乘年份：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown3} /></p>
        <p>搭乘月份：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown4} /></p>
        <p>搭乘日期：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown5} /></p>
        <p>上車時間：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown6} /></p>
        <p>搭乘人數：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown7} /></p>
        <p>車號：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown8} /></p>
        <p className="btn"><input id="apply" type="button" value="紀錄" onClick={this.go}/></p>    
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default operate;

