/**
* Date utility.
* @author Yaron Elyashiv
* @param {Object} dbm Global Dbm object.
*
*/
(function(dbm) {
	var DAY = 86400000,
	MONTH = DAY*30,
	YEAR = DAY*365,
	SQL_REG = /([\d]{4})\-([\d]{2})\-([\d]{2})/,
	FORMAT_REG = /([a-z]{1})|([^\w]+)/gi,
	DOF = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	DOF_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	MON_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	ENG_SUFFIX = {1:'st', 2:'nd', 3:'rd',21:'st',22:'nd',23:'rd',31:'st'},
	DPM = {1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31},
	FORMAT = {
		US: 'm/d/Y',
		W_EUR: 'd/m/Y',
//		E_EUR: 'Y/m/d',
//		JP: 'm/d/y',
		SQL: 'Y-m-d'
	},

	/**
	 * @param {String} format The desired date format.
	 * @param {Mixed} [date] Any value the can be converted to a Date object. Default: today's date.
	 * @return String
	 */
	main = function(format, date) {
		var tmp, i = -1, len, ret = '';
		if (typeof format !== 'string' || !(tmp = format.match(FORMAT_REG))) return 'Invalid Format';
		date = canConvertToDate(date) ? toDateObj(date) : new Date();
		len = tmp.length;
		while (++i < len) {
			if (typeof _f[tmp[i]] === 'function') {
				switch(tmp[i]) {
					case 'S':
						ret += _f[tmp[i]](_f.j(date));
						break;
					default:
						ret += _f[tmp[i]](date);
				}
			} else {
				ret += tmp[i];
			}
		}
		return ret;
	},
	pad = dbm.pad,
	format = function(dateFormat) { return function(date) { return main(dateFormat, date); }; },
	isLeapYear = function(year) {return Number(year)%4 === 0;},
	canConvertToDate = function(d) { 
		return d instanceof Date || 
			((d !== undefined && d !== null) && (isNaN(d) ? true : d = Number(d)) && new Date(d).toString() !== 'Invalid Date');
	},
	isValidDateString = function(d) { return (typeof d === 'string') && isNaN(d) && new Date(d).toString() !== 'Invalid Date'; },
	isValidRange = function(s, e) { return toDateObj(s) <= toDateObj(e); },
	inCalendar = function(month, day, year) {
		var m = Number(month), d = Number(day);
		if (Number(m) === 2 && Number(d) === 29) return isLeapYear(year);
		return d > 0 && d <= DPM[m];
	},
	round = function(d) {
		if (!(d instanceof Date)) {
			d = toDateObj(d);
		}
		return new Date(d.getFullYear(), d.getMonth(), d.getDate());
	},
	_f = {

//Day of the month, 2 digits with leading zeros

		d: function(d) { var ret = d.getDate(); return ret < 10 ? '0' + ret : ret; },

//A textual representation of a day, three letters

		D: function(d) { return DOF_SHORT[d.getDay()]; },

//Day of the month without leading zeros

		j: function(d) { return d.getDate(); },

//A full textual representation of the day of the week

		l: function(d) { return DOF[d.getDay()]; },

//ISO-8601 numeric representation of the day of the week

		N: function(d) { return d.getDay()+1; },

//English ordinal suffix for the day of the month, 2 characters

		S: function(n) { return ENG_SUFFIX[n] ? ENG_SUFFIX[n] : 'th';},

//Numeric representation of the day of the week

		w: function(d) { return d.getDay(); },

//The day of the year (starting from 0)

		z: function(d) {
			var ret = 0, day = d.getDate(), month = d.getMonth()+1, year = d.getFullYear();
			while (--month > 0) {
				ret += DPM[month];
				if (month === 2 && isLeapYear(year)) ret++;
			}
			ret += day;
			return ret;
		},

//ISO-8601 week number of year, weeks starting on Monday

		W: function(d) { return Math.ceil(_f.z(d)/7); },

//A full textual representation of a month, such as January or March

		F: function(d) { return MON[d.getMonth()]; },

//Numeric representation of a month, with leading zeros

		m: function(d) { var ret = d.getMonth()+1; return pad(ret); },

//A short textual representation of a month, three letters

		M: function(d) { return MON_SHORT[d.getMonth()]; },

//Numeric representation of a month, without leading zeros

		n: function(d) { return d.getMonth()+1; },

//Number of days in the given month

		t: function(d) { return d.getMonth() === 1 && isLeapYear(d.getFullYear()) ? DPM[d.getMonth()+1]+1 : DPM[d.getMonth()+1]; },

//Whether it's a leap year

		L: function(d) { return isLeapYear(d.getFullYear()) ? 1 : 0; },

//A full numeric representation of a year, 4 digits

		Y: function(d) { return d.getFullYear(); },

//A two digit representation of a year

		y: function(d) { var ret = String(d.getFullYear()).match(/[0-9]{2}$/); return ret !== null ? ret[0] : _f.y(new Date()); },

//Lowercase Ante meridiem and Post meridiem

		a: function(d) { return d.getHours() < 12 ? 'am' : 'pm'; },

//Uppercase Ante meridiem and Post meridiem

		A: function(d) { return _f.a(d).toUpperCase(); },

//12-hour format of an hour without leading zeros

		g: function(d) { var ret = d.getHours()%12; return ret === 0 ? 12 : ret; },

//24-hour format of an hour without leading zeros

		G: function(d) { return d.getHours(); },

//12-hour format of an hour with leading zeros

		h: function(d) { var ret = _f.g(d); return pad(ret); },

//24-hour format of an hour with leading zeros

		H: function(d) { var ret = _f.G(d); return pad(ret); },

//Minutes with leading zeros

		i: function(d) { var ret = d.getMinutes(); return pad(ret); },

//Seconds, with leading zeros

		s: function(d) { var ret = d.getSeconds(); return pad(ret); },

//MilliSeconds

		u: function(d) { return d.getMilliSeconds(); },

//Difference to Greenwich time (GMT) in hours

		O: function(d) {
			var ret = d.getTimezoneOffset()/60;
			if (ret >= 0) { return ret < 10 ? '+0' + ret + '00' : '+' + ret + '00'; }
			else { return ret > -10 ? '-0' + (-1*ret) + '00' : '-' + (-1*ret) + '00'; }
		},

//Difference to Greenwich time (GMT) with colon between hours and minutes

		P: function(d) { return _f.O(d).replace(/00$/, ':00');}
	},
	isDST = function() {
		var d = new Date(),
			standardTimezoneOffset = Math.max(new Date(d.getFullYear(), 0, 1).getTimezoneOffset(), 
				new Date(d.getFullYear(), 6, 1).getTimezoneOffset());
	
		return d.getTimezoneOffset() < standardTimezoneOffset;
	},		
	toUTC = function(d) {
		var date = toDateObj(d);
		return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
			date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
	},
	toDateObj = function(d) {
		var tmp;
		if (d instanceof Date) { return d; }
		else if (d === undefined || d === null) { return new Date(); }

	//YYYY-MM-DD date strings hours' are incorrectly set, ignoring the timezone offest.
	//We adjust by adding the timezone offset.
		if (SQL_REG.test(d.toString())) {
			tmp = d.toString().match(SQL_REG);
			d = new Date(Number(tmp[1]), Number(tmp[2])-1, Number(tmp[3]));
		} else {
			d = new Date(d);
		}
		return (d.toString() !== 'Invalid Date') && d;
	},
	diff = function(a, b, span) {
		var ret;
		span = span || 'day';
		if (!canConvertToDate(a) || !canConvertToDate(b) || typeof span !== 'string') return false;

		a = toDateObj(a);
		b = toDateObj(b);

		switch (span.toLowerCase()) {
			case 'milisecond':
				ret = a - b;
				break;
			case 'second':
				ret = Math.round((a - b)/1000);
				break;
			case 'minute':
				ret = Math.round((a - b)/1000/60);
				break;
			case 'hour':
				ret = Math.round((a - b)/1000/60/60);
				break;
			case 'day':
				ret = Math.round((a - b)/DAY);
				break;
			case 'month':
				ret = Math.round((a - b)/DAY/30);
				break;
			case 'year':
				ret = a.getFullYear() - b.getFullYear();
				break;
		}
		return Math.abs(ret);
	},
	toMilliseconds = function(n, span) {
		var ret = 0;
		switch (span.toLowerCase()) {
			case 'milisecond':
				ret = n;
				break;
			case 'second':
				ret = n*1000;
				break;
			case 'minute':
				ret = n*1000*60;
				break;
			case 'hour':
				ret = n*1000*3600;
				break;
			case 'day':
				ret = n*DAY;
				break;
			case 'week':
				ret = n*DAY*7;
				break;
			case 'month':
				ret = n*MONTH;
				break;
			case 'year':
				ret = n*YEAR;
				break;
		}
		return ret || 0;
	},
	toSeconds = function(n, span) { return toMilliseconds(n, span)/1000; },
	toMinutes = function(n, span) { return toMilliseconds(n, span)/(1000*60); },
	toHours = function(n, span) { return toMilliseconds(n, span)/(1000*3600); },
	toDays = function(n, span) { return parseInt(toMilliseconds(n, span)/DAY, 10); },
	toWeeks = function(n, span) { return parseInt(toMilliseconds(n, span)/(DAY*7), 10); },
	toMonths = function(n, span) { return parseInt(toMilliseconds(n, span)/MONTH, 10); },
	toYears = function(n, span) { return parseInt(toMilliseconds(n, span)/YEAR, 10); },

	/**
	 * Find a date in the past or future.
	 *
	 * @return {Date} Date object: The specified number of <code>span</code> from <code>fromDate</code>.
	 * @param {int} [n=0] The number of span unit to go backward or forward. 0 === today's date.
	 * @param {Date} [fromDate] The start date to count from. Any string|number that evaluates to a Date object. Defaults to today's date.
	 * @param {String} [span=day] The date span to use. Defaults to day.
	 */
	find = function(n, fromDate, span) {
		if (isNaN(n) || (n === 0 && fromDate === undefined)) return new Date(); //Return today's date

	//Check for a start date, or use today's date.
		if (fromDate && canConvertToDate(fromDate)) {
			fromDate = +toDateObj(fromDate);
		} else {
			fromDate = +new Date();
		}
//@todo this part is a little buggy.
		if (typeof span === 'string' && span !== '') {
			return toDateObj(fromDate + toMilliseconds(n, span));
		} else {
			return toDateObj(fromDate + DAY*n);
		}
	},	
	toTime = function(n, unit) {
		var str = '',
			units = [3600,60, 1], //Hours, minutes, and seconds.
			i = -1,
			len = units.length,
			absN = Math.abs(n),
			tmp;
		
		if (isNaN(absN)) { return; }
		if (unit && unit !== 'second') {
			absN = toSeconds(absN, unit);
		}
		while (++i < len) {
			tmp = Math.floor(absN / units[i]);
			str += tmp < 10 ? '0' + tmp : tmp;
			if (len - i > 1) { str += ':'; }
			absN %= units[i];
		}
		if (n < 0) { str = '-' + str; }
		return str;
	},
	timeStringToSeconds = function(str) {
		var units = [1, 60, 3600], //Hours, minutes, and seconds.
			i = -1,
			len,
			parts,
			n = 0;
	
		parts = str.toString().split(':').reverse();
		len = parts.length;
		while (++i < len) {
			n += +parts[i] * units[i];
		}
		return n;
	};

	function DateIterator(d) {
		this.set(d);
	};

	DateIterator.prototype = {
		constructor: DateIterator,
		next: function() {
			var day = this.current.getDate();
			this.current.setDate(day+1);
			this.current.setHours(0);
			if (this.current.getDate() === day) {
				this.current.setDate(day+1);
				this.current.setHours(0);
			}
			return new Date(this.current);
		},
		previous: function() {
			var day = this.current.getDate();
			this.current.setDate(day-1);
			this.current.setHours(0);
			if (this.current.getDate() === day) {
				this.current.setDate(day-1);
				this.current.setHours(0);
			}
			return new Date(this.current);
		},
		compare: function(d) {
			if (!canConvertToDate(d)) { return; }
			var otherDate = round(d);
			return this.current < otherDate ? 1 : this.current > otherDate ? -1 : 0;
		},
		get: function() {
			return new Date(this.current);
		},
		set: function(d) {
			if (!canConvertToDate(d)) { throw new TypeError('Cannot convert to date: ' + d); }
			this.original = round(d);
			this.current = new Date(this.original);
		},
		isLastDay: function() {
			return this.compare(new Date()) === 0;
		}
	};

	function WeekIterator(d, endOfWeek) {
		this.set(d);
		if (!isNaN(endOfWeek) && endOfWeek <= WeekIterator.SATURDAY && endOfWeek >= WeekIterator.SUNDAY) {
			this.endOfWeek = endOfWeek;
		} else {
			this.endOfWeek = this.current.getDay();
		}
	};

	WeekIterator.SUNDAY = 0;
	WeekIterator.MONDAY = 1;
	WeekIterator.TUESDAY = 2;
	WeekIterator.WEDNESDAY = 3;
	WeekIterator.THURSDAY = 4;
	WeekIterator.FRIDAY = 5;
	WeekIterator.SATURDAY = 6;

	WeekIterator.prototype = Object.create(DateIterator.prototype);

	WeekIterator.prototype.constructor = WeekIterator;
	WeekIterator.prototype.next = function() {
		var date = this.current.getDate(),
			day = this.current.getDay(),
			diff = 7;

		if (day !== this.endOfWeek) {
			diff = day < this.endOfWeek ? this.endOfWeek - day : 7 - day + this.endOfWeek;
		}
		this.current.setDate(date+diff);
		this.current.setHours(0);
		return new Date(this.current);
	};
	
	WeekIterator.prototype.previous = function() {
		var date = this.current.getDate(),
			day = this.current.getDay(),
			diff = 7;

		if (day !== this.endOfWeek) {
			diff = day < this.endOfWeek ? 7 - this.endOfWeek + day: day - this.endOfWeek;
		}
		this.current.setDate(date-diff);
		this.current.setHours(0);
		return new Date(this.current);
	};
	
	WeekIterator.prototype.isLastDay = function() {
		return this.current.getDay() === this.endOfWeek;
	};
	

	function MonthIterator(d) {
		this.set(d);
	};

	MonthIterator.prototype = Object.create(DateIterator.prototype);

	MonthIterator.prototype.constructor = MonthIterator;
	MonthIterator.prototype.getLastDay = function() { return _f.t(this.current); };
	MonthIterator.prototype.next = function() {
		var date = this.current.getDate(),
			lastDayOfMonth = this.getLastDay(),
			month = this.current.getMonth();

		if (date !== lastDayOfMonth) {
			this.current.setDate(lastDayOfMonth);
		} else {
			this.current.setDate(1);
			if (month === 11) {
				this.current.setMonth(0);
				this.current.setYear(this.current.getFullYear() + 1);
			} else {
				this.current.setMonth(month + 1);
			}

			this.current.setDate(this.getLastDay());
		}

		this.current.setHours(0);
		return new Date(this.current);
	};
	
	MonthIterator.prototype.previous = function() {
		var month = this.current.getMonth();

		this.current.setDate(1);
		if (month === 0) {
			this.current.setMonth(11);
			this.current.setYear(this.current.getFullYear() - 1);
		} else {
			this.current.setMonth(month - 1);
		}
		this.current.setDate(this.getLastDay());

		this.current.setHours(0);
		return new Date(this.current);
	};
	
	MonthIterator.prototype.isLastDay = function() {
		return this.current.getDate() === this.getLastDay();
	};



	//Expose Public Methods.
	main.format = format;
	main.isLeapYear = isLeapYear;
	main.diff = diff;
	main.round = round;
	main.toTime = toTime;
	main.timeStringToSeconds = timeStringToSeconds;
	main.toMilliseconds = toMilliseconds;
	main.toSeconds = toSeconds;
	main.toMinutes = toMinutes;
	main.toHours = toHours;
	main.toDays = toDays;
	main.toWeeks = toWeeks;
	main.toMonths = toMonths;
	main.toYears = toYears;
	main.toUTC = toUTC;
	main.isDST = isDST;
	main.find = find;
	main.toDateObj = toDateObj;
	main.DateIterator = DateIterator;
	main.WeekIterator = WeekIterator;
	main.MonthIterator = MonthIterator;
	main.FORMAT = FORMAT;
	main.MODIFIED = '2013-10-07';

	dbm.date =  main;
	dbm.setUserDateFormat('US'); //Default date format
	
})(window.Dbm);

