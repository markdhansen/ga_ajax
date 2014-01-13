<html>
    <head> 
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    </head> 
    <body> 
        <form action=""> 
            <input type="button" value="button" onclick="getData()" /> 
        </form> 
        <div id="myelement"> Some text... </div> 
        <?php
        echo "Hello World!";
        ?>
        <p>
            <button id="buttonpressme">Press Me</button>
        </p>
        <script>
                $("#buttonpressme").click(function() {
                    alert("Pressed!");
                });
        </script>
    </body>
</html>
