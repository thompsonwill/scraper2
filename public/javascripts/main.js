$(document).ready(function () {
    console.log("its working")

    $("#getNews").click(function(){
        location. reload(true);

    });
});

// function getNews(){
//     $.get("/scrape", function (results) {
//           for (var i = 0; i < results.length; i++) {
//               console.log(results[i].title)
//               if (results[i].link != "undefined") {
//               $("#articleSpots").append("<li><a href='"+ results[i].link + "'>" + results[i].title + "</li></a><button class='btn btn-success' value='" + results[i]._id + "'>Save</button>")
//               }
//           }
//       });
// }

