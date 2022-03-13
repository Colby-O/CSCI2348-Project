/*
 *  This file contains the code for the keyboard.
 *
 *  Author: Colby O'Keefe (A00428974)
 *  Author: Mo (A00391502)
 *  Author: Sebastian Duque Rivera (A00441528) or SDR
 */

let lastFocused = null;

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

  init() {
    // Creates keyboard containers
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // ADD BOOTSTRAP CLAESS FOR WHOLE KEYBOARD
    this.elements.main.classList.add("keyboard");
    // ADD BOOTSTRAP CLAESS FOR KEY CONTAINER
    this.elements.keysContainer.classList.add("keyboardKeys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard-key");
    this.elements.main.appendChild(this.elements.keysContainer);
    $(this.elements.main).appendTo(".keyboard-container");
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "shift",
      "--",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "backspace",
      "--",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      '"',
      "--",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      "space",
      ".",
      "?",
      ",",
      "--",
      "Word",
      "Word",
      "--",
    ];
    // word {icon, text, save}
    const createIcon = (icon_name) => {
      return `<i class="${icon_name}"></i>`;
    };

    let currentRow = document.createElement("div");
    // ADD BOOTSTRAP CLASSES FPOR BUTTON ROW GROUP HERE
    const rowClassList = "m-1";
    currentRow.classList.add(rowClassList);

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("a");
      keyElement.setAttribute("data-role", "button");
      const breakLine = ["--"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      // ADD BOOTSTRAP CLAESS FOR ALL BUTTONS TYPES
      keyElement.classList.add("keyboard-key");

      switch (key) {
        case "--":
          break;
        case "shift":
          // ADD BOOTSTRAP CLAESS FOR SHIFT KEY
          keyElement.classList.add("btn", "btn-dark", "black-key");
          keyElement.innerHTML = createIcon("bi-arrow-up");

          keyElement.addEventListener("click", () => {
            this._toggleCaps();
            keyElement.classList.toggle(
              "keyboardKey--active",
              this.properties.capsLock
            );
          });
          break;

        case "Word":
          // ADD BOOTSTRAP CLASS FOR WordBank KEY
          // create bank button
          let bankBtn = document.createElement("a");
          bankBtn.classList.add("btn", "btn-secondary", "word-bank");
          bankBtn.innerHTML = "Word";
          bankBtn.innerHTML += createIcon("bi bi-piggy-bank");
          bankBtn.setAttribute("data-role", "button");

          // create textbox
          let textbox = document.createElement("input");
          textbox.setAttribute("type", "text");
          textbox.classList.add("wb-textbox");

          // create star button
          let saveBtn = document.createElement("a");
          saveBtn.classList.add("btn", "btn-secondary", "star-btn");
          saveBtn.innerHTML = createIcon("bi bi-star");
          saveBtn.setAttribute("data-role", "button");

          // append each element to keyElement
          keyElement.append(bankBtn);
          keyElement.append(textbox);
          keyElement.append(saveBtn);
          break;

        case "backspace":
          // ADD BOOTSTRAP CLAESS FOR BACKSPACE KEY
          keyElement.classList.add("btn", "btn-dark", "black-key");
          keyElement.innerHTML = createIcon("bi-arrow-left");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });
          break;
        case "enter":
          // ADD BOOTSTRAP CLAESS FOR ENTER KEY
          keyElement.classList.add("btn", "btn-dark", "black-key");
          keyElement.innerHTML = "Enter";

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });
          break;
        case "space":
          // ADD BOOTSTRAP CLAESS FOR SPACE KEY
          keyElement.classList.add("btn", "btn-dark", "black-key");
          keyElement.innerHTML = "Space";

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });
          break;
        default:
          // ADD BOOTSTRAP CLAESS FOR ALL OTHER KEYS
          keyElement.classList.add("btn", "btn-danger", "red-key");
          keyElement.innerHTML = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });
          break;
      }
      if (key == "Word") console.log(keyElement);
      currentRow.append(keyElement);

      if (breakLine) {
        fragment.append(currentRow);
        currentRow = document.createElement("div");
        currentRow.classList.add(rowClassList);
      }
    });

    return fragment;
  },
  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleCaps() {
    this.properties.capsLock = !this.properties.capsLock;
    for (let key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (key.textContent.length > 1) continue;
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
  swapTextfield(id, initalValue, oninput) {
    this.properties.value = initalValue || "";
    this.eventHandlers.oninput = oninput;
  },  
  startup(initalValue, oninput) {
    this.properties.value = initalValue || "";
    this.eventHandlers.oninput = oninput;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  // Inits the keyboard
  Keyboard.init();

  // adds the keyboard for element with the class use-keyboard
  document.querySelectorAll(".use-keyboard").forEach((element) => {
    $(element).focus(() => {
      Keyboard.startup($(element).val(), (currentValue) => {
        $(element).val(currentValue);
      });
    });
  });
});
