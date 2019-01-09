function startWorkout() {
    $("#start").hide();
    $("#workout_content").load("/templates/workout.html")

    $.ajax({
        url: "http://localhost:8080/workout/get",
        type: "GET",
        contentType: "application/json",
        data: {
            token: getCookie("token")
        },
        success: function (data) {
            showWorkoutData(data);
        }
    })
}

function showWorkoutData(data) {
    $("#dayName").val(data.dayName);

    $("#exercise_one").text(data.workoutData[0].exercise.name);
    $("#exercise_one_weight").text("[" + data.workoutData[0].weight + "KG]");
    $("#exOneWeight").val(data.workoutData[0].weight);

    $("#exercise_two").text(data.workoutData[1].exercise.name);
    $("#exercise_two_weight").text("[" + data.workoutData[1].weight + "KG]");
    $("#exTwoWeight").val(data.workoutData[1].weight);

    $("#exercise_three").text(data.workoutData[2].exercise.name);
    $("#exercise_three_weight").text("[" + data.workoutData[2].weight + "KG]");
    $("#exThreeWeight").val(data.workoutData[2].weight);
}

function completeWorkout() {
    var exOneReps = validateReps_exOne();
    var exTwoReps = validateReps_exTwo();
    var exThreeReps = validateReps_exThree();

    if (exOneReps != null & exTwoReps != null & exThreeReps != null) {

        var data =
            [
                {
                    "exercise": $("#exercise_one").text(),
                    "weight": $("#exOneWeight").val(),
                    "reps": exOneReps
                },
                {
                    "exercise": $("#exercise_two").text(),
                    "weight": $("#exTwoWeight").val(),
                    "reps": exTwoReps
                },
                {
                    "exercise": $("#exercise_three").text(),
                    "weight": $("#exThreeWeight").val(),
                    "reps": exThreeReps
                }
            ]

        var token = getCookie("token");
        var dayName = $("#dayName").val();

        $.ajax({
            url: "http://localhost:8080/workout/complete?token=" + token + "&dayName=" + dayName,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
            success: function () {
                finishWorkout();
            },
            error: function (error) {
                console.log(error);
            }
        })

    }
    else
        alert("Invalid amount of reps!");
}

function stopWorkout() {
    $("#workout_content").empty();
    $("#start").show();
}

function validateReps_exOne() {
    var ex_one_reps = [];

    $(".ex_one_reps").each(function () {
        if ($(this).val() >= 0 && $(this).val() <= 5) {
            ex_one_reps.push($(this).val())
        }
    });

    if (ex_one_reps.length != 5)
        return null;
    else
        return ex_one_reps;
}

function validateReps_exTwo() {
    var ex_two_reps = [];

    $(".ex_two_reps").each(function () {
        if ($(this).val() >= 0 && $(this).val() <= 5) {
            ex_two_reps.push($(this).val())
        }
    });

    if (ex_two_reps.length != 5)
        return null;
    else
        return ex_two_reps;
}

function validateReps_exThree() {
    var ex_three_reps = [];

    $(".ex_three_reps").each(function () {
        if ($(this).val() >= 0 && $(this).val() <= 5) {
            ex_three_reps.push($(this).val())
        }
    });

    if (ex_three_reps.length != 5)
        return null;
    else
        return ex_three_reps;
}

function finishWorkout() {
    $("#workout_content").empty();
    $("#complete").hide();
    $("#stop").hide();
    $("#workout_content").text("See you soon!");
}
