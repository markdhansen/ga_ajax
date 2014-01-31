function showCode(symbol) {

    var code = $("#this-file").html();
    var codeArr = code.split("\n");
    var codeSegment = "";
    var thisShowCodeLineNo = 0;
    for (var i = 0; i < codeArr.length; i++)
    {
        if (codeArr[i].indexOf(symbol) != -1) {
            thisShowCodeLineNo = i;
            break;
        }
    }
    var start = Math.max(0, thisShowCodeLineNo - 25);
    var end = Math.min(codeArr.length, thisShowCodeLineNo + 25);
    // alert(lineNo + ", " + start + ", " + end);
    // var nextLineIsTop = false;
    var nextGaqPushIsYellow = false;
    for (var i = start; i < end; i++) {
        if (codeArr[i].indexOf("showCode(\"") === -1) {
            // display all lines except calls to showCode
            if ((codeArr[i].indexOf("_gaq.push") !== -1) && nextGaqPushIsYellow) {
                codeSegment += "<div style='background-color:yellow;'>" + codeArr[i] + "</div>\n";
                nextGaqPushIsYellow = false;
            } else {
                codeSegment += codeArr[i] + "\n";
            }
        } else if (i === thisShowCodeLineNo) {
            // replace the showCode line at current symbol with a div for top of scroll box
            codeSegment += "<div id='_scTopLine'></div>\n";
            nextGaqPushIsYellow = true;
        }
    }
    $("#code-window").html(codeSegment);
    var codeWindowHeight = $("#code-window")[0].offsetHeight;
    var codeTextHeight = $("#code-window")[0].scrollHeight;
    var codeTop = Math.round((codeTextHeight - codeWindowHeight)/2);
    $("#code-window").scrollTop(codeTop);
    alert("codeTextHeight = " + codeTextHeight + ";  codeWindowHeight = " + codeWindowHeight + ";  codeTop = " + codeTop)
    //$("#_scTopLine")[0].scrollIntoView();

}


