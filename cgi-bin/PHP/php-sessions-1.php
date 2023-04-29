<?php
session_start();

// Store Data in the PHP Session
if (!isset($_SESSION['username']) && isset($_POST['username'])) {
    $_SESSION['username'] = $_POST['username'];
}

$name = $_SESSION['username'];

echo "<html>";
echo "<head>";
echo "<title>PHP Sessions</title>";
echo "</head>";
echo "<body>";

echo "<h1>PHP Sessions Page 1</h1>";

if ($name) {
    echo("<p><b>Name:</b> {$name}");
} else {
    echo "<p><b>Name:</b> You do not have a name set</p>";
}
echo "<br/><br/>";
echo "<a href=\"/cgi-bin/PHP/php-sessions-2.php\">Session Page 2</a><br/>";
echo "<a href=\"/cgi-forms/php-cgiform.html\">PHP CGI Form</a><br />";
echo "<form style=\"margin-top:30px\" action=\"/cgi-bin/PHP/php-destroy-session.php\" method=\"get\">";
echo "<button type=\"submit\">Destroy Session</button>";
echo "</form>";

echo "</body>";
echo "</html>";
?>
