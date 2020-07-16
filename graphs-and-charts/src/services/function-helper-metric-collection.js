
export const visitorDataObj = {
    loadTime: {
        time: (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart),
        date: ""
    },
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

export const determineLoadTime = async () => {
    let loadTime = {
        time: 0,
        date: new Date()
    }

    let perfEntries = performance.getEntriesByType("navigation");
    console.log(perfEntries)
    let domContentLoadedEventEnd = perfEntries.domContentLoadedEventEnd;
    let navigationStart = perfEntries.domContentLoadedEventStart;
    // console.log(domContentLoadedEventEnd-navigationStart)
}
