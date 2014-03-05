<?php

class SinglePageFunnelController extends BaseController {

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
			$user = DB::select("SELECT * FROM singlepagefunnel WHERE username = ? OR email = ?", 
						array($input['username'], $input['email']));
			if (!$user) {
				$code = GAExamples\Util::getRandomString(10);
				DB::insert("INSERT INTO singlepagefunnel (username, email, password, verificationcode) VALUES (?,?,?,?)",
						array($input['username'], $input['email'], sha1($input['password']), $code));
				
				//Send the verification code.
				Mail::send('emails.verification_code', array('code' => $code), function($message) use($input) {
					$message->to($input['email'])->subject('Verification code from GA Examples.');
				});
				
				$res['success'] = true;
			} else {
				if ($user[0]->username === $input['username']) {
					$res['error'] = 'The username "' . $input['username'] . '" is already taken';
				} else {
					$res['error'] = 'The email address "' . $input['email'] . '" is already taken';
				}
			}
		} else {
			$res['error'] = 'Invalid signup attempt';
		}
		$response = Response::make(json_encode($res));
		$response->header('Content-Type', 'application/json');
		return $res;
	}
	public function verifySignup() {
		$res = array('success'=> false);
		$input = Input::all();
		if (isset($input['username']) && isset($input['email']) && isset($input['verificationCode'])) {
			$rows = DB::update('UPDATE singlepagefunnel SET verified = 1 WHERE username = ? AND email = ? AND verificationcode = ?', 
					array($input['username'], $input['email'], $input['verificationCode']));
			$res['success'] = (bool) $rows;
			if (!$res['success']) {
				$res['error'] = 'Invalid verification code';
			}
		} else {
			$res['error'] = 'Invalid verification attempt';
		}
		$response = Response::make(json_encode($res));
		$response->header('Content-Type', 'application/json');
		return $res;
	}
	public function login() {
		$res = array('success'=> false);
		$input = Input::all();
		if ($this->validateLogin($input)) {
			$user = DB::select("SELECT username, verified from singlepagefunnel WHERE email = ? AND password = ?", 
					array($input['email'], sha1($input['password'])));
			if ($user) {
				if (!(bool)(int)$user[0]->verified) {
					$res['error'] = 'You did not verify your account yet. Please verify the account before trying to log in.';
				} else {
					$res['success'] = true;
					$res['username'] = $user[0]->username;
				}
			} else {
				$res['error'] = 'User doesn\'t exist. Make sure you typed your email and password correctly.';
			}
		} else {
			$res['error'] = 'Invalid login attempt';
		}
		$response = Response::make(json_encode($res));
		$response->header('Content-Type', 'application/json');
		return $res;
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