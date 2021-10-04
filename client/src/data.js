import React from "react";

class data extends React.Component {
  state = { stackId: null , para1: null , para2: null, para3: null, para4: null};
  year = () =>{
    return new Date().getFullYear();
  }

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


  go = () => {
    this.setValue(this.state.para1,this.state.para2,this.state.para3,this.state.para4)
  };

  setValue = (value1,value2,value3,value4) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.subsidy;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["data"].cacheSend(value1, value2, value3, value4, {
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
        <aa>雜湊值輸入</aa>
        <p>補貼年度：</p>  
        <p>
          <select onChange={(evt1) => this.text1 = evt1.target.value}>
            <option value="0" selected disabled hidden>請選擇年度</option>
            <option value={this.year()} >{this.year()}年</option>
            <option value={this.year()-1}>{this.year()-1}年</option>
            <option value={this.year()-2}>{this.year()-2}年</option>
          </select> 
        </p>
        <p>補貼期數：</p>  
        <p>
          <select onChange={(evt2) => this.text2 = evt2.target.value}>
            <option value="0" selected disabled hidden>請選擇期數</option>
            <option value="1">第一期(5~10月)</option>
            <option value="2">第二期(11~隔年4月)</option>
          </select>  
        </p>
        <p>業者：</p>  
        <p>
          <select onChange={(evt3) => this.text3 = evt3.target.value}>
            <option value="0" selected disabled hidden>請選擇營運單位</option>
            <option value="1">一粒麥子基金會</option>
            <option value="2">屏東客運</option>
            <option value="3">高雄客運</option>
          </select> 
        </p>
        <p>雜湊值(0x...)：</p>  
        <p><input type="text" onKeyUp={this.handleKeyDown4} /></p>
        <p className="btn"><input id="apply" type="button" value="紀錄" onClick={this.go}/></p>    
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default data;

