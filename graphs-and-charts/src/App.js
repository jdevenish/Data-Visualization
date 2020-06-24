import React, { useState, useEffect } from 'react';
import './App.css';
import {getLocationData} from "./services/api-helper-geoLocation";
import {sendMetrics} from "./services/api-helper-send_receive_metrics";


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
  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    if(!pageLoaded) {
      getLocationData().then(locale => {
        let visitorData = {
          loadTime: {
            time: window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart,
            date: ""
          },
          screenWidth: screen.width,
          geolocation: locale,
          deviceType: BrowserDetection()
        };
        sendMetrics(visitorData).then(resp => {
          if(resp.status === 200) {
            setPageData(resp.metrics);
            setPageLoaded(true);
          }
        }).catch(error => {
          console.error(error);
        })
      }).catch(error => {
        console.error(error);
      })
    }
  }, []);

  console.log(pageData);

  return (
    <div className="App">
    </div>
  );
}

export default App;
