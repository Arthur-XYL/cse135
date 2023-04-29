<?php
session_start();
session_destroy();

echo "<html>";
echo "<head>";
echo "<title>PHP Session Destroyed</title>";
echo "</head>";
echo "<body>";
echo "<h1>Session Destroyed</h1>";
echo "<a href=\"/cgi-forms/php-cgiform.html\">Back to the PHP Form</a><br />";
echo "<a href=\"/cgi-bin/PHP/php-sessions-1.php\">Back to Page 1</a><br />";
echo "<a href=\"/cgi-bin/PHP/php-sessions-2.php\">Back to Page 2</a>";
echo "</body>";
echo "</html>";
?>
