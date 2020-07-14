import React, { useState } from "react";
import * as d3 from "d3";
import '../scss/BrowserType.scss'

export default function BrowserType({ browserTypeData, logged }) {
    // const [browserKeys, setBrowserkeys] = useState([]);
    // const [browserData, setBrowserData] = useState(browserTypeData)
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

    // Build dynamic label values
    const labels = browserKeys.map(browserName => {
        return(
            <p className='capitalize label'>{browserName}: <span className={`${browserName} label`}>
                {logged ? `${((browserTypeData[browserName] / totalCount)*100).toFixed(2)}%` : "loading"}
            </span></p>
        )
    });

    // Select browser-type-pie chart SVG for manipulation
    let svg = d3.select("#browser-type-pie");

    let width = 500;
    let height = 400;
    let radius = Math.min(width, height) / 2;
    let g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Define colors
    let color = d3.scaleOrdinal(browserColors);

    // Define graph type
    let pie = d3.pie();

    // Define size of pie chart
    let arc = d3.arc().innerRadius(0).outerRadius(radius-50);

    // Provide data for pie chart
    let arcs = g.selectAll("arc").data(pie(browserValues)).enter().append("g").attr("class", "arc");

    // Draw and fill color of pie graph
    arcs.append("path").attr("fill", function(d,i) {
        return color(i)
    }).attr("d", arc)
        .append("title")
        .text(function(d,i) {
            return browserValues[i]
        });

    // Add Title to the graph
    svg.append("g")
        .attr("transform", "translate(" + (width / 2 - 110) + "," + 25 + ")")
        .append("text")
        .text("Browser use statistics")
        .attr("class", "browser-pie-label");

    return (
        <div className="App">
            <h1 id="browser-type">Browser Type Graph</h1>
            <div className="pie-graph-container">
                <div className="pie-graph-content">
                    <svg id="browser-type-pie" height={height} width={width}>

                    </svg>
                    <div className="legend">
                        {labels}
                    </div>
                </div>
            </div>
        </div>
    );
}
