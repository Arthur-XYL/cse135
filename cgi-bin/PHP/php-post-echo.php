<?php
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

echo "</ul>\n";

// Print the HTML file bottom
echo "</body></html>";
?>
