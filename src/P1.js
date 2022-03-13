/*
  Author: Sebastian Duque Rivera (A00441528)
  Author: Felipe Duque Rivera (A00446745)
  Author: Mo ()
  Author: Colby (A00428974)

  This file will be used throughout our project for the three phases of our service learning
  assignment for Northwood Care. This is our javascript file.
    
  Current Phase: 1 , Date created: March 3, 2022.
*/

/*
  Sets up the keyboard and blog list to be hidden.
*/
function setup() {
  document.getElementById("kbd").style.visibility = "hidden";
  document.getElementById("blogArea").style.visibility = "hidden";
}

/**
 * This function checks to see if any of the edit toggles are checked. If they are, this function
 * will retrieve the keyboard, as well as the blog area.
 *
 * Created: SDR March 5, 2022
 * Modified: SDR March 12, 2022
 */
function getKbd() {
  var keyboard = document.getElementById("kbd");
  var blog = document.getElementById("blogArea");
  var edit1 = document.getElementById("edit1");
  var edit2 = document.getElementById("edit2");
  var edit3 = document.getElementById("edit3");

  //Checks if edit 1, 2 or 3 is checked
  if (edit1.checked == true || edit2.checked == true || edit3.checked == true) {
    keyboard.style.visibility = "visible";
    blog.style.visibility = "visible";
  } else {
    keyboard.style.visibility = "hidden";
    blog.style.visibility = "hidden";
  }
}

/**
 * This function saves whatever is in the textbox to local storage.
 *
 * SDR March 6, 2022 + Colby O'Keefe (A00428974)
 */
function save() {
  if (Storage !== void 0)
    localStorage.setItem("entry", document.getElementById("textbox").value);
  else console.log("Browser doesn't support Web Storage...");
}
