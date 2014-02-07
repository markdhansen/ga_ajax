<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Google Analytics examples">
        <meta name="author" content="markdhansen@gmail.com">
        <link rel="shortcut icon" href="docs-assets/ico/favicon.png">

        <title>Google Analytics Examples</title>

        <!-- CSS -->
        <link rel="stylesheet" type="text/css" media="all" href="css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" media="all" href="css/font-awesome.css" />
        <link rel="stylesheet" type="text/css" media="all" href="css/bootstrap-tour.css" />
        <link rel="stylesheet" type="text/css" media="all" href="css/style.css" />
        <link rel="stylesheet" type="text/css" media="all" href="css/dan.css" />

        <?php include_once("analyticstracking.php") ?>
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
                    </div>
                </div>
                <div class="col-md-8 col-sm-8 right"> 
                    <div class="loginbox">
                        <a href="#" class="btn btn-inverse">Signup</a>
                        <a href="#" class="btn btn-inverse">Login</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="row purplebg listings">
            <div class="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">

                <form class="form-horizontal" role="form">
                    <div class="form-group has-success has-feedback">
                        <div class="col-sm-12">
                            <input type="text" class="form-control" id="inputSuccess3"  placeholder="Filter. e.g. Page funnel"/>
                            <i class="fa fa-info orange"></i> 
                        </div>
                    </div>
                </form>

                <hr />

                <div class="center">
                    <h3>Most Popular</h3>
                    <div class="results">65 of 212 results</div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <button type="button" class="btn btn-default  btn-block" data-toggle="collapse" data-target="#1">
                            <div class="help-icons outbound-links"></div>

                            <h4>Outbound links</h4>
                        </button>

                        <div id="1" class="collapse desc">
                            <h4>Outbound links</h4>
                            This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process. 

                            <hr />
                            <a href="funnel.html" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" alt="Favorited"><i class="fa fa-star orange"></i></a>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <button type="button" class="btn btn-default  btn-block" data-toggle="collapse" data-target="#2">
                            <div class="help-icons single-funnel"></div>

                            <h4>Single page funnel</h4>
                        </button>

                        <div id="2" class="collapse desc">
                            <h4>Single page funnel</h4>
                            This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process. 

                            <hr />
                            <a href="./singlepagefunnel" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" alt="Favorited"><i class="fa fa-star orange"></i></a>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <button type="button" class="btn btn-default  btn-block" data-toggle="collapse" data-target="#3">
                            <div class="help-icons outbound-links"></div>

                            <h4>Single page funnel</h4>
                        </button>

                        <div id="3" class="collapse desc">
                            <h4>Single page funnel</h4>
                            This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process. 

                            <hr />
                            <a href="funnel.html" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>
                        </div>
                    </div>

                </div>

                <!-----end row----->


                <div class="row">
                    <div class="col-md-4">
                        <button type="button" class="btn btn-default  btn-block" data-toggle="collapse" data-target="#1">
                            <div class="help-icons outbound-links"></div>

                            <h4>Single page funnel</h4>
                        </button>

                        <div id="1" class="collapse desc">
                            <h4>Single page funnel</h4>
                            This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process. 

                            <hr />
                            <a href="#" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" alt="Favorited"><i class="fa fa-star orange"></i></a>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <button type="button" class="btn btn-default  btn-block" data-toggle="collapse" data-target="#2">
                            <div class="help-icons outbound-links"></div>

                            <h4>Single page funnel</h4>
                        </button>

                        <div id="2" class="collapse desc">
                            <h4>Single page funnel</h4>
                            This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process. 

                            <hr />
                            <a href="#" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" alt="Favorited"><i class="fa fa-star orange"></i></a>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <button type="button" class="btn btn-default  btn-block" data-toggle="collapse" data-target="#3">
                            <div class="help-icons outbound-links"></div>

                            <h4>Single page funnel</h4>
                        </button>

                        <div id="3" class="collapse desc">
                            <h4>Single page funnel</h4>
                            This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process. 

                            <hr />
                            <a href="#" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>
                        </div>
                    </div>

                </div>

                <!-----end row----->


                <hr />




                <a href="#" class="btn btn-default btn-block">Load more <i class="fa fa-caret-down"></i></a>



            </div>
        </div>

        <script src="//code.jquery.com/jquery-1.9.1.js"></script>
        <script src="js/bootstrap.js"></script>
    </body>
</html>