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
    if(graphData) {
        // set the dimensions and margins of the graph
        let margin = {top: 10, right: 30, bottom: 30, left: 60};

        // we are appending SVG first
        let svg = d3.select(id)
                .attr("width", dimensions.width + margin.left + margin.right)
                .attr("height", dimensions.height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        let plotableData = graphData.data.map(rawData => {
            return { date: new Date(rawData.date), value: rawData.time, requestType: rawData.requestType }
        });

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

        // Add the line
        svg.append("path")
            .datum(plotableData)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date)})
                .y(function(d) { return y(d.value)}))

        // Create a tooltip
        let ToolTip = d3.select(id+"tooltip")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");

        // Functions that change the tooltip on user hover / move / leave a cell
        let mouseover = function() {
            ToolTip.style("opacity", 1);
        };

        let mousemove = function(d) {
            ToolTip
                .html(`Exact value: ${d.value.toFixed(2)} Type: ${d.requestType}`)
                .style("left", (d3.mouse(this)[0]+70) + "px")
                .style("top", (d3.mouse(this)[1]-750) + "px")
                .style("background-color", "red")
        };

        let mouseleave = function() {
            ToolTip
                .style("opacity", 0);
        };

        // Add the points
        svg.append("g")
            .selectAll("dot")
            .data(plotableData)
            .enter()
            .append("circle")
                .attr("class", "myCircle")
                .attr("cx", function(d) { return x(d.date) })
                .attr("cy", function (d) { return y(d.value) })
                .attr("r", 8)
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .attr("fill", "transparent")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
    }
    return (
        <div className="line-graph-container">
            <div className="line-graph-content">
                <div className="line-graph-svg-container">
                    <svg id={id.substr(1)}>

                    </svg>
                    <div id={id.substr(1)+"tooltip"}>

                    </div>
                </div>
            </div>
        </div>
    );
}
