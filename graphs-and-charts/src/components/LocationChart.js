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

export default function LocationChart({ id, graphData, colorObj, title = ""}) {
    let dimensions = calcSvgDimensions(window.screen.availWidth);

    //------------- 1. PREPARATION -------------------------------------------//
    //---------------- SVG ---------------------------------------------------//
    if(graphData) {

    }
    return (
        <div className="map-graph-container">
            <div className="map-graph-content">
                <div className="map-graph-svg-container">
                    <svg id={id.substr(1)}>

                    </svg>
                    <div id={id.substr(1)+"tooltip"}>

                    </div>
                </div>
            </div>
        </div>
    );
}
