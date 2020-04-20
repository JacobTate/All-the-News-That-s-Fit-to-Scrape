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
            var saveButton = $("<button class='saveButton'>");
            saveButton.attr("value", res[i].id)
            saveButton.text("Save");
            link.attr("href", "https://www.nytimes.com" + res[i].link);
            link.attr("target", "_blank")
            headlineDisplay.append(link);
            headlineDisplay.append(saveButton);
            container.prepend(headlineDisplay);
            container.append(newsdisplay);
            $("#newsContainer").append(container);
        };
        $(".saveButton").on("click", function(){   
            idObj = {
                id: $(this).val()
            };   
            $.ajax({
                method: "POST",
                url: "/api/save",
                data: idObj
            });
        });
    });
 
    $.ajax({
        method: "GET",
        url: "/api/saved"
    })
    .then(function (res) {
        console.log(res);
        
        for (let i = 0; i < res.length; i++) {
            var container = $("<div class='container'>");
            var link = $("<a>");
            var headlineDisplay = $("<div id='headlineDisplay' class='col-md-12'>");
            link.text(res[i].headline);
            var newsdisplay = $("<div id='newsDisplay' class='col-md-12'>")
            newsdisplay.text(res[i].body);
            var deleteButton = $("<button class='deleteButton'>");
            deleteButton.attr("value", res[i]._id)
            deleteButton.text("Delete From Saved");
            link.attr("href", "https://www.nytimes.com" + res[i].link);
            link.attr("target", "_blank")
            headlineDisplay.append(link);
            headlineDisplay.append(deleteButton);
            container.prepend(headlineDisplay);
            container.append(newsdisplay);
            $("#savedNewsContainer").append(container);
        };
    });