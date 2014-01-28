<?php

$errorLog = ini_get('error_log');
$isMamp = false;
if (strpos($errorLog, 'MAMP') !== false) {
    $isMamp = true;
}

//$wasMailSent = mail(
//        'Mark Hansen <mark@megalytic.com>', 'testing mail from php', 'Hey Mark - did you receive this?' . "\r\n\r\n" . 'Your verification code is: dfgrt', 'From: Mark Hansen <mark@gaexamples.com>' . "\r\n" .
//        'Reply-To: mark@gaexamples.com');
//
//error_log("wasMailSent = " . $wasMailSent);


$success = false;
$verificationcode = "";
$failureMsg = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // error_log('$_POST = ' . print_r($_POST, true));
    if (!empty($_POST['username']) && !empty($_POST['email']) && !empty($_POST['password'])) {

        if ($isMamp) {
            $conn = new mysqli("localhost", "gaexamples", "daint4toot", "gaexamples", 8889);
        } else {
            $conn = new mysqli("localhost", "gaexamples", "kraftz87pup", "gaexamples", 3306);
        }
        if ($conn->connect_errno) {
            error_log(sprintf("Connect failed (%s): %s\n", $conn->connect_errno, $conn->connect_error));
        } else {
            // check if username already exists
            $sqlUsername = "SELECT * FROM singlepagefunnel WHERE username = ?";
            $stmtUsername = $conn->prepare($sqlUsername);
            $stmtUsername->bind_param('s', $_POST['username']);
            $stmtUsername->execute();
            $stmtUsername->store_result();
            if ($stmtUsername->num_rows > 0) {
                $failureMsg = "Username already exists: " . $_POST['username'];
            } else {
                // check if email already exists
                $sqlEmail = "SELECT * FROM singlepagefunnel WHERE email = ?";
                $stmtEmail = $conn->prepare($sqlEmail);
                $stmtEmail->bind_param('s', $_POST['email']);
                $stmtEmail->execute();
                $stmtEmail->store_result();
                if ($stmtEmail->num_rows > 0) {
                    $failureMsg = "Email already exists: " . $_POST['email'];
                    $stmtEmail->close();
                } else {
                    $stmtEmail->close();
                    // insert new account
                    $sqlInsert = "INSERT INTO singlepagefunnel VALUES (?, ?, ?, ?)";
                    $stmtInsert = $conn->prepare($sqlInsert);
                    if ($stmtInsert) {
                        // generate random 5 character verification code
                        $characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
                        $verificationcode = '';
                        for ($i = 0; $i < 5; $i++) {
                            $verificationcode .= $characters[rand(0, strlen($characters) - 1)];
                        }
                        $stmtInsert->bind_param('ssss', $_POST['username'], $_POST['email'], $_POST['password'], $verificationcode);
                        $success = $stmtInsert->execute();
                    } else {
                        error_log("SQL failed to execute.  Here is error.");
                        error_log(mysqli_error($conn));
                        error_log("******** end var_dump ********");
                    }
                }
            }
            mysqli_close($conn);
        }
    }
}
echo json_encode(array('success' => $success, 'username' => $_POST['username'], 'email' => $_POST['email'], 'verificationcode' => $verificationcode, 'failureMsg' => $failureMsg));
?>
