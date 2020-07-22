import React from "react";
import '../scss/Location.scss'
import LocationChart from "./LocationChart";

export default function Location({ locationData, mapDimensions }) {

    const graphColors = {
        desktop: '#D2335C',
        tablet: '#FF9948',
        mobile: '#0082d5'
    };

    return (
        <div className="App">
            <h1>Location Graph</h1>
            <LocationChart id = "#geo-location-map"
                           graphData={locationData}
                           colorObj={graphColors}
                           mapDimensions={mapDimensions}/>
        </div>
    );
}
