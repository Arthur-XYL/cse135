<?php
header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('America/Los_Angeles'); 

echo "<h1>Avalanche Hello World</h1>";
echo "<p>This page was generated with the PHP programming language</p>";
echo "<p>Current Time: " . date('Y-m-d') . "</p>";

if (!empty($_SERVER['REMOTE_ADDR'])) {
    $ip = $_SERVER['REMOTE_ADDR'];
} else {
    $ip = "Unknown";
}

echo "<p>Your IP Address: " . $ip . "</p>";
?>
