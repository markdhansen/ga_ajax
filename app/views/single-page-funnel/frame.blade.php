@extends('layouts.frame')
@section('title')
Single Page Funnel
@stop
@section('stylesheet')
	@parent
	<link href='/src/css/single-page-funnel-frame.css' rel='stylesheet' media="all" />
@stop
@section('scripts')
	@parent
	<script src='/src/js/modules/Dbm.js'></script>
	<script src='/src/js/modules/Validate.js'></script>
	<script src='/src/js/modules/Modal.js'></script>
	<script src='/src/js/modules/showCode.js'></script>
	<script src='/src/js/validation.js'></script>
	<script src='/src/js/runexample.js'></script>
	<script src='/src/js/single-page-funnel/frame.js'></script>
@stop
@section('navbar')
<div class="navbar navbar-default navbar-static run-ui-navbar" role="navigation">
	<div class="container-fluid">
		<div class="col-xs-12 col-sm-6">
			<a class="navbar-brand" href="javascript:void(0)">Single Page Funnel</a>
		</div>
		<div class="col-xs-12 col-sm-6">
			<ul class="nav nav-pills navbar-right">
				<li id="signup-btn"><button type="button" class="btn btn-default navbar-btn">Sign Up</button></li>
				<li id="login-btn"><button type="button" class="btn btn-default navbar-btn">Login</button></li>
			</ul>
		</div>
	</div>
</div>
@stop
@section('content')
<!-- div that holds the code that gets displayed in code window at runtime -->
<div id="this-file" class="hidden">
	{{{preg_replace("/\t/m", "    ", file_get_contents(realpath('src/js/single-page-funnel/frame.js')))}}}
</div>
@stop