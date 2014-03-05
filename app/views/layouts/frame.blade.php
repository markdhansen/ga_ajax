@extends('layouts.master')
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
		<title>@yield('title')</title>
        @yield('meta')
		@section('stylesheet')
			@parent
			<link rel="stylesheet" type="text/css" media="all" href="/src/css/frame.css" />
		@show
    </head>
    <body>     
        @yield('content')
        @yield('scripts')
    </body>
</html>
