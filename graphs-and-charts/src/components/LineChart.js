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
            + adj + " -"
            + adj + " "
            + (dimensions.width + adj * 3) + " "
            + (dimensions.height + adj * 3))
        .style("padding", padding)
        .style("margin", margin)
        .classed("svg-content", true);



    //---------------- DATA --------------------------------------------------//
    const timeConv = d3.timeParse("%d-%b-%Y");

    if(graphData) {
        const slices = graphData.data.map((value) => {
            // console.log(timeConv(new Date(value.date).toString()))
            return {
                date: new Date(value.date),
                measurement: value.time
            }
        });


        // const dataset = d3.json(graphData.data);
        //---------------- SCALES ------------------------------------------------//
        const xScale = d3.scaleTime().range([0,dimensions.width]);
        const yScale = d3.scaleLinear().rangeRound([dimensions.height, 0]);

        xScale.domain(d3.extent(graphData.data, function(d){
            return timeConv(d.date)}));

        yScale.domain([(0), d3.max(slices, function(c) {
            return d3.max(c.measurement + 4)
        })
        ]);

        //---------------- AXES --------------------------------------------------//
        const yaxis = d3.axisLeft()
            .ticks(slices.length)
            .scale(yScale);

        const xaxis = d3.axisBottom()
            .ticks(d3.timeDay.every(1))
            .tickFormat(d3.timeFormat('%b %d'))
            .scale(xScale);

        //---------------- LINES -------------------------------------------------//
        const line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.measurement); });


        //------------- 2. DRAWING -----------------------------------------------//
        //---------------- AXES --------------------------------------------------//
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + dimensions.height + ")")
            .call(xaxis);

        svg.append("g")
            .attr("class", "axis")
            .call(yaxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("dy", ".75em")
            .attr("y", 6)
            .style("text-anchor", "end")
            .text("Frequency");


        const lines = svg.selectAll("lines")
            .data(slices)
            .enter()
            .append("g");

        lines.append("path")
            .attr("d", function(d) { return line(d); });

        lines.append("text")
            .attr("class","serie_label")
            .datum(function(d,i) {
                // console.log(`d = ${d}  i = ${i}`)
                return slices[slices.length - 1]; })
            .attr("transform", function(d) {
                // console.log(d)
                return "translate(" + (xScale(d.date) + 10)
                    + "," + (yScale(d.measurement) + 5 ) + ")"; })
            .attr("x", 5)

        //---------------- LINES -------------------------------------------------//
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
