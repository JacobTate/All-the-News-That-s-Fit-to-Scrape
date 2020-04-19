module.exports = function (app) {
    var cheerio = require("cheerio");
    var axios = require("axios");
    var db = require("../models")
    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/newsDb", {
        useNewUrlParser: true
    });
    axios.get("https://www.nytimes.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("article.css-8atqhb").each(function (i, element) {
            var headline = $(element).text();
            var link = $(this).find("a").attr("href")
            db.News.create({
                    headline: headline,
                    link: link
                })
                .then(function (dbNews) {})
                .catch(function (err) {
                    console.log(err);
                });
        });
    });
    db.News.find({})
        .then(function (dbNews) {
            var results = [];
            for (let i = 0; i < dbNews.length; i++) {
                var newsObj = {
                    headline: dbNews[i].headline,
                    link: dbNews[i].link
                };
                results.push(newsObj);
            }; 
            app.get("/api/news", function (req, res) {
                res.json(results);
            });
        })

};