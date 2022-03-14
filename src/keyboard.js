/*
 *  This file contains the code for the keyboard.
 *
 *  Author: Colby O'Keefe (A00428974)
 *  Author: Mo (A00391502)
 *  Author: Sebastian Duque Rivera (A00441528) or SDR
 */

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    values: "",
    capsLock: false,
  },
  /*Colby O'Keefe (A00428974)*/
  init() {
    // Creates keyboard containers
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Add classes to keybaord containers
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboardKeys");

    // Creates the key elements
    this.elements.keysContainer.appendChild(this._createKeys());

    // Stores the keybaord keys elements
    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard-key");

    // Appends the keys to the main page
    this.elements.main.appendChild(this.elements.keysContainer);
    $(this.elements.main).appendTo(".keyboard-container");
  },
  /*Colby O'Keefe (A00428974) + Mo (A00391502) + Sebastian Duque Rivera (A00441528)*/
  _createKeys() {
    // Create a fragment for the keys
    const fragment = document.createDocumentFragment();

    // Keybaord layout
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "shift", "--",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "backspace", "--",
      "z", "x", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter", '"', "--",
      "c", "v", "b", "n", "m", "space",  ".", "?", ",", "--",
      "Word", "Word", "--"
    ];

    // Function to set icon for a key given
    const createIcon = (icon_name) => {
      return `<i class="${icon_name}"></i>`;
    };

    // Create a div to store a row of keys
    let currentRow = document.createElement("div");
    // classlist for each row + sets the first row's classlist
    const rowClassList = "m-1";
    currentRow.classList.add(rowClassList);

    // Loop through each key
    keyLayout.forEach((key) => {
      // Creates a button for the key
      const keyElement = document.createElement("a");
      keyElement.setAttribute("data-role", "button");
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard-key");

      // checks if the current key is a line break
      const breakLine = ["--"].indexOf(key) !== -1;

      switch (key) {
        case "--":
          /*line break*/
          break;
        case "shift":
          // Adds classes + icon to the shift key
          keyElement.classList.add("btn", "btn-dark", "black-key");
          keyElement.innerHTML = createIcon("bi-arrow-up");

          // Adds shift key functionality
          keyElement.addEventListener("click", () => {
            this._toggleCaps();
            keyElement.classList.toggle(
              "keyboardKey--active",
              this.properties.capsLock
            );
          });
          break;

        case "Word":
          /*Word bank button group*/

          // creates bank button
          let bankBtn = document.createElement("a");
          bankBtn.classList.add("btn", "btn-secondary", "word-bank");
          bankBtn.innerHTML = "Word";
          bankBtn.innerHTML += createIcon("bi bi-piggy-bank");
          bankBtn.setAttribute("data-role", "button");

          // create textbox
          let textbox = document.createElement("input");
          textbox.setAttribute("type", "text");
          textbox.classList.add("wb-textbox");
          // Adds the ability to use the keybaord on the textbox
          $(textbox).focus(() => {
            this.startup($(textbox).val(), (currentValue) => {
              $(textbox).val(currentValue);
            });
          });

          // create star button
          let saveBtn = document.createElement("a");
          saveBtn.classList.add("btn", "btn-secondary", "star-btn");
          saveBtn.innerHTML = createIcon("bi bi-star");
          saveBtn.setAttribute("data-role", "button");

          // append each elements to keyElement
          keyElement.append(bankBtn, textbox, saveBtn);
          break;

        case "backspace":
          // Adds classes + icon to the backspace key
          keyElement.classList.add("btn", "btn-dark", "black-key");
          keyElement.innerHTML = createIcon("bi-arrow-left");

          // Adds the functionaility for the backspace key
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });
          break;
        case "enter":
          // Adds classes + icon to the enter key
          keyElement.classList.add("btn", "btn-dark", "black-key");
          keyElement.innerHTML = "Enter";

          // Adds the functionaility for the enter key
          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });
          break;
        case "space":
          // Adds classes + icon to the space key
          keyElement.classList.add("btn", "btn-dark", "black-key");
          keyElement.innerHTML = "Space";

          // Adds the functionaility for the space key
          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });
          break;
        default:
          // Adds classes + icon to a genertic key
          keyElement.classList.add("btn", "btn-danger", "red-key");
          keyElement.innerHTML = key.toLowerCase();

          // Adds the functionaility for a genertic key
          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });
          break;
      }
      // Appends key to current row
      currentRow.append(keyElement);

      // checks if a line break is reached
      if (breakLine) {
        // Adds current row to fragment + creates a new row
        fragment.append(currentRow);
        currentRow = document.createElement("div");
        currentRow.classList.add(rowClassList);
      }
    });

    // return key fragment
    return fragment;
  },
  /*Colby O'Keefe (A00428974)*/
  _triggerEvent(handlerName) {
    /* Handles a trigger evenet */
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  /*Colby O'Keefe (A00428974)*/
  _toggleCaps() {
    // Toggle capslock
    this.properties.capsLock = !this.properties.capsLock;
    // Loops through each key
    for (let key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (key.textContent.length > 1) continue;
        // Swap the caps on the letter in the innerHTML
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
  /*Colby O'Keefe (A00428974)*/
  startup(initalValue, oninput) {
    this.properties.value = initalValue || "";
    this.eventHandlers.oninput = oninput;
  },
};

/*Colby O'Keefe (A00428974)*/
window.addEventListener("DOMContentLoaded", () => {
  // Inits the keyboard
  Keyboard.init();

  // adds the keyboard for element with the class use-keyboard
  document.querySelectorAll(".use-keyboard").forEach((element) => {
    $(element).focus(() => {
      if ($(element).hasClass("keyboard-disable")) return;
      Keyboard.startup($(element).val(), (currentValue) => {
        $(element).val(currentValue);
      });
    });
  });
});
