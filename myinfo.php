<?php

$errorLog = ini_get('error_log');
echo "error_log = " . $errorLog . "\n<br>";
$isMamp = "false";
if (strpos($errorLog, 'MAMP') !== false) {
  $isMamp = "true";
}
echo "isMamp = " . $isMamp . "\n<br>";

?>