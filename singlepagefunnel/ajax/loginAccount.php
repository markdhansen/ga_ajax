<?php

$errorLog = ini_get('error_log');
$isMamp = false;
if (strpos($errorLog, 'MAMP') !== false) {
    $isMamp = true;
}


$success = false;
$username = "";
$failureMsg = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // error_log('$_POST = ' . print_r($_POST, true));
    if (!empty($_POST['email']) && !empty($_POST['password'])) {

        if ($isMamp) {
            $conn = new mysqli("localhost", "gaexamples", "daint4toot", "gaexamples", 8889);
        } else {
            $conn = new mysqli("localhost", "gaexamples", "kraftz87pup", "gaexamples", 3306);
        }
        if ($conn->connect_errno) {
            error_log(sprintf("Connect failed (%s): %s\n", $conn->connect_errno, $conn->connect_error));
        } else {
            // get password
            $sqlPassword = "SELECT password, username FROM singlepagefunnel WHERE email = ?";
            $stmt = $conn->prepare($sqlPassword);
            $stmt->bind_param('s', $_POST['email']);
            $stmt->execute();
            $stmt->bind_result($passwordInDb, $username);
            if ($stmt->fetch()) {
                if ($passwordInDb == $_POST['password']) {
                    $success = true;
                } else if (empty($passwordInDb)) {
                    $failureMsg = "No password found for email: " . $_POST['email'];
                } else {
                    $failureMsg = "Wrong password.";
                }
            } else {
                $failureMsg = "No account found for email: " . $_POST['email'];
            }
            mysqli_close($conn);
        }
    }
}
echo json_encode(array('success' => $success, 'email' => $_POST['email'], 'username' => $username, 'failureMsg' => $failureMsg));
?>
