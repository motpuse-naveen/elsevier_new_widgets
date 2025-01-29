var CommonUtils = (function () {
  // Public API
  return {
      /**
       * Render an image with common styling and functionality.
       * @param {Object} headerImage - The image configuration object.
       * @returns {string} - HTML string for the image.
       */
      renderImage: function (headerImage) {
          if (!headerImage || Object.keys(headerImage).length === 0) {
              console.info("Invalid or empty headerImage provided.");
              return '';
          }

          const { src, alt = '', figCaption = 'FIGURE', align = "left", widthPerc = "auto" } = headerImage;
          const effectiveWidthPerc = widthPerc === "" ? "auto" : widthPerc;
          
          return `
              <div class="fig-holder ${align + "_"+ effectiveWidthPerc}">
                  <figure class="fig fig-${align} fig-${effectiveWidthPerc}">
                      <div class="image-zoom-holder">
                          <img class="zoomable-image vst-click" src="${src}" alt="${CommonUtils.escapeHTML(alt)}"/>
                          <img class="image-zoom-proxy" src="${src}" style="display: none;" aria-hidden="true"/>
                          <button class="image-zoom-button" title="Zoom In">
                              <span class="visually-hidden">zoom image</span>
                          </button>
                      </div>
                      <figcaption class="fig-caption">
                          <p><span class="style-fig-caption"><strong>${CommonUtils.escapeHTML(figCaption)}</strong></span></p>
                      </figcaption>
                  </figure>
              </div>
          `;
      },

      /**
       * Escape HTML to prevent XSS vulnerabilities.
       * @param {string} str - The string to escape.
       * @returns {string} - Escaped string.
       */
      escapeHTML: function (str) {
          return str.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
      },

      /**
       * Validate if a string is valid HTML.
       * @param {string} html - The HTML string to validate.
       * @returns {boolean} - True if the string is valid HTML, false otherwise.
       */
      isValidHTML: function (html) {
          const doc = document.createElement("div");
          doc.innerHTML = html;
          return doc.innerHTML === html;
      }
  };
})();


class Accordion_Handler{
  constructor(sharedProperties) {
    this.sharedProperties = sharedProperties; // Store sharedProperties for later use
  }
  render(group) {
    const div = $(`
    <div id="accordian_${group.id}" class="group-main ${group.type}">
    ${group.items.map((item, index) =>
      `<div id="accordian_${group.id}_${index}" class="accordian-main" role="region" aria-labelledby="accordian_title_${group.id}_${index}">
        <button id="hideshow_${group.id}_${index}" itemid="${group.id}_${index}" class="accordian-title-wrapper collapsed" aria-expanded="false" aria-controls="accordian_desc_${group.id}_${index}">
        ${group.titleElement && group.titleElement!="" 
        ? `<${group.titleElement} class="accordian-title" id="accordian_title_${group.id}_${index}">${item.title}</${group.titleElement}>` 
        : `<span class="accordian-title" id="accordian_title_${group.id}_${index}">${item.title}</span>`
        } 
          <span class="hide-show-icon"></span>
        </button>
        <div id="accordian_desc_${group.id}_${index}" class="accordian-desc-wrapper" aria-labelledby="accordian_title_${group.id}_${index}" aria-hidden="true">
            ${item.audio && item.audio!="" ? `<div class="accordian-audio audio-holder">
              <audio id="audio-player" class="video-js vjs-default-skin vjs-audio vjs-has-started vjs-paused"
                  controls="controls" preload="none">
                  <source src="${item.audio}" type="audio/mpeg"></source>
                  <p>Your browser does not support the audio element. Please upgrade your browser.</p>
              </audio>
            </div>` : ''}
            <div class="accordian-desc">${item.explanation}</div>
        </div>
      </div>
      ${group.itemSeperator && group.itemSeperator=="true" ? `<hr class="seperator" aria-hidden="true"/>` : ''}
      `
      ).join('')}
    </div>`);
  return div;
  }
  attachEvents(group) {
    group.items.forEach((item, index) => {
      $(`#hideshow_${group.id}_${index}`).on('click', (event) => {
        const button = $(event.currentTarget); // Use `currentTarget` to always get the button
        if (!button.hasClass('disabled')) {
          this.toggleAnswer(event, button.attr("itemid"));
        }
      });
    });
  }

  toggleAnswer(event,itemid){
    $(event.currentTarget).toggleClass("collapsed");
    $(`#accordian_${itemid} .accordian-desc-wrapper`).toggleClass("visible");
    if($(event.currentTarget).hasClass("collapsed")){
      $(event.currentTarget).attr("aria-expanded","false")
      $(`#accordian_${itemid} .accordian-desc-wrapper`).attr("aria-hidden","true");
    }
    else{
      $(event.currentTarget).attr("aria-expanded","true")
      $(`#accordian_${itemid} .accordian-desc-wrapper`).attr("aria-hidden","false");
    }
  }
}
class Reflective_Writing_Handler {
  constructor(sharedProperties) {
    this.sharedProperties = sharedProperties; // Store sharedProperties for later use
    this.pageStateIdentifier = this.sharedProperties.pageStateIdentifier; // Retrieve pageStateIdentifier
  }

  render(group) {
    const div = $(`
      <div id="reflectiveWriting_${group.id}" class="group-main ${group.type}">
      ${group.items.map((item, index) => {
        // Use pageStateIdentifier for a unique key across pages
        const savedResponses = JSON.parse(localStorage.getItem(`reflectiveWriting_${this.pageStateIdentifier}_${group.id}`)) || {};
        const savedResponse = savedResponses[index] || ''; // Get response for this specific item
        return `
        <div id="reflectiveWriting_${group.id}_${index}" class="reflectiveWriting-main" aria-labelledby="reflectiveWriting_title_${group.id}_${index}">
          <div class="reflectiveWriting-text" id="reflectiveWriting_title_${group.id}_${index}" for="textarea_${group.id}_${index}">
            ${group.optionStyleType != undefined && group.optionStyleType != "" ? `<span class="opt-abbr">${styleTypes[group.optionStyleType][index]}.</span>` : ''}
            <span>${item.title}</span>
          </div>
          <div class="groupWrapper">
            <div class="inputbox-wrapper">
              <textarea 
                id="textarea_${group.id}_${index}" 
                placeholder="Write your answer here...." 
                rows="4" 
                aria-label="Your answer" 
                aria-labelledby="reflectiveWriting_title_${group.id}_${index}"
              >${savedResponse}</textarea>
            </div>
            <div class="reflectiveWriting-feedback dis-none" aria-hidden="true" tabindex="-1">
              ${item.feedback}
            </div>
          </div>
        </div>
        ${group.itemSeperator && group.itemSeperator == "true" ? `<hr class="seperator" aria-hidden="true"/>` : ''}
        `;
      }).join('')}
      <div class="question-controls no-print">
          <button id="btnShowFeedback_${group.id}" class="btn_style_primary show-feedback-btn" aria-disabled="false">Show Feedback</button>
          <button id="btnPrint_${group.id}" class="btn_style_secondary print-btn" aria-hidden="true"><span class="print-btn-icon" aria-hidden="true"></span>Print</button>
      </div>
      </div>`);
    return div;
  }

  attachEvents(group) {
    // Handle feedback toggle
    $(`#btnShowFeedback_${group.id}`).on('click', (event) => {
      if (!$(event.target).hasClass('disabled')) {
        this.toggleFeedback(event, group);
      }
    });

    // Handle printing
    $(`#btnPrint_${group.id}`).on('click', (event) => {
      if (!$(event.target).hasClass('disabled')) {
        var printableElement = $(event.currentTarget).closest(".printable_group");
        printableElement.print({
          globalStyles: true,
          iframe: true,
        });
      }
    });

    // Restore feedback visibility state
    const feedbackState = localStorage.getItem(`feedbackState_${this.pageStateIdentifier}_${group.id}`);
    if (feedbackState === 'shown') {
      $(`#btnShowFeedback_${group.id}`).text("Hide Feedback");
      $(`#reflectiveWriting_${group.id} .reflectiveWriting-feedback`).removeClass("dis-none").attr("aria-hidden", "false");
    }

    // Save user input to LocalStorage
    group.items.forEach((item, index) => {
      const textareaId = `textarea_${group.id}_${index}`;
      $(`#${textareaId}`).on('input', (event) => {
        const userResponse = event.target.value;

        // Retrieve existing responses for this group and page using pageStateIdentifier
        if(this.sharedProperties.saveStateData && this.sharedProperties.saveStateData == "yes"){
          const savedResponses = JSON.parse(localStorage.getItem(`reflectiveWriting_${this.pageStateIdentifier}_${group.id}`)) || {};
          savedResponses[index] = userResponse; // Update response for this specific item

          // Save back to LocalStorage
          localStorage.setItem(`reflectiveWriting_${this.pageStateIdentifier}_${group.id}`, JSON.stringify(savedResponses));
        }
      });
    });
  }

  toggleFeedback(event, group) {
    const feedbackElements = $(`#reflectiveWriting_${group.id} .reflectiveWriting-feedback`);

    // Handle case where no elements are found
    if (feedbackElements.length === 0) {
      console.info("No feedback elements found for group:", group.id);
      return;
    }
    // Toggle visibility
    feedbackElements.toggleClass("dis-none");
    // Determine visibility state based on the first element
    const isHidden = feedbackElements.first().hasClass("dis-none");
    // Update aria-hidden for accessibility
    feedbackElements.attr("aria-hidden", isHidden ? "true" : "false");
    // Manage focus for visible elements
    if (!isHidden) {
      $(event.currentTarget).text("Hide Feedback");
      ariaAnnounce("Feedback Expanded." + feedbackElements.first().text());
      feedbackElements.first().trigger('focus');
    } else {
      $(event.currentTarget).text("Show Feedback");
      ariaAnnounce("Feedback collapsed.");
    }
    if(this.sharedProperties.saveStateData && this.sharedProperties.saveStateData == "yes"){
      localStorage.setItem(`feedbackState_${this.pageStateIdentifier}_${group.id}`, !isHidden?"shown":"hidden");
    }
  }
}

class Dropdown_Handler{
  constructor(sharedProperties) {
    this.sharedProperties = sharedProperties; // Store sharedProperties for later use
    this.pageStateIdentifier = this.sharedProperties.pageStateIdentifier; // Retrieve pageStateIdentifier
  }
  // Method to save the state to LocalStorage
  saveState(groupId, stateData) {
    const key = `dropdown_state_${this.pageStateIdentifier}_${groupId}`;
    localStorage.setItem(key, JSON.stringify(stateData));
  }

  // Method to load the state from LocalStorage
  loadState(groupId) {
    const key = `dropdown_state_${this.pageStateIdentifier}_${groupId}`;
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : null;
  }
  
  clearState(groupId) {
    const key1 = `dropdown_state_${this.pageStateIdentifier}_${groupId}`;
    localStorage.removeItem(key1);

    const key2 = `revealBtn_${this.pageStateIdentifier}_${groupId}`;
    localStorage.removeItem(key2);
  }

  // Example: Load the state when the page is loaded
  loadDropdownState(groupId) {
    debugger;
    const savedState = this.loadState(groupId);

    if (savedState) {
      savedState.forEach(item => {
        const dropdown = $(`#${item.id}`);
        if (dropdown.length) {
          dropdown.val(item.value); // Set the saved value
        }
      });
      const container = $(`#dropdown_${groupId}`);
      const atLeastOneSelected = container.find('.dropdown-select').toArray().some(dropdown => $(dropdown).val() !== "");
      container.find(`#btnCheckAnswer_${groupId}`).attr('aria-disabled', !atLeastOneSelected);
      if(atLeastOneSelected){
        container.find(`#btnCheckAnswer_${groupId}`).removeClass('disabled');
        container.find(`#btnCheckAnswer_${groupId}`).trigger("click");
      }
      debugger;
      var revealBtnState = localStorage.getItem(`revealBtn_${this.pageStateIdentifier}_${groupId}`);
      if(revealBtnState && revealBtnState == "yes"){
        container.find(`#btnRevealAnswer_${groupId}`).trigger("click");
      }
    }
  }
  render(group) {
    const div = $(`
        <div id="dropdown_${group.id}" class="group-main ${group.type}">
            <ol class="ordered-list dropdown">
                ${group.items.map((item, index) => `
                    <li id="dropdown_${group.id}_${index}" class="dropdown-item" aria-labelledby="dropdown_title_${group.id}_${index}">
                        ${(item.headerImage && Object.keys(item.headerImage).length !== 0) ? CommonUtils.renderImage(item.headerImage) : ''}
                        <div class="dropdown-html" id="dropdown_title_${group.id}_${index}">
                        ${group.optionStyleType!=undefined && group.optionStyleType!= "" ? `<span class="opt-abbr">${styleTypes[group.optionStyleType][index]}.</span>` : ''}
                        ${this.parseDropdownHtml(
                          item.dropdownHtml, 
                          this.populateCommonOptions(item.dropdowns, group.commonDropdownOptions), 
                          group.id, 
                          index,
                          item.dropdownPlacement
                        )}
                        </div>
                        ${item.correctFeedback && item.correctFeedback!="" 
                        ? `<div class="item-feedback correct-feedback dis-none" aria-hidden="true">${item.correctFeedback}</div>
                          <div class="item-feedback partial-feedback dis-none" aria-hidden="true">${item.partialFeedback}</div>
                          <div class="item-feedback incorrect-feedback dis-none" aria-hidden="true">${item.incorrectFeedback}</div>` 
                        : ''}
                        ${group.itemSeperator && group.itemSeperator=="true" ? `<hr class="seperator" aria-hidden="true"/>` : ''}
                    </li>
                `).join('')}
            </ol>
            ${group.itemsInstruction && group.itemsInstruction!=""? `${group.itemsInstruction}`:``}
            ${group.correctFeedback && group.correctFeedback!="" 
            ? `<div class="group-feedback correct-feedback dis-none" aria-hidden="true">${group.correctFeedback}</div>
              <div class="group-feedback partial-feedback dis-none" aria-hidden="true">${group.partialFeedback}</div>
              <div class="group-feedback incorrect-feedback dis-none" aria-hidden="true">${group.incorrectFeedback}</div>`

            :`<div class="global-feedback correct-feedback dis-none" aria-hidden="true"><span class="visually-hidden">Feedback: </span>All of your answers are correct.</div>
              <div class="global-feedback partial-feedback dis-none" aria-hidden="true"><span class="visually-hidden">Feedback: </span>You have one or more incorrect answers. <a id="reviewyouranswer1_${group.id}" href="#" class="btnReviewAnswer">Review your answers</a>.</div>
              <div class="global-feedback incorrect-feedback dis-none" aria-hidden="true"><span class="visually-hidden">Feedback: </span>Your answer is incorrect. <a id="reviewyouranswer_${group.id}" href="#" class="btnReviewAnswer">Review your answers</a>.</div>`}

            <div class="question-controls no-print">
                <button id="btnCheckAnswer_${group.id}" class="btn_style_primary check-answer-btn disabled" aria-disabled="true">Check Answer</button>
                <button id="btnResetAnswer_${group.id}" class="btn_style_primary reset-answer-btn dis-none" aria-hidden="true">Reset</button>
                <button id="btnRevealAnswer_${group.id}" class="btn_style_secondary reveal-answer-btn dis-none" aria-hidden="true">Reveal Answer</button>
                <button id="btnPrint_${group.id}" class="btn_style_secondary print-btn dis-none" aria-hidden="true"><span class="print-btn-icon" aria-hidden="true"></span>Print</button>
            </div>
        </div>
    `);
    return div;
    
  }
  parseDropdownHtml(dropdownHtml, dropdowns, groupId, itemIndex, dropdownPlacement) {
    return dropdownHtml.replace(/#dropdown(\d+)#/g, (match, dropdownIndex) => {
        const dropdownKey = `dropdown${dropdownIndex}`;
        const dropdown = dropdowns[dropdownKey];

        if (!dropdown) {
            console.log(`Dropdown data for key '${dropdownKey}' not found.`);
            return match;
        }

        const dropdownId = `${groupId}_${itemIndex}_${dropdownKey}`;
        const dropdownLabel = CommonUtils.escapeHTML(dropdown.dropdownlabel || "Select an option");

        return `
        <span class="dropdown_wrapper dropdown_${dropdownPlacement}">
            <!--<label id="label_${dropdownId}" for="${dropdownId}" class="visually-hidden">${dropdownLabel}</label>-->
            <select id="${dropdownId}" 
                aria-label="${dropdownLabel}" 
                class="dropdown-select" 
                correctOption="${dropdown.correctValue}">
                <option value=""></option>
                ${dropdown.values.map(value => `
                    <option value="${value}">${value}</option>
                `).join('')}
            </select>
            </span>
        `;
    });
  }
  populateCommonOptions(dropdowns, commonDropdownOptions) {
    const updatedDropdowns = { ...dropdowns };
    for (const key in updatedDropdowns) {
        if (updatedDropdowns[key].useCommonOptions === "true") {
            updatedDropdowns[key].values = [...commonDropdownOptions];
        }
    }
    return updatedDropdowns;
  }
  attachEvents(group) {
    group.items.forEach((item, index) => {
      // Attach event handlers for all dropdowns within the item
      Object.keys(item.dropdowns).forEach((dropdownKey) => {
          const dropdownId = `${group.id}_${index}_${dropdownKey}`;
          
          // Handle change event for dropdown
          $(`#${dropdownId}`).on('change', (event) => {
              this.handleDropdownChange(event, group.id, index, dropdownKey);
          });
          
          const dropdown = $(`#${dropdownId}`);

          // Listen for keydown event on the select element itself
          dropdown.on('keydown', (event) => {
            // Check if the Escape key is pressed
            if (event.key === 'Escape') {
              // Close the dropdown (blur it)
              console.log("Escape event fired.")
              dropdown[0].blur(); // Close the dropdown
              dropdown[0].focus(); // Refocus the dropdown to make it active again
              event.preventDefault(); // Prevent the default behavior
            }
          });

          dropdown.find("option").on('keydown', (event) => {
            // Check if the Escape key is pressed
            if (event.key === 'Escape') {
              // Close the dropdown (blur it)
              console.log("Escape event fired.")
              dropdown[0].blur(); // Close the dropdown
              dropdown[0].focus(); // Refocus the dropdown to make it active again
              event.preventDefault(); // Prevent the default behavior
            }
          });
      });
    });

    // Attach event for "Check Answer" button
    $(`#btnCheckAnswer_${group.id}`).on('click', (event) => {
      if(!$(event.currentTarget).hasClass("disabled")){
        this.checkAnswer(event, group.id);
      }
    });

    // Attach event for "Reset" button
    $(`#btnResetAnswer_${group.id}`).on('click', (event) => {
        this.resetAnswers(event, group.id);
    });

    // Attach event for "Reveal Answer" button
    $(`#btnRevealAnswer_${group.id}`).on('click', (event) => {
        this.revealAnswers(event, group.id);
    });

    $(`#btnPrint_${group.id}`).on('click', (event) => {
      if (!$(event.target).hasClass('disabled')) {
        var printableElement = $(event.currentTarget).closest(".printable_group");
        printableElement.print({
          globalStyles: true,
          iframe: true,    
        });
      }
    });

    // Attach event for "Reveal Answer" button
    $(`#reviewyouranswer_${group.id}, #reviewyouranswer1_${group.id}`).on('click', (event) => {
      event.preventDefault(); // Prevent default link behavior (e.g., page refresh)
      // Focus the first visible .item-feedback
      let firstVisibleFeedback = $('.item-feedback:visible').first();

      if (firstVisibleFeedback.length > 0) {
          firstVisibleFeedback.attr('tabindex', '-1').trigger('focus'); // Add focus for accessibility
      }
    });

    // After rendering, load the saved state
    this.loadDropdownState(group.id);

  }


  handleDropdownChange(event, groupId, itemIndex, dropdownKey) {
    const dropdown = $(event.currentTarget);
    // Enable the "Check Answer" button if at least one dropdown is selected
    const container = $(`#dropdown_${groupId}`);
    const atLeastOneSelected = container.find('.dropdown-select').toArray().some(dropdown => $(dropdown).val() !== "");
    container.find(`#btnCheckAnswer_${groupId}`).attr('aria-disabled', !atLeastOneSelected);
    if(atLeastOneSelected){
      container.find(`#btnCheckAnswer_${groupId}`).removeClass('disabled');
    }
    else{
      container.find(`#btnCheckAnswer_${groupId}`).addClass('disabled');
    }

    dropdown.trigger('focus');
  }

  checkAnswer(event, groupId) {
    //console.log(event.target);
    const container = $(`#dropdown_${groupId}`);
    var allCorrectAnswer = true;  // Assume all answers are correct initially
    var allIncorrectAnswer = true;  // Assume all answers are correct initially

    container.find('.dropdown-item').each((_, dropdownItem) => {
        const $dropdownItem = $(dropdownItem);
        
        // Check all dropdowns within the item
        const allCorrect = $dropdownItem.find('select.dropdown-select').toArray().every(dropdown => {
            const $dropdown = $(dropdown);
            const correctOption = $dropdown.attr('correctOption');
            const selectedValue = $dropdown.val();

            return selectedValue === correctOption;
        });
        const allIncorrect = $dropdownItem.find('select.dropdown-select').toArray().every(dropdown => {
          const $dropdown = $(dropdown);
          const correctOption = $dropdown.attr('correctOption');
          const selectedValue = $dropdown.val();

          return selectedValue !== correctOption;
        });

        if(!allCorrect){
          allCorrectAnswer = false;
        }
        if(!allIncorrect){
          allIncorrectAnswer = false;
        }

        $dropdownItem.find("select.dropdown-select").each(function(){
          const $dropdown = $(this);
          const correctOption = $dropdown.attr('correctOption');
          const selectedValue = $dropdown.val();
          // Check if the selected value is correct
          if (selectedValue === correctOption) {
              // Add correct icon and highlight
              $dropdown
                  .after('<span class="feedback-icon correct-icon"><span class="visually-hidden">  correct </span></span>')
                  .addClass('correct-highlight');
          } else {
              // Add incorrect icon and highlight
              $dropdown
                  .after('<span class="feedback-icon incorrect-icon"><span class="visually-hidden"> incorrect </span></span>')
                  .addClass('incorrect-highlight');
          }
          // Disable dropdown
          $dropdown.attr('disabled', true).attr("aria-disabled","true");
        });

        // Show feedback based on correctness of all dropdowns within the item
        var $itemFeedback = $dropdownItem.find(".item-feedback");
        if ($itemFeedback.length > 0) {
            if (allCorrect) {
              $dropdownItem.find('.item-feedback.correct-feedback').removeClass("dis-none").removeAttr('aria-hidden');
              $dropdownItem.find('.item-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
              $dropdownItem.find('.item-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
            }
            else if (allIncorrect){
              $dropdownItem.find('.item-feedback.incorrect-feedback').removeClass("dis-none").removeAttr('aria-hidden');
              $dropdownItem.find('.item-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
              $dropdownItem.find('.item-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
            } else {
              $dropdownItem.find('.item-feedback.partial-feedback').removeClass("dis-none").removeAttr('aria-hidden');
              $dropdownItem.find('.item-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
              $dropdownItem.find('.item-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
            }
        }
    });

    // Show group feedback (correct/incorrect)
    var feedbackToFocus = null;
    var $groupFeedback = container.find(".group-feedback");
    if ($groupFeedback.length > 0) {
        if (allCorrectAnswer) {
          container.find('.group-feedback.correct-feedback').removeClass("dis-none").removeAttr('aria-hidden');
          container.find('.group-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
          container.find('.group-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
          feedbackToFocus = container.find('.group-feedback.correct-feedback');
        }
        else if(allIncorrectAnswer){
          container.find('.group-feedback.incorrect-feedback').removeClass("dis-none").removeAttr('aria-hidden');
          container.find('.group-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
          container.find('.group-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
          feedbackToFocus = container.find('.group-feedback.incorrect-feedback');
        } else {
          container.find('.group-feedback.partial-feedback').removeClass("dis-none").removeAttr('aria-hidden');
          container.find('.group-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
          container.find('.group-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
          feedbackToFocus = container.find('.group-feedback.partial-feedback');
        }
    }
    else{
      var $globalFeedback = container.find(".global-feedback");
      if($globalFeedback.length>0){
        if (allCorrectAnswer) {
          container.find('.global-feedback.correct-feedback').removeClass("dis-none").removeAttr('aria-hidden');
          container.find('.global-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
          container.find('.global-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
          feedbackToFocus = container.find('.global-feedback.correct-feedback');
        }else if(allIncorrectAnswer){
          container.find('.global-feedback.incorrect-feedback').removeClass("dis-none").removeAttr('aria-hidden');
          container.find('.global-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
          container.find('.global-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
          feedbackToFocus = container.find('.global-feedback.incorrect-feedback');
        }
        else{
          container.find('.global-feedback.partial-feedback').removeClass("dis-none").removeAttr('aria-hidden');
          container.find('.global-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
          container.find('.global-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
          feedbackToFocus = container.find('.global-feedback.partial-feedback');
        }
      }
    }

    feedbackToFocus.attr('tabindex', "-1").trigger("focus");
    //var anouncementText = feedbackToFocus.text();
    //ariaAnnounce(anouncementText);

    // Show reset and reveal buttons
    container.find(`#btnResetAnswer_${groupId}`).removeClass('dis-none').removeAttr('aria-hidden');
    if(!allCorrectAnswer){
      container.find(`#btnRevealAnswer_${groupId}`).removeClass('dis-none').removeAttr('aria-hidden');
    }
    container.find(`#btnPrint_${groupId}`).removeClass('dis-none').removeAttr('aria-hidden');
    $(event.currentTarget).addClass("dis-none").attr("aria-hidden", "true");
    if(this.sharedProperties.saveStateData && this.sharedProperties.saveStateData == "yes"){
      const stateData = container.find('.dropdown-select').toArray().map(dropdown => {
        return {
          value: $(dropdown).val(),
          id: $(dropdown).attr('id')
        };
      });
    
      this.saveState(groupId, stateData); // Save the state to LocalStorage
    }
  }

  resetAnswers(event, groupId) {
      const container = $(`#dropdown_${groupId}`);
      // Reset dropdowns
      container.find('.dropdown-select').each((_, dropdown) => {
          const $dropdown = $(dropdown);
          $dropdown.val("").removeAttr('disabled').removeAttr("aria-disabled")
              .removeClass('correct-highlight incorrect-highlight');
      });

      container.find(".feedback-icon").remove();

      container.find(`#btnResetAnswer_${groupId}`).addClass('dis-none').attr('aria-hidden','true');
      container.find(`#btnRevealAnswer_${groupId}`).addClass('dis-none').attr('aria-hidden','true').removeClass("disabled").attr("aria-disabled","false");
      container.find(`#btnPrint_${groupId}`).addClass('dis-none').attr('aria-hidden','true');
      container.find(`#btnCheckAnswer_${groupId}`).removeClass("dis-none").attr("aria-hidden","true").attr('aria-disabled', true).addClass("disabled");

      container.find('.correct-feedback').addClass("dis-none").attr('aria-hidden', true).removeAttr("tabindex");
      container.find('.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true).removeAttr("tabindex");
      container.find('.partial-feedback').addClass("dis-none").attr('aria-hidden', true).removeAttr("tabindex");
      
      container.find(".correct-answer").remove();
      container.find(".dropdown_wrapper").removeAttr("aria-hidden");
      container.find(".reveal-ans-accessible").remove();

      container.find('.dropdown-select:first').trigger('focus');

      this.clearState(groupId)
  }

  revealAnswers(event, groupId) {
      const container = $(`#dropdown_${groupId}`);
      container.find('select.dropdown-select').each((_, dropdown) => {
          const $dropdown = $(dropdown);
          const correctOption = $dropdown.attr('correctOption');
          const selectedValue = $dropdown.val();
          //$dropdown.val(correctOption).addClass('correct');
          if (selectedValue !== correctOption) {
            $dropdown.closest(".dropdown_wrapper")
                  .append(`<span class="correct-answer">${correctOption}</span>`);
            $dropdown.closest(".dropdown_wrapper").attr("aria-hidden", "true");
            $dropdown.addClass("reveal-ans")
            $dropdown.closest(".dropdown_wrapper").after(`<span class="reveal-ans-accessible visually-hidden" aria-hidden="false">answer ${selectedValue} marked incorrect, correct answer ${correctOption}</span>`);
          }
      });
      container.find('.correct-feedback').removeAttr('aria-hidden');
      $(event.currentTarget).addClass("disabled").attr("aria-disabled","true");

      if(this.sharedProperties.saveStateData && this.sharedProperties.saveStateData == "yes"){
        localStorage.setItem(`revealBtn_${this.pageStateIdentifier}_${groupId}`, "yes");
      }
      ariaAnnounce("Answers have been revealed. The correct answers are displayed next to each question.");
  }

}
class Cloze_Handler{
  constructor(sharedProperties) {
    this.sharedProperties = sharedProperties; // Store sharedProperties for later use
    this.pageStateIdentifier = this.sharedProperties.pageStateIdentifier; // Retrieve pageStateIdentifier
  }
  // Method to save the state to LocalStorage
  saveState(groupId, stateData) {
    const key = `cloze_state_${this.pageStateIdentifier}_${groupId}`;
    localStorage.setItem(key, JSON.stringify(stateData));
  }

  // Method to load the state from LocalStorage
  loadState(groupId) {
    const key = `cloze_state_${this.pageStateIdentifier}_${groupId}`;
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : null;
  }
  
  clearState(groupId) {
    const key1 = `cloze_state_${this.pageStateIdentifier}_${groupId}`;
    localStorage.removeItem(key1);

    const key2 = `revealBtn_${this.pageStateIdentifier}_${groupId}`;
    localStorage.removeItem(key2);
  }

  // Example: Load the state when the page is loaded
  loadClozeState(groupId) {
    const savedState = this.loadState(groupId);

    if (savedState) {
      savedState.forEach(item => {
        const cloze = $(`#${item.id}`);
        if (cloze.length) {
          cloze.val(item.value); // Set the saved value
        }
      });
      
      const container = $(`#cloze_${groupId}`);
      const atLeastOneSelected = container.find('.cloze-input').toArray().some(cloze => $(cloze).val() !== "");
      container.find(`#btnCheckAnswer_${groupId}`).attr('aria-disabled', !atLeastOneSelected);
      if(atLeastOneSelected){
        container.find(`#btnCheckAnswer_${groupId}`).removeClass('disabled');
        container.find(`#btnCheckAnswer_${groupId}`).trigger("click");
      }

      var revealBtnState = localStorage.getItem(`revealBtn_${this.pageStateIdentifier}_${groupId}`);
      if(revealBtnState && revealBtnState == "yes"){
        container.find(`#btnRevealAnswer_${groupId}`).trigger("click");
      }
    }
  }
  render(group) {
    const div = $(`
        <div id="cloze_${group.id}" class="group-main ${group.type}">
            <ol class="ordered-list cloze">
                ${group.items.map((item, index) => `
                    <li id="cloze_${group.id}_${index}" class="cloze-item" aria-labelledby="cloze_title_${group.id}_${index}">
                        ${(item.headerImage && Object.keys(item.headerImage).length !== 0) ? CommonUtils.renderImage(item.headerImage) : ''}
                        <div class="cloze-html" id="cloze_title_${group.id}_${index}">
                        ${group.optionStyleType!=undefined && group.optionStyleType!= "" ? `<span class="opt-abbr">${styleTypes[group.optionStyleType][index]}.</span>` : ''}
                        ${this.parseClozeHtml(
                          item.clozeHtml,
                          item.clozes,
                          group.id, 
                          index,
                          item.clozePlacement
                        )}
                        </div>
                        ${item.correctFeedback && item.correctFeedback!="" 
                        ? `<div class="item-feedback correct-feedback dis-none" aria-hidden="true">${item.correctFeedback}</div>
                          <div class="item-feedback partial-feedback dis-none" aria-hidden="true">${item.partialFeedback}</div>
                          <div class="item-feedback incorrect-feedback dis-none" aria-hidden="true">${item.incorrectFeedback}</div>` 
                        : ''}
                        ${group.itemSeperator && group.itemSeperator=="true" ? `<hr class="seperator" aria-hidden="true"/>` : ''}
                    </li>
                `).join('')}
            </ol>
            ${group.itemsInstruction && group.itemsInstruction!=""? `${group.itemsInstruction}`:``}
            ${group.correctFeedback && group.correctFeedback!="" 
            ? `<div class="group-feedback correct-feedback dis-none" aria-hidden="true">${group.correctFeedback}</div>
              <div class="group-feedback partial-feedback dis-none" aria-hidden="true">${group.partialFeedback}</div>
              <div class="group-feedback incorrect-feedback dis-none" aria-hidden="true">${group.incorrectFeedback}</div>`

            :`<div class="global-feedback correct-feedback dis-none" aria-hidden="true"><span class="visually-hidden">Feedback: </span>All of your answers are correct.</div>
              <div class="global-feedback partial-feedback dis-none" aria-hidden="true"><span class="visually-hidden">Feedback: </span>One or more answers are incorrect. <a id="reviewyouranswer1_${group.id}" href="#" class="btnReviewAnswer">Review your answers</a>.</div>
              <div class="global-feedback incorrect-feedback dis-none" aria-hidden="true"><span class="visually-hidden">Feedback: </span>Your answer is incorrect. <a id="reviewyouranswer_${group.id}" href="#" class="btnReviewAnswer">Review your answers</a>.</div>`}

            <div class="question-controls no-print">
                <button id="btnCheckAnswer_${group.id}" class="btn_style_primary check-answer-btn disabled" aria-disabled="true">Check Answer</button>
                <button id="btnResetAnswer_${group.id}" class="btn_style_primary reset-answer-btn dis-none" aria-hidden="true">Reset</button>
                <button id="btnRevealAnswer_${group.id}" class="btn_style_secondary reveal-answer-btn dis-none" aria-hidden="true">Reveal Answer</button>
                <button id="btnPrint_${group.id}" class="btn_style_secondary print-btn dis-none" aria-hidden="true"><span class="print-btn-icon" aria-hidden="true"></span>Print</button>
            </div>
        </div>
    `);
    return div;
  }
  parseClozeHtml(clozeHtml, clozes, groupId, itemIndex, clozePlacement) {
    return clozeHtml.replace(/#cloze(\d+)#/g, (match, clozeIndex) => {
        const clozeKey = `cloze${clozeIndex}`;
        const cloze = clozes[clozeKey];

        if (!cloze) {
            console.log(`Cloze data for key '${clozeKey}' not found.`);
            return match;
        }

        const clozeId = `${groupId}_${itemIndex}_${clozeKey}`;
        const clozeLabel = CommonUtils.escapeHTML(cloze.clozelabel || "Fill in the blank");

        return `
        <span class="cloze_wrapper cloze_${clozePlacement}">
            <!--<label id="label_${clozeId}" for="${clozeId}" class="visually-hidden">${clozeLabel}</label>-->
            <input id="${clozeId}" type="text" autocomplete="off"
                aria-label="${clozeLabel}" 
                class="cloze-input" 
                correctvalue="${cloze.correctValue}"/>
            </span>
        `;
    });
  }
  attachEvents(group) {
    group.items.forEach((item, index) => {
      // Attach event handlers for all dropdowns within the item
      Object.keys(item.clozes).forEach((clozeKey) => {
          const clozeId = `${group.id}_${index}_${clozeKey}`;
          $(`#${clozeId}`).on('input', (event) => {
              this.handleClozeChange(event, group.id, index, clozeKey);
          });
      });
    });

    // Attach event for "Check Answer" button
    $(`#btnCheckAnswer_${group.id}`).on('click', (event) => {
      if(!$(event.currentTarget).hasClass("disabled")){
        this.checkAnswer(event, group.id);
      }
    });

    // Attach event for "Reset" button
    $(`#btnResetAnswer_${group.id}`).on('click', (event) => {
        this.resetAnswers(event, group.id);
    });

    // Attach event for "Reveal Answer" button
    $(`#btnRevealAnswer_${group.id}`).on('click', (event) => {
        this.revealAnswers(event, group.id);
    });

    $(`#btnPrint_${group.id}`).on('click', (event) => {
      if (!$(event.target).hasClass('disabled')) {
        var printableElement = $(event.currentTarget).closest(".printable_group");
        printableElement.print({
          globalStyles: true,
          iframe: true,    
        });
      }
    });
    // Attach event for "Reveal Answer" button
    $(`#reviewyouranswer_${group.id}, #reviewyouranswer1_${group.id}`).on('click', (event) => {
      event.preventDefault(); // Prevent default link behavior (e.g., page refresh)
      // Focus the first visible .item-feedback
      let firstVisibleFeedback = $('.item-feedback:visible').first();

      if (firstVisibleFeedback.length > 0) {
          firstVisibleFeedback.attr('tabindex', '-1').trigger('focus'); // Add focus for accessibility
      }
    });

    // After rendering, load the saved state
    this.loadClozeState(group.id);
  }

  handleClozeChange(event, groupId, itemIndex, clozeKey){
    const cloze = $(event.currentTarget);
    // Enable the "Check Answer" button if at least one input is entered text
    const container = $(`#cloze_${groupId}`);
    const atLeastOneSelected = container.find('.cloze-input').toArray().some(cloze => $(cloze).val() !== "");
    container.find(`#btnCheckAnswer_${groupId}`).attr('aria-disabled', !atLeastOneSelected);
    if(atLeastOneSelected){
      container.find(`#btnCheckAnswer_${groupId}`).removeClass('disabled');
    }
    else{
      container.find(`#btnCheckAnswer_${groupId}`).addClass('disabled');
    }
  }

  checkAnswer(event, groupId) {
    const container = $(`#cloze_${groupId}`);
    var allCorrectAnswer = true;  // Assume all answers are correct initially
    var allIncorrectAnswer = true;  // Assume all answers are correct initially

    container.find('.cloze-item').each((_, closeItem) => {
        const $clozeItem = $(closeItem);
        
        // Check all dropdowns within the item
        const allCorrect = $clozeItem.find('input.cloze-input').toArray().every(cloze => {
            debugger;
            const $cloze = $(cloze);
            const correctValue = $cloze.attr('correctvalue');
            const selectedValue = $cloze.val();
            //console.log(`${selectedValue} === ${correctValue}`)
            return selectedValue === correctValue;
        });

        // Check if all dropdowns within the item are incorrect
        const allIncorrect = $clozeItem.find('input.cloze-input').toArray().every(cloze => {
          debugger;
          const $cloze = $(cloze);
          const correctValue = $cloze.attr('correctvalue');
          const selectedValue = $cloze.val();
          // Log for debugging
          //console.log(`Input Value: "${selectedValue}", Correct Value: "${correctValue}"`);
          return selectedValue !== correctValue;
        });

        if(!allCorrect){
          allCorrectAnswer = false;
        }

        if(!allIncorrect){
          allIncorrectAnswer = false;
        }

        $clozeItem.find("input.cloze-input").each(function(){
          const $cloze = $(this);
          const correctValue = $cloze.attr('correctvalue');
          const selectedValue = $cloze.val();
          // Check if the selected value is correct
          if (selectedValue === correctValue) {
              // Add correct icon and highlight
              $cloze
                  .after('<span class="feedback-icon correct-icon"><span class="visually-hidden">  correct </span></span>')
                  .addClass('correct-highlight');
          } else {
              // Add incorrect icon and highlight
              $cloze
                  .after('<span class="feedback-icon incorrect-icon"><span class="visually-hidden"> incorrect </span></span>')
                  .addClass('incorrect-highlight');
          }
          // Disable dropdown
          $cloze.attr('disabled', true).attr("aria-disabled","true");
        });

        // Show feedback based on correctness of all dropdowns within the item
        var $itemFeedback = $clozeItem.find(".item-feedback");
        if ($itemFeedback.length > 0) {
            $itemFeedback.removeClass("dis-none").attr("aria-hidden", "false");
            if (allCorrect) {
              $clozeItem.find('.item-feedback.correct-feedback').removeClass("dis-none").removeAttr('aria-hidden');
              $clozeItem.find('.item-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
              $clozeItem.find('.item-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
            } 
            else if(allIncorrect){
              $clozeItem.find('.item-feedback.incorrect-feedback').removeClass("dis-none").removeAttr('aria-hidden');
              $clozeItem.find('.item-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
              $clozeItem.find('.item-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
            }
            else {
              $clozeItem.find('.item-feedback.partial-feedback').removeClass("dis-none").removeAttr('aria-hidden');
              $clozeItem.find('.item-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
              $clozeItem.find('.item-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
            }
        }
    });
    // Show group feedback (correct/incorrect)
    var feedbackToFocus = null;
    var $groupFeedback = container.find(".group-feedback");
    if ($groupFeedback.length > 0) {
        if (allCorrectAnswer) {
            container.find('.group-feedback.correct-feedback').removeClass("dis-none").removeAttr('aria-hidden');
            container.find('.group-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
            container.find('.group-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
            feedbackToFocus = container.find('.group-feedback.correct-feedback');
        } else if (allIncorrectAnswer){
            container.find('.group-feedback.incorrect-feedback').removeClass("dis-none").removeAttr('aria-hidden');
            container.find('.group-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
            container.find('.group-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
            feedbackToFocus = container.find('.group-feedback.incorrect-feedback');
        } else {
            container.find('.group-feedback.partial-feedback').removeClass("dis-none").removeAttr('aria-hidden');
            container.find('.group-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
            container.find('.group-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
            feedbackToFocus = container.find('.group-feedback.partial-feedback');
        }
    }
    else{
      var $globalFeedback = container.find(".global-feedback");
      if($globalFeedback.length>0){
        if (allCorrectAnswer) {
          container.find('.global-feedback.correct-feedback').removeClass("dis-none").removeAttr('aria-hidden');
          container.find('.global-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
          container.find('.global-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
          feedbackToFocus = container.find('.global-feedback.correct-feedback');
        } else if (allIncorrectAnswer){
          container.find('.global-feedback.incorrect-feedback').removeClass("dis-none").removeAttr('aria-hidden');
          container.find('.global-feedback.partial-feedback').addClass("dis-none").attr('aria-hidden', true);
          container.find('.global-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
          feedbackToFocus = container.find('.global-feedback.incorrect-feedback');
        }
        else{
          container.find('.global-feedback.partial-feedback').removeClass("dis-none").removeAttr('aria-hidden');
          container.find('.global-feedback.correct-feedback').addClass("dis-none").attr('aria-hidden', true);
          container.find('.global-feedback.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true);
          feedbackToFocus = container.find('.global-feedback.partial-feedback');
        }
      }
    }
    feedbackToFocus.attr('tabindex', "-1").trigger("focus");
    //var anouncementText =feedbackToFocus.text();
    //ariaAnnounce(anouncementText);

    // Show reset and reveal buttons
    container.find(`#btnResetAnswer_${groupId}`).removeClass('dis-none').removeAttr('aria-hidden');
    if(!allCorrectAnswer){
      container.find(`#btnRevealAnswer_${groupId}`).removeClass('dis-none').removeAttr('aria-hidden');
    }
    container.find(`#btnPrint_${groupId}`).removeClass('dis-none').removeAttr('aria-hidden');
    $(event.currentTarget).addClass("dis-none").attr("aria-hidden", "true");
    if(this.sharedProperties.saveStateData && this.sharedProperties.saveStateData == "yes"){
      const stateData = container.find('.cloze-input').toArray().map(cloze => {
        return {
          value: $(cloze).val(),
          id: $(cloze).attr('id')
        };
      });
    
      this.saveState(groupId, stateData); // Save the state to LocalStorage
    }
  }

  resetAnswers(event, groupId) {
    const container = $(`#cloze_${groupId}`);
      // Reset dropdowns
      container.find('input.cloze-input').each((_, cloze) => {
          const $cloze = $(cloze);
          $cloze.val("").removeAttr('disabled').removeAttr("aria-disabled")
              .removeClass('correct-highlight incorrect-highlight');
      });

      container.find(".feedback-icon").remove();

      container.find(`#btnResetAnswer_${groupId}`).addClass('dis-none').attr('aria-hidden','true');
      container.find(`#btnRevealAnswer_${groupId}`).addClass('dis-none').attr('aria-hidden','true').removeClass("disabled").attr("aria-disabled","false");
      container.find(`#btnPrint_${groupId}`).addClass('dis-none').attr('aria-hidden','true');
      container.find(`#btnCheckAnswer_${groupId}`).removeClass("dis-none").attr("aria-hidden","true").attr('aria-disabled', true).addClass("disabled");

      container.find('.correct-feedback').addClass("dis-none").attr('aria-hidden', true).removeAttr("tabindex");
      container.find('.incorrect-feedback').addClass("dis-none").attr('aria-hidden', true).removeAttr("tabindex");
      container.find('.partial-feedback').addClass("dis-none").attr('aria-hidden', true).removeAttr("tabindex");
      
      container.find(".correct-answer").remove();
      container.find(".cloze_wrapper").removeAttr("aria-hidden");
      container.find(".reveal-ans-accessible").remove();
      container.find('input.cloze-input:first').focus()

      this.clearState(groupId)
  }

  revealAnswers(event, groupId) {
    const container = $(`#cloze_${groupId}`);
      container.find('input.cloze-input').each((_, cloze) => {
        debugger;
          const $cloze = $(cloze);
          const correctValue = $cloze.attr('correctvalue');
          const selectedValue = $cloze.val();
          //$dropdown.val(correctOption).addClass('correct');
          if (selectedValue !== correctValue) {
            $cloze.closest(".cloze_wrapper")
                  .append(`<span class="correct-answer">${correctValue}</span>`);
            $cloze.closest(".cloze_wrapper").attr("aria-hidden", "true");
            $cloze.addClass("reveal-ans")
            $cloze.closest(".cloze_wrapper").after(`<span class="reveal-ans-accessible visually-hidden" aria-hidden="false">answer ${selectedValue} marked incorrect, correct answer ${correctValue}</span>`);
          }
      });
      $(event.currentTarget).addClass("disabled").attr("aria-disabled","true");
      container.find('.correct-feedback').removeAttr('aria-hidden');
      
      if(this.sharedProperties.saveStateData && this.sharedProperties.saveStateData == "yes"){
        localStorage.setItem(`revealBtn_${this.pageStateIdentifier}_${groupId}`, "yes");
      }
      ariaAnnounce("Answers have been revealed. The correct answers are displayed next to each question.");
  }
}


