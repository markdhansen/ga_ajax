<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

//Route::get('/', function()
//{
//	return View::make('hello');
//});
Route::get('/', 'HomeController@index');
Route::get('/single-page-funnel', 'SinglePageFunnelController@index');
Route::get('/single-page-funnel/frame', 'SinglePageFunnelController@frame');
Route::post('/single-page-funnel/signup', 'SinglePageFunnelController@signup');
Route::post('/single-page-funnel/login', 'SinglePageFunnelController@login');