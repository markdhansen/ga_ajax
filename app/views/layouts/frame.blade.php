@extends('layouts.master')
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
		<title>@yield('title')</title>
        @yield('meta')
		@section('stylesheet')
        <link rel="stylesheet" type="text/css" media="all" href="/lib/css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" media="all" href="/lib/css/font-awesome.css" />
        <link rel="stylesheet" type="text/css" media="all" href="/src/css/frame.css" />
		@show
		@yield('ga_tracking')
    </head>
    <body>     
        @yield('content')
        @yield('scripts')
    </body>
</html>
