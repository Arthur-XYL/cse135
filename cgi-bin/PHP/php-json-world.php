<?php
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('America/Los_Angeles'); // Set the default timezone to UTC, or set it to your preferred timezone

$data = [
    "heading" => "Hello, PHP!",
    "title" => "Hello, PHP!",
    "message" => "This page was generated with the php programming language",
    "time" => date('r'),
];

if (!empty($_SERVER['REMOTE_ADDR'])) {
    $ip = $_SERVER['REMOTE_ADDR'];
} else {
    $ip = "Unknown";
}

$data["IP"] = $ip;

echo json_encode($data);
?>