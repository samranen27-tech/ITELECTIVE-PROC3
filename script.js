$(document).ready(function() {
    let currentQuestion = 0;
    let score = 0;

    const questions = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlink Text Markup Language", "None of these"],
            answer: 0
        },
        {
            question: "Which is NOT a programming language?",
            options: ["Python", "Java", "HTML", "C++"],
            answer: 2
        },
        {
            question: "What is the correct way to write a JavaScript array?",
            options: ["var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green')", "var colors = ['red', 'green', 'blue']", "var colors = {'red', 'green'}"],
            answer: 2
        },
        {
            question: "How do you write 'Hello World' in an alert box?",
            options: ["msg('Hello World')", "alertBox('Hello World')", "alert('Hello World')", "msgBox('Hello World')"],
            answer: 2
        },
        {
            question: "Which symbol is used for comments in JavaScript?",
            options: ["<!-- -->", "//", "/* */", "Both // and /* */"],
            answer: 3
        },
        {
            question: "What does CSS stand for?",
            options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
            answer: 1
        },
        {
            question: "How do you select an element with id='demo' in CSS?",
            options: [".demo", "#demo", "demo", "*demo"],
            answer: 1
        },
        {
            question: "Which is a JavaScript framework?",
            options: ["Laravel", "Django", "React", "Flask"],
            answer: 2
        },
        {
            question: "Inside which HTML element do we put the JavaScript?",
            options: ["<js>", "<scripting>", "<javascript>", "<script>"],
            answer: 3
        },
        {
            question: "How do you create a function in JavaScript?",
            options: ["function = myFunction()", "function myFunction()", "function:myFunction()", "create function myFunction()"],
            answer: 1
        }
    ];

    function loadQuestion() {
        if (currentQuestion >= questions.length) {
            showResult();
            return;
        }

        $("#question-number").text(`Question ${currentQuestion + 1} of ${questions.length}`);
        $("#question-text").text(questions[currentQuestion].question);
        $("#option1").text(questions[currentQuestion].options[0]);
        $("#option2").text(questions[currentQuestion].options[1]);
        $("#option3").text(questions[currentQuestion].options[2]);
        $("#option4").text(questions[currentQuestion].options[3]);

        // Clear previous selections and classes
        $("input[name=answer]").prop("checked", false).prop("disabled", false);
        $(".options label").removeClass("correct wrong");
    }

    // Immediate feedback on selection
    $("input[name=answer]").change(function() {
        let selected = parseInt($(this).val());
        let correct = questions[currentQuestion].answer;

        // Clear existing classes
        $(".options label").removeClass("correct wrong");

        if (selected === correct) {
            $(this).parent().addClass("correct");
        } else {
            $(this).parent().addClass("wrong");
            // Also highlight the correct answer in green
            $(".options label").eq(correct).addClass("correct");
        }

        // Lock other choices (disable unselected radios)
        $("input[name=answer]:not(:checked)").prop("disabled", true);
    });

    $("#next-btn").click(function() {
        let selected = $("input[name=answer]:checked").val();

        if (selected === undefined) {
            alert("Please select an answer!");
            return;
        }

        // Add to score if correct (we check again here)
        if (parseInt(selected) === questions[currentQuestion].answer) {
            score++;
        }

        currentQuestion++;
        loadQuestion();
    });

    $("#restart-btn").click(function() {
        currentQuestion = 0;
        score = 0;
        $("#result").addClass("hidden");
        $("#question-container").removeClass("hidden");
        loadQuestion();
    });

    function showResult() {
        $("#question-container").addClass("hidden");
        $("#result").removeClass("hidden");
        
        let message = score >= 8 ? "Excellent! You're a coding star! ⭐" :
                     score >= 6 ? "Good job! Keep learning! 💪" :
                     score >= 4 ? "Not bad! Practice more! 📚" : "Keep studying bro! You’ll get better bro!";

        $("#score-text").html(`You scored <strong>${score}/${questions.length}</strong><br><br>${message}`);
    }

    // Start the quiz
    loadQuestion();
});