import axios from 'axios'

const api = axios.create({
    baseURL: 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
});

export const visitorDataObj = {
    loadTime: "",
    screenWidth: window.screen.width,
    geolocation: "",
    deviceType: ""
};

export const browserDetection = async () => {
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
};

export const determineLoadTime = async (browser) => {
    if(browser === 'Safari') {
        let domContentLoadedEventEnd = window.performance.timing.domContentLoadedEventEnd;
        let navigationStart = window.performance.timing.navigationStart;

        return {
            time: domContentLoadedEventEnd - navigationStart,
            date: Date.now(),
            requestType: 'unknown'
        }

    } else {
        let perfEntries = performance.getEntriesByType("navigation")[0];

        // domContentLoadedEventEnd : representing the time value equal to the time
        // immediately after the current document's DOMContentLoaded event completes.
        let domContentLoadedEventEnd = perfEntries.domContentLoadedEventEnd;

        // requestStart : representing the time immediately before the user agent
        // starts requesting the resource from the server, or from relevant
        // application caches or from local resources.
        let navigationStart = perfEntries.requestStart;

        return {
            time: (domContentLoadedEventEnd - navigationStart),
            date: Date.now(),
            requestType: String(perfEntries.type)
        }
    }

};

export const getGeoMapData = async() => {
    const resp = await api.get('')
    return resp.data
}
