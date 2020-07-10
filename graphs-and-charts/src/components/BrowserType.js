import React, { useState } from "react";
import * as d3 from "d3";
import '../scss/BrowserType.scss'

export default function BrowserType({ browserTypeData, logged }) {
    // const [browserKeys, setBrowserkeys] = useState([]);
    // const [browserData, setBrowserData] = useState(browserTypeData)
    let browserKeys = [];
    let browserValues = [];

    for(let key in browserTypeData) {
        if(browserTypeData[key] > 0){
            browserKeys.push(key);
            browserValues.push(browserTypeData[key]);
        }

    }

    let svg = d3.select("#browser-type-pie");

    let width = 500;
    let height = 400;
    let radius = Math.min(width, height) / 2;
    let g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    // Define colors
    let color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    // Define graph type
    let pie = d3.pie();

    // Define size of pie chart
    let arc = d3.arc().innerRadius(0).outerRadius(radius-50);

    // Provide data for pie chart
    let arcs = g.selectAll("arc").data(pie(browserValues)).enter().append("g").attr("class", "arc");

    // Draw and fill color of pie graph
    arcs.append("path").attr("fill", function(d,i) {
        return color(i)
    }).attr("d", arc);

    // Add Labels to sections of pie chart
    // arcs.append("text")
    //     .attr("transform", function(d) {
    //         return "translate(" + arc.centroid(d) + ")";
    //     })
    //     .text(function(d,i) { return browserKeys[i]});

    // Add Title to the graph
    svg.append("g")
        .attr("transform", "translate(" + (width / 2 - 110) + "," + 25 + ")")
        .append("text")
        .text("Browser use statistics")
        .attr("class", "browser-pie-label");

    console.log(logged);


    return (
        <div className="App">
            <h1 id="browser-type">Browser Type Graph</h1>
            <div>
                <svg id="browser-type-pie" height={height} width={width}>

                </svg>
                <div>
                    <p>Chrome: <span className="chrome-label">{logged ? browserTypeData['chrome'] : 'loading'}</span></p>
                    <p>Firefox: <span className="firefox-label">{logged ? browserTypeData['firefox'] : 'loading'}</span></p>
                    <p>Safari: <span className="safari-label">{logged ? browserTypeData['safari'] : 'loading'}</span></p>
                </div>
            </div>

        </div>
    );
}
