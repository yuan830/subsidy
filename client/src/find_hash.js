import React from "react";
//import {Button} from 'antd';
//https://github.com/owidder/codetalks2018/blob/3a8cb62d7216c636ece6e18ae1909d29bf2af7b5/client/src/HashStore.js

class find_hash extends React.Component {
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
    const dataKey = contract.methods["find_hash"].cacheCall(hashedText1,hashedText2,hashedText3,hashedText4);
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
    const see = subsidy.find_hash[this.state.dataKey];
    //console.log(see);
    // if it exists, then we display its value
    return(
      <div>
        <aa>資料雜湊值顯示</aa>
        <p>年度：</p>  
        <p><input type="text" onChange={(evt1) => this.text1 = evt1.target.value} placeholder="請輸入年分" autosize  /></p>
        <p>期數：</p>  
        <p><input type="text" onChange={(evt2) => this.text2 = evt2.target.value} placeholder="請輸入期數" autosize   /></p>
        <p>業者：</p>  
        <p><input type="text" onChange={(evt3) => this.text3 = evt3.target.value} placeholder="請輸入單位名稱" autosize /></p>
        <p>雜湊值(0x...)：</p>  
        <p><input type="text" onChange={(evt4) => this.text4 = evt4.target.value} placeholder="請輸入雜湊值" autosize /></p>
        <p className="btn"><input id="apply" type="button" value="查詢雜湊值" onClick={() => this.go1()}/> </p>    
        <aa>是否一致 : {see &&see.value} </aa>
      </div>

      // <div class= "find_hash">
      //   <aa>資料雜湊值顯示</aa>
      //   <div>
      //     <w1>年份: </w1>
      //     <input type="text" onChange={(evt1) => this.text1 = evt1.target.value} placeholder="請輸入年分" autosize />
      //     <w1>期數: </w1>
      //     <input type="text" onChange={(evt2) => this.text2 = evt2.target.value} placeholder="請輸入期數" autosize />
      //     <br></br>
      //     <w1>業者: </w1>
      //     <input type="text" onChange={(evt3) => this.text3 = evt3.target.value} placeholder="請輸入單位名稱" autosize />
      //     <w1>雜湊值(0x...): </w1>
      //     <input type="text" onChange={(evt4) => this.text4 = evt4.target.value} placeholder="請輸入雜湊值" autosize />          
      //   </div>
      //   <div>
      //     <input id="apply" type="button" value="查詢雜湊值" onClick={() => this.go1()}/> 
      //   </div>
      //   <p>是否一致 : {see &&see.value} </p>
      // </div>
    );
  }
}

export default find_hash;