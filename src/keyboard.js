/*
 * This file contains the code for the keyboard.
 *
 * Author(s): Colby O'Keefe (A00428974), 
 */

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null
    },

    properties: {
        values: "",
        capsLock: false
    },

    init() {
        // Creates keyboard containers
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboardKeys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboardKey');
	this.elements.main.appendChild(this.elements.keysContainer);
	$(this.elements.main).appendTo(".keybaord-container");
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
	    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "shift",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "backspace",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter", '"',
            "z", "x", "c", "v", "b", "n", "m", "space", ".", "?", ","
	];

	const createIcon = (icon_name) => {
	    return `<i class="${icon_name}"></i>`;
	};

        let currentRow = document.createElement("div");
        currentRow.classList.add("m-1");

        keyLayout.forEach(key => {
            const keyElement = document.createElement('a');
            keyElement.setAttribute("data-role", "button")
	    const breakLine = ['shift', 'backspace', '"', ","].indexOf(key) !== -1;

	    keyElement.setAttribute("type", "button");
	    keyElement.classList.add("keyboardKey")

            switch(key) {
                case "shift":
                    keyElement.classList.add("btn", "btn-dark");
		    keyElement.innerHTML = createIcon("bi-arrow-up");

		    keyElement.addEventListener("click", () => {
		    	this._toggleCaps();
		    	keyElement.classList.toggle("keyboardKey--active", this.properties.capsLock);
		    });
                    break;
                case "backspace":
                    keyElement.classList.add("btn", "btn-dark");
                    keyElement.innerHTML = createIcon("bi-arrow-left");

                    keyElement.addEventListener("click", () => {
		    this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
			this._triggerEvent("oninput");
		    });
                    break;
                case "enter":
                    keyElement.classList.add("btn", "btn-dark");
                    keyElement.innerHTML = "Enter";

                    keyElement.addEventListener("click", () => {
			this.properties.value = "\n";
			this._triggerEvent("oninput");
		    });
                    break;
                case "space":
                    keyElement.classList.add("btn", "btn-dark");
                    keyElement.innerHTML = "Space";

                    keyElement.addEventListener("click", () => {
			this.properties.value = " ";
			this._triggerEvent("oninput");
		    });                    
                    break;
                default:
                    keyElement.classList.add("btn", "btn-danger");
                    keyElement.innerHTML = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
			this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
			this._triggerEvent("oninput");
		    }); 
                    break;
            }

            currentRow.append(keyElement);

            if (breakLine) {
                fragment.append(currentRow);
		//fragment.appendChild(document.createElement("br"));
                currentRow = document.createElement("div");
                currentRow.classList.add("m-1");
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
                if (key.textContent === "Space" || key.textContent === "Enter") continue;
		    key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
		}
	    }
	},

    startup(initalValue, oninput, onclose) {
	    this.properties.value = initalValue || "";
	    this.eventHandlers.oninput = oninput;
	},

};

window.addEventListener("DOMContentLoaded", () => {
	// Inits the keyboard
	Keyboard.init();
	// adds the keyboard for element with the class useLobbyKeyboard
	document.querySelectorAll(".useKeyboard").forEach(element => {
	    Keyboard.startup($(element).val(), currentValue => {
        	$(element).val(currentValue);
	    })
	});
});
