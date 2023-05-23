function setSessionId() {
    let sessionId = getCookie('sessionId');
    if (!sessionId) {
        sessionId = new Date().getTime();
        document.cookie = `sessionId=${sessionId}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
    return sessionId;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function storeData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

async function sendData(key, url) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        localStorage.removeItem(key);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    function get_static_data() {
        return new Promise((resolve, reject) => {
            // Static data
            let staticData = {
                sessionId: setSessionId(),
                userAgent: navigator.userAgent,
                language: navigator.language,
                cookiesEnabled: navigator.cookieEnabled,
                javaScriptEnabled: true, 
                imagesEnabled: null,
                cssEnabled: null,
                screenDimensions: {
                    width: window.screen.width,
                    height: window.screen.height
                },
                windowDimensions: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                // In some cases, this might not be available due to browser support or privacy settings
                networkConnection: navigator.connection ? navigator.connection.effectiveType : 'unknown'
            };

            // Check if images are loaded by creating a dummy image and checking if it loads
            const image = new Image();
            image.onload = function () {
                staticData.imagesEnabled = true;
                resolve(staticData);
            };
            image.onerror = function () {
                staticData.imagesEnabled = false;
                resolve(staticData);
            };
            image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

            // Check if CSS is enabled by creating a dummy element and applying some styles to it
            let testElement = document.createElement('div');
            testElement.style.width = "10px";
            document.body.appendChild(testElement);
            staticData.cssEnabled = (window.getComputedStyle(testElement).width === "10px");
            document.body.removeChild(testElement);
        });
    }

    async function static_data() {
        const data = await get_static_data();
        storeData("static_data", data);
        sendData("static_data", "https://cse135.cloud/api/static_data");
    }

    static_data();
});

window.addEventListener('load', (event) => {
    function get_performance_data() {
        let performanceData = {};
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        if (navigationTiming) {
            performanceData = {
                sessionId: setSessionId(),
                wholeTimingObject: navigationTiming,
                pageLoadStart: navigationTiming.loadEventStart,
                pageLoadEnd: navigationTiming.loadEventEnd,
                totalLoadTime: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
            };
        }
        return performanceData;
    }

    async function performance_data() {
        const data = get_performance_data();
        storeData("performance_data", data);
        sendData("performance_data", "https://cse135.cloud/api/performance_data");
    }

    setTimeout(performance_data, 1000);
});

let activityData = {
    sessionId: setSessionId(),
    thrown_errors: [],
    mouseMovements: [],
    clicks: [],
    scrolls: [],
    keyEvents: [],
    idleTimes: [],
    pageEntries: new Date(),
    pageExits: null,
    pageUrls: window.location.href,
};
let idleStart = new Date();

window.onerror = function (message, source, lineno, colno, error) {
    activityData.thrown_errors.push({ message, source, lineno, colno, error });
};

window.addEventListener('beforeunload', function (event) {
    // Calculate page exit time and add to activityData
    const pageExitTime = new Date();
    activityData.pageExits = pageExitTime;
    // set idle time
    setIdleTime();

    storeData("activityData", activityData);
    // send data upon exit
    sendActivityData();
});

function setIdleTime() {
    const now = new Date();
    const idleTime = now - idleStart;

    // If idle for more than 2 seconds, update idle time
    if (idleTime > 2000) {
        activityData.idleTimes.push({ start: idleStart, end: now, duration: idleTime });
    }
}

document.addEventListener('mousemove', function (event) {
    activityData.mouseMovements.push({ x: event.clientX, y: event.clientY });
    setIdleTime();
    idleStart = new Date();  // reset the idle start time
});

document.addEventListener('click', function (event) {
    activityData.clicks.push({ x: event.clientX, y: event.clientY, button: event.button });
    setIdleTime();
    idleStart = new Date();  // reset the idle start time
});

document.addEventListener('scroll', function () {
    activityData.scrolls.push({ x: window.scrollX, y: window.scrollY });
    setIdleTime();
    idleStart = new Date();  // reset the idle start time
});

document.addEventListener('keydown', function (event) {
    activityData.keyEvents.push({ key: event.key, type: 'down' });
    setIdleTime();
    idleStart = new Date();  // reset the idle start time
});

document.addEventListener('keyup', function (event) {
    activityData.keyEvents.push({ key: event.key, type: 'up' });
    setIdleTime();
    idleStart = new Date();  // reset the idle start time
});

// Function to send data
async function sendActivityData() {
    setIdleTime();
    sendData("activityData", "https://cse135.cloud/api/activity_data");
    // Reset activity data
    activityData = {
        sessionId: setSessionId(),
        thrown_errors: [],
        mouseMovements: [],
        clicks: [],
        scrolls: [],
        keyEvents: [],
        idleTimes: [],
        pageEntries: activityData.pageEntries,
        pageExits: null,
        pageUrls: window.location.href,
    };
}

// Save activity data every 1 second
setInterval(function() {
    storeData("activityData", activityData);
}, 1000);


// Call sendActivityData every 60 seconds
setInterval(sendActivityData, 60000);
