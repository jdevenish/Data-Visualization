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
        dimensions.width = 960;
        dimensions.height = 500;
    }

    return dimensions
}

export default function LineChart({ id, graphData, colorObj, title = ""}) {
    let dimensions = calcSvgDimensions(window.screen.availWidth);
    let rawData = []
    if(graphData) {
        rawData = JSON.stringify(graphData.data)
    }


    //------------- 1. PREPARATION -------------------------------------------//
    //---------------- SVG ---------------------------------------------------//
    const margin = 5;
    const padding = 5;
    const adj = 30;

    // we are appending SVG first
    const svg = d3.select(id)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-"
            + adj + " - "
            + adj + " "
            + (dimensions.width + adj * 3) + " "
            + (dimensions.height + adj * 3))
        .style("padding", padding)
        .style("margin", margin)
        .classed("svg-content", true);

    //---------------- DATA --------------------------------------------------//
    const timeConv = d3.timeParse("%d-%b-%Y");

    // const dataset = d3.json(graphData.data);
    //---------------- SCALES ------------------------------------------------//
    const xScale = d3.scaleTime().range([0,dimensions.width]);
    const yScale = d3.scaleLinear().rangeRound([dimensions.height, 0]);
    

    //---------------- AXES --------------------------------------------------//
    //---------------- LINES -------------------------------------------------//
    //------------- 2. DRAWING -----------------------------------------------//
    //---------------- AXES --------------------------------------------------//
    //---------------- LINES -------------------------------------------------//

    return (
        <div className="line-graph-container">
            <div className="pie-graph-svg-container">
                <svg id={id.substr(1)} width={dimensions.width} height={dimensions.height}>

                </svg>
            </div>
        </div>
    );
}
