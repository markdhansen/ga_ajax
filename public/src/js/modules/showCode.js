(function(dbm, $) {
	var EOL = "\n",
		codeArr = document.getElementById('this-file').innerHTML.trim().split(EOL),
		doc = window.parent.document,
		len = codeArr.length,
		prettyPrint = window.prettyPrint || (window.top && window.top.prettyPrint) || function() {};
	
	function showCode(page) {
		var codeSegment = "",
			i = -1,
			codeWindow = doc.getElementById("code-window"),
			highlightRow,
			codeWindowHeight,
			topLineDivHeight,
			codeTop;
		
		// - Remove lines with calls to dbm.showCode.
		// - Highlight the line with the call to _gaq.push
		while (++i < len) {
			if (codeArr[i].indexOf("dbm.showCode(") !== -1) { continue; }
			if (codeArr[i].indexOf("_gaq.push") !== -1 && codeArr[i].indexOf(page) !== -1) {
				codeSegment += "<div id='_scTopLine' class='highlighter'>" + codeArr[i] + "</div>";
			} else {
				codeSegment += codeArr[i] + EOL;
			}	
		}
		
		codeWindow.innerHTML = codeSegment;
		dbm.removeClass(codeWindow, 'prettyprinted')
		prettyPrint();

	//Scroll the highlighted row to the center of the code window.	
		highlightRow = doc.getElementById("_scTopLine");
		codeWindowHeight = codeWindow.offsetHeight;
		topLineDivHeight = highlightRow.offsetHeight;
		codeTop = highlightRow.offsetTop - ((codeWindowHeight - topLineDivHeight) / 2);
		$(codeWindow).animate({scrollTop: codeTop}, 500);
	}
	
	dbm.showCode = showCode;
	
})(window.Dbm, window.jQuery);



