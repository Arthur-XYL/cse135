function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
    console.log(match);
    return match ? match[2] : null;
}

function setSessionId() {
    let sessionId = getCookie('sessionId');
    console.log(sessionId);
    if (!sessionId) {
        sessionId = new Date().getTime();
        document.cookie = `sessionId=${sessionId}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
    return sessionId;
}


document.addEventListener('DOMContentLoaded', (event) => {
    function get_static_data() {
        // Static data
        let staticData = {
            id: setSessionId(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled,
            javaScriptEnabled: true, // If this script is running, JavaScript is enabled
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
        };
        image.onerror = function () {
            staticData.imagesEnabled = false;
        };
        image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

        // Check if CSS is enabled by creating a dummy element and applying some styles to it
        let testElement = document.createElement('div');
        testElement.style.width = "10px";
        document.body.appendChild(testElement);
        staticData.cssEnabled = (window.getComputedStyle(testElement).width === "10px");
        document.body.removeChild(testElement);

        return staticData;
    }

    async function static_data() {
        const data = get_static_data();
        await fetch("https://cse135.cloud/api/static_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => { console.log(response); })
            .catch((error) => { console.log(error); });
    }

    static_data();
  
});

window.addEventListener('load', (event) => {
    function get_performance_data() {
        let performanceData = {};
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        if (navigationTiming) {
            performanceData = {
                id: setSessionId(),
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
        await fetch("https://cse135.cloud/api/performance_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => { console.log(response); })
            .catch((error) => { console.log(error); });
    }

    setTimeout(performance_data, 1000);
});


let activityData = {
    id: setSessionId(),
    thrown_errors: [],
    mouseMovements: [],
    clicks: [],
    scrolls: [],
    keyEvents: [],
    idleTimes: [],
    pageEntries: [],
    pageExits: [],
    pageUrls: [],
};

async function activity_data() {
    activityData.id = setSessionId();
    window.onerror = function (message, source, lineno, colno, error) {
        activityData.thrown_errors.push({ message, source, lineno, colno, error });
    };

    document.addEventListener('mousemove', function (event) {
        activityData.mouseMovements.push({ x: event.clientX, y: event.clientY });
    });

    document.addEventListener('click', function (event) {
        activityData.clicks.push({ x: event.clientX, y: event.clientY, button: event.button });
    });

    document.addEventListener('scroll', function () {
        activityData.scrolls.push({ x: window.scrollX, y: window.scrollY });
    });

    document.addEventListener('keydown', function (event) {
        activityData.keyEvents.push({ key: event.key, type: 'down' });
    });

    document.addEventListener('keyup', function (event) {
        activityData.keyEvents.push({ key: event.key, type: 'up' });
    });

    let idleStart = null;
    document.addEventListener('mousemove', function () {
        if (idleStart) {
            let idleEnd = new Date();
            let idleTime = idleEnd - idleStart;
            if (idleTime > 2000) {
                activityData.idleTimes.push({ start: idleStart, end: idleEnd, duration: idleTime });
            }
            idleStart = null;
        }
    });

    setInterval(function () {
        if (!idleStart) {
            idleStart = new Date();
        }
    }, 2000);

    activityData.pageEntries.push(new Date());

    window.addEventListener('beforeunload', function () {
        activityData.pageExits.push(new Date());
    });

    activityData.pageUrls.push(window.location.href);

    // Sending data to the server
    await fetch("https://cse135.cloud/api/activity_data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(activityData),
    })
        .then((response) => { console.log(response); })
        .catch((error) => { console.log(error); });

    // Reset activity data
    activityData = {
        id: setSessionId(),
        thrown_errors: [],
        mouseMovements: [],
        clicks: [],
        scrolls: [],
        keyEvents: [],
        idleTimes: [],
        pageEntries: [],
        pageExits: [],
        pageUrls: [],
    };
}

setInterval(activity_data, 10000);