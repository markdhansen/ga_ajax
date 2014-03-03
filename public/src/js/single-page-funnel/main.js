(function(dbm, $) {

	var handler = function(e) {
		var instructionView = document.getElementsByClassName('instruction-view')[0],
			exampleView = document.getElementsByClassName('example-view')[0],
			ui = exampleView.firstElementChild;
	
		dbm.addClass(instructionView, 'hidden');
		dbm.removeClass(exampleView, 'hidden');
		window.scroll(0, ui.offsetTop);
	};
	
	$(document).ready(function() {
		var btn = document.querySelector('.instruction-view .btn-primary');
		if (btn) { btn.addEventListener('click', handler, false); }
	});
	
})(window.Dbm, window.jQuery);