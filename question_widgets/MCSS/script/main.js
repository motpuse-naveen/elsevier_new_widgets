/* Version 19.5, Date:07 July 2022 */
/* Version 19.7, Date:08 JULY 2022 */
const correctFBText = "Correct."
const incorrectFBText = "Incorrect. Please try again."
const tryagainFBText = "Please try again."
var paginationTabindex = 10001;
var optionsIndex = 1;
const tabs = document.querySelector(".tab-content");
const tabButton = document.querySelectorAll(".step");
const contents = document.querySelectorAll(".tab-pane");
const styleTypes = {
    'st-upper-alpha': ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    'st-lower-alpha': ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    'st-upper-roman': ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"],
    'st-lower-roman': ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx"],
    'st-decimal':["1" ,"2","3","4","5","6","7","8","9","10","11","12","13","14","15", "16","17","18","19","20"]
}
function disablenextPrevButtons(selector) {
    if (selector === '.arrow-right') {
        $('.arrow-right').addClass('disabled').attr("aria-disabled",true);
        // $('.arrow-right').removeAttr('tabindex');
        $('.arrow-right').attr('aria-disabled', true);
        $('.arrow-left').removeClass('disabled').removeAttr('aria-disabled');
        // $('.arrow-left').attr('tabindex', 0);
        // $('.mcq_toolbar_main').find('li.nav-item').last().focus();
    } else {
        $('.arrow-left').addClass('disabled').attr("aria-disabled",true);
        // $('.arrow-left').removeAttr('tabindex');
        $('.arrow-right').removeClass('disabled').removeAttr('aria-disabled');
        // $('.arrow-right').attr('tabindex', 0);
        // $('.mcq_toolbar_main').find('li.nav-item').first().focus();
    }
}
function getQuestionByEvent(e) {
    if($(e.target.closest(".nav-item").length>1) || $(e.target.closest(".nav-link").length>1)){
        var id="";
        if ($(e.target).is('span')) {
            id = $(e.target).parent().attr('data-id');
        } else if ($(e.target).is('a')) {
            id = $(e.target).attr('data-id');
        }else if ($(e.target).find('a').length) {
            id = $(e.target).find('a').attr('data-id');
        }
        if (id!=undefined && id!="") {
            getNewQuestion(parseInt(id.split('-')[1]));
            $('.nav-link').removeClass('active');
            $('.nav-link').removeAttr('aria-current');
            //$('.nav-link').attr('aria-selected', false);
            if ($(e.target).is('span')) {
                $(e.target).parent().addClass("active");
                //$(e.target).parent().attr('aria-selected', true);
                $(e.target).parent().attr('aria-current', "page");
            } else {
                $(e.target).addClass("active");
                //$(e.target).attr('aria-selected', true);
                $(e.target).attr('aria-current', "page");
            }
            if (e.type === "click" && $(e.target).find('a').length) {
                $(e.target).find('a').addClass("active");
                //$(e.target).find('a').attr('aria-selected', true);
                $(e.target).find('a').attr('aria-current', "page");
            }
            $('#questionNumber').focus();
            if (parseInt(id.split('-')[1]) === quiz.length) {
                disablenextPrevButtons('.arrow-right')
            } else if (parseInt(id.split('-')[1]) === 1) {
                disablenextPrevButtons('.arrow-left')
            } else {
                $('.arrow-right').removeClass('disabled').removeAttr('aria-disabled');
                $('.arrow-right').attr('tabindex', 0);
                $('.arrow-left').removeClass('disabled').removeAttr('aria-disabled');
                $('.arrow-left').attr('tabindex', 0);
            }
        }
    }
}
$(".steps").on('click keydown', function (e) {
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        getQuestionByEvent(e);
        $ul = $('.steps ol');
        $ulWrapper = $ul//.parent();
        stepWidth = $('.steps ol li').outerWidth();
        ulWrapperWidth = $ulWrapper.width();
        wrapperCapacity = ulWrapperWidth / stepWidth;
        totalItemsWidth = $('.steps ol li').length * stepWidth;
        var stepAtCenter = -1;
        var $selectedStep = $(e.target);
        var selectedStep;
        if ($selectedStep.is('span')) {
            selectedStep = $selectedStep.parent().attr('data-id').split('-')[1];
        } else if ($selectedStep.is('a')) {
            selectedStep = $selectedStep.attr('data-id').split('-')[1];
        }
       
        autoDragPagination(selectedStep);
         /*if (e.type === "keydown") {
            selectedStep = $selectedStep.find('a').attr('data-id').split('-')[1];
        } else {
            if ($selectedStep.is('span')) {
                selectedStep = $selectedStep.parent().attr('data-id').split('-')[1];
            } else if ($selectedStep.is('a')) {
                selectedStep = $selectedStep.attr('data-id').split('-')[1];
            }
            if (e.type === "click" && $selectedStep.find('a').length) {
                selectedStep = $selectedStep.find('a').attr('data-id').split('-')[1];
            }
        }*/
        // get central item by removing css.left
    }
});
function autoDragPagination(selectedStep) {
    debugger;
    $ul = $('.steps ol');
    $ulWrapper = $ul//.parent();
    stepWidth = $('.steps ol li').outerWidth();
    ulWrapperWidth = $ulWrapper.width();
    wrapperCapacity = ulWrapperWidth / stepWidth;
    totalItemsWidth = $('.steps ol li').length * stepWidth;
    var stepAtCenter = -1;
    var stepCountAtCenter = Math.floor(wrapperCapacity / 2);
    var oldLeft = parseInt($ul.css('left'))
    var minLeft = 0 - ((totalItemsWidth - ulWrapperWidth) + stepWidth);
    var maxLeft = 0;
    // evaluating Center
    if (oldLeft === 0) {
        stepAtCenter = stepCountAtCenter;
    } else {
        var hiddenToLeft = Math.floor(Math.abs(oldLeft) / stepWidth);
        stepAtCenter = hiddenToLeft + stepCountAtCenter;
    }
    // Applying left
    if ((ulWrapperWidth - (stepWidth * 2)) < totalItemsWidth) {
        if (selectedStep > stepAtCenter) {
            var newLeft = oldLeft - ((selectedStep - stepAtCenter) * stepWidth);
            if (newLeft < minLeft) {
                newLeft = minLeft;
            }
            // // (totalItemsWidth - ulWrapperWidth)
            // for(let i = 0; i&lt;=hiddenUnderLeft;i++) {
            //    // console.log()
            //    $($('.steps ol li')[i]).find('a').removeAttr('tabindex');
            // }
            $ul.css('left', newLeft);
        } else {
            var newLeft = oldLeft + ((stepAtCenter - selectedStep) * stepWidth);
            if (newLeft > maxLeft) {
                newLeft = maxLeft;
            }
            $ul.css('left', newLeft);
        }
    }
    // $('.steps ol li a').removeAttr('tabindex');
    // var hiddenUnderLeft = (Math.abs(newLeft)/stepWidth);
    // for (let i = hiddenUnderLeft+1; i&lt; hiddenUnderLeft + Math.floor(wrapperCapacity); i++) {
    //    $($('.steps ol li')[i]).find('a').attr('tabindex', 0);
    // }
}
var QuestionNumber = document.querySelector("#questionNumber");
var QuestionName = document.querySelector("#questionName");
var optionContainer = document.querySelector(".Multiple-choice");
var correctMsg = document.querySelector(".correct");
var indicator = document.querySelector(".nav-tabs");
var subHeadingContainer = document.querySelector(".content-heading");
var questionCounter = 0;
var currentQuestion;
var availableQuestion = [];
var availableOption = [];
// add quiz question to new array;
function setAvailableQuestion() {
    var totalQuestion = quiz.length;
    for (var i = 0; i < totalQuestion; i++) {
        availableQuestion.push(quiz[i]);
    }
}
// goto question and new question of array
function getNewQuestion(question) {
    $('#mcq_button').show();
    QuestionNumber.innerText = "Question " + (question);
    //QuestionNumber.setAttribute('role', "heading");
    QuestionNumber.setAttribute('tabindex', '0');
    optionsIndex++;
    // get random question
    var questionIndex = quiz[question - 1];
    currentQuestion = questionIndex;
    QuestionName.innerHTML = currentQuestion.q;
    //QuestionName.setAttribute('tabindex', '0');
    optionsIndex++
    if (currentQuestion.q2) {
        $('#subheading2').html(currentQuestion.q2);
        $('#subheading2').attr('tabindex', '0');
        $('#subheading2').show().removeAttr("aria-hidden");
        optionsIndex++
    } else {
        $('#subheading2').removeAttr('aria-label');
        $('#subheading2').removeAttr('tabindex');
        $('#subheading2').hide().attr("aria-hidden", true);
        optionsIndex++
    }
    if (currentQuestion.q3.length) {
        $('#subheading3').html(currentQuestion.q3[0]);
        $('#subheading3').attr('tabindex', '0');
        $('#subheading3').show().removeAttr("aria-hidden");
        optionsIndex++
    } else {
        $('#subheading3').removeAttr('aria-label');
        $('#subheading3').removeAttr('tabindex');
        $('#subheading3').hide().attr("aria-hidden", true);
        optionsIndex++
    }
    var optionStyleType = [];
    if (currentQuestion.optionStyleType != undefined && currentQuestion.optionStyleType != null && currentQuestion.optionStyleType != "" && currentQuestion.optionStyleType != "none") {
        optionContainer.setAttribute("styletype", currentQuestion.optionStyleType);
        $(".answer-controls").addClass("mar-left")
        optionStyleType = styleTypes[currentQuestion.optionStyleType]
    }
    else {
        optionContainer.removeAttribute("styletype");
        $(".answer-controls").removeClass("mar-left")
    }
    //get the position of questionIndex from the availableQuestion
    // var index1 = quiz.indexOf(questionIndex);
    // //remove the questionIndex from the availableQuestion;
    // quiz.splice(index1, 1);
    // options of the given question.
    var optionlen = currentQuestion.option.length;
    for (var i = 0; i < optionlen; i++) {
        availableOption.push(i);
    }
    optionContainer.innerHTML = '';
    for (var j = 0; j < optionlen; j++) {
        var option = document.createElement("li");
        option.innerHTML = currentQuestion.option[j];
        option.setAttribute('data-id', j);
        if(j==0){
            option.setAttribute('tabindex', '0');
        }
        else{
            option.setAttribute('tabindex', '-1');
        }
        option.setAttribute('role', 'radio');
        option.setAttribute('aria-checked', 'false');
        optionsIndex++;
        option.className = "focus-input";

        if (typeof currentQuestion.optionFeedback != 'undefined') {
            option.setAttribute('data-feedback', currentQuestion.optionFeedback[j]);
        }
        if(optionStyleType !=undefined && optionStyleType.length>0){
            option.prepend($("<span class='visually-hidden'>" + optionStyleType[j] + ". " + "</span>")[0])
        }

        optionContainer.appendChild(option);
    }
    $('.focus-input').on('keydown click', onClickAndEnterKey);
    $(".focus-input *").on("click", function (e) {
        if($(this).closest(".focus-input").length>0){
            $(this).closest(".focus-input").click();
        }
        e.stopPropagation()
    });

    if (typeof bind_glossary_events == "function") {
        bind_glossary_events();
    }

    $('.tab-pane ').attr('data-state', currentQuestion.state);
    $('.tab-pane ').attr('id', question);
    $(".ic-opt-fbk").remove();
    var optFeedback = ""
    if (currentQuestion.state === 'wrong') {
        $('.focus-input').each(function () {
            if ($(this).attr('data-id') == currentQuestion.userAnswered) {
                $(this).addClass('wrong').attr("aria-describedby", "ariaIncorrect");
                if (typeof currentQuestion.optionFeedback != 'undefined') {
                    optFeedback = $(this).attr('data-feedback')
                }
            }
        });
        $('#mcq_button').html('Try Again');
        $('#mcq_button').removeClass('disabled').removeAttr('aria-disabled');
        $('#mcq_button').attr('tabindex', '0');
        $('#answer_label').show();
        $('#Add_solution').hide();
        $('#need_help').show();
        $('#answer_label').html(incorrectFBText);
        if (optFeedback != undefined && optFeedback != "") {
            var feedback = $("<p>").addClass("ic-opt-fbk").html(optFeedback)
            $('#answer_label').after(feedback);
        }
        $('#answer_label').removeClass().addClass('not-quite');
    } else if (currentQuestion.state === 'correct') {
        $('.focus-input').each(function () {
            $(this).addClass('already-answered');
            if ($(this).attr('data-id') == currentQuestion.userAnswered) {
                $(this).addClass('last-child').attr("aria-describedby", "ariaCorrect");
            }
        });
        if (question == quiz.length) {
            $('#mcq_button').html('Done').hide();
        } else {
            $('#mcq_button').html('Next Question');
        }
        $('#mcq_button').removeClass('disabled').removeAttr('aria-disabled');
        $('#mcq_button').attr('tabindex', '0');
        $('#answer_label').show();
        $('#Add_solution').children().html(currentQuestion.ansText);
        $('#Add_solution').show();
        $('#need_help').hide();
        $('#answer_label').html(correctFBText);
        $('#answer_label').removeClass().addClass('correct');
    } else {
        $('.focus-input').removeClass().addClass('focus-input');
        $('.focus-input').each(function () {
            if($(this).attr("aria-describedby") == "ariaIncorrect" 
            || $(this).attr("aria-describedby") == "ariaCorrect"){
                $(this).removeAttr("aria-describedby");
            }
        });
        $('#mcq_button').html('Check Answer');
        $('#mcq_button').addClass('disabled').attr("aria-disabled",true);
        // $('#questionNumber').focus();
        //$('#mcq_button').attr('tabindex', '-1');
        // $('#mcq_button').removeAttr('tabindex');
        $('#answer_label').hide();
        $('#Add_solution').hide();
        $('#need_help').show();
    }
    $('.nav-link').removeClass('active');
    $('.nav-link').each(function () {
        if ($(this).attr('data-id') == 'q-' + question) {
            $(this).addClass('active');
        }
    });
    MathJax.typesetClear()
    MathJax.typeset();
    questionCounter++;
    bind_annotLinkEvents();
}
function addActiveClass(el) {
    var isWrong = isAnsweredWrong();
    //console.log("called addActiveClass " + el.key)
    if(!$(el.target).hasClass('already-answered') && !isWrong){
        $(".ic-opt-fbk").remove();
        $(el.target).prevAll().removeClass().addClass('focus-input').attr("aria-checked", false);
        $(el.target).nextAll().removeClass().addClass('focus-input').attr("aria-checked", false);
        $('.focus-input').each(function () {
            if($(this).attr("aria-describedby") == "ariaIncorrect" 
            || $(this).attr("aria-describedby") == "ariaCorrect"){
                $(this).removeAttr("aria-describedby");
            }
        });
        $(el.target).removeClass().addClass('focus-input active').attr("aria-checked", true);
        $('#mcq_button').html('Check Answer');
        $('#Add_solution').hide();
        $('#answer_label').hide();
        $('.tab-pane ').attr('data-state', 'answered');
        $('#mcq_button').removeClass('disabled').removeAttr('aria-disabled');
        $('#mcq_button').attr('tabindex', '0');
        ariaAnnounce('Selected option is ' + $(el.target).text());
    }
}

function onClickAndEnterKey(el){
    if ((el.type === 'keydown' && el.keyCode == 13) || el.type === 'click') {
        addActiveClass(el)
        el.preventDefault();
        el.stopPropagation();
        return false;
    }
}

function isAnsweredWrong(){
    var isAnsweredWrong = false;
    $('.ques-content ul li.focus-input').each(function () {
        if($(this).hasClass("wrong")){
            isAnsweredWrong = true;
        }
    });
    return isAnsweredWrong;
}
// check the current option is true or not .
function getResult(element) {
    var id = parseInt($(element).attr('data-id'));
    let dataId = 'q-' + parseInt($('.tab-pane').attr('id'));
    if (id === currentQuestion.answer) {
        $(element).removeClass().addClass("focus-input last-child").attr("aria-describedby", "ariaCorrect");
        $(".focus-input").attr("aria-disabled",true);
        correctMsg.innerHTML = correctFBText;
        $(element).parent().attr("data-correct", "true");
        //$(element).attr("role", "img");
        updateAnswerIndicator("correct");
        if (parseInt($('.tab-pane').attr('id')) == quiz.length) {
            $('#mcq_button').html('Done').hide();
        } else {
            $('#mcq_button').html('Next Question');
        }
        $('#mcq_button').attr('tabindex', '0');
        unclickableOptions();
        $('#answer_label').show();
        $('#need_help').hide();
        $('#Add_solution').children().html(currentQuestion.ansText);
        $('#Add_solution').show();
        $('.tab-pane ').attr('data-state', 'correct');
        currentQuestion.state = 'correct';
        $('.nav-link').each(function () {
            if ($(this).attr('data-id') == dataId) {
                $(this).attr({
                    'data-correct': true,
                    'aria-label': 'Correct'
                });
            }
        });
        ariaAnnounce('Selected option ' + $(element).text() + ' is correct. ' + currentQuestion.ansText);
    } else {
        $(element).removeClass().addClass("focus-input wrong").attr("aria-describedby", "ariaIncorrect");
        $(".focus-input").attr("aria-disabled",true);
        correctMsg.classList.add("not-quite");
        var optFeedback = $(element).attr('data-feedback')
        if (optFeedback != undefined && optFeedback != "") {
            var feedback = $("<p>").addClass("ic-opt-fbk").html(optFeedback)
            $('#answer_label').after(feedback);
        }
        correctMsg.innerHTML = incorrectFBText;
        updateAnswerIndicator("wrong");
        $('#mcq_button').html('Try Again');
        $('#mcq_button').attr('tabindex', '0');
        $('#answer_label').show();
        $('#need_help').show();
        $('.tab-pane ').attr('data-state', 'wrong');
        $('.nav-link').each(function () {
            if ($(this).attr('data-id') == dataId) {
                $(this).attr({
                    'data-correct': false,
                    'aria-label': 'Incorrect'
                });
            }
        });
        currentQuestion.state = 'wrong';
        ariaAnnounce('Selected option ' + $(element).text() + ' is incorrect. ' + tryagainFBText);
    }
    currentQuestion.userAnswered = id;

    bind_annotLinkEvents();
}
function unclickableOptions() {
    var optionLen = optionContainer.children.length;
    for (var i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered")
    }
}
function answerIndicatot() {
    var totalQuestion = quiz.length;
    for (var i = 0; i < totalQuestion; i++) {
        // var optionIndi = document.createElement("span");
        // indicator.appendChild(optionIndi);
        // optionIndi.classList.add("step-active");
        // // optionIndi.setAttribute("data-correct", "true");
        // optionIndi.setAttribute("arial-label", i + 1);
        // optionIndi.innerHTML = i;
        var footerLi = document.createElement("li");
        indicator.appendChild(footerLi);
        footerLi.classList.add("nav-item");
        var footerAnchor = document.createElement("a");
        footerLi.appendChild(footerAnchor);
        footerAnchor.classList.add("nav-link");
        footerAnchor.classList.add("step");
        footerAnchor.setAttribute("data-id", 'q-' + (parseInt(i) + 1));
        footerAnchor.setAttribute("href", '#');
        //footerLi.setAttribute('role', 'option');
        //footerLi.setAttribute('aria-selected', 'false');
        //APT: Added selected state to anchor element
        //footerAnchor.setAttribute('role', 'option');
        //footerAnchor.setAttribute('aria-selected', false);
        footerAnchor.removeAttribute("aria-current");
        var footerSpan = document.createElement("span");
        footerSpan.innerHTML = (parseInt(i) + 1);
        footerSpan.setAttribute('aria-hidden', 'true');
        footerAnchor.appendChild(footerSpan);
        footerAnchor.prepend($("<span class='visually-hidden' aria-hidden='true'>page </span>")[0])
        if (parseInt(i) === 0) {
            footerAnchor.classList.add("active");
            //footerAnchor.setAttribute('aria-selected', true);
            footerAnchor.setAttribute('aria-current', "page");
        }
        // optionIndi.setAttribute("data-correct", "true");
        //footerAnchor.setAttribute("title", 'page ' + (parseInt(i) + 1));
        footerAnchor.setAttribute("aria-label", 'page ' + (parseInt(i) + 1));
        footerAnchor.setAttribute('tabindex', '0');
        paginationTabindex++;
    }
}
function updateAnswerIndicator(markType) {
    //    indicator.children[questionCounter-1].classList.add(step-active);
    let currentQuestion = parseInt($('.tab-pane').attr('id')) - 1;
    if (markType === 'correct') {
        $('#answer_label').removeClass().addClass('correct');
        $('#Add_solution').children().html(quiz[currentQuestion].ansText);
    } else if (markType === 'wrong') {
        $('#answer_label').removeClass().addClass('not-quite');
        $('#Add_solution').children().html(quiz[currentQuestion].ansText);
    }
    bind_annotLinkEvents();
}
$('#mcq_button').on('mousedown click', function (e) {
    if($(e.currentTarget).hasClass("disabled")){
        return false;
    }
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        $(".ic-opt-fbk").remove();
        $('.focus-input').each(function () {
            if($(this).attr("aria-describedby") == "ariaIncorrect" 
            || $(this).attr("aria-describedby") == "ariaCorrect"){
                $(this).removeAttr("aria-describedby");
            }
        });
        let buttonText = $('#mcq_button').text().split(' ')[0].trim().toLocaleLowerCase();
        if (buttonText === 'check') {
            let answered = $('.Multiple-choice').find('.active');
            getResult(answered);
        } else if (buttonText === 'next') {
            getNewQuestion(parseInt($('.tab-pane').attr('id')) + 1);
            /*$('#answer_label').hide();
            $('#Add_solution').hide();
            $('#need_help').show();*/
            $('#questionNumber').focus();
        } else if (buttonText === 'try') {
            debugger;
            $('.focus-input').removeClass().addClass('focus-input').attr("aria-checked",false).attr("aria-disabled", false);
            $('#answer_label').hide();
            $('#Add_solution').hide();
            $('.nav-link').each(function () {
                let dataId = 'q-' + parseInt($('.tab-pane').attr('id'));
                if ($(this).attr('data-id') == dataId) {
                    $(this).removeAttr('data-correct');
                    $(this).removeAttr('aria-label');
                }
            });
            $('.focus-input').each(function (index) {
                if (index == 0) {
                    $(this).attr("tabindex",0);
                }
                else{
                    $(this).attr("tabindex",-1);
                }
            });
            $('#show_ans').attr('aria-expanded', false);
            $('#mcq_button').addClass('disabled').attr("aria-disabled",true);
            $('#questionNumber').focus();
            $('#mcq_button').html('Check Answer');
            $('#need_help').attr("aria-hidden","false").show()
            // $('#mcq_button').removeAttr('tabindex');
            //$('#mcq_button').attr('tabindex', '-1');
            
            let currentQuestionIndex = parseInt($('.tab-pane').attr('id')) - 1;
            let question = quiz[currentQuestionIndex]
            question.userAnswered = '';
            question.state = 'notAnswered';
        }
    }
})
window.onload = function () {
    $(".answer-controls").hide()
    setAvailableQuestion();
    getNewQuestion(1);
    $(".answer-controls").show()
    answerIndicatot();
    $('#Add_solution').hide();
    $('#Add_solution').children().html(quiz[0].ansText);
    $('.arrow-left').addClass('disabled').attr("aria-disabled",true)
    bind_annotLinkEvents();
};
$('#show_ans').on('click keydown', (function (e) {
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        let currentQuestion = parseInt($('.tab-pane').attr('id')) - 1;
        $('#Add_solution').children().html(quiz[currentQuestion].ansText);
        $('#Add_solution').show();
        $('#mcq_button').html('Try Again');
        $('#mcq_button').removeClass('disabled').removeAttr('aria-disabled');
        // $('#mcq_button').removeAttr('tabindex');
        $('#mcq_button').attr('tabindex', '0');
        $('.focus-input').removeClass('wrong').removeAttr("aria-checked").removeAttr("aria-describedby").attr("aria-disabled", true);
        let correctAnswer = [];
        $('.focus-input').each(function () {
            if ($(this).attr('data-id') == quiz[currentQuestion].answer) {
                $(this).addClass('last-child').attr("aria-checked", "true").attr("aria-describedby", "ariaCorrect");
                correctAnswer.push($(this).text());
                //ariaAnnounce('Correct answer is ' + $(this).text());
            }
        })
        correctAnswer = correctAnswer.join(',');
        setTimeout(() => {
            ariaAnnounce('Correct answer is ' + correctAnswer + ". " + quiz[currentQuestion].ansText);
        }, 200);
        
        $(".ic-opt-fbk").remove();
        $('#answer_label').hide();
        $('#need_help').attr("aria-hidden","true").hide();
        bind_annotLinkEvents();
    }
}));
$('.arrow-left').on('click keydown', function (e) {
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        let currentQuestion = parseInt($('.tab-pane').attr('id'));
        if (currentQuestion === 1) {
            // getNewQuestion(quiz.length);
            // autoDragPagination(quiz.length);
        } else {
            if (currentQuestion - 1 === 1) {
                disablenextPrevButtons('.arrow-left');
            } else {
                $('.arrow-left').removeClass('disabled').removeAttr('aria-disabled');
                $('.arrow-left').attr('tabindex', 0);
            }
            $('.arrow-right').removeClass('disabled').removeAttr('aria-disabled');
            $('.arrow-right').attr('tabindex', 0);
            getNewQuestion(currentQuestion - 1);
            autoDragPagination(currentQuestion - 1);
            $('#questionNumber').focus();
        }
    }
});
$('.arrow-right').on('click keydown', function (e) {
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        let currentQuestion = parseInt($('.tab-pane').attr('id'));
        if (currentQuestion === quiz.length) {
            // getNewQuestion(1);
            // autoDragPagination(1);
        } else {
            if (currentQuestion + 1 === quiz.length) {
                disablenextPrevButtons('.arrow-right');
            } else {
                $('.arrow-right').removeClass('disabled').removeAttr('aria-disabled');
                $('.arrow-right').attr('tabindex', 0);
            }
            $('.arrow-left').removeClass('disabled').removeAttr('aria-disabled');
            $('.arrow-left').attr('tabindex', 0);
            getNewQuestion(currentQuestion + 1);
            autoDragPagination(currentQuestion + 1);
            $('#questionNumber').focus();
        }
    }
});
$('#show_ans').on('focusin click keyup', function (e) {
    if ($('#Add_solution').is(':visible')) {
        $(e.target).attr('aria-expanded', true);
    } else {
        $(e.target).attr('aria-expanded', false);
    }
});

var ariaClearTimeout = null;
function ariaAnnounce(msg) {
    //console.log(msg);
    if (msg) {
        clearTimeout(ariaClearTimeout)
        $('#ariaMessages').html("");
        $('#ariaMessages').html(msg);
    }
    ariaClearTimeout = setTimeout(function () {
        $('#ariaMessages').html("");
    }, 5000);
};


function bind_annotLinkEvents() {
    $('.tab-pane a[href]').on('click', function (e) {
        var annotId = $(this).attr("href");
        if(annotId!="#" && annotId!="" && annotId!= undefined){
            if (!annotId.startsWith("#")) {
                annotId = "#" + annotId;
            }
            if ($(annotId).length > 0) {
                document.location.hash = annotId;
            }
            else {
                try {
                    if (typeof parent.annotate_from_frame == "function") {
                        parent.annotate_from_frame(annotId);
                    }
                }
                catch (err) {
                    //$(this).hide();
                }
            }
        }
        //e.stopPropagation();
        e.preventDefault();
    });
}


//APT: Accessibility changes.

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   radio.js
 *
 *   Desc:   Radio group widget that implements ARIA Authoring Practices
 */

'use strict';

class RadioGroup {
  constructor(groupNode) {
    this.groupNode = groupNode;

    this.radioButtons = [];

    this.firstRadioButton = null;
    this.lastRadioButton = null;

    var rbs = this.groupNode.querySelectorAll('.focus-input[role=radio]');

    for (var i = 0; i < rbs.length; i++) {
      var rb = rbs[i];

      rb.tabIndex = -1;
      rb.setAttribute('aria-checked', 'false');

      rb.addEventListener('keydown', this.handleKeydown.bind(this));
      rb.addEventListener('click', this.handleClick.bind(this));
      rb.addEventListener('focus', this.handleFocus.bind(this));
      rb.addEventListener('blur', this.handleBlur.bind(this));

      this.radioButtons.push(rb);

      if (!this.firstRadioButton) {
        this.firstRadioButton = rb;
      }
      this.lastRadioButton = rb;
    }
    this.firstRadioButton.tabIndex = 0;
  }

  setChecked(currentItem) {
    for (var i = 0; i < this.radioButtons.length; i++) {
      var rb = this.radioButtons[i];
      rb.setAttribute('aria-checked', 'false');
      rb.tabIndex = -1;
    }
    currentItem.setAttribute('aria-checked', 'true');
    currentItem.tabIndex = 0;
    currentItem.focus();
  }

  setCheckedToPreviousItem(currentItem) {
    var index;

    if (currentItem === this.firstRadioButton) {
      this.setChecked(this.lastRadioButton);
    } else {
      index = this.radioButtons.indexOf(currentItem);
      this.setChecked(this.radioButtons[index - 1]);
    }
  }

  setCheckedToNextItem(currentItem) {
    var index;

    if (currentItem === this.lastRadioButton) {
      this.setChecked(this.firstRadioButton);
    } else {
      index = this.radioButtons.indexOf(currentItem);
      this.setChecked(this.radioButtons[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  handleKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case ' ':
        this.setChecked(tgt);
        flag = true;
        break;

      case 'Up':
      case 'ArrowUp':
      case 'Left':
      case 'ArrowLeft':
        this.setCheckedToPreviousItem(tgt);
        flag = true;
        break;

      case 'Down':
      case 'ArrowDown':
      case 'Right':
      case 'ArrowRight':
        this.setCheckedToNextItem(tgt);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleClick(event) {
    this.setChecked(event.currentTarget);
  }

  handleFocus(event) {
    event.currentTarget.classList.add('focus');
    addActiveClass(event)
  }

  handleBlur(event) {
    event.currentTarget.classList.remove('focus');
  }
}

function allowedKey(el_key){
    var event_keys = ['up','arrowup','left','arrowleft', 'down', 'arrowdown', 'right', 'arrowright'];
    if(event_keys.includes(el_key.toLowerCase()))
    {
       return true;
    }
    else{
       return false;
    }
}

// Initialize radio button group
window.addEventListener('load', function () {
  var radios = document.querySelectorAll('[role="radiogroup"]');
  for (var i = 0; i < radios.length; i++) {
    new RadioGroup(radios[i]);
  }
});



