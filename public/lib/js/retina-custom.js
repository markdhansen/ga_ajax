(function() {

	var root = (typeof exports === 'undefined' ? window : exports);
	var ignore = /imageUploads|spinner|loader|\@2x/;
	var MAX_TRY = 30;

	var config = {
		// Ensure Content-Type is an image before trying to load @2x image
		// https://github.com/imulus/retinajs/pull/45)
		check_mime_type: true,
		// Resize high-resolution images to original image's pixel dimensions
		// https://github.com/imulus/retinajs/issues/8
		force_original_dimensions: false
	};

	function Retina() {}

	Retina.configure = function(options) {
		if (options === null)
			options = {};
		for (var prop in options)
			config[prop] = options[prop];
	};

	Retina.init = function(context) {
		if (context === null)
			context = root;

		var existing_onload = context.onload || new Function;

		context.onload = function() {
			var images = document.getElementsByTagName("img"), retinaImages = [], i, image, src;
			for (i = 0; i < images.length; i++) {
				image = images[i];
				src = image.getAttribute("src");
				if (src && ignore.test(src)) { continue; }
				Retina.counter++;
				retinaImages.push(new RetinaImage(image));
			}

			setTimeout(Retina.check_if_done, 1000);
			existing_onload();
		};
	};

	Retina.isRetina = function() {
		var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                      (min--moz-device-pixel-ratio: 1.5),\
                      (-o-min-device-pixel-ratio: 3/2),\
                      (min-resolution: 1.5dppx)";

		if (root.devicePixelRatio > 1) { return true; }

		if (root.matchMedia && root.matchMedia(mediaQuery).matches) { return true; }

		return false;
	};

	Retina.counter = 0;

	Retina.isDone = function() {
		return Retina.counter === 0 || MAX_TRY-- <= 0;
	};

	Retina.check_if_done = function() {
		if (Retina.isDone()) {
			RetinaImagePath.set_confirmed_paths();
		} else {
			setTimeout(Retina.check_if_done, 1000);
		}
	};

	function RetinaImagePath(path, at_2x_path) {
		this.path = path;
		if (typeof at_2x_path !== "undefined" && at_2x_path !== null) {
			this.at_2x_path = at_2x_path;
			this.perform_check = false;
		} else {
			this.at_2x_path = path.replace(/\.\w+$/, function(match) {
				return "@2x" + match;
			});
			this.perform_check = true;
		}
	}


	RetinaImagePath.get_confirmed_paths = function() {
		var stor,
			paths;

		if (window.localStorage !== undefined && window.localStorage !== null) {
			stor = window.localStorage;
			paths = stor.getItem('RetinaImagePath.confirmed_paths');
			if (paths) {
				try {
					paths = JSON.parse(paths);
				} catch (e) {
					return [];
				}
				return paths;
			}
		}
		return [];
	};

	RetinaImagePath.set_confirmed_paths = function() {
		var stor,
			paths = JSON.stringify(RetinaImagePath.confirmed_paths);

		if (window.localStorage !== undefined && window.localStorage !== null) {
			stor = window.localStorage;
			stor.setItem('RetinaImagePath.confirmed_paths', paths);
		}
	};

	RetinaImagePath.confirmed_paths = RetinaImagePath.get_confirmed_paths();

	RetinaImagePath.prototype.is_external = function() {
		return Boolean(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain));
	};

	RetinaImagePath.prototype.check_2x_variant = function(callback) {
		var http, that = this;
		if (this.is_external()) {
			return callback(false);
		} else if (!this.perform_check && typeof this.at_2x_path !== "undefined" && this.at_2x_path !== null) {
			return callback(true);
		} else if (RetinaImagePath.confirmed_paths.indexOf(this.at_2x_path) !== -1) {
			return callback(true);
		} else {
			http = new XMLHttpRequest;
			http.open('HEAD', this.at_2x_path);
			http.onreadystatechange = function() {
				if (http.readyState !== 4) {
					return callback(false);
				}
				var index = RetinaImagePath.confirmed_paths.indexOf(that.at_2x_path);
				if (http.status >= 200 && http.status <= 399) {
					if (config.check_mime_type) {
						var type = http.getResponseHeader('Content-Type');
						if (type === null || !type.match(/^image/i)) {

							Retina.counter = Math.max(0, Retina.counter - 1);
							return callback(false);
						}
					}
					if (RetinaImagePath.confirmed_paths.indexOf(that.at_2x_path) === -1) {
						RetinaImagePath.confirmed_paths.push(that.at_2x_path);
					}
					return callback(true);
				} else {
					if (index !== -1) {
						RetinaImagePath.confirmed_paths.splice(index, 1);
					}
					Retina.counter = Math.max(0, Retina.counter - 1);
					return callback(false);
				}
			};
			http.send();
		}
	};



	function RetinaImage(el) {
		this.el = el;
		this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
		var that = this;
		this.path.check_2x_variant(function(hasVariant) {
			if (hasVariant) {
				that.swap();
				Retina.counter = Math.max(0, Retina.counter - 1);
			}
		});
	}

	RetinaImage.prototype.swap = function(path) {
		var that = this;
		if (typeof path === 'undefined') {
			path = this.path.at_2x_path;
		}

		function load() {
			if (!that.el.complete) {
				setTimeout(load, 5);
			} else {
				if (config.force_original_dimensions) {
					that.el.setAttribute('width', that.el.offsetWidth);
					that.el.setAttribute('height', that.el.offsetHeight);
				}

				that.el.setAttribute('src', path);
			}
		}
		load();
	};


	if (Retina.isRetina()) {
		Retina.init(root);
	}

})();
