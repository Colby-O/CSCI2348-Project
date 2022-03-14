/*
  Author: Sebastian Duque Rivera (A00441528)
  Author: Felipe Duque Rivera (A00446745)
  Author: Mo ()
  Author: Colby (A00428974)

  This file will be used throughout our project for the three phases of our service learning
  assignment for Northwood Care. This is our javascript file.
    
  Current Phase: 1 , Date created: March 3, 2022.
*/

// Stores last blog ID selected
let currentBlogID = null;
// Stores keybaord element
let keyboard = null;
// Stores blog element
let blog = null;
// Stores the three edit swicth elements
let edit1 = null;
let edit2 = null;
let edit3 = null;

/*
  Sets up the keyboard and blog list to be hidden.

  Author(s): Colby O'Keefe(A00428974) + Unknown
*/
function setup() {
  // Gets page elements
  keyboard = document.getElementById("kbd");
  blog = document.getElementById("blogArea");
  edit1 = document.getElementById("edit1");
  edit2 = document.getElementById("edit2");
  edit3 = document.getElementById("edit3");

  // hides the blog + keybaord
  blog.style.visibility = keyboard.style.visibility = "hidden";

  $("#edit1").change(()=> {
    // Check if switch is checked 
    if(!$("#edit1").is(":checked")) return;

    // Sets selected blog id
    currentBlogID = "blog1";

    // Gets saved value from local storage if its supported by the browser
    if (Storage !== void(0)) $("#textbox").val(window.localStorage.getItem(currentBlogID));
    else $("#textbox").val("");

    // focus the blog textarea so the keybaord will update
    $("#textbox").focus();
  });

  $("#edit2").change(()=> {
    // Check if switch is checked
    if(!$("#edit2").is(":checked")) return;

    // Gets saved value from local storage if its supported by the browser
    currentBlogID = "blog2";
    if (Storage !== void(0)) $("#textbox").val(window.localStorage.getItem(currentBlogID));
    else $("#textbox").val("");

    // focus the blog textarea so the keybaord will update
    $("#textbox").focus();
  });

  $("#edit3").change(()=> {
    // Check if switch is checked
    if(!$("#edit3").is(":checked")) return;

    // Sets selected blog id
    currentBlogID = "blog3";

    // Gets saved value from local storage if its supported by the browser
    if (Storage !== void(0)) $("#textbox").val(window.localStorage.getItem(currentBlogID));
    else $("#textbox").val("");

    // focus the blog textarea so the keybaord will update
    $("#textbox").focus();
  });
}

/**
 * This function checks to see if any of the edit toggles are checked. If they are, this function
 * will retrieve the keyboard, as well as the blog area.
 *
 * Created: SDR March 5, 2022
 * Modified: SDR March 12, 2022
 */
function getKbd() {
  let isBlogVisable = edit1.checked || edit2.checked || edit3.checked;
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
  if (Storage !== void(0)) localStorage.setItem(currentBlogID, document.getElementById("textbox").value);
  else console.log("Browser doesn't support Web Storage...");
}

/*
  Cancels the current blog edit

  Author(s): Colby O'Keefe(A00428974)
*/
function cancel() {
  // Unchecks each of the edit switches
  edit1.checked = edit2.checked = edit3.checked = false;
  // Updates the visibility of the page elements
  getKbd();
}
