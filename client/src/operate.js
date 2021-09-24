import React from "react";

class operate extends React.Component {
  state = { stackId: null , para1: null , para2: null, para3: null};

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


  go = () => {
    this.setValue(this.state.para1,this.state.para2,this.state.para3)
  };

  setValue = (value1,value2,value3) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.subsidy;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["operate"].cacheSend(value1, value2, value3, {
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
        <div class= "operate">
          <aa>營運資料輸入</aa>
        <div>
          <w1>路線編號: </w1>
          <input type="text" onKeyUp={this.handleKeyDown1} />          
        </div>

        <div>
          <w1>營運單位: </w1>
          <input type="text" onKeyUp={this.handleKeyDown2} />          
        </div>

        <div>
          <w1>期別: </w1>
          <input type="text" onKeyUp={this.handleKeyDown3} />          
        </div>

        <div>
          <input id="apply" type="button" value="紀錄" onClick={this.go}/>          
        </div>
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default operate;

