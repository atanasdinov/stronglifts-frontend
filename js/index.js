$(document).ready(function () {

    loadHomePage();

    function setMain(template) {
        $("#main").empty();
        $("#user_form").empty();
        $("#main").load(template + ".html");
    }

    function setForm(template) {
        $("#main").empty();
        $("#user_form").empty();
        $("#user_form").load(template + ".html");
    }

    function loadHomePage() {
        var cookie = getCookie("token");

        if (cookie == null) {
            setForm("/templates/home");
        }
        else {
            setMain("/templates/authenticated-home");

            $.ajax({
                url: "http://localhost:8080/user/getUsername",
                type: "GET",
                contentType: "application/json",
                data: {
                    token: cookie
                },
                success: function (data) {
                    displayUsername(data);
                }
            });
        }
    }

    $("#user_form").on('click', '#showRegister', function () {
        setForm("/templates/register");
    })

    $("#user_form").on('click', '#showLogin', function () {
        setForm("/templates/login");
    })

    $("#user_form").on('click', '#register', function () {
        register();
    })

    $("#user_form").on('click', '#login', function () {
        login();
    })

    $("#user_form").on('click', '#cancel-register', function () {
        setForm("/templates/home");
    });

    $("#user_form").on('click', '#cancel-login', function () {
        setForm("/templates/home");
    });

    $("#main").on('click', '#logout', function () {
        logout("token");
        setForm("/templates/home");
    })

    function register() {
        var user = {
            "username": $("#username_r").val(),
            "password": $("#password_r").val()
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/user/register",
            data: JSON.stringify(user),
            contentType: "application/json",
            success: function () {
                alert("You have been successfully registered!");
                setForm("/templates/login");
            },
            error(data) {
                displayError(data);
            }
        });
    }

    function login() {
        var user = {
            "username": $("#username_l").val(),
            "password": $("#password_l").val()
        };

        $.ajax({
            url: "http://localhost:8080/user/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(user),
            success: function (data) {
                setCookie("token", data, 1);
                loadHomePage();
            },
            error: function (statusCode) {
                checkLoginStatus(statusCode);
            }
        });
    }

    function displayError(statusCode) {
        if (statusCode.status == 406) {
            $("#empty_username").hide();
            $("#empty_password").hide();

            if ($("#username_r").val() == "")
                $("#empty_username").show();
            if ($("#password_r").val() == "")
                $("#empty_password").show();
        }
    }

    function checkLoginStatus(statusCode) {
        if (statusCode.status == 406)
            $("#error_content").text("Empty username or password!");
        else if (statusCode.status == 404)
            $("#error_content").text("Username not found!");
        else if (statusCode.status == 401)
            $("#error_content").text("Invalid password!");

    }

    function displayUsername(data) {
        $("#nickname").text(data);
    }

    function logout(cookie) {
        eraseCookie(cookie);
    }


    $("#main").on('click', '#start', function () {
        startWorkout();
    })

    $("#main").on('click', "#complete", function () {
        completeWorkout();
    })

    $("#main").on('click', "#stop", function () {
        stopWorkout();
    })

    $("#main").on('click', '#show_history', function() {
        getHistory();
    })
})