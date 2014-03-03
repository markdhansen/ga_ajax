/**
 * Dependencies:
 * jQuery Bootstrap Modal
 * 
 * 
 * @param {type} dbm
 * @param {type} $
 * @returns {undefined}
 */
(function(dbm, $) {
	
function Modal() {
	var self = this;

	this.dom = {};

	this.element = this.create();
	$(this.element).one({
		'hide.bs.modal': function(e) { self.trigger(Modal.CLOSE, e); },
		'hidden.bs.modal': function(e) { self.trigger(Modal.HIDDEN, e); },
		'shown.bs.modal': function() { 
			if (document.body.className.indexOf('modal-open') === -1) {
				document.body.className += ' modal-open';
			}
		}
	});

	dbm.createStorage(this);

	this.props = {};
	this.handlers = {};
	this.handlers[Modal.SUCCESS] = [];
	this.handlers[Modal.CLOSE] = [];
	this.handlers[Modal.HIDDEN] = [];

	this.addListeners();
}

Modal.SUCCESS = 21000;
Modal.CLOSE = 21001;
Modal.HIDDEN = dbm.HIDDEN;

Modal.BTN_TOP = 10011;
Modal.BTN_PRIME = 10012;
Modal.BTN_SECOND = 10013;

Modal.COLOR_NATURAL = 'btn btn-default';
Modal.COLOR_GREEN = 'btn btn-success';
Modal.COLOR_RED = 'btn btn-danger';
Modal.COLOR_BLUE = 'btn btn-primary';
Modal.COLOR_LIGHT_BLUE = 'btn btn-info';

Modal.prototype = {
	constructor: Modal,
	create: function() {
		var elem = document.createElement('div'),
			dialog = elem.cloneNode(),
			content = elem.cloneNode();
		
		elem.className = 'modal fade';
		dialog.className = 'modal-dialog';
		content.className = 'modal-content';
		
		this.dom.content = content;
		this.dom.header = this.createHeader();
		this.dom.body = this.createBody();
		this.dom.footer = this.createFooter();
		
		content.appendChild(this.dom.header);
		content.appendChild(this.dom.body);
		content.appendChild(this.dom.footer);
		
		dialog.appendChild(content);
		elem.appendChild(dialog);
		return elem;
	},
	createHeader: function() {
		var head = document.createElement('div'),
			title = document.createElement('h4');

		head.className = 'modal-header';
		head.innerHTML = '<button type="button" class="close" aria-hidden="true">&times;</button>';
		head.appendChild(title);

		this.dom[Modal.BTN_TOP] = head.firstChild;
		this.dom.title = title;

		return head;
	},
	addSubtitle: function(txt) {
		if (!this.dom.subtitle) {
			this.dom.subtitle = document.createElement('p');
			this.dom.header.appendChild(this.dom.subtitle);
		}
		this._setContent(this.dom.subtitle, txt);
	},
	removeSubtitle: function() {
		if (this.dom.subtitle) {
			if (this.dom.subtitle.parentNode) {
				this.dom.subtitle.parentNode.removeChild(this.dom.subtitle);
			}
			delete this.dom.subtitle;
		}
	},	
	createBody: function() {
		var body = document.createElement('div');
		body.className = 'modal-body';
		return body;
	},
	createFooter: function() {
		var foot = document.createElement('div');
		foot.className = 'modal-footer';
		foot.innerHTML = '<a href="' + dbm.void0 + '" class="' + Modal.COLOR_NATURAL+ ' secondary">Cancel</a><a href="' + 
			dbm.void0 + '" class="' + Modal.COLOR_GREEN + '"><i class="fa fa-check"></i> Save</a>';

		this.dom[Modal.BTN_SECOND] = foot.firstChild;
		this.dom[Modal.BTN_PRIME] = this.dom[Modal.BTN_SECOND].nextSibling;

		return foot;
	},
	removeFooter: function() {
		if (this.dom.footer) {
			this.removeFooterButtons();
			if (this.dom.footer.parentNode) {
				this.dom.footer.parentNode.removeChild(this.dom.footer);
			}
			delete this.dom.footer;
		}
	},
	getElement: function() {
		return this.element;
	},
	getContent: function() {
		return this.dom && this.dom.content;
	},	
	getBody: function() {
		return this.dom && this.dom.body;
	},		
	getHeader: function() {
		return this.dom && this.dom.header;
	},		
	getTitle: function() {
		return this.dom && this.dom.title;
	},		
	getSubitle: function() {
		return this.dom && this.dom.subtitle;
	},		
	getHeaderBtn: function() {
		return this.dom && this.dom[Modal.BTN_TOP];
	},		
	getPrimeBtn: function() {
		return this.dom && this.dom[Modal.BTN_PRIME];
	},		
	getSecondBtn: function() {
		return this.dom && this.dom[Modal.BTN_SECOND];
	},
	getFooter: function() {
		return this.dom && this.dom.footer;
	},		
	addListeners: function() {
		this.element.addEventListener('click', this, false);
	},
	removeListeners: function() {
		this.element.removeEventListener('click', this, false);
	},
	handleEvent: function(e) {
		this.clickHandler(e);
	},
	clickHandler: function(e) {
		var primeBtn = this.dom[Modal.BTN_PRIME],
			secondBtn = this.dom[Modal.BTN_SECOND],
			headerBtn = this.dom[Modal.BTN_TOP],
			target = e.target;

		if (primeBtn && (target === primeBtn || dbm.contains(target, primeBtn))) {
			this.trigger(Modal.SUCCESS, e);
		} else if (headerBtn && (target === headerBtn || dbm.contains(target, headerBtn))) {
			this.close();
		} else if (secondBtn && (target === secondBtn || dbm.contains(target, secondBtn))) {
			this.close();
		}
	},
	setProperties: function(props) {
		var name;
		if (props && typeof props === 'object') {
			for (name in props) {
				this.element.setAttribute('data-' + name, props[name]);
				this.props[name] = props[name];
			}
		}
	},
	setTitle: function(title) {
		this._setContent(this.dom.title, title);
	},
	setContent: function(content) {
		this._setContent(this.dom.body, content);
	},
	setBtnText: function(btn, txt) {
		var button = btn === Modal.BTN_PRIME ? this.dom[Modal.BTN_PRIME] :
				btn === Modal.BTN_SECOND ? this.dom[Modal.BTN_SECOND] :
				null;
		if (button) {
			this._setContent(button, txt);
		}
	},	
	setPrimeBtnText: function(txt) {
		this._setContent(this.dom[Modal.BTN_PRIME], txt);
	},	
	setSecondBtnText: function(txt) {
		this._setContent(this.dom[Modal.BTN_SECOND], txt);
	},
	setBtnColor: function(btn, color) {
		var button = btn === Modal.BTN_PRIME ? this.dom[Modal.BTN_PRIME] :
				btn === Modal.BTN_SECOND ? this.dom[Modal.BTN_SECOND] :
				null,
			cls;
		
		if (button) {
			switch (color) {
				case Modal.COLOR_GREEN:
					cls = Modal.COLOR_GREEN;
					break;
				case Modal.COLOR_RED:
					cls = Modal.COLOR_RED;
					break;
				case Modal.COLOR_BLUE:
					cls = Modal.COLOR_BLUE;
					break;
				case Modal.COLOR_LIGHT_BLUE:
					cls = Modal.COLOR_LIGHT_BLUE;
					break;
			}
			if (cls) {
				if (btn === Modal.BTN_SECOND) { cls += ' secondary'; }
				button.className = cls;
			}
		}
	},	
	_setContent: function(elem, content) {
		if (content === undefined || content === null) return;

		if (typeof content === 'string') {
			elem.innerHTML = content;
		} else if (content.nodeType === 1 || content.nodeType === 11) {
			elem.innerHTML = '';
			elem.appendChild(content);
		}
	},		
	
	addPrimeBtn: function(btn) {
		if (btn === undefined || btn === null) return;

		if (typeof btn === 'string') {
			if (this.dom[Modal.BTN_PRIME]) {
				this.dom[Modal.BTN_PRIME].parentNode.removeChild(this.dom[Modal.BTN_PRIME]);
			}
			this.dom.footer.innerHTML += btn;
		} else if (btn.nodeType === 1 || btn.nodeType === 11) {
			if (this.dom[Modal.BTN_PRIME]) {
				this.dom.footer.insertBefore(btn, this.dom[Modal.BTN_PRIME]);
				this.dom.footer.removeChild(this.dom[Modal.BTN_PRIME]);
			} else {
				this.dom.footer.appendChild(btn);
			}
		}
		this.dom[Modal.BTN_PRIME] = this.dom.footer.lastChild;
	},
	
	addSecondBtn: function(btn) {
		if (btn === undefined || btn === null) return;

		if (typeof btn === 'string') {
			if (this.dom[Modal.BTN_SECOND]) {
				this.dom[Modal.BTN_SECOND].removeChild(this.dom[Modal.BTN_SECOND]);
			}
			this.dom.footer.innerHTML = btn + this.dom.footer.innerHTML;
		} else if (btn.nodeType === 1 || btn.nodeType === 11) {
			if (this.dom[Modal.BTN_SECOND]) {
				this.dom.footer.insertBefore(btn, this.dom[Modal.BTN_SECOND]);
				this.dom.footer.removeChild(this.dom[Modal.BTN_SECOND]);
			} else {
				this.dom.footer.appendChild(btn);
			}
		}
		this.dom[Modal.BTN_SECOND] = this.dom.footer.firstChild;
	},
	
	disableClose: function() {
		if (this.dom[Modal.BTN_TOP]) {
			this.dom[Modal.BTN_TOP].parentNode.removeChild(this.dom[Modal.BTN_TOP]);
			delete this.dom[Modal.BTN_TOP];
		}
		if (this.dom[Modal.BTN_SECOND]) {
			this.dom[Modal.BTN_SECOND].parentNode.removeChild(this.dom[Modal.BTN_SECOND]);
			delete this.dom[Modal.BTN_SECOND];
		}
	},
	close: function() {
		$(this.element).modal('hide');
	},
	open: function() {
		if (!this.element.parentNode) {
			document.body.appendChild(this.element);
		}
		$(this.element).modal('show');
	},
	removeFooterButtons: function() {
		this.dom.footer.innerHTML = '';
		delete this.dom[Modal.BTN_PRIME];
		delete this.dom[Modal.BTN_SECOND];
	},
	removeBtn: function(which) {
		var btn;
		switch (which) {
			case Modal.BTN_TOP:
				btn = this.dom[Modal.BTN_TOP];
				btn.parentNode && btn.parentNode.removeChild(btn);
				delete this.dom[Modal.BTN_TOP];
				break;
			case Modal.BTN_PRIME:
				btn = this.dom[Modal.BTN_PRIME];
				btn.parentNode && btn.parentNode.removeChild(btn);
				delete this.dom[Modal.BTN_PRIME];
				break;
			case Modal.BTN_SECOND:
				btn = this.dom[Modal.BTN_SECOND];
				btn.parentNode && btn.parentNode.removeChild(btn);
				delete this.dom[Modal.BTN_SECOND];
				break;
			default:
				if (this.dom[Modal.BTN_TOP]) {
					btn = this.dom[Modal.BTN_TOP];
					btn.parentNode && btn.parentNode.removeChild(btn);
					delete this.dom[Modal.BTN_TOP];
				}
				if (this.dom[Modal.BTN_PRIME]) {
					btn = this.dom[Modal.BTN_PRIME];
					btn.parentNode && btn.parentNode.removeChild(btn);
					delete this.dom[Modal.BTN_PRIME];
				}
				if (this.dom[Modal.BTN_SECOND]) {
					btn = this.dom[Modal.BTN_SECOND];
					btn.parentNode && btn.parentNode.removeChild(btn);
					delete this.dom[Modal.BTN_SECOND];
				}
				break;
		}
		return this;
	},
	destroy: function() {
		var prop = Object.getOwnPropertyNames(this),
			i = -1,
			len = prop.length;

		this.removeListeners();
		$(this.element).remove();

		while (++i < len) { delete this[prop[i]]; }
	}
};

dbm.addEventDispatcher(Modal.prototype);

dbm.Modal = Modal;


/**
 * Specialized modal for deleting stuff.
 * 
 * @name Dbm.DeleteModal
 * @constructor DeleteModal
 * @extends Modal
 */
function DeleteModal() {
	var self = this;

	this.dom = {};

	this.element = this.create();
	
	$(this.element).one({
		'hide.bs.modal': function(e) { self.trigger(Modal.CLOSE, e); },
		'hidden.bs.modal': function(e) { self.trigger(Modal.HIDDEN, e); }
	});

	dbm.createStorage(this);

	this.props = {};
	this.handlers = {};
	this.handlers[Modal.SUCCESS] = [];
	this.handlers[Modal.CLOSE] = [];
	this.handlers[Modal.HIDDEN] = [];

	this.addListeners();
}

DeleteModal.prototype = Object.create(Modal.prototype);

dbm.extend(DeleteModal, {
	createFooter: function() {
		var foot = document.createElement('div');
		foot.className = 'modal-footer';
		foot.innerHTML = '<a href="' + dbm.void0 + '" class="' + Modal.COLOR_NATURAL+ ' secondary">Cancel</a><a href="' + 
				dbm.void0 + '" class="' + Modal.COLOR_RED + ' delete"><i class="fa fa-times"></i> Delete</a>';

		this.dom[Modal.BTN_SECOND] = foot.firstChild;
		this.dom[Modal.BTN_PRIME] = this.dom[Modal.BTN_SECOND].nextSibling;

		return foot;
	}
});

dbm.DeleteModal = DeleteModal;


/**
 * Creates an overlay for a modal which slides into place.
 * Used instead of creating two Modal instances (not supported by Bootstrap).
 * 
 * @param {Modal} modal The modal to which the slider is attached.
 * @param {int} [dir=Slider.HORIZONTAL] The direction in which the slider is revealed. 
 * @constructor Slider
 */

function Slider(modal, dir) {
	this.dom = {};
	
	this.transitionEnd = dbm.getTransitionEnd();
	this.handlers = {};
	this.handlers[Modal.SUCCESS] = [];
	this.handlers[Modal.CLOSE] = [];
	this.handlers[Modal.HIDDEN] = [];
	
	if (dir === Slider.HORIZONTAL || dir === Slider.VERTICAL) {
		this.dir = dir;
	} else {
		this.dir = Slider.HORIZONTAL;
	}
	
	this.element = this.create();
	this.modal = modal;
	
	this.addListeners();
	modal.getContent().appendChild(this.element);
	this.element.parentNode.style.overflow = 'hidden';
}

Slider.HORIZONTAL = 10;
Slider.VERTICAL = 11;

Slider.prototype = Object.create(Modal.prototype);

dbm.extend(Slider, {
	constructor: Slider,
	isOpen: function() {
		return dbm.hasClass(this.element, 'in');
	},
	open: function() {
		var dir = this.dir,
			self = this;
		
		if (this.element.parentNode) {
			setTimeout(function() { 
				dbm.addClass(self.element, 'in');
				if (dir === Slider.HORIZONTAL) { self.element.style.marginLeft = '0'; }
				self.updateParentHeight();
				self = null;
			}, 20);
		}
	},
	close: function() {
		if (this.element.parentNode && this.isOpen()) {
			if (this.transitionEnd) {
				this.element.addEventListener(this.transitionEnd, this, false);
				dbm.removeClass(this.element, 'in');
				if (this.dir === Slider.HORIZONTAL) {
					this.element.style.marginLeft = '';
				}
				this.updateParentHeight();
				this.trigger(Modal.CLOSE);
			} else {
				dbm.removeClass(this.element, 'in');
				this.modal.element.style.overflow = '';
				if (this.dir === Slider.HORIZONTAL) {
					this.element.style.marginLeft = '';
				}
				this.updateParentHeight();
				this.trigger(Modal.CLOSE);
				this.trigger(Modal.HIDDEN);
			}
		}
	},
	updateParentHeight: function() {
		if (this.element.parentNode) {
			if (dbm.hasClass(this.element, 'in')) {
				this.element.parentNode.style.height = this.element.offsetHeight + 'px';
			} else {
				this.element.parentNode.style.height = '';
			}	
		}
	},
	setDirection: function(dir) {
		if (dir === Slider.HORIZONTAL) {
			if (!dbm.hasClass(this.element, 'horizontal')) {
				dbm.removeClass(this.element, 'vertical');
				dbm.addClass(this.element, 'horizontal');
				this.dir = dir;
			}
		} else if (dir === Slider.VERTICAL) {
			if (!dbm.hasClass(this.element, 'vertical')) {
				dbm.removeClass(this.element, 'horizontal');
				dbm.addClass(this.element, 'vertical');
				this.dir = dir;
			}
		}
	},	
	create: function() {
		var elem = document.createElement('div');
		
		elem.className = 'modal-slider';
		if (this.dir === Slider.HORIZONTAL) {
			elem.className += ' horizontal';
		} else {
			elem.className += ' vertical';
		}
		
		this.dom.header = this.createHeader();
		this.dom.body = this.createBody();
		this.dom.footer = this.createFooter();
		
		elem.appendChild(this.dom.header);
		elem.appendChild(this.dom.body);
		elem.appendChild(this.dom.footer);
		
		return elem;
	},
	createBody: function() {
		var body = document.createElement('div');
		body.className = 'slider-body';
		return body;
	},
	removeListeners: function() {
		this.dom[Modal.BTN_TOP].removeEventListener('click', this, false);
	},	
	handleEvent: function(e) {
		switch (e.type) {
			case 'click':
				this.clickHandler(e);
				break;
			case this.transitionEnd:
				this.element.removeEventListener(this.transitionEnd, this, false);
				this.modal.element.style.overflow = '';
				this.trigger(Modal.HIDDEN);
				break;
		}
	},	
	destroy: function() {
		var i = -1,
			prop = Object.getOwnPropertyNames(this),
			len = prop.length;

		if (this.element.parentNode) {
			this.element.parentNode.style.overflow = '';
			this.element.parentNode.removeChild(this.element);
		}
		
		while (++i < len) { delete this[prop[i]]; }
	}
});

Modal.Slider = Slider;

})(window.Dbm, window.jQuery);