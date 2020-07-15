import React from "react";
import '../scss/BrowserType.scss'
import PieChart from "./PieChart";

export default function BrowserType({ browserTypeData }) {
    const graphColors = {
        chrome: '#D2335C',
        firefox: '#FF9948',
        safari: '#0082d5',
        ie: '#54657E',
        other: '#A93ABA'
    };

    return (
        <div className="App">
            <h1 id="browser-type">Browser Type Graph</h1>
            <PieChart id="#browser-type-pie"
                      graphData={browserTypeData}
                      colorObj = {graphColors}
                      title="Browser use statistics"/>
        </div>
    );
}
