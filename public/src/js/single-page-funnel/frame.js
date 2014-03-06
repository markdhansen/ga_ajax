(function(dbm, $) {
	var SinglePageFunnel = {
		init: function() {
			this.dom = {
				signupBtn: document.getElementById('signup-btn'),
				loginBtn: document.getElementById('login-btn')
			};
			this.addListeners();
		},
		addListeners: function() {
			this.dom.signupBtn.addEventListener('click', this, false);
			this.dom.loginBtn.addEventListener('click', this, false);
		},
		removeListeners: function() {
			this.dom.signupBtn.removeEventListener('click', this, false);
			this.dom.loginBtn.removeEventListener('click', this, false);
		},
		handleEvent: function(e) {
			switch (e.currentTarget) {
				case this.dom.signupBtn:
					this.showSignupModal();
					break;
				case this.dom.loginBtn:
					this.showLoginModal();
					break;
			}
		},
		showSignupModal: function() {
			var modal = new dbm.Modal(),
				form = this.createSignupForm(),
				userSubmit = false,
				busy = false,
				self = this;


			modal.setTitle('Create New Account');
			modal.setContent(form);
			modal.setBtnText(dbm.Modal.BTN_PRIME, 'Create Account');
			modal.setBtnText(dbm.Modal.BTN_SECOND, 'Close');

			modal.on(dbm.Modal.SUCCESS, function() {
				if (busy) { return; }

				dbm.removeWarning();
				var validator = new dbm.Validate({
					form: form,
					username: usernameValidate,
					email: 'email_val',
					password: passwordValidate,
					alert: true
				}),
				data;

				if (validator.isValid()) {
					busy = true;
					dbm.showProgress('Verifying');
					dbm.showCode("/user/signup/submit");
					_gaq.push(["_trackPageview", "/user/signup/submit"]);
					data = validator.data();

					$.post('/single-page-funnel/signup', data, 'json')
					.done(function(res) {
						busy = false;
						dbm.hideProgress();
						if (res && res.success) {
							userSubmit = true;
							modal.off(dbm.Modal.HIDDEN);
							modal.on(dbm.Modal.HIDDEN, function() {
								self.showVerificationModal(data.username, data.email);
								this.destroy();
								self = modal = null;
							});
							modal.close();
							dbm.showCode("/user/signup/email-sent");
							_gaq.push(["_trackPageview", "/user/signup/email-sent"]);
						} else if (res && res.error) {
							top.alert(res.error);
							dbm.showCode("/user/signup/fail");
							_gaq.push(["_trackPageview", "/user/signup/fail"]);
						}
					})
					.fail(function(res) { busy = false; dbm.errorHandler(res); });
				}
			});

			modal.on(dbm.Modal.CLOSE, function() {
				if (!userSubmit) {
					dbm.showCode("/user/signup/close");
					_gaq.push(["_trackPageview", "/user/signup/close"]);
				}
				userSubmit = false;
			});

			modal.on(dbm.Modal.HIDDEN, function() {
				this.destroy();
				modal = self = null;
			});

			modal.open();

			dbm.showCode("/user/signup/open");
			_gaq.push(["_trackPageview", "/user/signup/open"]);
		},
		createSignupForm: function() {
			var form = document.createElement('form');
			form.innerHTML = '<div class="form-group"><label>Username</label>' +
					'<input type="text" name="username" class="form-control username" required="required" placeholder="Enter username" />' +
					'</div><div class="form-group"><label>Email</label>' +
					'<input class="form-control email" required="required" type="email" name="email" placeholder="Enter email" />' +
					'</div><div class="form-group"><label >Password</label>' +
					'<input class="form-control password" type="password" name="password" required="required" placeholder="Password" /></div>';
			return form;
		},
		showVerificationModal: function(username, email) {
			var modal = new dbm.Modal(),
				form = this.createVerificationForm(),
				userSubmit = false,
				busy = false,
				self = this;

			modal.setTitle('Verify Account');
			modal.setContent(form);
			modal.setBtnText(dbm.Modal.BTN_PRIME, 'Submit');
			modal.setBtnText(dbm.Modal.BTN_SECOND, 'Close');

			modal.on(dbm.Modal.SUCCESS, function() {
				if (busy) { return; }

				dbm.removeWarning();
				var validator = new dbm.Validate({
					form: form,
					verificationCode: 'isNotEmpty',
					alert: true
				}),
				data;

				if (validator.isValid()) {
					busy = true;
					dbm.showProgress('Verifying');
					dbm.showCode("/user/verify-signup/submit");
					_gaq.push(["_trackPageview", "/user/verify-signup/submit"]);
					data = validator.data();
					data.username = username;
					data.email = email;
					$.post('/single-page-funnel/signup/verify', data, 'json')
					.done(function(res) {
						busy = false;
						dbm.hideProgress();
						if (res && res.success) {
							userSubmit = true;
							modal.close();
							dbm.showCode("/user/verify-signup/success");
							_gaq.push(["_trackPageview", "/user/verify-signup/success"]);
						} else if (res && res.error) {
							top.alert(res.error);
							dbm.showCode("/user/verify-signup/fail");
							_gaq.push(["_trackPageview", "/user/verify-signup/fail"]);
						}
					})
					.fail(function(res) { busy = false; dbm.errorHandler(res); });
				}
			});

			modal.on(dbm.Modal.CLOSE, function() {
				if (!userSubmit) {
					dbm.showCode("/user/verify-signup/close");
					_gaq.push(["_trackPageview", "/user/verify-signup/close"]);
				}
				userSubmit = false;
			});

			modal.on(dbm.Modal.HIDDEN, function() {
				this.destroy();
				modal = self = null;
			});

			modal.open();

			dbm.showCode("/user/verify-signup/open");
			_gaq.push(["_trackPageview", "/user/verify-signup/open"]);
		},
		createVerificationForm: function() {
			var form = document.createElement('form');
			form.innerHTML = '<div class="form-group"><label>Verification Code</label>' +
					'<input type="text" name="verificationCode" class="form-control verification" required="required" placeholder="Enter your verification code" />' +
					'</div>';
			return form;
		},
		showLoginModal: function() {
			var modal = new dbm.Modal(),
				form = this.createLoginForm(),
				userSubmit = false,
				busy = false;


			modal.setTitle('Login');
			modal.setContent(form);
			modal.setBtnText(dbm.Modal.BTN_PRIME, 'Submit');
			modal.setBtnText(dbm.Modal.BTN_SECOND, 'Close');

			modal.on(dbm.Modal.SUCCESS, function() {
				if (busy) { return; }

				dbm.removeWarning();
				var validator = new dbm.Validate({
					form: form,
					email: 'email_val',
					password: passwordValidate,
					alert: true
				}),
				data;

				if (validator.isValid()) {
					busy = true;
					dbm.showCode("/user/login/submit");
					dbm.showProgress('Verifying');
					_gaq.push(["_trackPageview", "/user/login/submit"]);
					data = validator.data();

					$.post('/single-page-funnel/login', data, 'json')
					.done(function(res) {
						busy = false;
						dbm.hideProgress();
						if (res && res.success) {
							userSubmit = true;
							modal.close();
							dbm.showCode("/user/login/success");
							_gaq.push(["_trackPageview", "/user/login/success"]);
							alert("Congratulations!  You are logged in with username: " + res.username);
						} else if (res && res.error) {
							top.alert(res.error);
							dbm.showCode("/user/login/fail");
							_gaq.push(["_trackPageview", "/user/login/fail"]);
						}
					})
					.fail(function(res) { busy = false; dbm.errorHandler(res); });
				}
			});

			modal.on(dbm.Modal.CLOSE, function() {
				if (!userSubmit) {
					dbm.showCode("/user/login/close");
					_gaq.push(["_trackPageview", "/user/login/close"]);
				}
				userSubmit = false;
			});

			modal.on(dbm.Modal.HIDDEN, function() { this.destroy(); });

			modal.open();

			dbm.showCode("/user/login/open");
			_gaq.push(["_trackPageview", "/user/login/open"]);
		},
		createLoginForm: function() {
			var form = document.createElement('form');
			form.innerHTML = '<div class="form-group"><label>Email</label>' +
					'<input class="form-control email" required="required" type="email" name="email" placeholder="Enter email" />' +
					'</div><div class="form-group"><label >Password</label>' +
					'<input class="form-control password" type="password" name="password" required="required" placeholder="Password" /></div>';
			return form;
		}
	},
	usernameValidate = function(val) {
		var username = val.trim();
		if (username.length > 3 && username.length < 16 && /^[a-z](?:[0-9a-z_])+$/i.test(username)) {
			return true;
		} else {
			return "Username must begin with a letter and may consist of 3-16 letters, numbers or underscores";
		}
	},
	passwordValidate = function(val) {
		var pwd = val.trim();
		if (pwd.length > 5 && pwd.length < 16 && /^[0-9a-z]+$/i.test(pwd)) {
			return true;
		} else {
			return "Password may consist of 5-16 letters or numbers";
		}
	},
	top,
	_gaq;

	$(document).ready(function() {
		top = window.parent;
		_gaq = top._gaq;
		SinglePageFunnel.init();
	});

})(window.Dbm, window.jQuery);