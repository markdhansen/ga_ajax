/**
 *
 * @author Yaron Elyashiv
 *
 *
*/


/**
 * Namespace provided by the browser.
 * @external window
 */

/**
 * @param {jQuery} $ The jQuery library
 * @param {jQuery} d3 The d3 library
 * @param {jQuery} Mod The Modernizr library
 */
(function($, d3, Mod) {
	var Dbm,
		progressTimer,
		contains,
		charBank,
		isTouch,
		isMobile,
		preloadImages;

	charBank = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];

	/**
	* Emulate Node.contanins. Checks if a element contains another element.
	* @name Dbm.contains
	* @param el {HTMLElement} The needle.
	* @param container {HTMLElement} The haystack.
	* @memberOf Dbm
	*/
	contains = (function() {
		function manualContains(el, container) {
			var parent, child = el;
			if (el && container && el.nodeType && container.nodeType) {
				while (parent) {
					if (container === parent) { return true; }
					child = parent;
					parent = child.parentNode;
				}
			}
			return false;
		}

		if (typeof document.createElement('div').contains === 'function') {
			return function contains(el, container) {
				return container.contains ? container.contains(el) : manualContains(el, container);
			};
		} else {
			return manualContains;
		}
	})();

	/**
	 * Determines whether the device supports touch events.
	 *
	 * @name Dbm.isTouch
	 * @type Boolean
	 * @memberOf Dbm
	 */
	isTouch = (function() {
		try {
			var e = document.createEvent('TouchEvent');

			return Boolean(e);
		} catch(e) {
			return false;
		}
	})();
	
	isMobile = isTouch && window.screen.availWidth <= 1024;

	/**
	 * Returns a '@2x' suffix if the devicePixelRatio is higher than 1.
	 *
	 * @returns {String}
	 * @memberOf namePath Dbm
	 */
	function getImgSuffix() {
		if (typeof window.devicePixelRatio !== 'undefined' && window.devicePixelRatio > 1) {
			return '@2x';
		}
		return '';
	}

	preloadImages = ['/images/spinner-white.gif', '/images/spinner-black.gif'];


/**
 * The Dbm object is available for all scripts and holds all the widgets.
 *
 * @type {Object}
 * @namespace
 * @static
 * @name Dbm
 * @global
 */
window.Dbm = Dbm = {
	/**
	 * Widget types
	 *
	 * @static
	 * @memberof Dbm
	 * @property {string} WIDGET Stands for a widget.
	 * @property {string} COMBO_WIDGET Stands for a combo widget.
	 * @property {string} LINE_CHART Stands for a line chart.
	 * @property {string} AREA_CHART Stands for an area chart.
	 * @property {string} BAR_CHART Stands for a bar chart.
	 * @property {string} MAP Stands for a map.
	 * @property {string} TABLE_VIEW Stands for a table view widget.
	 * @property {string} TABLE_GRAPH Stands for a table graph widget.
	 * @property {string} MULTI_CHART Stands for a multi chart.
	 * @property {string} PIE_CHART Stands for a pie chart.
	 * @property {string} AVG_COMPARISON_CHART Stands for an average comparison chart.
	 */
	WIDGET: 'widget',
	COMBO_WIDGET: 'combo-widget',
	LINE_CHART: 'line-chart',
	AREA_CHART: 'area-chart',
	BAR_CHART: 'bar-chart',
	MAP: 'map',
	TABLE_VIEW: 'table-view',
	CSV_VIEW: 'csv-view',
	TABLE_GRAPH: 'table-graph',
	MULTI_CHART: 'multi-chart',
	PIE_CHART: 'pie-chart',
	AVG_COMPARISON_CHART: 'avg-comparison',

	/**
	 * Event types.
	 *
	 * @property {int} CHANGE Change event
	 * @property {int} READY Ready event
	 * @property {int} DELETE Delete event
	 * @property {int} MOVE Widget move event
	 * @property {int} HIDDEN Hidden event
	 * @property {int} MEDIA_CHANGE Media query change event
	 * @property {int} PROFILE_ADD Adding a profile event
	 * @property {int} REPORT_WIDE_CHANGE Changing a property accross all the widgets in a report event
	 */
	CHANGE: 11000,
	READY: 110010,
	DELETE: 110020,
	MOVE: 110030,
	MOVE_REQUEST: 110040,
	HIDDEN: 110050,
	MEDIA_CHANGE: 110060,
	PROFILE_ADD: 110070,
	REPORT_WIDE_CHANGE: 110080,


	/**
	 * @constant
	 * @memberof Dbm
	 * @property {string} TIME_FRAME Stands for a chart's time frame ('daily', 'weekly', 'monthly').
	 * @property {string} TIME_INTERVAL Stands for a chart's time interval (7, 30, 60, or 90 days).
	 * @property {string} DAY Stands for a day
	 * @property {string} WEEK Stands for a week
	 * @property {string} MONTH Stands for a month
	 * @property {string} DATE_CUSTOM Stands for a chart's custom date range
	 * @property {string} PREVIOUS_PERIOD The date range is relative to the period of another date range.
	 * @property {string} PREVIOUS_YEAR The date range is relative to the year of another date range.
	 */
	TIME_FRAME: 'timeFrame',
	TIME_INTERVAL: 'timeInterval',
	DAY: 'day',
	WEEK: 'week',
	MONTH: 'month',
	DATE_CUSTOM: 'custom',
	PREVIOUS_PERIOD: 'periodCompare',
	PREVIOUS_YEAR: 'yearCompare',
	PREVIOUS_MONTH: 'prevMonth',
	PREVIOUS_WEEK: 'prevWeek',
	
	DEFAULT_REPORT_ICON: '/images/logo/blank/megalytic-64.png',

	transEndEventNames: {
		WebkitTransition : 'webkitTransitionEnd',
		MozTransition    : 'transitionend',
		OTransition      : 'oTransitionEnd',
		msTransition     : 'MSTransitionEnd',
		transition       : 'transitionend'
	},
	animaEndEventNames: {
		WebkitAnimation : 'webkitAnimationEnd',
		MozAnimation    : 'animationend',
		OAnimation     : 'oAnimationEnd',
		msAnimation  : 'MSAnimationEnd',
		animation       : 'animationend'
	},
	getTransition: function(notCamelCased) {
		var transition = Mod.prefixed('transition'),
			transNotCamelCased = transition && transition.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

		Dbm.getTransition = function(notCamelCased) {
			return notCamelCased === true ? transNotCamelCased : transition;
		};
		return Dbm.getTransition(notCamelCased);
	},
	getTransform: function(notCamelCased) {
		var transform = Mod.prefixed('transform'),
			transNotCamelCased = transform && transform.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

		Dbm.getTransform = function(notCamelCased) {
			return notCamelCased === true ? transNotCamelCased : transform;
		};

		return Dbm.getTransform(notCamelCased);
	},
	getAnimationEnd: function() {
		var animationEnd = Dbm.animaEndEventNames[Mod.prefixed('animation')];
		Dbm.getAnimationEnd = function() { return animationEnd; };
		return animationEnd;
	},
	getTransitionEnd: function() {
		var transitionEnd = Dbm.transEndEventNames[Mod.prefixed('transition')];
		Dbm.getTransitionEnd = function() { return transitionEnd; };
		return transitionEnd;
	},
	addMediaQueryListeners: function() {
		if (!window.matchMedia) { return; }
		var list = ['(min-width: 1919px)', '(min-width: 1680px) and (max-width: 1919px)', '(min-width: 1440px) and (max-width: 1679px)',  '(min-width: 1240px) and (max-width: 1439px)', '(min-width: 1000px) and (max-width: 1239px)', '(min-width: 768px) and (max-width: 999px)', '(min-width: 768px) and (max-width: 999px)', '(min-width: 640px) and (max-width: 767px)', '(min-width: 480px) and (max-width: 639px)', '(max-width: 479px)'],
			currentMatch,
			i = -1,
			len = list.length,
			handler = function(mql) {
				if (mql.matches) {
					if (currentMatch !== mql.media) {
						currentMatch = mql.media;
						Dbm.trigger(Dbm.MEDIA_CHANGE, mql.media);
					}
				}
			},
			mql;

		while (++i < len) {
			mql = window.matchMedia(list[i]);
			mql.addListener(handler);
		}
	},
	preloadImages: function() {
		var i = -1, len;
		if (preloadImages) {
			len = preloadImages.length;
			while (++i < len) { new Image().src = preloadImages[i]; }
			preloadImages = null;
		}
	},
	isSafari: /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent),
	isMSIE: /msie|trident/i.test(navigator.userAgent),
    isFireFox : (/firefox/i.test(navigator.userAgent) && /gecko/i.test(navigator.userAgent)),
	isTouch: isTouch,
	downEvent: isTouch ? 'touchstart' : 'click',
	isMobile: isMobile,
	busy: false, //Flag to prevent AJAX calls when a request is in progress.
	void0: 'javascript:void(0);',
	clients: {},
	regTag : /<[^<>]+>(.*)<[^<>]+>/,
	stripTag: /<\/?[^<>]+>/g,
	datasources: {},
	sourceMap: {
		GoogleAnalytics: 'Google Analytics',
//		FacebookInsights: 'Facebook Insights',
//		Twitter: 'Twitter',
//		YouTube: 'YouTube'
//		LinkedIn: 'LinkedIn',
//		MailChimp: 'MailChimp'
	},
	CONNECTED: 'connected',
	AUTH_ERROR: 'auth',
	ERROR: 'error',
	sourceTypeMap: {
		GoogleAnalytics: 'view',
		FacebookInsights: 'page',
		Twitter: 'account',
		YouTube: 'channel'
	},
	extend: function(obj, source) {
		var myProto,
			prop;
		if (obj && source && typeof source === 'object') {
			myProto = obj.prototype;
			for (prop in source) {
				myProto[prop] = source[prop];
			}
			return obj;
		} else {
			throw new TypeError();
		}
	},
	parseQuery: function() {
		var query = decodeURIComponent(window.location.search).replace(/^\?/, '').split('&'),
			i = -1,
			len = query && query.length,
			ret = {},
			tmp,
			key;

		if (len === 1 && query[0] === '') { return ret; }
		
		//If there was an '&' sign in the query values the split would be incorrect.
		//We check to see if a query item doesn't contain a '=' sign and fix it.
		while (++i < len) {
			if (query[i].indexOf('=') === -1) {
				if (query[i-1]) { 
					query[i-1] += '&' + query[i];
					query.splice(i, 1);
					i--; 
					len = query.length;
				}
			}
		}
		
		i = -1;
		while (++i < len) {
			tmp = query[i].split('=');
			key = tmp.shift();
			if (tmp.length) {
				ret[(key)] = decodeURIComponent(tmp.join(''));
			} else {
				ret[decodeURIComponent(key)] = null;
			}
		}
		return ret;
	},
	addRetinaSupport: function() {
		var head = document.head || document.getElementsByTagName('head')[0],
			script = document.createElement('script');

		script.src = '/js/retina-custom.js';
		head.appendChild(script);
	},
	getImgSuffix: getImgSuffix,
	trackOutboundLink: function(link, pageViewUrl) {
		try {
			_gaq = window._gaq || [];
			_gaq.push(['_trackPageview', pageViewUrl]);
		} catch(err){}

		setTimeout(function() {
			document.location.href = link.href;
		}, 100);
	},
	pushGACallback: function(fn) {
		if (fn && typeof fn === 'function') {
			try {
				if (!window._gaq || Array.isArray(window._gaq)) { return fn(); }
				_gaq.push(fn);
			} catch (e) {}
		}
	},
	trackEvent: function(category, action, label, value, noninteraction) {
		try {
			_gaq = window._gaq || [];
			_gaq.push(['_trackEvent', category, action, label, value, noninteraction]);
		} catch (e) {}
	},
	trackOutboundEvent: function(link, category, action, label, value, noninteraction) {
		Dbm.trackEvent(category, action, label, value, noninteraction);
		setTimeout(function() {
			document.location.href = link.href;
		}, 100);
	},
	trackFakePageview: function(fakePagePath) {
		try {
			_gaq = window._gaq || [];
			_gaq.push(['_trackPageview', fakePagePath]);
		} catch (e) {}
	},
	trackOutboundFakePageview: function(link, fakePagePath) {
		Dbm.trackFakePageview(fakePagePath);
		setTimeout(function() {
			document.location.href = link.href;
		}, 100);
	},
	noPrintKey: {37:1,38:1,39:1,40:1,13:1,16:1,17:1,18:1,91:1,93:1,20:1,27:1,224:1},
	escapeQuotes: function(str) {
		if (typeof str === 'string' && str !== '') {
			return str.replace(/(")/g, '&quot;').replace(/(')/g, '&lsquo;');
		}
		return str;
	},
	setCaretPosition: function(field, pos) {
		var range;

		// IE Support
		if (field.createTextRange) {
			range = field.createTextRange();

			range.move('character', pos);

		} else if (field.selectionStart || +field.selectionStart === 0) {
			field.setSelectionRange(pos, pos);
		}
	},
	getCaretPosition: function(field) {
		var pos = 0,
		selection;

		// IE Support
		if (document.selection) {
			selection = document.selection.createRange();

			// Move selection start to 0 position
			selection.moveStart('character', -field.value.length);

			// The caret position is selection length
			pos = selection.text.length;
		} else if (field.selectionStart || +field.selectionStart === 0) {
			pos = field.selectionStart;
		}

		return pos;
	},
	truncateText: function(txt, width, fontSize) {
		var elem = document.createElement('div'),
			i = -1,
			len = txt.length,
			ret;

		width = parseInt(width);
		elem.style.position = 'absolute';
		elem.style.visibility = 'hidden';
		elem.style.height = 'auto';
		elem.style.width = 'auto';
		if (fontSize) elem.style.fontSize = fontSize;
		document.body.appendChild(elem);

		elem.textContent = txt;
		if (elem.clientWidth > width) {
			elem.textContent = '';
			while (elem.clientWidth < width && ++i < len) {
				elem.textContent += txt.charAt(i);
			}
			ret = elem.textContent + '...';
		} else {
			ret = txt;
		}
		document.body.removeChild(elem);
		return ret;
	},
	getHiddenIFrame: function() {
		var iframe = document.createElement('iframe');

		iframe.style.position = 'absolute';
		iframe.style.height = '1px';
		iframe.style.width = '1px';
		iframe.style.visibility = 'hidden';
		iframe.style.opacity = 0;
		iframe.style.left = '-99999999px';

		return iframe;
	},
	contains: contains,
//	isMouseLeave: function(e) { return (e.currentTarget !== e.relatedTarget !== e.target) && !Dbm.contains(e.target, e.currentTarget); },
	isMouseLeave: function(e) { return e.currentTarget !== e.relatedTarget && !Dbm.contains(e.relatedTarget, e.currentTarget); },
	errorHandler: function(res) {
		if (!Dbm.IS_AUTO_REPORT && !Dbm.IS_HEADLESS) {
			Dbm.hideProgress();
			if (res.status && res.status !== 200) {
				if (res.responseJSON && res.responseJSON.isNotLoggedIn) {
					window.location.reload();
				} else if (res.responseJSON && res.responseJSON.trialEnded) {
					window.location = siteSecureUrl + '/manage?section=payment-section';
				} else {
					alert('Error: ' + res.statusText + '\nStatus: ' + res.status);
				}
			} else {
				console.log(res);
				alert('Unexpected error. View logs');
			}
		}
	},
	error: function(exception) {
		if (exception && window.console) {
			console.error(exception);
		}
	},

	/**
	 * Tests if an object has no own properties.
	 *
	 * @param {object} obj
	 * @returns {Boolean}
	 */
	isEmptyObject: function(obj) {
		if (typeof obj !== 'object' || obj === null) { return true; }
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) return false;
		}
		return true;
	},

	/**
	 * Returns the number of own properties of the given object.
	 *
	 * @param {object} obj
	 * @returns {Number}
	 * @function Dbm.objLen
	 */
	objLen: function(obj) { //Get the number of own properties in an object.
		if (!obj || typeof obj !== 'object' || obj === null) return 0;
		return Object.getOwnPropertyNames(obj).length;
	},

	/**
	 * Tests if two items are equal. The items can be of any type.
	 *
	 * @param {any} a
	 * @param {any} b
	 * @returns {Boolean}
	 * @function Dbm.equals
	 */
	equals: function(a, b) {
		var type;

		if (a === b) { return true; }

		if (Array.isArray(a) && Array.isArray(b)) {
			return Dbm.equalArray(a, b);
		} else {
			type = typeof a;
			if (type === 'object' && a instanceof Date) { type = 'date'; }
			switch (type) {
				case 'object':
					return type === typeof b && Dbm.equalObj(a, b);
					break;
				case 'function':
					return type === typeof b && a.toString() === b.toString();
					break;
				case 'number':
					if (isNaN(a)) {
						return type === typeof b && isNaN(b);
					} else {
						return a == b;
					}
					break;
				case 'date':
					return b instanceof Date && a === b;
				default:
					return a == b;
			}
		}
	},

	/**
	 * Tests if two arrays are equal.
	 *
	 * @param {array} a
	 * @param {array} b
	 * @returns {Boolean}
	 * @function Dbm.equalArray
	 */
	equalArray: function(a, b) {
		var i = -1,
			len = a.length;

		if (len !== b.length) { return false; }

		while (++i < len) {
			if (!Dbm.equals(a[i], b[i])) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Tests if two objects are eqaul.
	 *
	 * @param {object} a
	 * @param {object} b
	 * @returns {Boolean}
	 * @function Dbm.equalObj
	 */
	equalObj: function(a, b) {
		var i = -1,
			prop = Object.getOwnPropertyNames(a),
			len = prop.length;

		if (len !== Object.getOwnPropertyNames(b).length) { return false; }

		while (++i < len) {
			if (!Dbm.equals(a[prop[i]], b[prop[i]])) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Checks if a number or an array of numbers are in between a low and high bound range.
	 *
	 * @param {Array|Number} a The values to test.
	 * @param {Array} range Array with two elements that represent the low and high range.
	 * @return {Boolean}
	 * @function Dbm.inRange
	 */
	inRange: function(a, range) {
		if (a === undefined || !$.isArray(range) || range.length !== 2) return false;
		if (!$.isArray(a)) a = [a];
		var i = -1, len = a.length;
		while (++i < len) {
			if (a[i] < range[0] || a[i] > range[1]) return false;
		}
		return true;
	},

	hasClass: function(el, cls) {
		if (el.classList) {
			this.hasClass = function(el, cls) {
				var parts = cls.split(/\s+/g),
					i = -1,
					len = parts.length;

				if (el.classList) {
					while (++i < len) { if (!el.classList.contains(parts[i])) { return false; } }
					return true;
				}
			};
		} else {
			this.hasClass = function(el, cls) {
				var parts = cls.split(/\s+/g),
					i = -1,
					len = parts.length,
					reg,
					cls = el.className;

				if (cls) {
					while (++i < len) {
						reg = new RegExp('\\b' + parts[i].toString() + '\\b');
						if (!reg.test(cls)) { return false; }
					}
					return true;
				}
			};
		}
		return this.hasClass(el, cls);
	},

	addClass: function(el, cls) {
		if (el.classList) {
			this.addClass = function(el, cls) {
				var parts = cls.split(/\s+/g),
					i = -1,
					len = parts.length;

				if (el.classList) {
					while (++i < len) { el.classList.add(parts[i]); }
				}
			};
		} else {
			this.addClass = function(el, cls) {
				var curCls = el.className,
					parts = cls.split(/\s+/g),
					i = -1,
					len = parts.length;

				while (++i < len) {
					if (!Dbm.hasClass(el, parts[i])) { curCls += ' ' + parts[i]; }
				}
                el.className = curCls;
			};
		}
		return this.addClass(el, cls);
	},

	removeClass: function(el, cls) {
		if (el.classList) {
			this.removeClass = function(el, cls) {
				var parts = cls.split(/\s+/g),
					i = -1,
					len = parts.length;

				if (el.classList) {
					while (++i < len) { el.classList.remove(parts[i]); }
				}
			};
		} else {
			this.removeClass = function(el, cls) {
				var reg,
					curCls = el.className,
					parts = cls.split(/\s+/g),
					i = -1,
					len = parts.length;

				while (++i < len) {
					if (Dbm.hasClass(el, parts[i])) {
						reg = new RegExp('\\b' + parts[i].toString() + '\\b', 'g'),
						curCls = curCls.replace(reg, '').trim();
					}
				}
				el.className = curCls;
			};
		}
		return this.removeClass(el, cls);
	},

	replaceClass: function(el, cls1, cls2) {
		Dbm.removeClass(el, cls1);
		Dbm.addClass(el, cls2);
	},

	/**
	 * Generate a random alphanumeric string.
	 *
	 * @param {Integer} [length=10] The number of chracters of the string. Default: 10
	 * @return {String} ret Random string.
	 * @function Dbm.randStr
	 */
	randStr: function(length) {
		var i = -1,
		len = charBank.length,
		ret = '';
		length = isNaN(length) ? 10 : Math.round(length);
		while (++i < length) ret += charBank[Math.floor(Math.random()*len)];
		return ret;
	},

	/**
	 * Adds commas to a number every thousand.
	 *
	 * @param {number} n The number to format.
	 * @returns String
	 * @function Dbm.numWidthComma
	 */
	numWithComma: function(n) {
		return n !== undefined && n !== null && n.toString().replace(/\B(?=(\d{3})+(?![\d]))/g, ",");
	},

	/**
	 * Abbriviates large numbers.
	 *
	 * @param n {Number} The number to format
	 * @param decimal {[Number=1]} The number of decimal points to leave.
	 * @return ret {String} Abbriviated number.
	 * @example Dbm.numFormat(234000); // 234K
	 *		Dbm.numFormat(1234000); // 1.2M
	 * @function Dbm.numFormat
	 */
	numFormat: function(n, decimal) {
		var ret,
			regex,
			abs = Math.abs(n),
			x;

		decimal = decimal || 1;
		regex = new RegExp("-?[\\d]*(?:\\.?[\\d]{0," + decimal + "})?");

		if (abs >= 1000000000) {
			x = (n/1000000000).toString().match(regex);
			ret = (x !== null && x[0] + 'B') || '';
		} else if (abs >= 1000000) {
			x = (n/1000000).toString().match(regex);
			ret = (x !== null && x[0] + 'M') || '';
		} else if (abs >= 1000) {
			x = (n/1000).toString().match(regex);
			ret = (x !== null && x[0] + 'K') || '';
		} else if (d3) {
			ret = d3.format(',')(n.toString().match(regex));
		} else {
			ret = n;
		}
		return ret;
	},
	currencyFormat: function(n) {
		return Dbm.numFormat(n, 2);
	},
	condenseArray: function(array, name, val) {
		var ret = {},
			i = -1,
			len = array.length;

		name = name || 'name';
		val = val || 'value';
		if (!$.isArray(array) || len === 0) return ret;

		while (++i < len) ret[array[i][name]] = array[i][val];
		return ret;
	},
	blink: function(elem, times) {
		var timer, counter = 1, tmpElem = elem instanceof $ ? elem[0] : elem;
		times = (!isNaN(times) && Number(times)) || 3;
		function _blinker() {
			clearTimeout(timer);
			tmpElem.style.visibility = 'visible';
			if (counter++ <= times) {
				timer = setTimeout(function() {
					tmpElem.style.visibility = 'hidden';
					setTimeout(_blinker,100);
				}, 100);
			}
		}
		_blinker();
		return elem;
	},

	onCookie: function(name, callback) {
		var RETRY = 360, // 3 minutes in half a second intervals.
			SLEEP = 500, // 1/2 second intervals.
			_recurse;

		if (name != undefined && typeof callback === 'function') {
			_recurse = function() {
				var cookies = document.cookie.split(';'),
					i = cookies.length,
					exists = false;

				while (i--) if ((exists = cookies[i].indexOf(name) !== -1)) { break; }

				if (!exists && RETRY--) {
					setTimeout(_recurse, SLEEP);
				} else {
					callback();
				}
			};
			setTimeout(_recurse, SLEEP);
		}
	},
	load_d3: function() {
		var script = document.createElement("script");
		script.setAttribute('async', true);
		script.src = "/js/custom/d3.v3.js";
		document.getElementsByTagName('head')[0].appendChild(script);
	},
//	unscale: function() {
//		var svg = this.ownerSVGElement,
//			origin = svg.getAttribute('data-origin'),
//			xf = this.scaleIndependentXForm,
//			m;
//
//		if (!xf){
//	// Keep a single transform matrix in the stack for fighting transformations
//	// Be sure to apply this transform after existing transforms (translate)
//		  xf = this.scaleIndependentXForm = svg.createSVGTransform();
//		  this.transform.baseVal.appendItem(xf);
//		}
//		m = svg.getTransformToElement(this.parentNode);
//		if (origin === 'mobile') {
//			m.a = Dbm.isMobile ? 1 : Dbm.MOBILE_COMP_WIDTH / Dbm.COMP_WIDTH;
//		} else {
//			m.a = Dbm.isMobile ? Dbm.COMP_WIDTH / Dbm.MOBILE_COMP_WIDTH : 1;
//		}
//		m.e = m.f = 0; // Ignore (preserve) any translations done up to this point
//		xf.setMatrix(m);
//	},
	limitChars: function(field, max) {
		if (field.length === 0) return this;
		var _limit = (function() {
			if (/INPUT|TEXTAREA/.test(field.get(0).nodeName)) {
				return function(e) {
					var keyCode = e.keyCode,
						value = this.value,
						length = value.length;

					//Backspace, left, and right arrows are OK.
					if (length > max && keyCode !== 8 && keyCode !== 37 && keyCode !== 39) {
						this.value = value.slice(0, max);
					}
				}
			} else {
				return function(e) {
					var keyCode = e.keyCode,
						input = $(this),
						value = input.text(),
						length = value.length;

					//Backspace, left, and right arrows are OK.
					if (length > max && keyCode !== 8 && keyCode !== 37 && keyCode !== 39) {
						e.preventDefault();
						return false;
					}
				}
			}
		})();
		return field.on('keyup', _limit).on('paste', function() {setTimeout(function() {field.trigger('keyup');}, 10)});
	},
	/**
	 * Returns an element's offset relative to a container.
	 * @param {HTMLElement} target The element to look for it's offset.
	 * @param {String} [dir] left || top || right || bottom. Default: top.
	 * @param {HTMLElement} [container] The target's container. Default: document.body.
	 */
	offset: function(target, container, dir) {
		var elem = target,
			prop,
			prop2,
			contains = Dbm.contains,
			parent,
			ret = 0;

		switch (dir) {
			case 'right':
				prop2 = 'clientWidth';
			case 'left':
				prop = 'offsetLeft';
				break;
			case 'bottom':
				prop2 = 'clientHeight';
				break;
			default:
				prop = 'offsetTop';
				break;
		}

		container = container || document.body;
		parent = elem.offsetParent;
		if (dir === 'right' || dir === 'bottom') {
			while (parent && contains(parent, container)) {
				if (parent === container || (parent.offsetParent && contains(parent.offsetParent, container))) {
					ret += (parent[prop2] - elem[prop2] - elem[prop]);
					elem = parent;
					parent = elem.offsetParent;
				} else {
					break;
				}
			}
		} else {
			while (elem && contains(elem, container)) {
				if (elem === container || (elem.offsetParent && contains(elem.offsetParent, container))) {
					ret += elem[prop];
					elem = elem.offsetParent;
				} else {
					break;
				}
			}
		}

		return ret;
	},
	showProgress: function(txt, toElement) {
		Dbm.busy = true;

		var progInd = document.getElementById('progress-indicator'),
			text = txt || 'Loading',
			container = (toElement instanceof $ ? toElement[0] : toElement) || document.body;

		if (progInd) {
			if (txt) { progInd.lastChild.textContent = txt; }
			Dbm.centerOverlay(progInd, toElement ? toElement : window);
			Dbm.removeClass(progInd, 'fade');
			return progInd;
		}
		progInd = document.createElement('div');
		progInd.id = 'progress-indicator';
		progInd.className = 'dbm-progress running noselect fade';
		progInd.innerHTML = '<img src="/images/spinner-white.gif"><span class="text">' + text + '</span>';

		container.appendChild(progInd);
		Dbm.centerOverlay(progInd, toElement ? toElement : window);

		setTimeout(function() { Dbm.removeClass(progInd, 'fade'); }, 50);

		return progInd;
	},
	confirmSave: function(txt, duration) {
		var progInd = document.getElementById('progress-indicator');
		clearTimeout(progressTimer);
		if (duration === undefined || isNaN(duration)) { duration = 1000; }
		txt = txt || 'Saved!';
		if (!progInd) {
			progInd = Dbm.showProgress(txt);
			Dbm.addClass(progInd, 'stopped');
		} else {
			progInd.className = 'dbm-progress stopped noselect';
			progInd.innerHTML = '<span class="text">' + txt + '</span>';
			Dbm.centerOverlay(progInd);
		}

		setTimeout(function() { return Dbm.hideProgress(); }, duration);
		Dbm.busy = false;
		return this;
	},
	hideProgress: function() {
		var progInd = document.getElementById('progress-indicator');
		clearTimeout(progressTimer);
		if (progInd) {
			progInd.className += ' fade';
			setTimeout(function() {
				progInd && progInd.parentNode && progInd.parentNode.removeChild(progInd);
				Dbm.busy = false;
			}, 300);
		}
		Dbm.busy = false;
		return this;
	},
	showOverlay: function(element, callback) {
		var overlay = document.getElementById('overlay');

		if (!overlay) {
			overlay = document.createElement('div');
			overlay.id = 'overlay';
			overlay.className = 'overlay fade';
			document.body.appendChild(overlay);
			setTimeout(function() {
				overlay.className = 'overlay';
			}, 50);
		}
		if (element) {
			element.className += ' fade';
			this.centerOverlay(element);
			setTimeout(function() { Dbm.removeClass(element, 'fade'); }, 50);
		}

		if (typeof callback === 'function') setTimeout(function() {callback.call(Dbm); }, 250);
		return this;
	},
	hideOverlay: function(element, callback) {
		var overlay = document.getElementById('overlay');
		if (element) { element.className += ' fade'; }
		if (overlay) {
			overlay.className += ' fade';
			setTimeout(function() {
				document.body.removeChild(overlay);
				if (typeof callback === 'function') { callback.call(Dbm); }
			}, 250);
		}
		return this;
	},
	centerOverlay: function(element, cont) {
		cont = cont || window;
		if (element instanceof $) { element = element[0]; }
		if (cont instanceof $) { cont = cont[0]; }
		var position = window.getComputedStyle(element).getPropertyValue('position'),
			width = element.offsetWidth,
			height = element.offsetHeight,
			contWidth = cont === window ? cont.innerWidth : cont.offsetWidth,
			contHeight = cont === window ? cont.innerHeight : cont.offsetHeight,
			scrollTop = position === 'fixed' ? 0 : cont.scrollTop,
			scrollLeft = position === 'fixed' ? 0 : cont.scrollLeft,
			top = Math.max(((contHeight - height) / 2) + scrollTop, 0),
			left = Math.max(((contWidth - width) / 2)  + scrollLeft, 0);

		element.style.left = left + 'px';
		element.style.top = top + 'px';

		return element;
	},
/**
 * Removes it's arguments 'disabled' property. Used to include form values in Dbm.Validate.<br>
 * Arguments can be either a DOM or jQuery Elements.
 */
	enable: function() {
		var arg, i = -1, len = arguments.length;
		while (++i < len) {
			(arg = arguments[i]) instanceof $ ? arg.removeAttr('disabled') : arg.removeAttribute('disabled');
		}	

		return arg;
	},
/**
 * Sets it's arguments 'disabled' property to TRUE. Used to exclude form values in Dbm.Validate.<br>
 * Arguments can be either a DOM or jQuery Elements.
 */
	disable: function() {
		var arg, i = -1, len = arguments.length;
		while (++i < len) {
			(arg = arguments[i]) instanceof $ ? arg.attr('disabled', 'disabled') : arg.setAttribute('disabled', 'disabled');
		}	
		return arg;
	},
	show: function(elem) {
		elem instanceof $ ? elem.removeClass('hidden') : Dbm.removeClass(elem, 'hidden');
		return elem;
	},
	hide: function(elem) {
		elem instanceof $ ? elem.addClass('hidden') : Dbm.addClass(elem, 'hidden');
		return elem;
	},

	/**
	 * Creates a storage mechanism.
	 * Given an input object, two methods are added to the object:
	 * data - A getter / setter.
	 * removeData - Removes a specific item from storage or the entire storage.
	 * @param {Object} self
	 * @returns {Object} self
	 */
	createStorage: function(self) {
		var _data = {};
		if (self === null || typeof self !== 'object') return;

		self.data = function(name, val) {
			var prop,
				ret;

			switch (typeof name) {
				case 'boolean':
					if (name === true) {
						ret = [];
						for (prop in _data) {
							ret.push({name: prop, value: _data[prop]});
						}
					}
					break;
				case 'undefined':
					ret = _data;
					break;
				case 'string':
					if (val === undefined) {
						ret = _data[name];
					} else {
						_data[name] = val;
					}
					break;
				case 'object':
					for (prop in name) {
						_data[prop] = name[prop];
					}
					break;
			}
			return ret;
		};
		self.removeData = function(prop) {
			if (typeof prop === 'string') { delete _data[prop]; }
			else { _data = {}; }
		};
		return self;
	},
	addEventDispatcher: function(obj) {
		if (obj && typeof obj === 'object') {
			obj.on = function(type, fn, context) {
				if (typeof type !== 'undefined' && type !== null && typeof fn === 'function') {
					if (this.handlers[type]) {
						if (context && (typeof context === 'function' || typeof context === 'object')) {
							this.handlers[type].push({fn: fn, context: context});
						} else {
							this.handlers[type].push(fn);
						}
					}
				}
				return this;
			};
			obj.off = function(type, fn) {
				var i = -1, len;
				if (typeof type !== 'undefined' && type !== null) {
					if (this.handlers[type]) {
						if (typeof fn === 'function') {
							try {
								len = this.handlers[type].length;
								while (++i < len) {
									if (typeof this.handlers[type][i] === 'function') {
										if (this.handlers[type][i] === fn) {
											this.handlers[type].splice(i, 1);
											break;
										}
									} else if (typeof this.handlers[type][i].fn === 'function') {
										if (this.handlers[type][i].fn === fn) {
											this.handlers[type].splice(i, 1);
											break;
										}
									}
								}
							} catch (e) { Dbm.error(e); };
						} else {
							this.handlers[type] = [];
						}
					}
				}
				return this;
			};
			obj.trigger = function(type) {
				var i = -1,
					len = this.handlers[type] && this.handlers[type].length,
					args = Array.prototype.slice.call(arguments, 1);

				if (!this.handlers[type]) { throw new Error('The object doesn\'t handle this kind of event: ' + type); }

				while (++i < len) {
					try {
						if (typeof this.handlers[type][i] === 'function') {
							this.handlers[type][i].apply(this, args);
						} else if (this.handlers[type][i].context) {
							this.handlers[type][i].fn.apply(this.handlers[type][i].context, args);
						}
					} catch (e) { Dbm.error(e); }
				}
				return this;
			};
		}
	},
	getWarning: function(msg) {
		var warning = document.createElement('div');

		warning.className = 'alert form-error';
		warning.innerHTML = '<span>' + msg + '</span>';
		return warning;
	},
	setWarning: function(msg, field) {
		if (!field || !msg) return;
		var warning = Dbm.getWarning(msg);

		if (field.nextSibling) {
			field.parentNode.insertBefore(warning, field.nextSibling);
		} else {
			field.parentNode.appendChild(warning);
		}
	},
	removeWarning: function(elem) {
		var i = -1,
			len,
			warning;

		if (elem) {
			if (Dbm.hasClass(elem, 'form-error')) {
				elem.parentNode && elem.parentNode.removeChild(elem);
			} else if (elem.nextSibling && elem.nextSibling.className && Dbm.hasClass(elem.nextSibling, 'form-error')) {
				elem.nextSibling.parentNode && elem.nextSibling.parentNode.removeChild(elem.nextSibling);
			}
		} else {
			warning = document.querySelectorAll('.form-error');
			len = warning.length;
			while (++i < len) {
				warning[i].parentNode && warning[i].parentNode.removeChild(warning[i]);
			}
		}

	},
	pad: function(value) { return String(value).length === 1 ? '0' + value : value; },
	create: function(type, args) {
		var ret;

		switch (type) {
			case Dbm.WIDGET:
				ret = new Dbm.Widget(args);
				break;
			case Dbm.COMBO_WIDGET:
				ret = new Dbm.ComboManager(args);
				break;
			case Dbm.MULTI_CHART:
			case Dbm.BAR_CHART:
			case Dbm.PIE_CHART:
			case Dbm.LINE_CHART:
			case Dbm.AREA_CHART:
			case Dbm.MAP:
			case Dbm.TABLE_VIEW:
			case Dbm.TABLE_GRAPH:
				if (args && args.isDateCompare === true) {
					ret = new Dbm.DateCompareManager(args);
				} else {
					ret = new Dbm.ChartManager(args);
				}
				break;
			case Dbm.CSV_VIEW:
				ret = new Dbm.CSVManager(args);
				break;
		}
		return ret;
   },

	/**
	* Displays a preview for an image before upload.
	* @param {HTMLInputElement} input Input element of type file.
	* @param {Image} preview The preview image which src attribute we change.
	*/
	previewImage: function(input, preview) {
		var Val = new Dbm.Validate(),
			reader;

		if (!Val.isFile(null, input) || !Val.isImage(null, input)) return;

		if (window.FileReader) {
			reader = new window.FileReader();
			reader.onload = function(e) {
				preview.src = e.target.result;
			};
			reader.readAsDataURL(input.files[0]);
		} else if (navigator.appName === "Microsoft Internet Explorer") {
			preview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = input.value;
		}
	},

	/**
	* Uploads a file using a hidden iframe.
	* @param  {HTMLFormElement} form The form to submit. Needs to be a valid form.
	* @param {Function} callback A callback function that will be executed when the server responds.
	*/
	uploadFile: function(form, callback) {
		var frame = document.createElement('iframe'),
			body = document.body,
			frameBody,
			test = function(frame) { return frame.contentDocument && frame.contentDocument.getElementById('SERVER_RESPONSE'); };

		frame.name = 'upload-iframe';
		frame.style.display = 'none';
		body.appendChild(frame);

		frameBody = frame.contentDocument.body;
		if (!frameBody) {
			frame.onload = function() {
				frame.onload = null;
				frameBody = frame.contentDocument.body;
				frameBody.appendChild(form);
				form.submit();
				Dbm.frameOnLoad(frame, test, callback);
			};
		} else {
			frameBody.appendChild(form);
			form.submit();
			Dbm.frameOnLoad(frame, test, callback);
		}
	},
	/**
	 * Checks wheather a certain condition meets the needs to refer to the given iframe as loaded.<br>
	 * This became a necessity since Chrome behaves in a weird way with iframe's onload callback.
	 *
	 * @param {HTMLIFrameElement} frame An IFRAME element.
	 * @param {function} test The test to determine whether the frame has loaded or not. Must return a truthy value if the test is met.
	 * @param {function} fn A callback function to execute once the frame has loaded.
	 * @returns {undefined}
	 */
	frameOnLoad: function(frame, test, fn) {
		var timer = 0,
			recurse;

		if (frame && frame.nodeName.toUpperCase() === 'IFRAME' && typeof test === 'function' && typeof fn === 'function') {
			recurse = function(frame, test, fn) {
				if (test(frame)) {
					clearTimeout(timer);
					fn(frame);
				} else {
					timer = setTimeout(function() { recurse(frame, test, fn); }, 100);
				}
			};
			recurse(frame, test, fn);
		}
	},

	/**
	 * @param {string} timeFrame day|week|month
	 * @param {boolean} includeLastPeriod
	 * @param {Date} [endDate=today]
	 * @returns {Dbm.date.DateIterator} Returns a date iterator
	 * @function Dbm.getDateIterator
	 */
	getDateIterator: function(timeFrame, includeLastPeriod, endDate) {
		var iter,
			lastDay,
			date = Dbm.date.round(endDate || new Date());

		switch (timeFrame) {
			case Dbm.DAY:
				iter = new Dbm.date.DateIterator(date);
				if (!includeLastPeriod && (!endDate || iter.compare(new Date()) === 0)) { iter.previous(); }
				break;
			case Dbm.WEEK:
				lastDay = Dbm.date.WeekIterator.SUNDAY;
				iter = new Dbm.date.WeekIterator(date, lastDay);
				if (!includeLastPeriod && !iter.isLastDay()) {
					iter.previous();
				}
				break;
			case Dbm.MONTH:
				lastDay = +Dbm.date('t', date);
				iter = new Dbm.date.MonthIterator(date, lastDay);
				if (!includeLastPeriod && !iter.isLastDay()) {
					iter.previous();
				}
				break;
		}

		return iter;
	},
	getDateString: function(data, isSingleDate) {
		if (isSingleDate === true) { return Dbm.getSingleDateString(data); }

		var format = Dbm.date.format(Dbm.user_date_format),
			interval,
			str = '',
			iter,
			start,
			end,
			i,
			len,
			yesterday,
			today,
			timeFrame,
			tmp;

		if (!Array.isArray(data)) { data = [data]; }

		len = data.length;
		i = len > 1 ? len - 1 : 0;

		while (true) {
			if (data[i].startDate && data[i].endDate) {
				start = Dbm.date.round(data[i].startDate);
				end = Dbm.date.round(data[i].endDate);
			} else {
				interval = +data[i].timeInterval;
				if (!isNaN(interval)) {
					timeFrame = typeof data[i].timeFrame === 'string' ? data[i].timeFrame : data[i].timeFrame.value;
					iter = Dbm.getDateIterator(timeFrame, data[i].includeLastPeriod, data[i].endDate);
					if (!data[i].includeLastPeriod && iter.compare(new Date()) === 0) {
						iter.previous();
					}
					end = iter.get();
					while (interval--) { iter.previous(); }
					start = Dbm.date.find(1, iter.get());
				} else if (data[i+1]) {
					switch (data[i].timeInterval) {
						case Dbm.PREVIOUS_WEEK:
						case Dbm.PREVIOUS_MONTH:
						case Dbm.PREVIOUS_PERIOD:
							tmp = Dbm.getPreviousPeriod(data[i+1]);
							start = tmp.startDate;
							end = tmp.endDate;
							break;
						case Dbm.PREVIOUS_YEAR:
							tmp = Dbm.getPreviousYear(data[i+1]);
							start = tmp.startDate;
							end = tmp.endDate;
							break;
					}
				} else if (data[i].timeInterval === Dbm.PREVIOUS_WEEK || data[i].timeInterval === Dbm.PREVIOUS_MONTH) {
					tmp = Dbm.getPreviousPeriod(data[i]);
					start = tmp.startDate;
					end = tmp.endDate;
				}
			}
			data[i].startDate = start;
			data[i].endDate = end;

			len > 1 ? i-- : i++;
			if (!data[i]) { break; }
		}
		if (len === 1) {
			if (typeof data[0].timeFrame === 'string') {
				str = data[0].timeFrame === Dbm.WEEK ? 'Weekly' : data[0].timeFrame === Dbm.MONTH ? 'Monthly' : 'Daily';
			} else {
				str = data[0].timeFrame.name;
			}
			tmp = format(data[0].startDate);
			str += ' <span>from</span> ' + tmp + ' <span>until</span> ';
			if (Dbm.isReportPage || Dbm.SHARED_REPORT || tmp === format(data[0].endDate)) {
				str += format(data[0].endDate);
			} else {
				today = new Date();
				tmp = format(data[0].endDate);
				if (format(today) === tmp) { str += 'today'; }
				else {
					yesterday = format(Dbm.date.find(-1, today));
					if (yesterday === tmp) { str += 'yesterday'; }
					else { str += tmp; }
				}
			}
		} else if (Dbm.isWeekCompare(data)) {
			str = 'Week Ending on ' + Dbm.date('M. jS Y', data[1].endDate) + '<span> Compared To </span>Week Ending on ' + Dbm.date('M. jS Y', data[0].endDate);
		} else if (Dbm.isMonthCompare(data)) {
			str = Dbm.date('M. Y', data[1].endDate) + '<span> Compared To </span>' + Dbm.date('M. Y', data[0].startDate);
		} else {
			format = Dbm.date.format('M. jS Y');
			str = format(data[1].startDate) + ' - ' + format(data[1].endDate) + '<span> Compared To </span>' + format(data[0].startDate) + ' - ' + format(data[0].endDate);
		}

		return str;
	},
	getSingleDateString: function(data) {
		var format = Dbm.date.format(Dbm.user_date_format),
			len,
			str = '',
			offset,
			s,
			e;

		if (!Array.isArray(data)) { data = [data]; }
		len = data.length;

		if (len === 1) {
			offset = Dbm.getSingleDateOffset(data[0]);

			if (offset) { str = 'Last ' + offset + ' days <span>from</span> '; }
			str += format(data[0].endDate);

		} else {
			format = Dbm.date.format('M. jS Y');
			switch (data[0].timeInterval) {
				case Dbm.PREVIOUS_PERIOD:
					data[0] = Dbm.getPreviousSinglePeriod(data[1]);
					if (data[1].timeFrame.value === Dbm.WEEK) {
						str = 'Last 7 days from ' + format(data[1].endDate) + '<span> Compared To </span>Last 7 days from ' + format(data[0].endDate);
					} else if (data[1].timeFrame.value === Dbm.MONTH) {
						str = 'Last 28 days from ' + format(data[1].endDate) + '<span> Compared To </span>Last 28 days from ' + format(data[0].endDate);
					}
					break;
				case Dbm.PREVIOUS_YEAR:
					data[0] = Dbm.getPreviousSingleYear(data[1]);
					break;
			}
			if (!str) {
				s = format(data[1].startDate);
				e = format(data[1].endDate);
				str = s === e ? s : (s + ' - ' + e);
				str += '<span> Compared To </span>';
				s = format(data[0].startDate);
				e = format(data[0].endDate);
				str += s === e ? s : (s + ' - ' + e);
		   }
	   }

		return str;
	},
	isMonthCompare: function(dates) {
		if (!Array.isArray(dates) || dates.length < 2) { return false; }
		return (+dates[1].timeInterval === 1) &&
				(dates[0].timeInterval === Dbm.PREVIOUS_PERIOD) &&
				(typeof dates[1].timeFrame === 'string' ? (dates[1].timeFrame === Dbm.MONTH) : (dates[1].timeFrame.value === Dbm.MONTH));
	},
	isWeekCompare: function(dates) {
		if (!Array.isArray(dates) || dates.length < 2) { return false; }

		return (+dates[1].timeInterval === 1) &&
				(dates[0].timeInterval === Dbm.PREVIOUS_PERIOD) &&
				(typeof dates[1].timeFrame === 'string' ? (dates[1].timeFrame === Dbm.WEEK) : (dates[1].timeFrame.value === Dbm.WEEK));
	},
	getPreviousPeriod: function(range) {
		if (!range) { return; }
		var ret = {timeInterval: Dbm.PREVIOUS_PERIOD, timeFrame: range.timeFrame, includeLastPeriod: range.includeLastPeriod},
			i = 1,
			iter,
			tmp;

		if (!isNaN(range.timeInterval)) {
			iter = Dbm.getDateIterator(range.timeFrame.value, range.includeLastPeriod, range.endDate);
			tmp = +range.startDate;
			while (tmp <= +iter.previous()) { i++; }
			ret.endDate = iter.get();
			while (i--) { iter.previous(); }
			ret.startDate = Dbm.date.find(1, iter.get());
		} else if (range.timeInterval === Dbm.DATE_CUSTOM) {
			i = Dbm.date.diff(range.startDate, range.endDate);
			ret.endDate = Dbm.date.find(-1, range.startDate);
			ret.startDate = Dbm.date.find(-i, ret.endDate);
		} else {
			if (range.timeInterval === Dbm.PREVIOUS_WEEK) {
				iter = Dbm.getDateIterator(Dbm.WEEK, false, range.startDate);
			} else {
				iter = Dbm.getDateIterator(Dbm.MONTH, false, range.startDate);
			}
			ret.includeLastPeriod = false;
			ret.endDate = Dbm.date.round(iter.get());
			ret.startDate = Dbm.date.find(1, iter.previous());
		}
		return ret;
	},
	getPreviousYear: function(range) {
		var ret;
		if (range) {
			ret = {timeInterval: Dbm.PREVIOUS_YEAR, timeFrame: range.timeFrame, includeLastPeriod: range.includeLastPeriod};

			ret.endDate = Dbm.date.round(range.endDate);
			ret.startDate = Dbm.date.round(range.startDate);
			ret.endDate.setFullYear(ret.endDate.getFullYear()-1);
			ret.startDate.setFullYear(ret.startDate.getFullYear()-1);
		}

		return ret;
	},
	getPreviousSinglePeriod: function(range) {
		var ret = {timeInterval: Dbm.PREVIOUS_PERIOD, timeFrame: range.timeFrame, includeLastPeriod: true};

		ret.endDate = Dbm.date.find(-1, range.startDate);
		ret.startDate = Dbm.date.find(-Dbm.getSingleDateOffset(range), ret.endDate);
		return ret;

	},
	getPreviousSingleYear: function(range) {
		var ret = {timeInterval: Dbm.PREVIOUS_YEAR, timeFrame: range.timeFrame, includeLastPeriod: true};

		ret.endDate = Dbm.date.round(range.endDate);
		ret.startDate = Dbm.date.round(range.startDate);
		ret.endDate.setFullYear(ret.endDate.getFullYear()-1);
		ret.startDate.setFullYear(ret.startDate.getFullYear()-1);

		return ret;
	},
	getSingleDateOffset: function(range) {
		var timeFrame = typeof range.timeFrame === 'string' ? range.timeFrame : range.timeFrame.value;
			return timeFrame === Dbm.WEEK ? 7 :
					timeFrame === Dbm.MONTH ? 28 :
					0;
	},
	scrollTo: function(elem, offsetTop, callback) {
		var $elem,
			elemOffsetTop,
			elemOffsetHeight,
			scrollTop,
			windowHeight,
			counter = 1;

		if (!elem) {
			if (callback && typeof callback === 'function') {
				return callback();
			}
		}

		$elem = $(elem);
		elemOffsetTop = $elem.offset().top;
		windowHeight = window.innerHeight;
		//Position the element at <code>offsetTop</code> from the window top,
		//or center it vertically.
		if (!isNaN(offsetTop) && offsetTop !== null) {
			scrollTop = Math.max(0, elemOffsetTop - offsetTop);
		} else {
			elemOffsetHeight = elem.offsetHeight/2;
			scrollTop = Math.max(0, (elemOffsetTop + elemOffsetHeight)  - (windowHeight / 2));
		}

		$("html,body").stop().animate({scrollTop: Math.ceil(scrollTop)}, function() {
			if (counter-- > 0) {
				if (callback && typeof callback === 'function') {
					return callback();
				}
			}
		});
	},
	promptUpgrade: function() {
		var modal = new Dbm.Modal();
		modal.setTitle('Plan limit reached');
		modal.setContent('You\'ve reached your plan\'s data source limit.<br>Please consider upgrading your account to enjoy the full power of Megalytic.');
		modal.setBtnText(Dbm.Modal.BTN_PRIME, '<i class="fa fa-check"> Upgrade</i>');
		modal.on(Dbm.Modal.SUCCESS, function() {
			modal.close();
			window.location = '/manage?section=payment-section';
		});
		modal.on(Dbm.HIDDEN, function() {
			modal.destroy();
			modal = null;
		});

		modal.open();
	},
	signInTwitterCallback: function(win) {
		var url, name, features, width, height, left, top;

		if (!win) {
			url = siteInfo.siteSecureUrl + '/oauth/get-twitter-auth-token?callback=' + siteInfo.siteSecureUrl + '/oauth/get-twitter-access-token',
			name = '_blank',
			features = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,personalbar=no,dependent=yes,dialog=yes',
			width = Math.min(Math.max(Math.floor(window.screen.availWidth * 50 / 100), 600), window.screen.availWidth),
			height = Math.min(Math.max(Math.floor(window.screen.availHeight * 75 / 100), 600), window.screen.availHeight),
			left = Math.round((window.screen.availWidth - width) / 2),
			top = Math.round((window.screen.availHeight - height) / 2);
			features += ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
			window.open(url, name, features);
		} else {
			win.close();
			console.log('Twitter auth process completed.');
		}
	},
	setUserDateFormat: function(locale) {
		if (locale && Dbm.date) {
			if (Dbm.date.FORMAT[locale]) {
				Dbm.user_date_format = Dbm.date.FORMAT[locale];
			}
		}
	}

};

Dbm.statusMap = {};
Dbm.statusMap[Dbm.CONNECTED] =  {display: 'Connected'};
Dbm.statusMap[Dbm.AUTH_ERROR] =  {display: 'Authorization error', title: 'An authorization error occurred.'};
Dbm.statusMap[Dbm.ERROR] = {display: 'Disconnected', title: 'An error occurred.'};

Dbm.svg_bug = (Dbm.isSafari && window.navigator.userAgent.toLowerCase().indexOf('version/7.') === -1) || Dbm.isMSIE;
Dbm.handlers = {};
Dbm.handlers[Dbm.PROFILE_ADD] = [];
Dbm.handlers[Dbm.MEDIA_CHANGE] = [];

Dbm.addEventDispatcher(Dbm);

/**
 * Adds support for swipe events on the given element.
 * Supports single touch swipeleft, swiperight, swipeup and swipedown.
 * @param {HTMLElement} element The element to attach the listeners to.
 * @constructor Swipe
 */
function Swipe(element) {
	this.element = element;
	this.x = null;
	this.y = null;
	this.deltaX = 0;
	this.deltaY = 0;
	this.timer = 0;
	this.handlers = {};
	this.handlers[Swipe.LEFT] = [];
	this.handlers[Swipe.RIGHT] = [];
	this.handlers[Swipe.UP] = [];
	this.handlers[Swipe.DOWN] = [];

	this.ongoingtouch = null;
	this.isBusy = false;
	this.addListeners();
}

Swipe.LEFT = 31001;
Swipe.RIGHT = 31002;
Swipe.UP = 31003;
Swipe.DOWN = 31004;

Swipe.prototype = {
	constructor: Swipe,
	/**
	 * @static
	 * @property {int} Swipe#DIST_THRESH The distance a finger moves to be called a swipe.
	 * @property {int} Swipe#TIME_THRESH The amount of milliseconds a finger must complete the distance to be called a swipe.
	 */
	DIST_THRESH: 80,
	TIME_THRESH: 300,
	addListeners: function() {
		this.element.addEventListener('touchstart', this, false);
	},
	removeListeners: function() {
		this.element.removeEventListener('touchstart', this, false);
	},
	handleEvent: function(e) {
		var type = e.type,
			self = this;

		switch (type) {
			case 'touchstart':
				if (e.touches.length === 1 && !this.ongoingtouch) {
					this.ongoingtouch = e.changedTouches[0];
					this.element.addEventListener('touchmove', this, false);
					this.element.addEventListener('touchend', this, false);
					this.element.addEventListener('touchleave', this, false);
					this.element.addEventListener('touchcancel', this, false);
					this.timer = setTimeout(function() { self.endHandler(); }, this.TIME_THRESH);
				}
				break;
			case 'touchmove':
				this.moveHandler(e);
				break;
			case 'touchend': case 'touchleave': case 'touchend':
				this.endHandler();
				break;
		}
	},
	moveHandler: function(e) {
		var touch = e.changedTouches[0];
		if (e.touches.length === 1 && touch && touch.identifier === this.ongoingtouch.identifier) {
			if (this.x !== null) {
				this.deltaX = touch.pageX - this.x;
			} else {
				this.x = touch.pageX;
			}
			if (this.y !== null) {
				this.deltaY = touch.pageY - this.y;
			} else {
				this.y = touch.pageY;
			}

			this.ongoingtouch = touch;
			if (this.isSwipe()) { this.endHandler(); }
		}
	},
	endHandler: function() {
		var type;

		if (this.isBusy) { return; }

		this.isBusy = true;

		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);
		this.element.removeEventListener('touchleave', this, false);
		this.element.removeEventListener('touchcancel', this, false);
		clearTimeout(this.timer);

		if (this.isSwipe()) {
			type = this.getType();
			type && this.trigger(type, this.ongoingtouch);
		}

		this.ongoingtouch = null;
		this.x = this.y = null;
		this.deltaX = this.deltaY = 0;
		this.isBusy = false;
	},
	isSwipe: function() {
		return Math.abs(this.deltaX) > this.DIST_THRESH || Math.abs(this.deltaY) > this.DIST_THRESH;
	},

	/**
	 * Retreives the appropriate swipe event type or undeinfed is this is not a swipe.
	 * @returns {Number|undefined} Swipe.LEFT, Swipe.RIGHT, Swipe.UP or Swipe.DOWN.
	 * @function Swipe#getType
	 */
	getType: function() {
		var ratio = Math.abs(this.deltaX/this.deltaY);
		//Swipe left or right.
		if (ratio > 2) {
			return this.deltaX > 0 ? Swipe.RIGHT : Swipe.LEFT;

		//Swipe up or down.
		} else if (ratio < 0.5) {
			return this.deltaY > 0 ? Swipe.DOWN : Swipe.UP;
		}
	},

	destroy: function() {
		var prop = Object.getOwnPropertyNames(this),
			i = -1,
			len = prop.length;

		this.removeListeners();

		while (++i < len) { delete this[prop[i]]; }
	}
};

Dbm.addEventDispatcher(Swipe.prototype);
Dbm.Swipe = Swipe;



/**
 * The base object from which all control panels inherit.
 *
 * @name Dbm.cPanel
 * @constructor cPanel
 */
function cPanel() {}

cPanel.OPEN = 1001122;

cPanel.prototype = {
	constructor: cPanel,
	createScheduler: function() {},
	updateReport: function() {},
	_open: function() {
		if (!this.isOpen()) {
			Dbm.addClass(this.element, 'in');
		}
		this.element.style.height = '';
	},
	_close: function() {
		if (this.isOpen()) {
			Dbm.removeClass(this.element, 'in');
		}
		this.element.style.height = '0px';
	},
	isOpen: function() {
		return Dbm.hasClass(this.element, 'in');
	},
	open: function(dirty) {
		if (dirty === true) {
			this._open();
		} else {
			this.$element.collapse('show');
		}
	},
	close: function(dirty) {
		if (dirty === true) {
			this._close();
		} else {
			this.$element.collapse('hide');
		}
	},
	toggle: function() {
		this.isOpen() ? this.close() : this.open();
	},
	updateDetails: function(report) {
		this.detailPanel.update(report);
	},
	showScheduler: function() {
		if (!this.scheduler) { this.createScheduler(); }
		this.scheduler.open();
	},
	block: function() {
		if (this.detailPanel) {
			this.detailPanel.disableActionBtns();
		}
		if (this.reportList) {
			this.reportList.block();
		}
	},
	release: function() {
		if (this.detailPanel) {
			this.detailPanel.enableActionBtns();
		}
		if (this.reportList) {
			this.reportList.release();
		}
	},
	handleEvent: function(e) {
		var type = e.type;

		switch (type) {
			case 'click':
				this.clickHandler(e);
				break;
			case 'submit':
				e.preventDefault();
				break;
		}
	}
};

Dbm.addEventDispatcher(cPanel.prototype);

Dbm.cPanel = cPanel;


function AccountSettings() {
	this.dom = {};
	this.element = document.getElementById('account-settings');
	this.dom.btn = this.element.firstElementChild;
	this.dom.list = this.dom.btn.getElementsByTagName('ul')[0];
	this.addListeners();
}

AccountSettings.prototype = {
	isOpen: function() {
		return Dbm.hasClass(this.dom.btn, 'open');
	},
	open: function() {
		var self = this;
		if (!this.isOpen()) {
			this.dom.list.style.display = 'block';
			setTimeout(function() {
				Dbm.addClass(self.dom.btn, 'open');
				document.addEventListener('mousedown', self, true);
			}, 50);
		}
	},
	close: function() {
		var self = this;
		if (this.isOpen()) {
			Dbm.removeClass(this.dom.btn, 'open');
			setTimeout(function() {
				self.dom.list.style.display = 'none';
				document.removeEventListener('mousedown', self, true);
			}, 50);
		}
	},
	toggle: function() {
		if (this.isOpen()) {
			this.close();
		} else {
			this.open();
		}
	},
	setImage: function(img) {
		if (img && typeof img === 'string') {
			this.element.querySelector('img').src = img;
			if (Dbm.activeUser) {
				Dbm.activeUser.imageLink = img;
			}
		}
	},
	setName: function(first, last) {
		var node, i;
		if (typeof first === 'string') {
			node = document.getElementsByClassName('user-fname');
			i = node.length;
			while (i--) { node[i].textContent = first; }
			if (Dbm.activeUser) {
				Dbm.activeUser.firstName = first;
			}
		}
		if (typeof last === 'string') {
			if (Dbm.activeUser) {
				Dbm.activeUser.lastName = last;
			}
		}
		if (Dbm.activeUser) {
			Dbm.activeUser.name = Dbm.activeUser.firstName + ' ' + Dbm.activeUser.lastName;
		}
	},
	setEmail: function(email) {
		if (typeof email === 'string' && Dbm.activeUser) {
			Dbm.activeUser.email = email;
		}
	},
	addListeners: function() {
		this.dom.btn.addEventListener('click', this, false);
	},
	handleEvent: function(e) {
		var target = e.target;

		switch (e.type) {
			case 'touchstart':
				if (e.currentTarget === document) {
					if (!Dbm.contains(target, this.element)) {
						e.stopPropagation();
						e.preventDefault();
						this.close();
					}
				}
				break;
			case 'click':
				if (target === this.dom.btn || (target !== this.dom.list && !Dbm.contains(target, this.dom.list))) {
					this.toggle();
				}
				break;
			case 'mousedown':
				if (!Dbm.contains(target, this.element)) {
					e.stopPropagation();
					e.preventDefault();
					this.close();
				}
		}
	}
};

Dbm.AccountSettings = AccountSettings;

function FileUploader(info) {
	this.handlers = {};
	this.handlers[FileUploader.SUCCESS] = [];
	this.handlers[FileUploader.ERROR] = [];
	
	return this.init(info);
}

FileUploader.prototype = {
	constructor: FileUploader,
	init: function(info) {
		var i = -1, len, input;

		if (info && typeof info === 'object') {
			this.action = info.action;

			this.form = info.form.cloneNode(true);
			this.form.innerHTML = '';

			len = info.form.elements.length;

			while (++i < len) {
				if (info.form.elements[i].type === 'file') {
					input = info.form.elements[i];
					input.parentNode.insertBefore(input.cloneNode(true), input);
					this.form.appendChild(input);
				}
			}
			this.form.setAttribute('enctype', "multipart/form-data");
			this.form.setAttribute('method', "POST");
			this.form.setAttribute('action', this.action);
			this.form.setAttribute('target', 'upload-iframe');

			if (info.fields) { this.process(info.fields); }
		}
		return this;
	},
	process: function(fields) {
		var i = -1,
			len = fields && fields.length,
			input;

		while (++i < len) {
			input = document.createElement('input');
			input.setAttribute('type', fields[i].type);
			input.setAttribute('name', fields[i].name);
			input.value = fields[i].value;
			this.form.appendChild(input);
		}
	},
	upload: function() {
		var frame = document.createElement('iframe'),
			body = document.body,
			frameBody;


		frame.name = 'upload-iframe';
		frame.style.display = 'none';
		if (Dbm.isMSIE && this.action) {
			frame.src = this.action;
		}
		body.appendChild(frame);

		this.frame = frame;

		frameBody = frame.contentDocument.body;

		if (!frameBody) {
			frame.addEventListener(Dbm.isMSIE ? 'load' : 'DOMContentLoaded', this, false);
		} else {
			this.submit();
		}
	},
	submit: function() {
		var frameBody = this.frame.contentDocument.body;
		frameBody.appendChild(this.form);
		this.form.submit();
		this.checkReady();
	},
	handleEvent: function(e) {
		this.frame.removeEventListener(e.type, this, false);
		this.submit();
	},
	checkReady: function() {
		var self = this,
			frame = this.frame;

		this.timer = setInterval(function() {
			var res;
			if (frame.contentDocument && (res = frame.contentDocument.getElementById('SERVER_RESPONSE'))) {
				clearInterval(self.timer);
				if (res.name === 'error') {
					self.trigger(FileUploader.ERROR, res.value);
				} else {
					self.trigger(FileUploader.SUCCESS, res.value);
				}
			}
		}, 100);
	},
	destroy: function() {
		var prop = Object.getOwnPropertyNames(this),
			i = -1,
			len = prop.length;
	
		if (this.frame && this.frame.parentNode) {	
			this.frame.parentNode.removeChild(this.frame);
		}	
		while (++i < len) {
			delete this[prop[i]];
		}
	}
};

FileUploader.SUCCESS = 43001;
FileUploader.ERROR = 43002;

Dbm.addEventDispatcher(FileUploader.prototype);

Dbm.FileUploader = FileUploader;



function Plan(planInfo, allPlans) {
	if (!planInfo || typeof planInfo !== 'object') { throw new TypeError(); }

	this.planName = planInfo.planName;
	this.whiteLabel = planInfo.whiteLabel;
	this.billingInterval = planInfo.billingInterval;
	this.billingStatus = planInfo.billingStatus;
	this.price = planInfo.price;
	this.isTrial = planInfo.isTrial;
	this.subscriptionId = planInfo.subscriptionId;
	this.sourceCount = planInfo.sourceCount;
	this.datasources = planInfo.datasources;
	this.nextPayment = planInfo.nextPayment;
	this.allPlans = allPlans || Dbm.availablePlans;
}

Plan.INTERVAL_MONTHLY = 'monthly';
Plan.INTERVAL_YEARLY = 'yearly';
Plan.TRIAL_ID = 'trialMegalytic';

Plan.prototype = {
	constructor: Plan,
	update: function(planInfo) {
		if (!planInfo || typeof planInfo !== 'object') { return; }

		if (planInfo.planName) { this.name = planInfo.planName; }
		if (planInfo.hasOwnProperty('whiteLabel')) { this.whiteLabel = planInfo.whiteLabel; }
		if (planInfo.billingInterval) { this.billingStatus = planInfo.billingInterval; }
		if (planInfo.billingStatus) { this.billingStatus = planInfo.billingStatus; }
		if (planInfo.hasOwnProperty('price')) { this.price = planInfo.price; }
		if (planInfo.subscriptionId) { this.subscriptionId = planInfo.subscriptionId; }
		if (planInfo.hasOwnProperty('isTrial')) { this.isTrial = planInfo.isTrial; }
		if (planInfo.sourceCount) { this.sourceCount = planInfo.sourceCount; }
		if (planInfo.datasources) { this.datasources = planInfo.datasources; }
		if (planInfo.nextPayment) { this.nextPayment = planInfo.nextPayment; }
	},
	canAddSource: function(n) {
		if (n && !isNaN(n)) { return this.sourceCount + n <= this.datasources; }
		return this.datasources - this.sourceCount > 0;
	},
	addSource: function(n) {
		if (!n || isNaN(n)) { n = 1; }
		this.sourceCount = Math.min(this.sourceCount + n, this.datasources);
	},
	removeSource: function(n) {
		if (!n || isNaN(n)) { n = 1; }
		this.sourceCount = Math.min(this.sourceCount - n, 0);
	},
	setSourceCount: function(n) {
		if (n !== undefined && !isNaN(n)) {
			this.sourceCount = Math.min(n, this.datasources);
		}
	},
	canWhiteLabel: function() {
		return Boolean(this.whiteLabel);
	},
	getPlanNames: function() {
		if (!this.allPlans) { return []; }
		var ret = [],
			i = -1,
			len = this.allPlans.length;

		while (++i < len) {
			if (!this.allPlans[i].isTrial && this.allPlans[i].whiteLabel) { continue; }
			ret.push(this.allPlans[i].planName);
		}
		return ret;
	},
	getPlan: function(subscriptionId, whiteLabel) {
		if (subscriptionId && this.allPlans) {
			if (whiteLabel) {
				subscriptionId += 'WL';
			}
			return this.getPlanBySubscriptionId(subscriptionId);
		}
		return {};
	},
	getPlanByName: function(name) {
		return this._get('planName', name);
	},
	getPlanBySubscriptionId: function(id) {
		return this._get('subscriptionId', id);
	},
	_get: function(name, value) {
		var i = -1,
			len;
	
		if (this.allPlans) {
			len = this.allPlans.length;
			while (++i < len) {
				if (this.allPlans[i][name] === value) {
					return this.allPlans[i];
				}
			}
		}
		return {};
	}
};

Dbm.Plan = Plan;

try {
	window.addEventListener('beforeunload', function(e) {
		Dbm.errorHandler = function() {};
	}, false);
} catch(e) {};

})(window.jQuery, window.d3, window.Modernizr);