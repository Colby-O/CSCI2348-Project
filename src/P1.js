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
  let keyboard = document.getElementById("kbd");
  let blog = document.getElementById("blogArea");
  let edit1 = document.getElementById("edit1");
  let edit2 = document.getElementById("edit2");
  let edit3 = document.getElementById("edit3");

  let isBlogVisable = edit1.checked || edit2.checked ||edit3.checked;
  let allBlogsUnchecked =  !edit1.checked && !edit2.checked && !edit3.checked;
  
  blog.style.visibility = keyboard.style.visibility = (isBlogVisable) ? "visible" : "hidden";
  edit1.style.visibility = (edit1.checked || allBlogsUnchecked) ? "visible" : "hidden";
  edit2.style.visibility = (edit2.checked || allBlogsUnchecked) ? "visible" : "hidden";
  edit3.style.visibility = (edit3.checked || allBlogsUnchecked) ? "visible" : "hidden";
}

/**
 * This function saves whatever is in the textbox to local storage.
 *
 * SDR March 6, 2022 + Colby O'Keefe (A00428974)
 */
function save() {
  if (Storage !== void(0)) localStorage.setItem("entry", document.getElementById("textbox").value);
  else console.log("Browser doesn't support Web Storage...");
}
