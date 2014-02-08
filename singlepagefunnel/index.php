<?php
$errorLog = ini_get('error_log');
$isMamp = false;
if (strpos($errorLog, 'MAMP') !== false) {
    $isMamp = true;
}
$home = ($isMamp ? "/gaexamples" : "/");
?>
<!DOCTYPE html>
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
        <link rel="stylesheet" type="text/css" media="all" href="./css/example.css" />

        <?php include_once("../analyticstracking.php") ?>
    </head>
    <body>
        <div class="topnav">
            <div class="row">
                <div class="col-md-4 col-sm-4">
                    <div class="logo">
                        <a href="<?php echo $home; ?>">GAExamples</a>
                    </div>
                </div>
                <div class="col-md-8 col-sm-8 right"> 
                </div>
            </div>
        </div>
        <div class="row purplebg">
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
                    <div class="col-md-12 run-ui lightbluebg" style="display:none">
                        <div class="navbar navbar-default navbar-static run-ui-navbar" role="navigation">
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
                                        <li id="create-account-menu-item"><a href="javascript:void(0)" data-toggle="modal" data-target="#create-account-dialog">Create account</a></li>
                                        <li id="login-menu-item"><a href="javascript:void(0)" data-toggle="modal" data-target="#login-account-dialog">Login</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="run-ui-container">
                            <a id="create-account-button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#create-account-dialog">Create account</a>
                        </div>
                    </div>
                    <div class="col-md-12 run-code" style="display:none">
                        <h3 class="code-header">Code window</h3>
                        <div class="panel-body-wrapper">
                            <div class="wide">
                                <pre id="code-window" class="scroller-area"></pre>
                            </div>
                        </div>                    
                    </div>

                </div>
                <hr />
            </div>
        </div>

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
        <div class="modal fade" id="login-account-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <div title="Login">
                            <p class="validateTips">All form fields are required.</p>
                            <form autocomplete="off">
                                <fieldset>
                                    <label for="email">Email</label>
                                    <input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all">
                                    <label for="password">Password</label>
                                    <input type="password" name="password" id="password" value="" class="text ui-widget-content ui-corner-all">
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="login-account-button" type="button" class="btn btn-primary">Create account</button>
                        <button id="close-login-account-button" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
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

        <!-- div that holds code that gets displayed in code window at runtime -->
        <div id="this-file" style="display:none;">
            <?php
            $file = file_get_contents('./js/runexample.js', FILE_USE_INCLUDE_PATH);
            $escapedFile = str_replace(">", "&gt;", str_replace("<", "&lt;", str_replace("&", "&amp;", $file)));
            $paddingSize = 200;
            $padding = "";
            for ($i = 1; $i <= $paddingSize; $i++) {
                $padding .= "\n";
            }
            echo $padding . $escapedFile . $padding;
            ?>
        </div>

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


            });
        </script>
    </body>
</html>