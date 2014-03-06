//(function(dbm, $) {
//	var EOL = "\n",
//		codeArr = document.getElementById('this-file').innerHTML.trim().split(EOL),
//		doc = window.parent.document,
//		len = codeArr.length,
//		prettyPrint = window.prettyPrint || (window.top && window.top.prettyPrint) || function() {};
//	
//	function showCode(page) {
//		var codeSegment = "",
//			i = -1,
//			codeWindow = doc.getElementById("code-window"),
//			highlightRow,
//			codeWindowHeight,
//			topLineDivHeight,
//			codeTop;
//		
//		// - Remove lines with calls to dbm.showCode.
//		// - Highlight the line with the call to _gaq.push
//		while (++i < len) {
//			if (codeArr[i].indexOf("dbm.showCode(") !== -1) { continue; }
//			if (codeArr[i].indexOf("_gaq.push") !== -1 && codeArr[i].indexOf(page) !== -1) {
//				codeSegment += "<div id='_scTopLine' class='highlighter'>" + codeArr[i] + "</div>";
//			} else {
//				codeSegment += codeArr[i] + EOL;
//			}	
//		}
//		
//		codeWindow.innerHTML = codeSegment;
//		dbm.removeClass(codeWindow, 'prettyprinted');
//		prettyPrint();
//
//	//Scroll the highlighted row to the center of the code window.	
//		highlightRow = doc.getElementById("_scTopLine");
//		codeWindowHeight = codeWindow.offsetHeight;
//		topLineDivHeight = highlightRow.offsetHeight;
//		codeTop = highlightRow.offsetTop - ((codeWindowHeight - topLineDivHeight) / 2);
//		$(codeWindow).animate({scrollTop: codeTop}, 500);
//	}
//	
//	dbm.showCode = showCode;
//	
//})(window.Dbm, window.jQuery);



(function(dbm, $) {
	var EOL = "\n",
		code = document.getElementById('this-file').innerHTML.replace(/[\s\n]*dbm\.showCode\([^\n]+\n+/g, EOL),
		doc = (window.parent && window.parent.document) || document,
		prettyPrint = window.prettyPrint || (window.parent && window.parent.prettyPrint) || function() {};
	
	function showCode(page) {
		var codeWindow = doc.getElementById("code-window"),
			parent = codeWindow.parentNode.parentNode,
			currentTop = codeWindow.scrollTop,
			highlightRow,
			codeWindowHeight,
			topLineDivHeight,
			codeTop,
			exp = new RegExp("((?:[\\s]{4})*_gaq\\.push\\(.+" + page + "\"\\]\\);)");
		
		//The prettyPrint process is quite intensive and it freezes the UI.
		//To overcome it we remove the element from the DOM so the browser doesn't
		//need to do any painting during the prettyPrint.
		//It improves performance by approx. X3.
		parent.removeChild(codeWindow.parentNode);
		codeWindow.innerHTML = code.replace(exp, "<div id=\"_scTopLine\" class=\"highlighter\">$1</div>" );;
		dbm.removeClass(codeWindow, 'prettyprinted');
		prettyPrint(null, codeWindow.parentNode);
		parent.appendChild(codeWindow.parentNode);
		codeWindow.scrollTop = currentTop;

	//Scroll the highlighted row to the center of the code window.	
		highlightRow = doc.getElementById("_scTopLine");
		codeWindowHeight = codeWindow.offsetHeight;
		topLineDivHeight = highlightRow.offsetHeight;
		codeTop = highlightRow.offsetTop - ((codeWindowHeight - topLineDivHeight) / 2);
		$(codeWindow).animate({scrollTop: codeTop}, 500);
	}
	
	dbm.showCode = showCode;
	
})(window.Dbm, window.jQuery);



