

/*********************************/
/** ALL PURPOSE FORM VALIDATOR  **/
/*********************************/

/**
 * Dependencies: 
 * Dbm
 * jQuery
 * 
 * 
 * @param {type} dbm
 * @param {type} $
 * @returns {_L10.Validate}
 */
(function(dbm, $) {
	var _processConfig;

	/**
	 * All purpose form validator.
	 *
	 * @constructor Dbm.Validate
	 * @alias Dbm.Validate
	 * @param {object} config
	 * @returns {Validate}
	 */
	function Validate(config) {
		if (!(this instanceof Validate)) return new Validate(config); //Make sure Validate was called with 'new'.

		dbm.createStorage(this);
		this.errors = [];

		this.ignoreDisabled = true;
		if (config) {
			this.config = config;
			this.run(config); 
		}
	}

	//Gets the data from the config object passed by the user.
	_processConfig = function(config) {
		var name = document.body.nodeName ? 'nodeName' : 'tagName',
			form,
			ignore,
			fields;

	//Find the form. Can be a DOM element or jQuery object.

		form = config.form && config.form[name] === 'FORM' ? config.form : (config.form instanceof $ ? config.form[0]: null);

		if (!form) throw Error('Could not locate form. form: ' + config.form);

		this.form = form;
		this.alert = config.alert;
		this.ignoreDisabled = ignore = config.ignoreDisabled === false ? false : true;
		try {
			fields = Array.prototype.slice.call(form.elements);
			if (ignore) fields = fields.filter(function(el) { return !(el.disabled || el.getAttribute('disbaled')); } );
		} catch(e) {
			fields = (function() {
				var ret = [], elems = form.elements, i = -1, len = elems.length, el;
				if (ignore) { //Skip fields that are disabled.
					while (++i < len) {
						el = elems[i];
						if (el.disabled || el.getAttribute('disbaled')) continue;
						ret.push(el);
					}
				} else while (++i < len) ret[i] = elems[i];

				return ret;
			})();
		}
		this.fields = fields;
		this._config = config;
	};

	Validate.VERSION = 'b1.2';
	Validate.MODIFIED = '2013-03-20';

	Validate.prototype = (function() {
		var process = function() {
			var elements = this.fields,
			ret = {},
			self = this;

			elements.forEach(function(field) {
				var name = field.name,
					value;
				if (name == undefined || name.trim() === '') return;

				switch (field.type) {
					case 'radio':
						if (field.checked) value = field.value;
						break;
					case 'checkbox':
						value = field.getAttribute('value');
						if (field.checked) {
							if (!value || value === 'on') value = true;
						} else {
							if (!value || value === 'on') value = false;
							else value = undefined;
						}
						break;
					case 'select-one':
						value = field.value;
						break;
					case 'select-multiple':
						value = (function() {
							var selected = self.selected(field),
							ret = [], i = -1, len = selected.length;
							while (++i < len) ret[i] = selected[i].value;
							return ret;
						})();
						break;
					default:
						value = field.value;
						break;
				}
				if (typeof value !== 'undefined') {
					if (ret[name]) { ret[name] = [].concat(ret[name], value); }
					else {
						ret[name] = value;
//						if (field.getAttribute('data-asArray') === 'true') ret[name] = [value];
//						else ret[name] = value;
					}
				}
			}, this);
			return ret;
		},

		dispatch = function(field, fn) {
			var toMatch, valid;

			//If already didn't validate, we don't need to check again.
			if (this.errors.indexOf(field) !== -1) return;

			//Run through the fn arguments and dispatch the appropriate validation function.
			//Possible options:
			//1) Name of a Validate method.
			//2) Array of  Validate methods or custom functions which return true or false.
			//3) Custom function that returns true or false.
			//4) Name of another field that must match the current field. Usually for confirming passwords.


			//A name of a method.
			if (this[fn] && typeof this[fn] === 'function') {
				valid = this[fn](field.value, field);

			//An array of method names or custom functions.
			} else if ($.isArray(fn)) {
				return fn.forEach(function(func) {
					if (this.errors.indexOf(field) !== -1) return;

					valid = (this[func] && typeof this[func] === 'function') ?
						this[func](field.value, field) : func.call(this, field.value, field);

					if (!valid || this.alert === true && typeof valid === 'string')  {
						this.errors.push(field);
						if (this.alert === true && typeof valid === 'string') {
							dbm.setWarning(valid, field);
						}
					}  else if (this.alert === true) {
						dbm.removeWarning(field);
					}
				}, this);

			//A custom function
			} else if (typeof fn === 'function') {
				valid = fn.call(this, field.value, field);

			//A name of another filed which needs to match
			} else if ((toMatch = filter.call(this, '[name="' + fn + '"]')[0])) {
				valid = this.equals(field.value, toMatch.value);
				if (!valid) { return this.errors.push(field, toMatch); }
			} else {
				throw new TypeError('Could not determine argument ' + fn + ' for field ' + field.name + ' ' + field);
			}

			if (!valid || this.alert === true && typeof valid === 'string')  {
				this.errors.push(field);
				if (this.alert === true && typeof valid === 'string') {
					dbm.setWarning(valid, field);
				}
			} else if (this.alert === true) {
				dbm.removeWarning(field);
			}
		},

		filter = function(test) {
			var ret = [], fields = this.fields, i = -1, len = fields.length, name, val;
			test = test.replace(/^\[|\]$|"/g, '').split('=');
			name = test[0];
			val = test[1];
			while (++i < len) {
				if (fields[i][name] === val) ret.push(fields[i]);
			}
			return ret;
		};

		return {
			constructor: Validate,

			run : function(config) {
				var name,
					fields;
				
				config = config || this.config;
				if (!config || typeof config !== 'object') {
					throw TypeError().message = 'Unknown parameter to Validate.prototype.run. Expected a configuration Object, instead got: ' + config + '(typeof: ' + typeof config + ')';
				}
				this.config = config;
				this.errors = [];
				this.removeData();
				_processConfig.call(this, config);
				this.data(process.call(this));

				for (name in config) {
					if (config.hasOwnProperty(name)) {
						fields = filter.call(this, '[name="' + name + '"]');
						if (fields.length === 0) { continue; }
						if (config[name] === 'isChecked') {
							this.isChecked(fields);
						} else {
							fields.forEach(function(elem) {dispatch.call(this, elem, config[name]);}, this);
						}
					}
				}
			},
			filter: filter,
			isValid: function() {return this.errors.length === 0;},

			equals: function(a, b) {
				return a !== null && a !== undefined && a === b;
			},

			isEmail: function(email) {
				return (/^[\w\-\.]+@(([a-z]+[\w\-]*\.([a-z]+[\w\-]*\.)+[a-z]{2,4})|([a-z]+[\w\-]*\.[a-z]{2,4}))$/i).test(email);
			},

			isURL: function(url) {
				if (!url || typeof url !== 'string') return false;
				var http_reg = /^(?:https?:\/\/)|(?:www\.)/,
					parts = url.split('.');

				return http_reg.test(url) && parts.length > 1 && parts[parts.length-1].length > 1;
			},

			isAlNum: function(str) {
				return this.isNotEmpty(str) && (/^[a-z0-9\s]+$/i).test(str);
			},

			isEmpty: function(str) {
				return (typeof str !== 'undefined') && (str !== null) && (str.toString().trim() === '');
			},

			isNotEmpty: function(str) {
				return !this.isEmpty(str);
			},

			isNotNull: function(str) {
				return (str !== null) && (str !== 'null');
			},

			isPassword: function(str) {
				return this.isNotEmpty(str) && !(/\s+/).test(str);
			},

			isPrice: function(amount) {
				return /(^[\d]+$)|(^[\d]*\.[\d]{2}$)/.test(amount);
			},

			isNum: function(n) {
				return !isNaN(n) && this.isNotEmpty(n);
			},

			isDate: function(date) {return dbm.date.isValid(date); },

			isChecked: function(fields) {
				var ret = this.checked(fields);
				if (!ret) return this.errors.push(fields[0]);
			},

			isFile: function(name, field) {
				return field.files && field.files.length > 0;
			},

			isImage: function(name, field) {
				var i,
					len,
					type;

				if (!field || !field.files || !field.files.length) return false;

				for (i = 0, len = field.files.length; i < len; i++) {
					type = field.files[i].type;
					if (/\/png|\/jpg|\/jpeg|\/gif/i.test(type)) continue;
					else return false;
				}
				return true;
			},

			fileSizeLessThan: function(field, max) {
				if (!field.files || !field.files.length) return false;
				var sizes = [];
				for (var i = 0, len = field.files.length; i < len; i++) sizes[i] = field.files[i].size;
				return this.inRange(sizes, [-Infinity, max]);
			},

			fileSizeGreaterThan: function(field, min) {
				if (!field.files || !field.files.length) return false;
				var sizes = [];
				for (var i = 0, len = field.files.length; i < len; i++) sizes[i] = field.files[i].size;
				return this.inRange(sizes, [min, Infinity]);
			},

			inRange: dbm.inRange,

			selected: function(select) {
				if (select.selectedIndex === -1) return false;

				var options = select.getElementsByTagName('option'),
					ret = [],
					opt;

				if (select.type !== 'select-multiple') return options[select.selectedIndex];

				for (var i = 0, len = options.length; i < len; i++) {
					opt = options[i];
					if (opt.selected) ret.push(opt);
				}
				return ret;
			},

			checked: function(elems) {
				var ret = [],
					el;
				for (var i = 0, len = elems.length; i < len; i++) {
					el = elems[i];
					if (el.checked) ret.push(el);
				}
				return ret.length > 1 ? ret : ret[0];
			},
			email_val: function(val, field) {
				if (!this.isEmail(val)) {
					return this.alert ? 'Invalid email' : false;
				}
				return true;
			},
			url_val: function(val, field) {
				if (!this.isURL(val)) {
					return this.alert ? 'Invalid URL' : false;
				}
				return true;
			},
			msg_val: function(val, field) {
				return this.name_val(val, field);
			},
			name_val: function(val, field) {
				var msg = '';
				if (!this.isEmpty(val)) { return true;}

				if (this.alert === true) {
					switch (field.name) {
						case 'name':
							msg = 'Enter a name';
							break;
						case 'fname':
						case 'firstName':
							msg = 'Enter a first name';
							break;
						case 'lname':
						case 'lastName':
							msg = 'Enter a last name';
							break;
						case 'companyName':
							msg = 'Enter a company name';
							break;
						case 'clientName':
						case 'accountName':
							msg = 'Enter an account name';
							break;
						case 'label':
							msg = 'Enter a label';
							break;
						case 'message':
							msg = 'Enter a message';
							break;
						default:
							msg = false;
							break;
					}
				} else {
					msg = false;
				}
				return msg;
			},
			image_val: function(val, field) {
				if (this.isFile(val, field)) {
					if (!this.isImage(val, field)) {
						return this.alert === true ? 'Allowed formats: JPG, JPEG, PNG or GIF.' : false;
					}// else if (!this.fileSizeLessThan(field, 300000)) {
						//return this.alert === true ? 'Maximum file size: 300kb' : false;
					//}
				}
				return true;
			},
			cc_val: function(val, field) {
				var valid = window.Stripe ? window.Stripe.validateCardNumber(val): this.isNum(val);
				if (!valid) {
					return this.alert === true ? 'Invalid card number':false;
				}
				return true;
			},
			cc_exp_val: function(val, field) {
				var valid = this.isNotEmpty(val) && String(val).length === 5 && /[0-1]\d\/\d{2}/.test(val);
				if (!valid) {
					return this.alert === true ? 'Invalid expiration date':false;
				}
				return true;
			},
			cc_cvc_val: function(val, field) {
				var valid = this.isNum(val) && String(val).length <= 4;
				if (!valid) {
					return this.alert === true ? 'Invalid CVC number':false;
				}
				return true;
			}
		};

	})();

dbm.Validate = Validate;

})(window.Dbm, window.jQuery);
