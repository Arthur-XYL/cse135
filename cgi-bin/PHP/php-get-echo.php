<?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

// Print HTML file top
echo <<<END
<!DOCTYPE html>
<html><head><title>GET Request Echo</title>
</head><body><h1 align="center">Get Request Echo</h1>
<hr>
END;

// The Query String is simply available through $_SERVER
echo "<b>Query String:</b> " . $_SERVER['QUERY_STRING'] . "<br />\n";

// Parse the Query string
parse_str($_SERVER['QUERY_STRING'], $parsed_query);

// Print out the Query String
foreach ($parsed_query as $key => $value) {
    echo "{$key} = {$value}<br/>\n";
}

// Print the HTML file bottom
echo "</body></html>";
?>
