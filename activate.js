// ==UserScript==
// @name        Bard Chat Initiator
// @namespace   https://tampermonkey.net/
// @description Adds a button to initialize Bard chat with a specific instruction.
// @version     1.0
// @author      Bard
// @match       https://bard.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant       none
// @run-at document-idle
// ==/UserScript==

/**
 * Add ability to get a multi-level response from Bard
 */
const multiLevelInstruction = `
Let's have a chat and discussion about some different topics. But there's an important tip that you need to take into account when trying to respond to me.
I want you to adjust the preciseness and depth of the conversation based on a Level that I specify on each prompt I write to you.
"L1": Level 1, Respond with the shortest and most precise answer
"L2": Level 2, Respond with more details, providing a small overview of the whole thing about the prompt
"L3": Level 3, go a bit more detailed and comprehensive that Level 2. provide more details.
"L4": Level 4, when specified, try to respond with as much details and you can while keeping the conversation not too long.
"L5": Level 5, explain in the most detailed possible way providing a clear and complete response with examples, references and everything needed to give a complete answer

Note: If no level was specified, assume Level 1 is requested.

Format:
$PROMPT$ L1

Result will be as short and straightforward as possible since "L1" is specified

Example:
How to make coffee? L1
Response:
Use coffee and a cup to make coffee

How to make coffee? L5
Response:
A fully complete explanation on how to make coffee with providing all the details
Understood. I will follow your instructions and adjust the depth and preciseness of my responses based on the level you specify in each prompt. Please feel free to ask me anything you like, and I will do my best to provide you with an informative and engaging conversation.
`;

(function () {
  "use strict";
  document.addEventListener("keydown", function (event) {
    let inputField = document.querySelector(
      "body > chat-app > side-navigation > mat-sidenav-container > mat-sidenav-content > main > chat-window > div.chat-container.ng-tns-c1385467139-2.ng-star-inserted.at-least-desktop-small > div.bottom-container.ng-tns-c1385467139-2.narrow-container.ng-star-inserted > div.input-area-container.ng-tns-c1385467139-2 > input-area > div > div.text-input-field.ng-tns-c3294528854-5.ng-star-inserted > div > div > div > rich-textarea"
    );
    if (
      event.metaKey &&
      event.shiftKey &&
      (event.key === "O" || event.key === "o")
    ) {
      document.querySelector(".new-conversation").click();
      inputField.focus();
    } else if (event.shiftKey && event.key === "Escape") {
      inputField.focus();
    } else if (
      event.metaKey &&
      event.shiftKey &&
      (event.key === "u" || event.key === "U")
    ) {
      inputField.focus();
      let inputTextArea = document.querySelector("body > chat-app > side-navigation > mat-sidenav-container > mat-sidenav-content > main > chat-window > div.chat-container.ng-tns-c1385467139-2.ng-star-inserted.at-least-desktop-small > div.bottom-container.ng-tns-c1385467139-2.narrow-container.ng-star-inserted > div.input-area-container.ng-tns-c1385467139-2 > input-area > div > div.text-input-field.ng-tns-c3294528854-5.ng-star-inserted > div > div > div > rich-textarea > div.ql-editor.textarea.ql-blank > p")
      inputTextArea.innerText = multiLevelInstruction;
      setTimeout(function() {
        document.querySelector("body > chat-app > side-navigation > mat-sidenav-container > mat-sidenav-content > main > chat-window > div.chat-container.ng-tns-c1385467139-2.ng-star-inserted.at-least-desktop-small > div.bottom-container.ng-tns-c1385467139-2.narrow-container.ng-star-inserted > div.input-area-container.ng-tns-c1385467139-2 > input-area > div > div.send-button-container.ng-tns-c3294528854-5.outer.ng-star-inserted > button > span.mat-mdc-button-persistent-ripple.mdc-icon-button__ripple")
          .click()
        inputField.focus();
      }, 200);
    }
  });
})();
