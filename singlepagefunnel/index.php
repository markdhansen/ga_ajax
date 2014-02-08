<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="shortcut icon" href="docs-assets/ico/favicon.png">

        <title>Single Page Funnel</title>

        <!-- CSS -->
        <link rel="stylesheet" type="text/css" media="all" href="../css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" media="all" href="../css/font-awesome.css" />
        <link rel="stylesheet" type="text/css" media="all" href="../css/bootstrap-tour.css" />
        <link rel="stylesheet" type="text/css" media="all" href="../css/style.css" />
        <link rel="stylesheet" type="text/css" media="all" href="../css/dan.css" />
        <link rel="stylesheet" type="text/css" media="all" href="./css/runexample.css" />
        <link rel="stylesheet" href="//code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">

        <style>
            body { font-family: "Trebuchet MS", "Helvetica", "Arial",  "Verdana", "sans-serif"; font-size: 11px; }
            label, input { display:block; }
            input.text { margin-bottom:2px; width:95%; padding: .1em; }
            fieldset { font-size:0.85em; padding:0; border:0; margin-top:2px; }
            h1 { font-size: 1.2em; margin: .6em 0; }
            .navbar-nav { font-size: 14px; }
            .ui-dialog .ui-state-error { padding: .3em; }
            .validateTips { border: 1px solid transparent; padding: 0.3em; }
            .scroller-area {
                max-height: 200px;
                overflow-y:scroll;                
            }
            .panel-body-wrapper {
                overflow-x: scroll;
            }
            .wide {
                width:4000px;
            }
            #run-ui {
                padding-right: 0px;
                padding-left: 0px;
            }
            #run-ui-navbar {
                border-radius: 0px;
            }
            #run-ui-container {
                padding: 5px;
            }

        </style>
        <?php include_once("../analyticstracking.php") ?>
    </head>
    <body>

        <?php
        $errorLog = ini_get('error_log');
        $isMamp = false;
        if (strpos($errorLog, 'MAMP') !== false) {
            $isMamp = true;
        }
        $home = ($isMamp ? "/gaexamples" : "/");
        ?>
        <div class="topnav">
            <div class="row">
                <div class="col-md-4 col-sm-4">
                    <div class="logo">
                        <a href="<?php echo $home; ?>">GAExamples</a>
                    </div></div>
                <div class="col-md-8 col-sm-8 right"> 
                    <div class="loginbox">
                        <a href="#" class="btn btn-inverse">Signup</a>
                        <a href="#" class="btn btn-inverse">Login</a>
                    </div>
                </div>
            </div>
        </div>

        <div id="container" class="row purplebg listings">
            <div class="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                <a href="<?php echo $home; ?>" class="btn btn-default"><i class="fa fa-caret-left"></i> Back to  examples </a>
                <hr />
                <div class="row">
                    <div id="example" class="col-md-12">
                        <div class="main-listing">
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="help-icons single-funnel"></div>
                                    <h1>Single page funnel</h1> 
                                </div>
                                <div class="col-md-3 right">
                                    <a href="#"><i class="fa fa-star orange"></i> Favorited</a>
                                </div>
                            </div>
                            <p>
                                This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process. </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu turpis eu magna interdum mollis nec sollicitudin arcu. Integer vitae odio suscipit, sagittis felis id, auctor libero. Nullam malesuada augue non ipsum facilisis pulvinar. Sed gravida commodo metus, id varius dui lobortis vitae. Ut et massa massa. 
                            </p>
                            <p>
                                <a id="run-example-button" class="btn btn-sm btn-primary">Run example &raquo;</a>
                            </p>
                        </div>
                    </div>
                    <div id="run-ui" class="col-md-12 lightbluebg" style="display:none">
                        <div id="run-ui-navbar" class="navbar navbar-default navbar-static" role="navigation">
                            <div class="container-fluid">
                                <div class="navbar-header">
                                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                    <a class="navbar-brand" href="javascript:void(0)">Single Page Funnel</a>
                                </div>
                                <div class="navbar-collapse collapse">
                                    <ul class="nav navbar-nav navbar-right">
                                        <li id="login-menu-item"><a href="javascript:void(0)">Signup</a></li>
                                        <li id="create-account-menu-item"><a href="javascript:void(0)">Login</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id="run-ui-container">
                            <a id="create-account-button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#create-account-dialog">Create account</a>
                        </div>
                    </div>

                    <div id="run-code" class="col-md-12" style="display:none">
                        <h3 class="code-header">Code window</h3>
                        <div class="panel-body-wrapper">
                            <!--<div class="panel-body">-->
                            <div class="wide">
                                <pre id="code-window" class="scroller-area"></pre>
                            </div>
                            <!--</div>-->
                        </div>                    
                    </div>

                </div>
                <!-----end row----->
                <hr />
            </div>
        </div>

        <!--  worker code below -->

        <!-- create account form -->
        <div class="modal fade" id="create-account-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <div title="Create new account">
                            <p class="validateTips">All form fields are required.</p>
                            <form autocomplete="off">
                                <fieldset>
                                    <label for="username">Username</label>
                                    <input type="text" name="username" id="username" class="text ui-widget-content ui-corner-all">
                                    <label for="email">Email</label>
                                    <input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all">
                                    <label for="password">Password</label>
                                    <input type="password" name="password" id="password" value="" class="text ui-widget-content ui-corner-all">
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="create-account-button" type="button" class="btn btn-primary">Create account</button>
                        <button id="close-create-account-button" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>



        <!-- login account form -->
        <div id="login-account-dialog" title="Login to your account">
            <p class="validateTips">All form fields are required.</p>
            <form autocomplete="off">
                <fieldset>
                    <label for="email">Email</label>
                    <input type="text" name="email" id="login-email" value="" class="text ui-widget-content ui-corner-all">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="login-password" value="" class="text ui-widget-content ui-corner-all">
                </fieldset>
            </form>
        </div>        

        <!-- verify account form -->
        <div id="verify-account-dialog" title="Verify account">
            <p class="validateTips">All form fields are required.</p>
            <form autocomplete="off">
                <fieldset>
                    <label for="verificationInput">Verification code</label>
                    <input type="text" name="verificationInput" id="verificationInput" class="text ui-widget-content ui-corner-all">
                </fieldset>
            </form>
        </div>      

        <!-- Fixed navbar -->
        <div class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <?php
                    $errorLog = ini_get('error_log');
                    $isMamp = false;
                    if (strpos($errorLog, 'MAMP') !== false) {
                        $isMamp = true;
                    }
                    $home = ($isMamp ? "/gaexamples" : "/");
                    ?>
                    <a class="navbar-brand" href="<?php echo $home; ?>">GA Examples</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li id="login-menu-item"><a href="javascript:void(0)">Login</a></li>
                        <li id="create-account-menu-item"><a href="javascript:void(0)">Create Account</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="container">

            <!-- Main component for a primary marketing message or call to action -->
            <div class="jumbotron" id="description">

                <h1>Single page funnel</h1>
                <p>This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks
                    conversion success for a multi-step account creation process.</p>
                <p>
                    <a id="take-tour" class="btn btn-lg btn-primary" href="javascript:void(0)" role="button">Take a tour &raquo;</a>
                </p>
                <p>
                    <a class="btn btn-lg btn-primary" href="javascript:void(0)" role="button">View source &raquo;</a>
                </p>
            </div>
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">Code</h3>
                </div>
                <div class="panel-body-wrapper">
                    <!--<div class="panel-body">-->
                    <div class="wide">
                        <pre id="code-window" class="scroller-area"></pre>
                    </div>
                    <!--</div>-->
                </div>
            </div>
            <div id="this-file" style="display:none;">
                <?php
                $file = file_get_contents('./index.php', FILE_USE_INCLUDE_PATH);
                $escapedFile = str_replace(">", "&gt;", str_replace("<", "&lt;", str_replace("&", "&amp;", $file)));
                $paddingSize = 200;
                $padding = "";
                for ($i = 1; $i <= $paddingSize; $i++) {
                    $padding .= "\n";
                }
                echo $padding . $escapedFile . $padding;
                ?>
            </div>

        </div> <!-- /container -->

        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <!--<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>-->
        <script src="//code.jquery.com/jquery-1.9.1.js"></script>
        <script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <script src="../js/bootstrap.js"></script>
        <script src="../js/bootstrap-tour.js"></script>
        <script src="../js/showcode.js"></script>
        <script src="../js/validation.js"></script>
        <script src="../js/tips.js"></script>
        <script src="./js/runexample.js"></script>
        <script>
            $(function() {

                var tour = new Tour({
                    backdrop: true,
                    onShown: function() {
                        var stepId = this.id;
                        $("#" + stepId).css("z-index", "1500");
                    }
                });
                tour.addSteps([
                    {
                        element: "#create-account-menu-item", // string (jQuery selector) - html element next to which the step popover should be shown
                        title: "Create a new account.", // string - title of the popover
                        content: "Click here to create an account.  The steps in the account creation process are tracked in the <a href='img/account-creation-funnel.jpg' target='_blank'>Account Creation funnel</a>." // string - content of the popover
                    },
                    {
                        element: "#login-menu-item",
                        title: "Login to an existing account.",
                        content: "Click here to login to an account that you have already created.  The steps in the login process are tracked in the <a href='img/account-creation-funnel.jpg' target='_blank'>Login funnel</a>."
                    }
                ]);
                tour.init();

                $(".navbar-nav li").hover(
                        function() {
                            $(this).addClass("active");
                        },
                        function() {
                            $(this).removeClass("active");
                        }
                );

                var username = $("#username"),
                        email = $("#email"),
                        password = $("#password"),
                        loginEmail = $("#login-email"),
                        loginPassword = $("#login-password"),
                        allFields = $([]).add(email).add(password).add(username).add(loginEmail).add(loginPassword);

                var accountInfo = {};

                $("#create-account-button").click(function() {

                    var bValid = validateAccount(username, email, password);
                    if (bValid) {

                        showCode("_user_create_account_submit");
                        _gaq.push(["_trackPageview", "/user/create-account/submit"]);

                        $.ajax({
                            url: 'ajax/createAccount.php',
                            type: "POST",
                            data: {
                                username: username.val(),
                                email: email.val(),
                                password: password.val()
                            },
                            dataType: "JSON"
                        }).done(function(respCreateAccount) {
                            accountInfo.email = respCreateAccount.email;
                            accountInfo.account = respCreateAccount.username;
                            if (respCreateAccount.success && respCreateAccount.email) {

                                $.ajax({
                                    url: 'ajax/sendVerificationEmail.php',
                                    type: "POST",
                                    data: {
                                        email: respCreateAccount.email,
                                        verificationcode: respCreateAccount.verificationcode
                                    },
                                    dataType: "JSON"
                                }).done(function(respSendEmail) {

                                    if (respSendEmail.success) {
                                        $("#verify-account-dialog").dialog("open");

                                        showCode("_user_create_account_verify_open");
                                        _gaq.push(["_trackPageview", "/user/create-account/verify/open"]);

                                    } else {

                                        showCode("_user_create_account_email-failed");
                                        _gaq.push(["_trackPageview", "/user/create-account/email-failed"]);

                                        alert(respSendEmail.failureMsg);

                                    }
                                })
                                        .fail(function() {
                                    console.log("POST failed!");
                                });
                            } else {

                                showCode("_user_create_account_submit_failed");
                                _gaq.push(["_trackPageview", "/user/create-account/submit-failed"]);

                                alert(respCreateAccount.failureMsg);
                            }
                        })
                                .fail(function() {
                            console.log("POST failed!");
                        });
                        $(this).dialog("close");
                    }
                });

                $("#close-create-account-button").click(function() {
                    // track the close only if initiated by user
                    showCode("_user_create_account_close");
                    _gaq.push(["_trackPageview", "/user/create-account/close"]);
                });

                $("#create-account-dialog").on("hidden.bs.modal", function() {
                    allFields.val("").removeClass("ui-state-error");
                });

                $("#login-account-dialog").dialog({
                    autoOpen: false,
                    height: 300,
                    width: 300,
                    modal: true,
                    position: {my: "top", at: "top", of: $("#description")},
                    buttons: {
                        "Login": function() {

                            var bValid = validateLogin(loginEmail, loginPassword);
                            if (bValid) {

                                showCode("_user_login_submit");
                                _gaq.push(["_trackPageview", "/user/login/submit"]);

                                $.ajax({
                                    url: 'ajax/loginAccount.php',
                                    type: "POST",
                                    data: {
                                        email: loginEmail.val(),
                                        password: loginPassword.val()
                                    },
                                    dataType: "JSON"
                                }).done(function(resp) {
                                    accountInfo.email = resp.email;
                                    accountInfo.account = resp.username;
                                    if (resp.success) {

                                        showCode("_user_login_success");
                                        _gaq.push(["_trackPageview", "/user/login/success"]);

                                        alert("Congratulations!  You are logged in with username: " + resp.username);
                                    } else {
                                        if (resp.verified) {
                                            showCode("_user_login_fail");
                                            _gaq.push(["_trackPageview", "/user/login/fail"]);
                                        } else {
                                            showCode("_user_login_account_not_verified");
                                            _gaq.push(["_trackPageview", "/user/login/account-not-verified"]);
                                        }

                                        alert("Bummer, login failed. " + resp.failureMsg);
                                    }
                                })
                                        .fail(function() {
                                    console.log("POST failed!");
                                });
                                $(this).dialog("close");
                            }
                        },
                        Cancel: function() {

                            showCode("_user_login_cancel");
                            _gaq.push(["_trackPageview", "/user/login/cancel"]);

                            $(this).dialog("close");
                        }
                    },
                    close: function(event, ui) {
                        if (event.originalEvent) {
                            // track the close only if initiated by user
                            showCode("_user_login_close");
                            _gaq.push(["_trackPageview", "/user/login/close"]);
                        }
                        allFields.val("").removeClass("ui-state-error");
                    }
                });

                $("#verify-account-dialog").dialog({
                    autoOpen: false,
                    height: 350,
                    width: 300,
                    modal: true,
                    position: {my: "top", at: "top", of: $("#description")},
                    buttons: {
                        "Verify account": function() {

                            showCode("_user_create_account_verify_submit");
                            _gaq.push(["_trackPageview", "/user/create-account/verify/submit"]);

                            verificationInput = $("#verificationInput").val();
                            // check verification code in database
                            $.ajax({
                                url: 'ajax/checkVerificationCode.php',
                                type: "POST",
                                data: {
                                    username: accountInfo.account,
                                    email: accountInfo.email,
                                    verificationcode: verificationInput
                                },
                                dataType: "JSON"
                            }).done(function(resp) {
                                if (resp.success) {

                                    showCode("_user_create_account_success");
                                    _gaq.push(["_trackPageview", "/user/create-account/success"]);

                                    alert("Congrats!  You have verified your account.");

                                } else {
                                    showCode("_user_create_account_verify_failed");
                                    _gaq.push(["_trackPageview", "/user/create-account/verify/failed"]);

                                    alert("Bummer. " + resp.failureMsg);
                                }
                            })
                                    .fail(function() {
                                console.log("POST failed!");
                            });
                            $(this).dialog("close");
                        },
                        Cancel: function() {

                            showCode("_user_create_account_verify_canceled");
                            _gaq.push(["_trackPageview", "/user/create-account/verify/canceled"]);

                            $(this).dialog("close");

                        }
                    },
                    close: function(event, ui) {
                        if (event.originalEvent) {
                            // track the close only if initiated by user
                            showCode("_user_create_account_verify_close");
                            _gaq.push(["_trackPageview", "/user/create-account/verify/close"]);
                        }
                        allFields.val("").removeClass("ui-state-error");
                    }
                });

//                $("#create-account-menu-item")
//                        .click(function() {
//                    $("#create-account-dialog").dialog("open");
//
//                    showCode("_user_create_account_open");
//                    _gaq.push(["_trackPageview", "/user/create-account/open"]);
//
//                });

                $("#create-account-button")
                        .click(function() {
                    $("#create-account-dialog-old").dialog("open");

                    showCode("_user_create_account_open");
                    _gaq.push(["_trackPageview", "/user/create-account/open"]);

                });

                $("#login-menu-item")
                        .click(function() {
                    $("#login-account-dialog").dialog("open");

                    showCode("_user_login_open");
                    _gaq.push(["_trackPageview", "/user/login/open"]);

                });

                $("#take-tour")
                        .click(function() {
                    tour.restart();
                });

            });
        </script>
    </body>
</html>