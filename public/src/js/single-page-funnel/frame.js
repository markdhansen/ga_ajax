(function(dbm, $) {
	var SingleFunnel = {
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
				userSubmit = false;

			modal.setTitle('Create New Account');
			modal.setContent(form);
			modal.setBtnText(dbm.Modal.BTN_PRIME, 'Create Account');
			modal.setBtnText(dbm.Modal.BTN_SECOND, 'Close');

			modal.on(dbm.Modal.SUCCESS, function() {
				dbm.removeWarning();
				var validator = new dbm.Validate({
					form: form,
					username: usernameValidate,
					email: 'email_val',
					password: passwordValidate,
					alert: true
				});

				if (validator.isValid()) {
					dbm.showProgress('Verifying');
					dbm.showCode("/user/signup/submit");
					_gaq.push(["_trackPageview", "/user/signup/submit"]);
					userSubmit = true;
					$.post('/single-page-funnel/signup', validator.data(), 'json')
					.done(function(res) {
						dbm.hideProgress();
						if (res && res.success) {

						} else if (res && res.error) {
							top.alert(res.error);
						}
					})
					.fail(dbm.errorHandler);
					modal.close();
				}
			});

			modal.on(dbm.Modal.CLOSE, function() {
				if (!userSubmit) {
					dbm.showCode("/user/signup/close");
					_gaq.push(["_trackPageview", "/user/signup/close"]);
				}
				userSubmit = false;
			});

			modal.on(dbm.Modal.HIDDEN, function() { this.destroy(); });

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
		showLoginModal: function() {
			var modal = new dbm.Modal(),
				form = this.createLoginForm(),
				userSubmit = false;


			modal.setTitle('Login');
			modal.setContent(form);
			modal.setBtnText(dbm.Modal.BTN_PRIME, 'Submit');
			modal.setBtnText(dbm.Modal.BTN_SECOND, 'Close');

			modal.on(dbm.Modal.SUCCESS, function() {
				dbm.removeWarning();
				var validator = new dbm.Validate({
					form: form,
					email: 'email_val',
					password: passwordValidate,
					alert: true
				});

				if (validator.isValid()) {
					dbm.showCode("/user/login/submit");
					_gaq.push(["_trackPageview", "/user/login/submit"]);
					userSubmit = true;
					modal.close();
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
		_gaq = top._gaq || window._gaq || [];
		SingleFunnel.init();
	});

})(window.Dbm, window.jQuery);