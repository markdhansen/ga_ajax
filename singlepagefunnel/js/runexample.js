$(function() {

    /* Code the runs the example */
    var username = $("#username"),
            email = $("#email"),
            password = $("#password"),
            loginEmail = $("#login-email"),
            loginPassword = $("#login-password"),
            allFields = $([]).add(email).add(password).add(username).add(loginEmail).add(loginPassword);

    var accountInfo = {};

    /* Create Account */
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

    /* Run the login funnel */
    $("#login-account-dialog").click(function() {

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
    });


    $("#close-login-account-button").click(function() {
        showCode("_user_login_close");
        _gaq.push(["_trackPageview", "/user/login/close"]);
    });

    $("#login-account-dialog").on("hidden.bs.modal", function() {
        allFields.val("").removeClass("ui-state-error");
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

    /* Toggle visibilities when run example */
    $("#run-example-button").click(function() {
        $("#example").toggle();
        $(".run-ui").toggle();
        $(".run-code").toggle();
        var topOfExample = $(".run-ui").position().top;
        $("body").animate({scrollTop: topOfExample}, 500);
    });


});



