/*
    Author: Sebastian Duque Rivera (A00441528)
    Author: Felipe Duque Rivera (A00446745)
    Author: Mo ()
    Author: Colby (A00428974)

    This file will be used throughout our project for the three phases of our service learning
    assignment for Northwood Care. This is our javascript file.
    
    Current Phase: 1 , Date created: March 3, 2022.
*/

function setup() {}

/**
 * This function checks to see if any of the edit toggles are checked and retrieves the keyboard
 * if any of them are.
 *
 * Status: In-progress
 * SDR March 5, 2022
 */
function getKbd() {
  let keyboard = document.getElementById("kbd");
  let edit1 = document.getElementById("edit1");
  let edit2 = document.getElementById("edit2");
  let edit3 = document.getElementById("edit3");

  //Checks if edit 1, 2 or 3 is checked
  if (edit1) {
  }
}

/**
 * This function saves whatever is in the textbox to local storage.
 *
 * SDR March 6, 2022 + Colby O'Keefe (A00428974)
 */
function save() {
  if(Storage !== void(0)) localStorage.setItem("entry", document.getElementById("textbox").value);
  else console.log("Browser doesn't support Web Storage...");
}
