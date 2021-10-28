import React from "react";
import Iframe from 'react-iframe'
class home extends React.Component {
  render() {
    return (
        <div >
            <div>
                <h3>操作說明影片</h3>
            </div>
            <br/>
            <div className="home">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/eqMbqO4FEPs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    );
  }
}

export default home;


