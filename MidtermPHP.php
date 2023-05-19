<!-- <?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

// Print HTML file top
echo <<<END
<!DOCTYPE html>
<html><head><title>POST Request Echo</title>
</head><body><h1 align="center">POST Request Echo</h1>
<hr>
END;

// Read and parse POST data
$form_data = file_get_contents("php://input");
parse_str($form_data, $parsed_data);

echo "<b>Message Body:</b><br />\n";
echo "<ul>\n";

// Print out the POST data
foreach ($parsed_data as $key => $value) {
    echo "<li>{$key} = {$value}</li>\n";
}
echo "<li>msg = Well Done</li>\n";

echo "</ul>\n";

// Print the HTML file bottom
echo "</body></html>";
?> -->

<?php
// set response headers
header('Content-Type: application/json');
http_response_code(200);

// retrieve data from POST request
$first_name = $_POST['firstName'];
$last_name = $_POST['last_name'];
$pid = $_POST['PID'];

// create response data array
$response_data = [
    'firstName' => $first_name,
    'last_name' => $last_name,
    'PID' => $pid,
    'msg' => 'Well done'
];



// emit response data as JSON
echo json_encode($response_data);

