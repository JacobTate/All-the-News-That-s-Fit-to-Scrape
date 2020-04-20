$.ajax({
        method: "GET",
        url: "/api/news"
    })
    .then(function (res) {
        for (let i = 0; i < res.length; i++) {
            var container = $("<div class='container'>");
            var link = $("<a>");
            var headlineDisplay = $("<div id='headlineDisplay' class='col-md-12'>");
            link.text(res[i].headline);
            var newsdisplay = $("<div id='newsDisplay' class='col-md-12'>")
            newsdisplay.text(res[i].body);
            var saveButton = $("<button id='saveButton'>");
            saveButton.text("Save");
            link.attr("href", "https://www.nytimes.com" + res[i].link);
            link.attr("target", "_blank")
            headlineDisplay.append(link);
            headlineDisplay.append(saveButton);
            container.prepend(headlineDisplay);
            container.append(newsdisplay);
            $(".jumbotron").append(container);
        };
    });
   