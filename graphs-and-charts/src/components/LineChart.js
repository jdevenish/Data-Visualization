import React from "react";
import * as d3 from "d3";
import '../scss/LineChart.scss'

function calcSvgDimensions(width) {
    let tablet = 768;
    let desktop = 1024;

    let dimensions = {
        width: 0,
        height: 0
    };

    if( width < tablet ) {
        dimensions.width = 400;
        dimensions.height = 300;

    } else if( tablet <= width && width < desktop ) {
        dimensions.width = 700;
        dimensions.height = 450;

    } else if( width >= desktop ) {
        dimensions.width = 975;
        dimensions.height = 500;
    }

    return dimensions
}

export default function LineChart({ id, graphData, colorObj, title = ""}) {
    let dimensions = calcSvgDimensions(window.screen.availWidth);


    //------------- 1. PREPARATION -------------------------------------------//
    //---------------- SVG ---------------------------------------------------//
    const margin = 5;
    const padding = 5;
    const adj = 30;

    // we are appending SVG first
    const svg = d3.select(id)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-"
            + adj + " -"
            + adj + " "
            + (dimensions.width + adj * 3) + " "
            + (dimensions.height + adj * 3))
        .style("padding", padding)
        .style("margin", margin)
        .classed("svg-content", true);




    const timeConv = d3.timeParse("%Y-%m-%d");


    if(graphData) {
        let plotableData = graphData.data.map(rawData => {
            return { date: new Date(rawData.date), value: rawData.time }
        });

        console.log(plotableData)

        // Add X axis --> it is a date format
        let x = d3.scaleTime()
            .domain(d3.extent(plotableData, function(d) { return d.date }))
            .range([0, dimensions.width]);
        svg.append("g")
            .attr("transform", "translate(0," + dimensions.height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        let y = d3.scaleLinear()
            .domain([0, d3.max(plotableData, function(d) { return +d.value; })])
            .range([dimensions.height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        //Add the line
        svg.append("path")
            .datum(plotableData)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date)})
                .y(function(d) { return y(d.value)}))

    }
    return (
        <div className="line-graph-container">
            <div className="pie-graph-svg-container">
                <svg id={id.substr(1)} width={dimensions.width} height={dimensions.height}>

                </svg>
            </div>
        </div>
    );
}
