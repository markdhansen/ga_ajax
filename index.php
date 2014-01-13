<html>
    <head> 
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    </head> 
    <body> 
        <p><a href="#" id="admin-link">login</a></p>
        <form id="admin_login" method="post" action="loginproc.php" id="admin_login">
            <fieldset>
                <label for="name">Username</label>
                <input type="text" name="user" id="name" class="text ui-widget-content ui-corner-all" />
                <label for="password">Password</label>
                <input type="password" name="pass" id="password" value="" class="text ui-widget-content ui-corner-all" />
            </fieldset>
        </form>
        <div id="myelement"> Some text... </div> 
        <?php
        echo "Hello World!";
        ?>
        <p>
            <button id="buttonpressme">Press Me</button>
        </p>
        <script>
            $("#buttonpressme").click(function() {
                alert("Pressed!");
            });
            $(function() {
                var name = $("#name"),
                        password = $("#password"),
                        allFields = $([]).add(name).add(password),
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

                $("#login-form").dialog({
                    autoOpen: false,
                    /*      height: 300, */
                    width: 450,
                    show: {
                        effect: "explode",
                        duration: 1000
                    },
                    hide: {
                        effect: "explode",
                        duration: 1000
                    },
                    modal: true,
                    buttons: {
                        "Login": function() {
                            var bValid = true;
                            allFields.removeClass("ui-state-error");

                            bValid = bValid && checkLength(name, "username", 3, 16);
                            bValid = bValid && checkLength(password, "password", 5, 32);
                            bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter.");
                            bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z_])+$/, "Password field only allow : a-z 0-9");

//                            if (bValid) {
//                                $("#admin_login").submit();
//                                $(this).dialog("close");
//                            }

                            if (bValid) {
                                var data = $('#admin_login').serialize();
                                $.ajax({
                                    url: "loginproc.php",
                                    type: "post",
                                    data: data,
                                    dataType: "json",
                                    success: function(data) {
                                        window.location = "admin.php";
                                    },
                                    error: function(data) {
                                        alert('invalid');
                                    }
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

                // Link to open the dialog
                $("#admin-link").click(function(event) {
                    $("#login-form").dialog("open");
                    event.preventDefault();
                });

            });
        </script>
    </body>
</html>
