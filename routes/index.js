var express = require('express');
var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");

var Article = require("../model.js");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// Scraper and loader
router.get("/scrape", function (req, res) {
  request("https://news.ycombinator.com/", function (error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $("td.title").each(function (i, element) {

      // Save the text of the element in a "title" variable
      var title = $(element).text();

      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      var link = $(element).children().attr("href");

      results.push({
        title: title,
        link: link,
        saved: "false"
      });

    });
    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
    Article.create(results)
    .then(function(dbUser) {
      // If saved successfully, send the the new User document to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
  });
  // res.render('index', { title: 'Scrape' });
});

router.get('/article/:id', function (req, res, next) {
  var chosen = req.params.id;
  console.log("CHOSEN ONE " + chosen);

  Article.find({ id: req.params.id })
  .then(function(dbUser) {
    // If saved successfully, send the the new User document to the client
    res.render('single', { title: 'Single', article: dbUser });
  })
  .catch(function(err) {
    // If an error occurs, send the error to the client
    res.json(err);
  });
  
});

router.get('/search', function (req, res, next) {
  var chosen = req.params.id;
  console.log("CHOSEN ONE " + chosen);

  Article.find()
  .then(function(dbUser) {
    // If saved successfully, send the the new User document to the client
    res.json(dbUser);
  })
  .catch(function(err) {
    // If an error occurs, send the error to the client
    res.json(err);
  });
  
});


module.exports = router;
