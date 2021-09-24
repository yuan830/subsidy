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
    const aaa = this.state.para;
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

      <div class= "subsidyMotc">
        <aa>虧損補貼款統計</aa>
        <div>
          <w1>年份: </w1>
          <input type="text" onChange={(evt1) => this.text1 = evt1.target.value} placeholder="請輸入單位名稱" autosize />
          <w1>期數: </w1>
          <input type="text" onChange={(evt2) => this.text2 = evt2.target.value} placeholder="請輸入單位名稱" autosize />
          <w1>路線: </w1>
          <input type="text" onChange={(evt3) => this.text3 = evt3.target.value} placeholder="請輸入單位名稱" autosize />
          <w1>營運單位: </w1>
          <input type="text" onChange={(evt4) => this.text4 = evt4.target.value} placeholder="請輸入單位名稱" autosize />
        </div>
        <div>
          <input id="apply" type="button" value="查詢補貼" onClick={() => this.go1()}/> 
        </div>
        <p>該路線補貼金額 : {see &&see.value} </p>
      </div>
    );
  }
}

export default subsidyMotc;