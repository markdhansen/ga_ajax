<?php

class SinglePageFunnelController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	protected $layout = 'layouts.master';
	protected $usernameValidation = array('min:3', 'max:16', 'regex:/^[a-z](?:[0-9a-z_])+$/i');
	protected $passwordValidation = array('min:5', 'max:16', 'regex:/^[0-9a-z]+$/i');

	public function index() {
		$this->layout->content = View::make('single-page-funnel.index');
	}
	public function frame() {
		$this->layout->content = View::make('single-page-funnel.frame');
	}
	public function signup() {
		$res = array('success'=> false);
		$input = Input::all();
		if ($this->validateSignup($input)) {
			$user = DB::select("SELECT * FROM singlepagefunnel WHERE username = ? OR email = ?", array($input['username'], $input['email']));
			if (!sizeof($user)) {
				$code = GAExamples\Util::getRandomString(10);
				DB::insert("INSERT INTO singlepagefunnel (username, email, password, verificationcode) VALUES (?,?,?,?)",
						array($input['username'], $input['email'], sha1($input['password']), $code));
				$res['success'] = true;
			} else {
				if ($user[0]->username === $input['username']) {
					$res['error'] = 'The username "' . $input['username'] . '" is already taken';
				} else {
					$res['error'] = 'The email address "' . $input['email'] . '" is already taken';
				}
			}
		}

		return Response::make(json_encode($res));
	}
	public function login() {

	}
	private function validateSignup($input) {
		if (isset($input['username']) && isset($input['email']) && isset($input['password'])) {
			return Validator::make($input, array('email'=> 'email', 'username'=> $this->usernameValidation, 'password'=> $this->passwordValidation))
						->passes();
		}
		return false;
	}
	private function validateLogin($input) {
		if (isset($input['email']) && isset($input['password'])) {
			return Validator::make($input, array('email'=> 'email', 'password'=> $this->passwordValidation))->passes();
		}
		return false;
	}
}