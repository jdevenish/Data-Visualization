import React from "react";
import '../scss/DeviceType.scss'
import PieChart from "./PieChart";


export default function DeviceType({ deviceTypeData }) {
    const graphColors = {
        desktop: '#D2335C',
        tablet: '#FF9948',
        mobile: '#0082d5'
    };

    return (
        <div className="App">
            <h1>Device Type Graph</h1>
            <PieChart id = "#device-type-pie"
                      graphData={deviceTypeData}
                      colorObj={graphColors}
                      title = "Device use statistics" />
        </div>
    );
}
