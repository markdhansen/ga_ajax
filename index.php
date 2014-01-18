<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Google Analytics examples">
        <meta name="author" content="markdhansen@gmail.com">
        <link rel="shortcut icon" href="docs-assets/ico/favicon.png">

        <title>Google Analytics Examples</title>

        <!-- Bootstrap core CSS -->
        <link href="css/bootstrap.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="css/navbar-fixed-top.css" rel="stylesheet">

        <!-- Just for debugging purposes. Don't actually copy this line! -->
        <!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">

        <style>
            body { font-family: "Trebuchet MS", "Helvetica", "Arial",  "Verdana", "sans-serif"; }
            label, input { display:block; }
            input.text { margin-bottom:12px; width:95%; padding: .4em; }
            fieldset { padding:0; border:0; margin-top:25px; }
            h1 { font-size: 1.2em; margin: .6em 0; }
            #examples p { font-size: 62.5% }
            a:link {color:#0000FF;}      /* unvisited link */
            a:visited {color:#0000FF;}      /* visited link */            
            a:hover {color:#009900;}  /* mouse over link */
        </style>

    </head>
    <body>

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
                    <a class="navbar-brand" href="/gaexamples">GA Examples</a>
                </div>
            </div>
        </div>

        <div class="container">

            <!-- Main component for a primary marketing message or call to action -->
            <div class="jumbotron">
                <div id="examples">
                    <h3>Single page funnel</h3>
                    <div>
                        <p>This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks
                            conversion success for a multi-step account creation process. <a href="./singlepagefunnel">Open example</a>.</p>
                    </div>
                    <h3>Outbound links</h3>
                    <div>
                        <p>Incomplete</p>
                    </div>
                    <h3>Subdomain tracking</h3>
                    <div>
                        <p>Incomplete</p>
                    </div>
                </div>

            </div> <!-- /container -->

            <!-- Bootstrap core JavaScript
            ================================================== -->
            <!-- Placed at the end of the document so the pages load faster -->
    <!--        <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>-->
            <script src="//code.jquery.com/jquery-1.9.1.js"></script>
            <script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
            <script src="js/bootstrap.js"></script>
            <script>
                $(function() {
                    $("#examples").accordion({
                        heightStyle: "content",
                        collapsible: true,
                        active: false
                    });
                });
            </script>
    </body>
</html>