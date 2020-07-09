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

    let svg = d3.select("#browser-type-pie");

    let width = 500;
    let height = 400;
    let radius = Math.min(width, height) / 2;
    let g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    let color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    let pie = d3.pie();

    let arc = d3.arc().innerRadius(0).outerRadius(radius-50);

    let arcs = g.selectAll("arc").data(pie(browserValues)).enter().append("g").attr("class", "arc");

    arcs.append("path").attr("fill", function(d,i) {
        return color(i)
    }).attr("d", arc);

    arcs.append("text")
        .attr("transform", function(d,i) {
            return "translate(" + arc.centroid(browserKeys) + ")";
        })
        .text(function(d,i) { return browserKeys[i]});


    svg.append("g")
        .attr("transform", "translate(" + (width / 2 - 110) + "," + 25 + ")")
        .append("text")
        .text("Browser use statistics")
        .attr("class", "browser-pie-label");



    return (
        <div className="App">
            <h1 id="browser-type">Browser Type Graph</h1>
            <svg id="browser-type-pie" height={height} width={width}>

            </svg>
        </div>
    );
}
