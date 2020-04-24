var isNoteOpen = false;
var isSavedNoteOpen = false;
$("#articleDisplay").on("click", function(e){
    e.preventDefault();
$.ajax({
        method: "GET",
        url: "/api/news"
    })
    .then(function (res) {
        alert(`Added: ${res.length} articles`)
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
            noteButton.text("Notes");
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
            }).then(alert("Article saved"));
        });
        $(".noteButton").on("click", function () {
            if (!isNoteOpen) {
                isNoteOpen = true;
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
                noteHolder.append("<ul id='noteList'>")
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
                            for (let i = 0; i < res.note.length; i++) {
                                let li = $("<li>")
                                li.text(res.note[i].body)
                                let removeNoteBtn = $("<button class='removeNote'>");
                                removeNoteBtn.attr("value", res.note[i]._id);
                                removeNoteBtn.text("Remove Note");
                                li.append(removeNoteBtn);
                                $("#noteList").append(li);
                            };
                            $(".removeNote").on("click", function (e) {
                                e.preventDefault();
                                let noteToRemove = $(this).val();
                                let noteToRemoveObj = {
                                    noteId: noteToRemove
                                };
                                $.ajax({
                                    method: "GET",
                                    url: "/api/note/remove",
                                    data: noteToRemoveObj
                                }).then(res => {
                                    isNoteOpen = false;
                                    location.reload();
                                });
                            });
                        });
                    };
                });
                $("#closeNote").on("click", function () {
                    $("#noteHolder").empty();
                    isNoteOpen = false;
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
                        alert("Note added");
                        isNoteOpen = false;
                    });
                });

            } else {
                $("#noteHolder").empty();
                isNoteOpen = false;
            };
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
            let newsdisplay = $("<div id='newsDisplay' class='col-md-12 m-2'>")
            newsdisplay.text(res[i].body);
            let deleteButton = $("<button class='deleteButton'>");
            let noteButton = $("<button class='savedNoteButton m-2'>");
            noteButton.attr("value", res[i]._id)
            noteButton.text("Notes");
            deleteButton.attr("value", res[i]._id)
            deleteButton.text("Delete from saved");
            link.attr("href", "https://www.nytimes.com" + res[i].link);
            link.attr("target", "_blank")
            headlineDisplay.append(link);
            headlineDisplay.append(deleteButton);
            headlineDisplay.append(noteButton);
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
        $(".savedNoteButton").on("click", function () {
            if (!isSavedNoteOpen) {
                isSavedNoteOpen = true;
                let saveNoteId = $(this).val();
                let saveNoteIdObj = {
                    id: saveNoteId
                };
                let noteHolder = $("<div>");
                noteHolder.attr("id", "savedNoteHolder");
                let noteInput = $("<input id='savedNoteInput'>");
                let submitButton = $("<button id='savedNoteSubmit' class='btn btn-primary'>");
                let closeNoteButton = $("<button id='closeSavedNote'>");
                closeNoteButton.text("X")
                submitButton.text("Add note");
                submitButton.attr("value", saveNoteId)
                noteHolder.append(noteInput);
                noteHolder.append(submitButton);
                noteHolder.prepend(closeNoteButton)
                noteHolder.append("<ul id='savedNoteList'>")
                $("#savedNewsContainer").prepend(noteHolder);
                $.ajax({
                    method: "GET",
                    url: "/api/note/saved/findId",
                    data: saveNoteIdObj
                }).then(res => {
                    if (res.length === 0) {
                        $("#saveNoteHolder").append("<p>No Notes</p>")
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
                            url: "/api/note/saved/find",
                            data: noteIdObj
                        }).then(res => {
                            console.log(res.note);
                            
                            for (let i = 0; i < res.note.length; i++) {
                                let li = $("<li>")
                                li.text(res.note[i].body)
                                let removeNoteBtn = $("<button class='removeSavedNote'>");
                                removeNoteBtn.attr("value", res.note[i]._id);
                                removeNoteBtn.text("Remove Note");
                                li.append(removeNoteBtn);
                                $("#savedNoteList").append(li);
                            };
                            $(".removeSavedNote").on("click", function (e) {
                                e.preventDefault();
                                let noteToRemove = $(this).val();
                                let noteToRemoveObj = {
                                    noteId: noteToRemove
                                };
                                $.ajax({
                                    method: "GET",
                                    url: "/api/note/saved/remove",
                                    data: noteToRemoveObj
                                }).then(res => {
                                    isSavedNoteOpen = false;
                                    location.reload();
                                });
                            });
                        });
                    };
                });
                $("#closeSavedNote").on("click", function () {
                    $("#savedNoteHolder").empty();
                    isSavedNoteOpen = false;
                });
                $("#savedNoteSubmit").on("click", function () {
                    let note = $("#savedNoteInput").val().trim();
                    console.log(note);
                    
                    let noteObj = {
                        note: note,
                        id: saveNoteId
                    };
                    $.ajax({
                        method: "POST",
                        url: "/api/note/saved/save",
                        data: noteObj
                    }).then(function () {
                        $("#savedNoteHolder").empty();
                        alert("Note added");
                        isSavedNoteOpen = false;
                    });
                });

            } else {
                $("#savedNoteHolder").empty();
                isSavedNoteOpen = false;
            };
        });

    });