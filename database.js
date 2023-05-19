// Function to fetch data using GET request and update ZingGrid
function fetchDataAndPopulateGrid() {
    fetch('https://cse135.cloud/api/static_data')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('static-container');
            grid.setAttribute('data', JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('https://cse135.cloud/api/performance_data')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('performance-container');
            grid.setAttribute('data', JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('https://cse135.cloud/api/activity_data')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('activity-container');
            grid.setAttribute('data', JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndPopulateGrid();
});
