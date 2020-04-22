$.ajax({
        method: "GET",
        url: "/api/news"
    })
    .then(function (res) {
        for (let i = 0; i < res.length; i++) {
            let container = $("<div class='container'>");
            let link = $("<a>");
            let headlineDisplay = $("<div id='headlineDisplay' class='col-md-12'>");
            link.text(res[i].headline);
            let newsdisplay = $("<div id='newsDisplay' class='col-md-12 m-2'>")
            newsdisplay.text(res[i].body);
            let saveButton = $("<button class='saveButton'>");
            let noteButton = $("<button class='noteButton m-2'>");
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
            let saveNoteId = $(this).val();
            let saveNoteIdObj = {
                id: saveNoteId
            };
            let noteHolder = $("<div>");
            noteHolder.attr("id", "noteHolder");
            let noteInput = $("<input id='noteInput'>");
            let submitButton = $("<button id='noteSubmit' class='btn btn-primary'>");
            let closeNoteButton = $("<button id='closeNote'>");
            closeNoteButton.text("X")
            submitButton.text("Add note");
            submitButton.attr("value", saveNoteId)
            noteHolder.append(noteInput);
            noteHolder.append(submitButton);
            noteHolder.prepend(closeNoteButton)
            $("#newsContainer").prepend(noteHolder);
            $.ajax({
                method: "GET",
                url: "/api/note/findId",
                data: saveNoteIdObj
            }).then(res => {
                if (res.length === 0) {
                    $("#noteHolder").append("<p>No Notes</p>")
                } else {
                    let noteIdArr = [];
                    for (let x = 0; x < res.length; x++) {
                        noteIdArr.push(res[x]);
                    };
                    let noteIdObj = {
                        noteId: noteIdArr
                    }
                    $.ajax({
                        method: "GET",
                        url: "/api/note/find",
                        data: noteIdObj
                    }).then(res => {
                        console.log(res); 
                    });
                };
            });
            //==============================================
            $("#closeNote").on("click", function () {
                $("#noteHolder").empty();
            });
            $("#noteSubmit").on("click", function () {
                let note = $("#noteInput").val().trim();
                let noteObj = {
                    note: note,
                    id: saveNoteId
                };
                $.ajax({
                    method: "POST",
                    url: "/api/note/save",
                    data: noteObj
                }).then(function () {
                    $("#noteHolder").empty();
                    alert("Note added")
                });
            });
        });

    });

$.ajax({
        method: "GET",
        url: "/api/saved"
    })
    .then(function (res) {
        for (let i = 0; i < res.length; i++) {
            let container = $("<div class='container'>");
            let link = $("<a>");
            let headlineDisplay = $("<div id='headlineDisplay' class='col-md-12'>");
            link.text(res[i].headline);
            let newsdisplay = $("<div id='newsDisplay' class='col-md-12'>")
            newsdisplay.text(res[i].body);
            let deleteButton = $("<button class='deleteButton'>");
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
            let deleteObj = {
                id: $(this).val()
            };
            $.ajax({
                method: "GET",
                url: "/api/saved/delete",
                data: deleteObj
            }).then(location.reload());
        });

    });