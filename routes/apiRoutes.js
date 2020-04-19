module.exports = function(app){
    var cheerio = require("cheerio");
    var axios = require("axios");
    axios.get("https://www.nytimes.com/").then(function(response){
        var $ = cheerio.load(response.data);
        var results = [];
    
         $("article.css-8atqhb").each(function(i, element){    
            var headline = $(element).text();
            var link = $(this).find("a").attr("href")
          //  console.log(link);
            
            results.push({
            headline: headline,
            link: link
            }); 
                
        });
   
     app.get("/api/news", function(req, res){
         res.json(results);
     });
    });
};
