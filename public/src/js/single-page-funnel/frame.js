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
				form = this.createSignupForm();
			
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
					dbm.showCode("_user_create_account_submit");
					_gaq.push(["_trackPageview", "/user/create-account/submit"]);
					modal.close();
				}
			});
			modal.on(dbm.Modal.HIDDEN, function() {
				this.destroy();
			});
			
			modal.open();
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
				form = this.createSignupForm();
				
			
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
					dbm.showCode("_user_login_submit");
					_gaq.push(["_trackPageview", "/user/login/submit"]);
					modal.close();
				}
			});
			modal.on(dbm.Modal.HIDDEN, function() {
				this.destroy();
			});
			
			modal.open();
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
	};
	
	$(document).ready(function() { SingleFunnel.init(); });
	
})(window.Dbm, window.jQuery);