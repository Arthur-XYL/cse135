// Function to fetch data using GET request and visualize the data using ZingChart
function fetchDataAndVisualize() {
    fetch('https://cse135.cloud/api/static_data')
      .then(response => response.json())
      .then(data => {
        drawPie('static-chart', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    // fetch('https://cse135.cloud/api/performance_data')
    //   .then(response => response.json())
    //   .then(data => {
    //     drawBar('performance-chart', data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  
    // fetch('https://cse135.cloud/api/activity_data')
    //   .then(response => response.json())
    //   .then(data => {
    //     drawLine('activity-chart', data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  }
  
  // Functions to visualize data using ZingChart
  // 2-series bar chart
//   function drawBar(chartId, data) {
//     const values1 = data.map(item => item.responseStart); 
//     const values2 = data.map(item => item.responseEnd); 
//     zingchart.render({
//         id: chartId,
//         data: {
//             type: 'bar',
//             series: [
//                 { values: values1 },
//                 { values: values2 }
//             ]
//         }
//     });
//   }
  
  function drawPie(chartId, data) {
    const count = data.length;
    const object = {};
    const objectName = [];
    const output = [];

    for (const entry of data) {
        if (!object[entry.userAgent]) {
            object[entry.userAgent] = 1;
            objectName.push(entry.userAgent);
        } else {
            object[entry.userAgent]++;
        }
    }

    for (const name of objectName) {
        const config = {
            values: [object[name] / count],
            text: name
        };
        output.push(config);
    }

    const myConfig = {
        graphset: [{
        type: 'pie',
        title: {
            text: 'Static Data: User Agent percentage',
            'adjust-layout': true
        },
        plotarea: {
            margin: 'dynamic',
            'adjust-layout': true
        },
        legend: {
            'adjust-layout': true
        },
        series: output
        }]
    };

    zingchart.render({
        id: chartId,
        data: myConfig,
        height: '100%',
        width: '100%'
    });
  }

  // 3-series line chart
//   function drawLine(chartId, data) {
    
//   }
  
  document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndVisualize();
  });