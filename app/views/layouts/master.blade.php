<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
		<title>@yield('title', 'Google Analytics Examples')</title>
        @section('meta')
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
		@show
        @section('stylesheet')
		<link rel="stylesheet" type="text/css" media="all" href="/lib/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" media="all" href="/lib/css/font-awesome.css" />
		<link rel="stylesheet" type="text/css" media="all" href="/src/css/style.css" />
		@show
		@section('ga_tracking')
		<script type = "text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-47459006-1']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script');
				ga.type = 'text/javascript';
				ga.async = true;
				ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ga, s);
			})();
		</script>
		@show
    </head>
    <body>
		@section('navbar')
		<nav class="navbar navbar-inverse topnav" role="navigation">
			<div class="logo">
				<a href="/">GAExamples</a>
			</div>
		</nav>
		<div id="hidden-cookies" class="hidden"><pre><?php print_r($_COOKIE); ?></pre></div>
		@show		
        @yield('content', "<div class='container'></div>")
        @section('scripts')
		<script src="/lib/js/jquery-2.0.3.js"></script>
		<script src="/lib/js/modernizr.js"></script>
		<script src="/lib/js/bootstrap.js"></script>
		@show
    </body>
</html>
