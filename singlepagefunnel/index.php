<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="shortcut icon" href="docs-assets/ico/favicon.png">

        <title>Single Page Funnel</title>

        <!-- Bootstrap core CSS -->
        <link href="../css/bootstrap.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="../css/navbar-fixed-top.css" rel="stylesheet">

        <!-- Just for debugging purposes. Don't actually copy this line! -->
        <!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">

        <style>
            body { font-family: "Trebuchet MS", "Helvetica", "Arial",  "Verdana", "sans-serif"; font-size: 11px; }
            label, input { display:block; }
            input.text { margin-bottom:12px; width:95%; padding: .4em; }
            fieldset { padding:0; border:0; margin-top:25px; }
            h1 { font-size: 1.2em; margin: .6em 0; }
            .navbar-nav { font-size: 14px; }
            .ui-dialog .ui-state-error { padding: .3em; }
            .validateTips { border: 1px solid transparent; padding: 0.3em; }
        </style>
        <?php include_once("../analyticstracking.php") ?>
    </head>
    <body>

        <!-- create account form -->
        <div id="create-account-dialog" class="signup-modal" title="Create new account">
            <p class="validateTips">All form fields are required.</p>
            <form>
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

        <!-- login account form -->
        <div id="login-account-dialog" class="signup-modal" title="Login to your account">
            <p class="validateTips">All form fields are required.</p>
            <form>
                <fieldset>
                    <label for="email">Email</label>
                    <input type="text" name="email" id="login-email" value="" class="text ui-widget-content ui-corner-all">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="login-password" value="" class="text ui-widget-content ui-corner-all">
                </fieldset>
            </form>
        </div>        

        <!-- verify account form -->
        <div id="verify-account-dialog" class="signup-modal" title="Verify account">
            <p class="validateTips">All form fields are required.</p>
            <form>
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
                    <a class="navbar-brand" href="../">GA Examples</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="javascript:void(0)" id="login-menu-item">Login</a></li>
                        <li><a href="javascript:void(0)" id="create-account-menu-item">Create Account</a></li>
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
                    <a class="btn btn-lg btn-primary" href="../../components/#navbar" role="button">View source &raquo;</a>
                </p>
            </div>

        </div> <!-- /container -->

        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
<!--        <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>-->
        <script src="//code.jquery.com/jquery-1.9.1.js"></script>
        <script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <script src="../js/bootstrap.js"></script>
        <script>
            $(function() {

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
                        allFields = $([]).add(username).add(email).add(password),
                        tips = $(".validateTips");

                function updateTips(t) {
                    tips
                            .text(t)
                            .addClass("ui-state-highlight");
                    setTimeout(function() {
                        tips.removeClass("ui-state-highlight", 1500);
                    }, 500);
                }

                function checkLength(o, n, min, max) {
                    if (o.val().length > max || o.val().length < min) {
                        o.addClass("ui-state-error");
                        updateTips("Length of " + n + " must be between " +
                                min + " and " + max + ".");
                        return false;
                    } else {
                        return true;
                    }
                }

                function checkRegexp(o, regexp, n) {
                    if (!(regexp.test(o.val()))) {
                        o.addClass("ui-state-error");
                        updateTips(n);
                        return false;
                    } else {
                        return true;
                    }
                }

                var accountInfo = {};

                $("#create-account-dialog").dialog({
                    autoOpen: false,
                    height: 350,
                    width: 300,
                    modal: true,
                    position: {my: "top", at: "top", of: $("#description")},
                    buttons: {
                        "Create an account": function() {
                            var bValid = true;
                            allFields.removeClass("ui-state-error");

                            bValid = bValid && checkLength(username, "username", 3, 16);
                            bValid = bValid && checkLength(email, "email", 6, 80);
                            bValid = bValid && checkLength(password, "password", 5, 16);

                            bValid = bValid && checkRegexp(username, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter.");
                            // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                            bValid = bValid && checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com");
                            bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

                            if (bValid) {
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
                                    console.log("respCreateAccount.success = " + respCreateAccount.success);
                                    console.log("respCreateAccount.email = " + respCreateAccount.email);
                                    console.log("respCreateAccount.verificationcode = " + respCreateAccount.verificationcode);
                                    console.log("respCreateAccount.failureMsg = " + respCreateAccount.failureMsg);
                                    accountInfo.email = respCreateAccount.email;
                                    accountInfo.account = respCreateAccount.username;
                                    if (respCreateAccount.success && respCreateAccount.email) {

                                        var _gaq = _gaq || [];
                                        _gaq.push(['_trackPageview', '/user/create-account/submit']);

                                        $.ajax({
                                            url: 'ajax/sendVerificationEmail.php',
                                            type: "POST",
                                            data: {
                                                email: respCreateAccount.email,
                                                verificationcode: respCreateAccount.verificationcode
                                            },
                                            dataType: "JSON"
                                        }).done(function(respSendEmail) {
                                            console.log("respSendEmail.success = " + respSendEmail.success);
                                            console.log("respSendEmail.failureMsg = " + respSendEmail.failureMsg);
                                            if (respSendEmail.success) {
                                                $("#verify-account-dialog").dialog("open");
                                                var _gaq = _gaq || [];
                                                _gaq.push(['_trackPageview', '/user/create-account/verify/open']);
                                            } else {
                                                alert(respSendEmail.failureMsg);
                                                var _gaq = _gaq || [];
                                                _gaq.push(['_trackPageview', '/user/create-account/email-failed']);
                                            }
                                        })
                                                .fail(function() {
                                            console.log("POST failed!");
                                        });
                                    } else {
                                        var _gaq = _gaq || [];
                                        _gaq.push(['_trackPageview', '/user/create-account/submit-failed']);
                                        alert(respCreateAccount.failureMsg);
                                    }
                                })
                                        .fail(function() {
                                    console.log("POST failed!");
                                });
                                $(this).dialog("close");
                            }
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                            var _gaq = _gaq || [];
                            _gaq.push(['_trackPageview', '/user/create-account/cancel']);
                        }
                    },
                    close: function() {
                        allFields.val("").removeClass("ui-state-error");
                    }
                });

                $("#login-account-dialog").dialog({
                    autoOpen: false,
                    height: 275,
                    width: 300,
                    modal: true,
                    position: {my: "top", at: "top", of: $("#description")},
                    buttons: {
                        "Login": function() {
                            var bValid = true;
                            allFields.removeClass("ui-state-error");

                            bValid = bValid && checkLength(loginEmail, "email", 6, 80);
                            bValid = bValid && checkLength(loginPassword, "password", 5, 16);

                            // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                            bValid = bValid && checkRegexp(loginEmail, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com");
                            bValid = bValid && checkRegexp(loginPassword, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

                            if (bValid) {
                                $.ajax({
                                    url: 'ajax/loginAccount.php',
                                    type: "POST",
                                    data: {
                                        email: loginEmail.val(),
                                        password: loginPassword.val()
                                    },
                                    dataType: "JSON"
                                }).done(function(resp) {
                                    console.log("resp.success = " + resp.success);
                                    console.log("resp.username = " + resp.username);
                                    console.log("resp.email = " + resp.email);
                                    console.log("resp.failureMsg = " + resp.failureMsg);
                                    accountInfo.email = resp.email;
                                    accountInfo.account = resp.username;
                                    if (resp.success) {
                                        alert("Congratulations!  You are logged in with username: " + resp.username);
                                    } else {
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
                            $(this).dialog("close");
                        }
                    },
                    close: function() {
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

                            var _gaq = _gaq || [];
                            _gaq.push(['_trackPageview', '/user/create-account/verify/submit']);

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
                                console.log("resp.success = " + resp.success);
                                console.log("resp.failureMsg = " + resp.failureMsg);
                                if (resp.success) {
                                    alert("Congrats!  You have verified your account.");
                                    var _gaq = _gaq || [];
                                    _gaq.push(['_trackPageview', '/user/create-account/success']);
                                } else {
                                    alert("Bummer. " + resp.failureMsg);

                                    var _gaq = _gaq || [];
                                    _gaq.push(['_trackPageview', '/user/create-account/verify/failed']);

                                }
                            })
                                    .fail(function() {
                                console.log("POST failed!");
                            });
                            $(this).dialog("close");
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                            var _gaq = _gaq || [];
                            _gaq.push(['_trackPageview', '/user/create-account/verify/canceled']);
                        }
                    },
                    close: function() {
                        allFields.val("").removeClass("ui-state-error");
                    }
                });

                $("#create-account-menu-item")
                        .click(function() {
                    $("#create-account-dialog").dialog("open");
                    var _gaq = _gaq || [];
                    _gaq.push(['_trackPageview', '/user/create-account/open']);
                });

                $("#login-menu-item")
                        .click(function() {
                    $("#login-account-dialog").dialog("open");
                    _gaq.push(['_trackPageview', '/user/login/open']);                    
                });
            });
        </script>
    </body>
</html>