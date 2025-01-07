//"st-upper-alpha", "st-lower-alpha", "st-upper-roman", "st-lower-roman", "st-decimal", "st-none"
const styleTypes = {
  'st-upper-alpha': ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  'st-lower-alpha': ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  'st-upper-roman': ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"],
  'st-lower-roman': ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx"],
  'st-decimal':["1" ,"2","3","4","5","6","7","8","9","10","11","12","13","14","15", "16","17","18","19","20"]
}

class QuestionRenderer {
  constructor(groups,sharedProperties) {
    this.questionGroups = groups;
    this.sharedProperties = sharedProperties;
  }
  render() {
    //Arrow functions do not have their own this; they inherit this from the enclosing lexical scope.
    //Object.keys(this.questionGroups).forEach((key, index) => {
    //If you prefer not to use arrow functions, explicitly bind the this context.
    Object.keys(this.questionGroups).forEach(function (key, index) {
      console.log(`key=${key}  index=${index} value=${this.questionGroups[key]}`);
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      const quesGroupHandler = this.getHandler(this.questionGroups[key].type);
      if (quesGroupHandler) {
        const groupElement = quesGroupHandler.render(this.questionGroups[key]);
        const placeholderId = this.questionGroups[key].placeholder_id;
  
        if (placeholderId.startsWith("#")) {
          $(placeholderId).append(groupElement);
        } else {
          $(`#${placeholderId}`).append(groupElement);
        }
  
        quesGroupHandler.attachEvents(this.questionGroups[key]);
      } else {
        console.error(`No handler for group type: ${this.questionGroups[key].type}`);
      }
    }.bind(this));
    //Add ARIA div, required for live announcement and aria-describedby 
    this.add_ARIA_Div_to_DOM();

    //Apply shared properties to question-main element.
    this.applySharedProperties();
  }
  getHandler(type) {
    const handlers = {
      /*MCMS: new MCMS_Handler(this.sharedProperties),//Multiple Choice, Multiple Select
      MCQ: new MCQ_Handler(this.sharedProperties),//Multiple Choice Question
      SAQ: new SAQ_Handler(this.sharedProperties),//Short/Answer question
      SAX: new SAX_Handler(this.sharedProperties),//Short/Answer With Explanation*/
      accordian: new Accordion_Handler(this.sharedProperties),//Accordian with Audio
      dropdown: new Dropdown_Handler(this.sharedProperties),//dropdown groups
      cloze: new Cloze_Handler(this.sharedProperties),//fill in the blank groups
      reflective_writing: new Reflective_Writing_Handler(this.sharedProperties),//Short Answer with Feedback
    };
    return handlers[type] || null;
  }
  applySharedProperties(){
    if(this.sharedProperties.maxWidth!=undefined && this.sharedProperties.maxWidth != ""){
      $(".group-main").css({"max-width":this.sharedProperties.maxWidth});
    }
    if(this.sharedProperties.alignment!=undefined && this.sharedProperties.alignment == "center"){
      $(".group-main").addClass("align-center");
    }
    else{
      $(".group-main").addClass("align-left");
    }
    if(this.sharedProperties.borderedBox!=undefined && this.sharedProperties.borderedBox == "true"){
      $(".group-main").addClass("bordered-box");
    }
  }
  add_ARIA_Div_to_DOM(){
    const divs = $(`
        <div id="ariaMessages" class="visually-hidden" aria-live="assertive" aria-hidden="true"></div>
        <div id="ariaCorrect" class="visually-hidden" aria-hidden="true"> Correct </div>
        <div id="ariaIncorrect" class="visually-hidden" aria-hidden="true"> Incorrect </div>
        <div id="ariaAnswerExplanation" class="visually-hidden" aria-hidden="true"> Answer Explanation </div>
        <div id="ariaExplanationFeedback" class="visually-hidden" aria-hidden="true"> Explanation Feedback </div>
    `)
    /*
    const elm_question_group = $(".question-group:first");
    if(elm_question_group != undefined){
      elm_question_group.before(divs)
    }
    else{
      const elm_group_main = $(".group-main:first");
      if(elm_group_main != undefined){
        elm_group_main.before(divs)
      }
    }
    */
    $("body").append(divs);
  }
  init_videoJS_audio_component(){
    // Select all audio elements with the class 'video-js'
    const audioPlayers = document.querySelectorAll('audio.video-js.vjs-audio');

    // Initialize each player
    audioPlayers.forEach((audio, index) => {
        const player = videojs(audio, {
            controls: true,
            autoplay: false,
            preload: 'auto',
        });

        // Remove the fullscreen button for each player
        player.ready(function () {
            const fullscreenButton = player.controlBar.getChild('FullscreenToggle');
            if (fullscreenButton) {
                fullscreenButton.hide();
            }
        });
    });
  }
}

var ariaClearTimeout = null;
function ariaAnnounce(msg) {
    console.log(msg);
    if (msg) {
        clearTimeout(ariaClearTimeout)
        $('#ariaMessages').html("").attr("aria-hidden","false");
        $('#ariaMessages').html(msg);
    }
    ariaClearTimeout = setTimeout(function () {
        $('#ariaMessages').html("").attr("aria-hidden","true");
    }, 5000);
}

function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")  // Escape ampersand
      .replace(/</g, "&lt;")   // Escape less-than sign
      .replace(/>/g, "&gt;");  // Escape greater-than sign
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Initialize the renderer
$(document).ready(function () {
  const questionRenderer = new QuestionRenderer(questions_data.question_groups, questions_data.sharedProperties);
  questionRenderer.render();
  setTimeout(function(){
    questionRenderer.init_videoJS_audio_component();
  }, 1000)
  
})