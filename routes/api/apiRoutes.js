module.exports = function (app) {
    const cheerio = require("cheerio");
    const axios = require("axios");
    const db = require("../../models");
    const mongoose = require("mongoose");
    const mongodb_url = process.env.MONGODB_URL || "mongodb://localhost/newsDb";
    mongoose.connect(mongodb_url, {
        useNewUrlParser: true
    });
    axios.get("https://www.nytimes.com/").then(function (response) {
        const $ = cheerio.load(response.data);
        $("article.css-8atqhb").each(function (i, element) {
            const headline = $(element).text();
            const link = $(this).find("a").attr("href");
            const body = $(this).find("p.e1n8kpyg0").text();
            db.News.create({
                    headline: headline,
                    link: link,
                    body: body
                })
                .then(function (dbNews) {})
                .catch(function (err) {});
        });
    });
    db.News.find({})
        .then(function (dbNews) {
            let results = [];
            for (let i = 0; i < dbNews.length; i++) {
                let newsObj = {
                    id: dbNews[i]._id,
                    headline: dbNews[i].headline,
                    link: dbNews[i].link,
                    body: dbNews[i].body,
                    note: dbNews[i].notes
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
    app.post("/api/note/save", function (req, res) {
        console.log(req.body.id);

        db.Note.create({
                body: req.body.note
            })
            .then(function (dbNote) {

                return db.News.findOneAndUpdate({
                    _id: req.body.id
                }, {
                    $push: {
                        notes: dbNote._id
                    }
                }, {
                    new: true
                });
            }).then(function (dbNews) {
                res.json(dbNews)
            }).catch(function (err) {
                res.json(err)
            })
    });
    app.get("/api/note/findId", function (req, res) {
        db.News.find({
            _id: req.query.id
        }).then(dbNews => {
            res.json(dbNews[0].notes)
        });
    });
    app.get("/api/note/find", function (req, res) {
        const noteId = req.query.noteId;
        db.Note.find({})
            .then(function (dbNote) {
                var noteArr = [];
                for (let x = 0; x < dbNote.length; x++) {
                    for (let i = 0; i < noteId.length; i++) {
                        if (dbNote[x]._id == noteId[i]) {
                            noteArr.push(dbNote[x])
                        };
                    };
                };
                let noteObj = {
                    note: noteArr
                };
                res.json(noteObj)
            });
    });
    app.get("/api/note/remove", function (req, res) {
        let noteId = req.query.noteId;
        db.Note.deleteOne({
                _id: noteId
            })
            .then(function (dbNote) {
                res.json(dbNote)
            });

    });
    //========================================================================================================
    //routes for the saved notes
    app.post("/api/note/saved/save", function (req, res) {
        db.Note.create({
                body: req.body.note
            })
            .then(function (dbNote) {

                return db.Saved.findOneAndUpdate({
                    _id: req.body.id
                }, {
                    $push: {
                        notes: dbNote._id
                    }
                }, {
                    new: true
                });
            }).then(function (dbNews) {
                res.json(dbNews)
            }).catch(function (err) {
                res.json(err)
            })
    });
    app.get("/api/note/saved/findId", function (req, res) {
        db.Saved.find({
            _id: req.query.id
        }).then(dbNews => {
            res.json(dbNews[0].notes);
        });
    });
    app.get("/api/note/saved/find", function (req, res) {
        const noteId = req.query.noteId; 
        db.Note.find({})
            .then(function (dbNote) {
                var noteArr = [];
                for (let x = 0; x < dbNote.length; x++) { 
                    for (let i = 0; i < noteId.length; i++) {
                        if (dbNote[x]._id == noteId[i]) {
                            noteArr.push(dbNote[x])
                        };
                    };
                };
                let noteObj = {
                    note: noteArr
                };
                res.json(noteObj)
            });
    });
    app.get("/api/note/saved/remove", function (req, res) {
        let noteId = req.query.noteId;
        db.Note.deleteOne({
                _id: noteId
            })
            .then(function (dbNote) {
                res.json(dbNote)
            });

    });
};