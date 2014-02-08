$("#run-example-button").click(function() {
    $("#example").toggle();
    $("#run-ui").toggle();
    $("#run-code").toggle();
    var topOfExample = $("#run-ui").position().top;
    $("body").animate({scrollTop:topOfExample}, 500);
});



