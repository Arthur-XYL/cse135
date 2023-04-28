#!/usr/bin/env php-cgi
<?php
header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('America/Los_Angeles'); 

echo "<h1>Arthur Hello World</h1><br>";
echo "<p>This page was generated with the PHP programming language</p><br>";
echo "<p>Current Time: " . date('Y-m-d') . "</p><br>";

if (!empty($_SERVER['REMOTE_ADDR'])) {
    $ip = $_SERVER['REMOTE_ADDR'];
} else {
    $ip = "Unknown";
}

echo "<p>Your IP Address: " . $ip . "</p>";
?>
