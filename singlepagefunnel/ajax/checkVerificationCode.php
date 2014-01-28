<?php

$errorLog = ini_get('error_log');
$isMamp = false;
if (strpos($errorLog, 'MAMP') !== false) {
    $isMamp = true;
}


$success = false;
$verificationcode = "";
$failureMsg = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // error_log('$_POST = ' . print_r($_POST, true));
    if (!empty($_POST['username']) && !empty($_POST['email']) && !empty($_POST['verificationcode'])) {

        if ($isMamp) {
            $conn = new mysqli("localhost", "gaexamples", "daint4toot", "gaexamples", 8889);
        } else {
            $conn = new mysqli("localhost", "gaexamples", "kraftz87pup", "gaexamples", 3306);
        }
        if ($conn->connect_errno) {
            error_log(sprintf("Connect failed (%s): %s\n", $conn->connect_errno, $conn->connect_error));
        } else {
            // get verificationcode
            $sqlVerificationCode = "SELECT verificationcode FROM singlepagefunnel WHERE username = ? AND email = ?";
            $stmt = $conn->prepare($sqlVerificationCode);
            $stmt->bind_param('ss', $_POST['username'], $_POST['email']);
            $stmt->execute();
            $stmt->bind_result($verificationCodeInDb);
            if ($stmt->fetch()) {
                if ($verificationCodeInDb == $_POST['verificationcode']) {
                    $success = true;
                    $stmt->close();
                    $sqlSetVerified = "UPDATE singlepagefunnel SET verified = 1 WHERE username = ? AND email = ?";
                    $stmtSetVerified = $conn->prepare($sqlSetVerified);
                    if (!$conn->error) {
                        $stmtSetVerified->bind_param('ss', $_POST['username'], $_POST['email']);
                        $stmtSetVerified->execute();
                    } else {
                        error_log("SQL error: " . $conn->error);
                        $failureMsg = $conn->error;
                    }
                    $stmtSetVerified->close();
                } else if (empty($verificationCodeInDb)) {
                    $failureMsg = "No verification code found for username: " . $_POST['username'] . "; email: " . $_POST['email'];
                } else {
                    $failureMsg = "Wrong verification code.";
                }
            } else {
                $failureMsg = "No account found for username: " . $_POST['username'] . "; email: " . $_POST['email'];
            }
            mysqli_close($conn);
        }
    }
}
echo json_encode(array('success' => $success, 'failureMsg' => $conn->error));
?>
