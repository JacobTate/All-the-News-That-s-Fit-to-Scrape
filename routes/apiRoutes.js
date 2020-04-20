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
            var link = $(this).find("a").attr("href");
            var body = $(this).find("p.e1n8kpyg0").text();
            db.News.create({
                    headline: headline,
                    link: link,
                    body: body
                })
                .then(function (dbNews) {})
                .catch(function (err) {
                });
        });
    });
    db.News.find({})
        .then(function (dbNews) {
            var results = [];
            for (let i = 0; i < dbNews.length; i++) {
                var newsObj = {
                    id: dbNews[i]._id,
                    headline: dbNews[i].headline,
                    link: dbNews[i].link,
                    body: dbNews[i].body
                };
                results.push(newsObj);
            };
            app.get("/api/news", function (req, res) {
                res.json(results);
            });
        });

    app.post("/api/save", function (req, res) {
        db.News.find({
                _id: req.body.id
            })
            .then(function (dbNews) {
                for (let j = 0; j < dbNews.length; j++) {
                    db.Saved.create({
                        headline: dbNews[j].headline,
                        link: dbNews[j].link,
                        body: dbNews[j].body
                    });
                };
            })
            .catch(function () {});
    });
    app.get("/api/saved", function (req, res) {
        db.Saved.find({})
            .then(function (dbNews) {
                res.json(dbNews)
            });
    });
    app.get("/api/saved/delete", function (req, res) {
        db.Saved.deleteOne({
            _id: req.query.id
        }, function (err) {
            if (err) return handleError(err);
        });
    });
    app.post("/api/note/save", function(req, res){
        console.log(req.body);
        db.Note.create({body: req.body.note});
        
    });
};