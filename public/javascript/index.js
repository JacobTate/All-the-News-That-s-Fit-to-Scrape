$.ajax({
    method: "GET",
    url: "/api/news"
})
.then(function(res){  
for (let i = 0; i < res.length; i++) {
    var link = $("<a>");
    ;
    var newsDisplay = $("<div id='newsDisplay' class='col-md-12'>");
    newsDisplay.text(res[i].headline)
    link.attr("href", "https://www.nytimes.com" + res[i].link);
    link.attr("target", "_blank")
    link.append(newsDisplay);
    $(".jumbotron").append(link);  
};
});