import React from "react";
import * as d3 from "d3";
import '../scss/PieChart.scss'

function calcSvgDimensions(width) {
    let tablet = 768;
    let desktop = 1024;

    let dimensions = {
        width: 0,
        height: 0
    };

    if( width < tablet ) {
        dimensions.width = 375;
        dimensions.height = 380;

    } else if( tablet <= width && width < desktop ) {
        dimensions.width = 400;
        dimensions.height = 450;

    } else if( width >= desktop ) {
        dimensions.width = 500;
        dimensions.height = 550;
    }

    return dimensions
}

export default function PieChart({ id, graphData, colorObj, title}) {
    let keys = [];
    let values = [];
    let colors = [];
    let totalCount = 0;
    let dimensions = calcSvgDimensions(window.screen.availWidth);

    // Set incoming data to appropriate variables
    for(let key in graphData) {
        if(graphData.hasOwnProperty(key) && graphData[key] > 0){
            keys.push(key);
            values.push(graphData[key]);
            colors.push(colorObj[key]);
            totalCount += graphData[key];
        }
    }


    // Build dynamic label values
    const labels = keys.map((name, i) => {
        return(
            <p className='capitalize label' key = {name}>{name}: <span className="label" style={{color: colors[i]}} >
                {`${((values[i] / totalCount)*100).toFixed(2)}%`}
            </span></p>
        )
    });

    // Select browser-type-pie chart SVG for manipulation
    let svg = d3.select(id);

    let radius = Math.min(dimensions.width, dimensions.height) / 2;
    let g = svg.append("g")
        .attr("transform", "translate(" + dimensions.width / 2 + "," + dimensions.height / 2 + ")");

    // Define colors
    let color = d3.scaleOrdinal(colors);

    // Define graph type
    let pie = d3.pie();

    // Define size of pie chart
    let arc = d3.arc().innerRadius(0).outerRadius(radius-50);

    // Provide data for pie chart
    let arcs = g.selectAll("arc").data(pie(values)).enter().append("g").attr("class", "arc");

    // Draw and fill color of pie graph & add hover over values
    arcs.append("path").attr("fill", function(d,i) {
        return color(i)
    }).attr("d", arc)
        .append("title")
        .text(function(d,i) {
            return values[i]
        });

    // Add Title to the graph
    svg.append("g")
        .attr("transform", "translate(" + (dimensions.width / 2 - 110) + "," + 25 + ")")
        .append("text")
        .text(title)
        .attr("class", "browser-pie-label");

    return (
        <div className="pie-graph-container">
            <div className="pie-graph-content">
                <div className="pie-graph-svg-container">
                    <svg id={id.substr(1)} width={dimensions.width} height={dimensions.height}>

                    </svg>
                </div>
                <div className="legend">
                    {labels}
                </div>
            </div>
        </div>
    );
}
