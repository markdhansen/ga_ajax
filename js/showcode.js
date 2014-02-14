function showCode(symbol) {

    var code = $("#this-file").html();
    var codeArr = code.split("\n");
    var codeSegment = "";
    var thisShowCodeLineNo = 0;
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

    $("#code-window", window.parent.document).html(codeSegment);

    /*
     * this calculation is still wrong !!!
     */
    var codeWindowHeight = $("#code-window", window.parent.document)[0].offsetHeight;
    var topLineDivHeight = $("#_scTopLine", window.parent.document).height();
    var codeTop = $("#_scTopLine", window.parent.document).position().top - (codeWindowHeight / 2) - (3 * topLineDivHeight);
    $("#code-window", window.parent.document).scrollTop(codeTop);

}


