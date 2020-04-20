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
            var newsdisplay = $("<div id='newsDisplay' class='col-md-12 m-2'>")
            newsdisplay.text(res[i].body);
            var saveButton = $("<button class='saveButton'>");
            var noteButton = $("<button class='noteButton m-2'>");
            noteButton.attr("value", res[i].id)
            noteButton.text("Add a note");
            saveButton.attr("value", res[i].id)
            saveButton.text("Save");
            link.attr("href", "https://www.nytimes.com" + res[i].link);
            link.attr("target", "_blank")
            headlineDisplay.append(link);
            headlineDisplay.append(saveButton);
            headlineDisplay.append(noteButton);
            container.prepend(headlineDisplay);
            container.append(newsdisplay);
            $("#newsContainer").append(container);
        };
        $(".saveButton").on("click", function () {
            idObj = {
                id: $(this).val()
            };
            $.ajax({
                method: "POST",
                url: "/api/save",
                data: idObj
            });
        });
        $(".noteButton").on("click", function () {
            var saveNoteId = $(this).val();
            var noteHolder = $("<div>");
            noteHolder.attr("id", "noteHolder");
            var noteInput = $("<input id='noteInput'>");
            var submitButton = $("<button id='noteSubmit' class='btn btn-primary'>");
            submitButton.attr
            var closeNoteButton = $("<button id='closeNote'>");
            closeNoteButton.text("X")
            submitButton.text("Add note");
            submitButton.attr("value", saveNoteId)
            noteHolder.append(noteInput);
            noteHolder.append(submitButton);
            noteHolder.prepend(closeNoteButton)
            $("#newsContainer").prepend(noteHolder);
            $("#closeNote").on("click", function () {
                $("#noteHolder").empty();
            });
            $("#noteSubmit").on("click", function(){
                var note = $("#noteInput").val().trim();
                var noteObj = {
                    note: note,
                    id: saveNoteId
                };
                $.ajax({
                    method: "POST",
                    url: "/api/note/save",
                    data: noteObj
                }).then($("#noteHolder").append("Note added"));
            });
        });

    });

$.ajax({
        method: "GET",
        url: "/api/saved"
    })
    .then(function (res) {
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

        $(".deleteButton").on("click", function () {
            var deleteObj = {
                id: $(this).val()
            };
            $.ajax({
                method: "GET",
                url: "/api/saved/delete",
                data: deleteObj
            }).then(location.reload());
        });
        
    });