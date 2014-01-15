<?php

$conn = new mysqli("localhost", "gaexamples", "daint4toot", "gaexamples", 8889);
if ($conn->connect_errno) {
    printf("Connect failed (%s): %s\n", $conn->connect_errno, $conn->connect_error);
}
printf("<p>Success ... %s</p>", $conn->host_info);
if ($result = $conn->query("SELECT * FROM singlepagefunnel")) {
    while ($obj = $result->fetch_object()) {
        $line.="username=" . $obj->username;
        $line.="  email=" . $obj->email;
        $line.="  password=" . $obj->password;
        $line.="  verificationcode=" . $obj->verificationcode;
        printf("<p>%s</p>", $line);
        $line = "";
    }
}


mysqli_close($conn);


//require_once 'utils.php';
//if (is_null($_POST['user']) || is_null($_POST['pass'])) {
//    utils::redirect_url("../index.php");
//} else {
//    $utils = new utils();
//    $username = $_POST['user'];
//    $password = $_POST['pass'];
//    $type = 'admin';
//
//    $response = $utils->validate_user($username, $password, $type);
//
//    if ($response == true) {
//        return true;
//        /*
//          $utils->login_redirect($type); */
//    } else {
//        return false;
//        /* $_SESSION['valid'] = false;
//          utils::redirect_url("../index.php"); */
//    }
//}
?>
