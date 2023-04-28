#!/usr/bin/env php-cgi
<?php
header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('America/Los_Angeles'); 

echo "Arthur Hello World<br>";
echo "This page was generated with the PHP programming language<br>";
echo "Current Time: " . date('Y-m-d') . "<br>";

if (!empty($_SERVER['REMOTE_ADDR'])) {
    $ip = $_SERVER['REMOTE_ADDR'];
} else {
    $ip = "Unknown";
}

echo "Your IP Address: " . $ip;
?>
