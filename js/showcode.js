function showCode(symbol) {

    var code = $("#this-file").html();
    var codeArr = code.split("\n");
    var codeSegment = "";
    var thisShowCodeLineNo = 0;
	var doc = window.parent.document;
    for (var i = 0; i < codeArr.length; i++)
    {
        if (codeArr[i].indexOf(symbol) !== -1) {
            thisShowCodeLineNo = i;
            break;
        }
    }
    var start = Math.max(0, thisShowCodeLineNo - 100);
    var end = Math.min(codeArr.length, thisShowCodeLineNo + 100);
    // alert(lineNo + ", " + start + ", " + end);
    // var nextLineIsTop = false;
    var nextGaqPushIsYellow = false;
    for (var i = start; i < end; i++) {
        if (codeArr[i].indexOf("showCode(\"") === -1) {
            // display all lines except calls to showCode
            if ((codeArr[i].indexOf("_gaq.push") !== -1) && nextGaqPushIsYellow) {
                codeSegment += "<div id='_scTopLine' style='background-color:yellow;'>" + codeArr[i] + "</div>";
                nextGaqPushIsYellow = false;
            } else {
                codeSegment += codeArr[i] + "\n";
            }
        } else if (i === thisShowCodeLineNo) {
            // replace the showCode line at current symbol with a div for top of scroll box
            // codeSegment += "<div id='_scTopLine'></div>";
            nextGaqPushIsYellow = true;
        }
    }
	
	var codeWindow = doc.getElementById("code-window");
    codeWindow.innerHTML = codeSegment;
	
	
	var highlightRow = doc.getElementById("_scTopLine");
    var codeWindowHeight = doc.getElementById("code-window").offsetHeight;
    var topLineDivHeight = highlightRow.offsetHeight;
    var codeTop = highlightRow.offsetTop - ((codeWindowHeight - topLineDivHeight) / 2);
    $(codeWindow).animate({scrollTop: codeTop}, 500);
}


