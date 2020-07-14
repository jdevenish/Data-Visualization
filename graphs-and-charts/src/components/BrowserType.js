import React, { useState } from "react";
import * as d3 from "d3";
import '../scss/BrowserType.scss'
import PieChart from "./PieChart";

export default function BrowserType({ browserTypeData }) {
    let browserKeys = [];
    let browserValues = [];
    let browserColors = [];
    const graphColors = {
        chrome: '#D2335C',
        firefox: '#FF9948',
        safari: '#0082d5',
        ie: '#54657E',
        other: '#A93ABA'
    };
    let totalCount = 0;


    // Set incoming data to appropriate values
    for(let key in browserTypeData) {
        if(browserTypeData.hasOwnProperty(key) && browserTypeData[key] > 0){
            browserKeys.push(key);
            browserValues.push(browserTypeData[key]);
            browserColors.push(graphColors[key]);
            totalCount += browserTypeData[key];
        }
    }


    return (
        <div className="App">
            <h1 id="browser-type">Browser Type Graph</h1>
            <PieChart id="#browser-type-pie"
                      keys = {browserKeys}
                      values = {browserValues}
                      totalCount={totalCount}
                      colors = {browserColors}
                      title="Browser use statistics"/>
        </div>
    );
}
