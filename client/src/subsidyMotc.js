import React from "react";
//import {Button} from 'antd';
//https://github.com/owidder/codetalks2018/blob/3a8cb62d7216c636ece6e18ae1909d29bf2af7b5/client/src/HashStore.js

class subsidyMotc extends React.Component {
  state = { dataKey: null, para:null};
  
  /*handleKeyDown = e => {
  // if the enter key is pressed, set the value with the string
    this.setState({para:e.target.value});
    console.log("state set");
    this.go1();
    
  };     */ 

  async go1(){
    const { drizzle } = this.props;
    const contract = drizzle.contracts.subsidy;
    // let drizzle know we want to watch the `myString` method
    //var i=6;
    const hashedText1 = await this.text1;
    const hashedText2 = await this.text2;
    const hashedText3 = await this.text3;
    const hashedText4 = await this.text4;
    const dataKey = contract.methods["subsidyMotc"].cacheCall(hashedText1,hashedText2,hashedText3,hashedText4);
    // save the `dataKey` to local component state for later reference
    this.setState({dataKey:dataKey});
    //console.log(i);
  };


/*
  componentDidMount() {
  }
*/

  render() {
    // get the contract state from drizzleState
    const { subsidy } = this.props.drizzleState.contracts;
    // using the saved `dataKey`, get the variable we're interested in
    const see = subsidy.subsidyMotc[this.state.dataKey];
    //console.log(see);
    // if it exists, then we display its value
    return(
      <div>
        <aa>虧損補貼款統計</aa>
        <p>年度：</p>  
        <p><input type="text" onChange={(evt1) => this.text1 = evt1.target.value} placeholder="請輸入單位名稱" autosize  /></p>
        <p>期數：</p>  
        <p><input type="text" onChange={(evt2) => this.text2 = evt2.target.value} placeholder="請輸入單位名稱" autosize /></p>
        <p>路線：</p>  
        <p><input type="text" onChange={(evt3) => this.text3 = evt3.target.value} placeholder="請輸入單位名稱" autosize /></p>
        <p>營運單位：</p>  
        <p><input type="text" onChange={(evt4) => this.text4 = evt4.target.value} placeholder="請輸入單位名稱" autosize /></p>
        <p className="btn"><input id="apply" type="button" value="查詢補貼" onClick={() => this.go1()}/> </p>    
        <p>該路線總補貼金額 : {see &&see.value[0]} </p>
        <p>該路線總行駛里程 : {see &&see.value[1]} </p>
        <p>該路線總搭乘人數 : {see &&see.value[2]} </p>
      </div>
    );
  }
}

export default subsidyMotc;