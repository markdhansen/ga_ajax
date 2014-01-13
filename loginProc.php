<?php

require_once 'utils.php';
if (is_null($_POST['user']) || is_null($_POST['pass'])) {
    utils::redirect_url("../index.php");
} else {
    $utils = new utils();
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $type = 'admin';

    $response = $utils->validate_user($username, $password, $type);

    if ($response == true) {
        return true;
        /*
          $utils->login_redirect($type); */
    } else {
        return false;
        /* $_SESSION['valid'] = false;
          utils::redirect_url("../index.php"); */
    }
}
?>
