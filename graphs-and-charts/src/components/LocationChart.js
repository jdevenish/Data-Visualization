import React from "react";
import * as d3 from "d3";
import * as d4 from "d3-geo-projection"
import '../scss/LocationChart.scss'



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

export default function LocationChart({ id, graphData, colorObj, mapDimensions, title = ""}) {
    let dimensions = calcSvgDimensions(window.screen.availWidth);

    //------------- 1. PREPARATION -------------------------------------------//
    if(graphData) {
        // The svg
        let svg = d3.select(id)
                    .attr("width", dimensions.width)
                    .attr("height", dimensions.height);

        // Map and projection
        let projection = d4.geoNaturalEarth()
            .scale(dimensions.width / 1.3 / Math.PI)
            .translate([dimensions.width / 2, dimensions.height / 2]);

        // Load external data and boot
        // d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){
            console.log("Completed")
            // Draw the map
            svg.append("g")
                .selectAll("path")
                .data(mapDimensions)
                .enter().append("path")
                .attr("fill", "#69b3a2")
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                .style("stroke", "white")
        // })

    }

    return (
        <div className="map-graph-container">
            <div className="map-graph-content">
                <div className="map-graph-svg-container">
                    <svg id={id.substr(1)} >

                    </svg>
                    <div id={id.substr(1)+"tooltip"}>

                    </div>
                </div>
            </div>
        </div>
    );
}
