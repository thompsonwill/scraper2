$("#sendComment").click(function(){
    var comment = $("#comment").val().trim();
    $.post("/submit", comment)
    // On success, run the following code
    .then(function () {
        console.log("Submitted " + comment);
    });
});