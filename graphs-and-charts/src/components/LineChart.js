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

export default function LineChart({ id, graphData, colorObj, title = ""}) {
    let dimensions = calcSvgDimensions(window.screen.availWidth);

    // Set incoming data to appropriate variables
    for(let key in graphData) {

    }

    return (
        <div className="line-graph-container">

        </div>
    );
}
