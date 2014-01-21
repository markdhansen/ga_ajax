<?php

$success = false;
$failureMsg = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // error_log('$_POST = ' . print_r($_POST, true));
    if (!empty($_POST['verificationcode']) && !empty($_POST['email'])) {
        
        $wasMailSent = mail(
        $_POST['email'], 'Verification code from GA Examples', 'Your verification code is: ' . $_POST['verificationcode'], 'From: Mark Hansen <mark@gaexamples.com>' . "\r\n" .
                'Reply-To: mark@gaexamples.com');
        error_log("wasMailSent = " . $wasMailSent);
        $success = $wasMailSent;
        if (!$success) {
            $failureMsg = "Failed to send email.  Please enter a valid email address.";
        }
        
    } else {
        if (empty($_POST['verificationcode'])) {
        $failureMsg = "Missing verification code.";
        } else if (empty($_POST['email'])) {
             $failureMsg = "Missing email.";
        }
    }
}
echo json_encode(array('success' => $success, 'failureMsg' => $failureMsg));
?>
