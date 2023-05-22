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

document.addEventListener('DOMContentLoaded', (event) => {
    function get_static_data() {
        return new Promise((resolve, reject) => {
            // Static data
            let staticData = {
                sessionId: setSessionId(),
                userAgent: navigator.userAgent,
                language: navigator.language,
                cookiesEnabled: navigator.cookieEnabled,
                javaScriptEnabled: true, // If this script is running, JavaScript is enabled
                imagesEnabled: null, // Will be set later
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

let pageData = {
    sessionId: setSessionId(),
    thrown_errors: [],
    mouseMovements: [],
    clicks: [],
    scrolls: [],
    keyEvents: [],
    idleTimes: [],
    pageEntries: [new Date()],
    pageExits: [],
    pageUrls: [window.location.href],
};

let idleStart = new Date();

window.onerror = function (message, source, lineno, colno, error) {
    pageData.thrown_errors.push({ message, source, lineno, colno, error });
};

document.addEventListener('mousemove', function (event) {
    pageData.mouseMovements.push({ x: event.clientX, y: event.clientY });
    idleStart = new Date();  // reset the idle start time
});

document.addEventListener('click', function (event) {
    pageData.clicks.push({ x: event.clientX, y: event.clientY, button: event.button });
    idleStart = new Date();  // reset the idle start time
});

document.addEventListener('scroll', function () {
    pageData.scrolls.push({ x: window.scrollX, y: window.scrollY });
    idleStart = new Date();  // reset the idle start time
});

document.addEventListener('keydown', function (event) {
    pageData.keyEvents.push({ key: event.key, type: 'down' });
    idleStart = new Date();  // reset the idle start time
});

document.addEventListener('keyup', function (event) {
    pageData.keyEvents.push({ key: event.key, type: 'up' });
    idleStart = new Date();  // reset the idle start time
});

// Function to send data
async function sendData() {
    const now = new Date();

    // Calculate idle time
    const idleTime = now - idleStart;

    // If idle for more than 2 seconds, update idle time
    if (idleTime > 2000) {
        pageData.idleTimes.push({ start: idleStart, end: now, duration: idleTime });
    }

    // Update page data with page exit time
    pageData.pageExits.push(now);

    // Send data to the server
    await fetch("https://cse135.cloud/api/activity_data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pageData),
    });

    // Reset page data
    pageData = {
        sessionId: setSessionId(),
        thrown_errors: [],
        mouseMovements: [],
        clicks: [],
        scrolls: [],
        keyEvents: [],
        idleTimes: [],
        pageEntries: [new Date()],
        pageExits: [],
        pageUrls: [window.location.href],
    };
    idleStart = new Date();
}

// Call sendData every 5 seconds
setInterval(sendData, 5000);

