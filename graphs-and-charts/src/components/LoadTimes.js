import React from "react";
import '../scss/LoadTime.scss'
import LineChart from "./LineChart";

export default function LoadTimes({ loadTimeData }) {
    const graphColors = {
        desktop: '#D2335C',
        tablet: '#FF9948',
        mobile: '#0082d5'
    };

    return (
        <div className="App">
            <h1>Load Times Graph</h1>
            <LineChart id = "#load-time-line"
                       graphData={loadTimeData}
                       colorObj={graphColors}
                       title = "Site load times" />
        </div>
    );
}
