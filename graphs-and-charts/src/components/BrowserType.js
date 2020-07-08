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



    // if(svg.attr.hasOwnProperty("width")){
    //     let width = 300;
    //     let height = 400;
    //     let radius = Math.min(width, height) / 2;
    //     let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    //
    //     let color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
    //
    //     let pie = d3.pie();
    //
    //     let arc = d3.arc().innerRadius(0).outerRadius(radius);
    //
    //     let arcs = g.selectAll("arc").data(pie(browserValues)).enter().append("g").attr("class", "arc");
    //
    //     arcs.append("path").attr("fill", function(d,i) {
    //         return color(i)
    //     }).attr("d", arc);
    // }

    let width = 300;
    let height = 200;
    let radius = Math.min(width, height) / 2;
    let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    let pie = d3.pie();

    let arc = d3.arc().innerRadius(0).outerRadius(radius);

    let arcs = g.selectAll("arc").data(pie(browserValues)).enter().append("g").attr("class", "arc");

    arcs.append("path").attr("fill", function(d,i) {
        return color(i)
    }).attr("d", arc);

    console.log(svg);


    return (
        <div className="App">
            <h1 id="browser-type">Browser Type Graph</h1>
            <svg id="browser-type-pie" height="200" width="400">

            </svg>
        </div>
    );
}
