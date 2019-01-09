function getHistory() {
    $("#show_history").hide();
    $("#history_content").load("/templates/history.html");

    $.ajax({
        url: "http://localhost:8080/workout/history",
        type: "GET",
        contentType: "application/json",
        data: {
            token: getCookie("token")
        },
        success: function (data) {
            displayHistory(data);
        }
    })
}

function displayHistory(data) {
    var i = 0;
    var j = 0;

    console.log(data.length);
    for (i = data.length - 1; i >= 0; i--) {
        var workout = data[i];

        $("#workoutHistory").append(
            $("<div class='subheading mb-3'/>")
                .prop("id", "divId" + i)
                .css({
                    height: '80px',
                    width: '300px',
                    float: "left",
                })
                .text("Date: " + workout.displayDate)
        );

        for (j = 0; j < workout.workoutData.length; j++) {
            var workoutData = workout.workoutData[j];

            $("#divId" + i).append(
                $("<div class='subheading mb-3'/>")
                    .prop("id", "divExId" + j)
                    .css({
                        height: '20px',
                        width: '300px',
                        float: "left"
                    })
                    .text("Exercise: " + workoutData.exercise.name)
            );
                    
            $("#divId" + i).append("<br>");
            $("#divId" + i).append(
                $("<div class='subheading mb-3'/>")
                    .prop("id", "divWeightId" + j)
                    .css({
                        height: '20px',
                        width: '300px',
                        float: "left"
                    })
                    .text("Weight: " + workoutData.weight)
            );

            $("#divId" + i).append(
                $("<div class='subheading mb-3'/>")
                    .prop("id", "divRepsId" + j)
                    .css({
                        height: '20px',
                        width: '300px',
                        float: "left"
                    })
                    .text("Reps: " + workoutData.reps.toString())
            );
        }
    }
}