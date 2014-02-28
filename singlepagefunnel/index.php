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
        <link rel="stylesheet" type="text/css" media="all" href="../css/style.css" />
        <link rel="stylesheet" type="text/css" media="all" href="../css/dan.css" />
        <link rel="stylesheet" type="text/css" media="all" href="./css/example.css" />

		<?php include_once("../analyticstracking.php") ?>
    </head>
    <body>
		<nav class="navbar navbar-inverse topnav" role="navigation">
			<div class="logo">
				<a href="<?php echo $home; ?>">GAExamples</a>
			</div>
		</nav>	
		<div class="container">
			<div class="row">
				<div class="col-md-9 col-md-offset-1 col-sm-10 col-sm-offset-1">
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
						<div class="col-md-12 run-ui hidden">
							<iframe src="example.php" height="100%" width="100%"></iframe>
						</div>
						<div class="col-md-12 run-code hidden">
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
        <script src="../js/showcode.js"></script>
        <script src="../js/validation.js"></script>
        <script src="./js/runexample.js"></script>
    </body>
</html>