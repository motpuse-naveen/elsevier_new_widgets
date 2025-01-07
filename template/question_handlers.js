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
              console.warn("Invalid or empty headerImage provided.");
              return '';
          }

          const { src, alt = '', figCaption = 'FIGURE', align = "left", widthPerd = "70" } = headerImage;

          return `
              <div class="fig-holder">
                  <figure class="fig fig-${align} fig-${widthPerd}">
                      <div class="image-zoom-holder">
                          <img class="zoomable-image vst-click" src="${src}" alt="${CommonUtils.escapeHTML(alt)}"/>
                          <img class="image-zoom-proxy" src="${src}" style="display: none;" aria-hidden="true"/>
                          <button class="image-zoom-button">
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
class Reflective_Writing_Handler{
  constructor(sharedProperties) {
    this.sharedProperties = sharedProperties; // Store sharedProperties for later use
  }
  render(group) {
    const div = $(`
      <div id="reflectiveWriting_${group.id}" class="group-main ${group.type}">
      ${group.items.map((item, index) =>
        `<div id="reflectiveWriting_${group.id}_${index}" class="reflectiveWriting-main" aria-labelledby="reflectiveWriting_title_${group.id}_${index}">
          <div class="reflectiveWriting-text" id="reflectiveWriting_title_${group.id}_${index}" for="textarea_${group.id}_${index}">
            ${group.optionStyleType!=undefined && group.optionStyleType!= "" ? `<span class="opt-abbr">${styleTypes[group.optionStyleType][index]}.</span>` : ''}
            <span>${item.title}</span>
          </div>
          <div class="groupWrapper">
            <div class="inputbox-wrapper">
              <textarea id="textarea_${group.id}_${index}" placeholder="Write your answer here...." rows="4" aria-label="Your answer" aria-labelledby="reflectiveWriting_title_${group.id}_${index}"></textarea>
            </div>
            <div class="reflectiveWriting-feedback dis-none" aria-hidden="true" tabindex="-1">
              ${item.feedback}
            </div>
          </div>
        </div>
        ${group.itemSeperator && group.itemSeperator=="true" ? `<hr class="seperator" aria-hidden="true"/>` : ''}
        `
        ).join('')}
        <div class="question-controls">
            <button id="btnShowFeedback_${group.id}" class="btn_style_primary show-feedback-btn" aria-disabled="false">Show Feedback</button>
            <button id="btnPrintFeedback_${group.id}" class="btn_style_secondary print-btn" aria-hidden="true"><span class="print-btn-icon" aria-hidden="true"></span>Print</button>
        </div>
      </div>`);
      return div;
  }
  attachEvents(group) {
    $(`#btnShowFeedback_${group.id}`).on('click', (event) => {
      if (!$(event.target).hasClass('disabled')) {
        this.toggleFeedback(event,group);
      }
    });

    $(`#btnPrintFeedback_${group.id}`).on('click', (event) => {
      if (!$(event.target).hasClass('disabled')) {
        //this.printFeedback(event,group);
        $("#group3_printable").print({
          globalStyles: true,
          iframe: true,    
        });
      }
    });
  }
  toggleFeedback(event, group) {
    const feedbackElements = $(`#reflectiveWriting_${group.id} .reflectiveWriting-feedback`);

    // Handle case where no elements are found
    if (feedbackElements.length === 0) {
        console.warn("No feedback elements found for group:", group.id);
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
      $(event.currentTarget).text("Hide Feedback")
      ariaAnnounce("Feedback Expanded." + feedbackElements.first().text())
      feedbackElements.first().focus();
    } 
    else{
      $(event.currentTarget).text("Show Feedback")
      ariaAnnounce("Feedback collapsed.")
    }
  }

  printFeedback(event, group) {
    const groupElement = $(`#reflectiveWriting_${group.id}`);
    
    if (groupElement.length > 0) {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Reflective Writing</title>
                    <style>
                        /* Add any necessary styles for printing */
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.5;
                        }
                        .reflectiveWriting-main {
                            margin-bottom: 20px;
                            border-bottom: 1px solid #ccc;
                            padding-bottom: 10px;
                        }
                        .reflectiveWriting-feedback {
                            margin-top: 10px;
                            font-style: italic;
                        }
                    </style>
                </head>
                <body>
                    <h1>Reflective Writing</h1>
                    ${groupElement.html()}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    } else {
        alert("No content to print.");
    }
  }
}
class Dropdown_Handler{
  constructor(sharedProperties) {
    this.sharedProperties = sharedProperties; // Store sharedProperties for later use
  }
  render(group) {
    const div = $(`
        <div id="dropdown_${group.id}" class="group-main ${group.type}">
            <ol class="ordered-list dropdown">
                ${group.items.map((item, index) => `
                    <li id="dropdown_${group.id}_${index}" class="dropdown-main" role="group" aria-labelledby="dropdown_title_${group.id}_${index}">
                        ${item.headerImage ? CommonUtils.renderImage(item.headerImage) : ''}
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
                        ? `<div class="feedback-container">
                              <div class="correct-feedback" aria-hidden="true" tabindex="-1">${item.correctFeedback}</div>
                              <div class="incorrect-feedback" aria-hidden="true" tabindex="-1">${item.incorrectFeedback}</div>
                          </div>` 
                        : ''}
                        
                        ${group.itemSeperator && group.itemSeperator=="true" ? `<hr class="seperator" aria-hidden="true"/>` : ''}
                    </li>
                `).join('')}
                
            </ol>
            <div class="question-controls">
                <button id="btnCheckAnswer_${group.id}" class="btn_style_primary check-answer-btn" aria-disabled="true">Check Answer</button>
                <button id="btnResetAnswer_${group.id}" class="btn_style_primary reset-answer-btn dis-none" aria-hidden="true">Reset</button>
                <button id="btnRevealAnswer_${group.id}" class="btn_style_secondary reveal-answer-btn dis-none" aria-hidden="true">Reveal Answer</button>
                <button id="btnPrintFeedback_${group.id}" class="btn_style_secondary print-btn dis-none" aria-hidden="true"><span class="print-btn-icon" aria-hidden="true"></span>Print</button>
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
            console.error(`Dropdown data for key '${dropdownKey}' not found.`);
            return match;
        }

        const dropdownId = `${groupId}_${itemIndex}_${dropdownKey}`;
        const dropdownLabel = CommonUtils.escapeHTML(dropdown.dropdownlabel || "Select an option");

        return `
        <span class="dropdown_${dropdownPlacement}">
            <label for="${dropdownId}" class="visually-hidden">${dropdownLabel}</label>
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

  }
}
class Cloze_Handler{
  constructor(sharedProperties) {
    this.sharedProperties = sharedProperties; // Store sharedProperties for later use
  }
  render(group) {
    const div = $(`
        <div id="cloze_${group.id}" class="group-main ${group.type}">
            <ol class="ordered-list cloze">
                ${group.items.map((item, index) => `
                    <li id="cloze_${group.id}_${index}" class="close-main" role="group" aria-labelledby="cloze_title_${group.id}_${index}">
                        ${item.headerImage ? CommonUtils.renderImage(item.headerImage) : ''}
                        <div class="cloze-html" id="cloze_title_${group.id}_${index}">
                        ${group.optionStyleType!=undefined && group.optionStyleType!= "" ? `<span class="opt-abbr">${styleTypes[group.optionStyleType][index]}.</span>` : ''}
                        ${this.parseClozeHtml(
                          item.clozeHtml,
                          item.clozes,
                          group.id, 
                          index,
                          item.closePlacement
                        )}
                        </div>
                        ${item.correctFeedback && item.correctFeedback!="" 
                        ? `<div class="feedback-container">
                              <div class="correct-feedback" aria-hidden="true" tabindex="-1">${item.correctFeedback}</div>
                              <div class="incorrect-feedback" aria-hidden="true" tabindex="-1">${item.incorrectFeedback}</div>
                          </div>` 
                        : ''}
                        ${group.itemSeperator && group.itemSeperator=="true" ? `<hr class="seperator" aria-hidden="true"/>` : ''}
                    </li>
                `).join('')}
                
            </ol>
            <div class="question-controls">
                <button id="btnCheckAnswer_${group.id}" class="btn_style_primary check-answer-btn" aria-disabled="true">Check Answer</button>
                <button id="btnResetAnswer_${group.id}" class="btn_style_primary reset-answer-btn dis-none" aria-hidden="true">Reset</button>
                <button id="btnRevealAnswer_${group.id}" class="btn_style_secondary reveal-answer-btn dis-none" aria-hidden="true">Reveal Answer</button>
                <button id="btnPrintFeedback_${group.id}" class="btn_style_secondary print-btn dis-none" aria-hidden="true"><span class="print-btn-icon" aria-hidden="true"></span>Print</button>
            </div>
        </div>
    `);
    return div;
  }
  parseClozeHtml(clozeHtml, clozes, groupId, itemIndex, closePlacement) {
    return clozeHtml.replace(/#cloze(\d+)#/g, (match, clozeIndex) => {
        const clozeKey = `cloze${clozeIndex}`;
        const cloze = clozes[clozeKey];

        if (!cloze) {
            console.error(`Cloze data for key '${clozeKey}' not found.`);
            return match;
        }

        const clozeId = `${groupId}_${itemIndex}_${clozeKey}`;
        const clozeLabel = CommonUtils.escapeHTML(cloze.clozelabel || "Fill in the blank");

        return `
        <span class="cloze_${closePlacement}">
            <label for="${clozeId}" class="visually-hidden">${clozeLabel}</label>
            <input id="${clozeId}" type="text"
                aria-label="${clozeLabel}" 
                class="cloze-input" 
                correctvalue="${cloze.correctValue}"/>
            </span>
        `;
    });
  }
  attachEvents(group) {

  }
}


