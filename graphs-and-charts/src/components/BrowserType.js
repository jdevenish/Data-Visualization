import React from "react";
import * as d3 from "d3";

export default function BrowserType({ browserTypeData }) {
    // const [browserKeys, setBrowserkeys] = useState([]);
    let browserKeys = [];
    let browserValues = [];
    d3.select("#browser-type").style("color", "green")
    for(let key in browserTypeData) {
        browserKeys.push(key);
        browserValues.push(browserTypeData[key]);
    }


    return (
        <div className="App">
            <h1 id="browser-type">Browser Type Graph</h1>
            <svg id="browser-type-pie" height="300" width="400">

            </svg>
        </div>
    );
}
