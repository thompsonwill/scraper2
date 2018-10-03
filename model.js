var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    link: String,
    saved: Boolean
}) 

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;