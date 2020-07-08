import React, { useState, useEffect } from 'react';
import './App.css';
import {browserDetection, visitorDataObj} from "./services/function-helper-metric-collection";
import {getLocationData} from "./services/api-helper-geoLocation";
import {sendMetrics} from "./services/api-helper-send_receive_metrics";
import BrowserType from "./components/BrowserType";
import DeviceType from "./components/DeviceType";
import LoadTimes from "./components/LoadTimes";
import Location from "./components/Location";


function BrowserDetection(  ) {
  let deviceType = "";
  if (navigator.userAgent.search("MSIE")>0) {
   deviceType = "IE"
  }else if (navigator.userAgent.search("Chrome")>0) {
    deviceType= "Chrome"
  }else if (navigator.userAgent.search("Firefox")>0) {
    deviceType="Firefox"
  }else if (navigator.userAgent.search("Safari")>0 && navigator.userAgent.search("Chrome") < 0) {
    deviceType = "Safari"
  }else {
    deviceType = "Other"
  }

  return deviceType;
}

function App() {
  const [logged, setLogged] = useState(false);
  const [graphData, setGraphData] = useState({});

  useEffect( () => {
    // Create visitor object with screen width and load time populated
    let visitorData = visitorDataObj;

    // Populate geolocation data
    getLocationData().then(locale => {
      visitorData.geolocation = locale;

      // Populate browser data
      browserDetection().then(browser => {
        visitorData.deviceType = browser;

        // Send complete visitor data to server
        sendMetrics(visitorData).then(metrics => {
          setGraphData(metrics)
          setLogged(true)

        }).catch(error => { // end sendMetrics
          console.error(error);
        })
      }).catch(error => { // end browserDetection
        console.error(error);
      })
    }).catch(error => { // end getLocationData
      console.error(error);
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {logged ? <h2>Your information has been logged!</h2> :
          <h2>Your information is being collected!</h2>}
      <div>
        <BrowserType browserTypeData={graphData.browser}/>
      </div>
      <div>
        <DeviceType deviceTypeData={graphData.deviceType}/>
      </div>
      <div>
        <LoadTimes loadTimeData={graphData.loadTimes}/>
      </div>
      <div>
        <Location locationData={graphData.location}/>
      </div>
    </div>
  );
}

export default App;
