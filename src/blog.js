/*
  Author: Sebastian Duque Rivera (A00441528) or SDR
  Author: Felipe Duque Rivera (A00446745) or FDR
  Author: Mohammed Al-Bashiri (A00391502)
  Author: Colby O'Keefe (A00428974)

  This file will be used throughout our project for the three phases of our service learning
  assignment for Northwood Care. This is our javascript file.
    
  Current Phase: 1 , Date created: March 3, 2022.
*/

// Server URL
//const SERVER_URL = "http://127.0.0.1:3033";
const SERVER_URL = "http://ugdev.cs.smu.ca:3033";

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
// Stores the three blog title elements
let title1 = null;
let title2 = null;
let title3 = null;

/*
  Displays the saved blog titles

  Author(s): Colby O'Keefe(A00428974)
*/
function updateBlogTitles() {
  if (Storage !== void 0) {
    $("#title1").val(window.localStorage.getItem("title1"));
    $("#title2").val(window.localStorage.getItem("title2"));
    $("#title3").val(window.localStorage.getItem("title3"));
  }
}

/*
  Sets up the keyboard and blog list to be hidden.

  Author(s): Colby O'Keefe(A00428974) + SDR
*/
function setup() {
  // Gets page elements
  keyboard = $("#kbd").get(0);
  blog = $("#blogArea").get(0);
  edit1 = $("#edit1").get(0);
  edit2 = $("#edit2").get(0);
  edit3 = $("#edit3").get(0);
  title1 = $("#title1").get(0);
  title2 = $("#title2").get(0);
  title3 = $("#title3").get(0);

  // Sets the save blog titles
  updateBlogTitles();

  // hides the blog + keyboard
  blog.style.visibility = keyboard.style.visibility = "hidden";

  $("#edit1").change(() => {
    // Check if switch is checked
    if (!$("#edit1").is(":checked")) {
      // disables the keyboard on the title textfield
      $("#title1").addClass("keyboard-disable");
      return;
    }

    // enables the keyboard on the title textfield
    $("#title1").removeClass("keyboard-disable");

    // Sets selected blog id
    currentBlogID = "blog1";

    // Gets saved value from local storage if its supported by the browser
    $.get(SERVER_URL + "/getBlog", { blogIndex: 1 }).done(setBlog);

    // focus the blog textarea so the keyboard will update
    $("#textbox").focus((e) => {
      e.target.focus({ preventScroll: true });
    });
  });

  $("#edit2").change(() => {
    // Check if switch is checked
    if (!$("#edit2").is(":checked")) {
      // disables the keyboard on the title textfield
      $("#title2").addClass("keyboard-disable");
      return;
    }

    // enables the keyboard on the title textfield
    $("#title2").removeClass("keyboard-disable");

    // Gets saved value from local storage if its supported by the browser
    currentBlogID = "blog2";
    $.get(SERVER_URL + "/getBlog", { blogIndex: 2 }).done(setBlog);

    // focus the blog textarea so the keybaord will update
    $("#textbox").focus();
  });

  $("#edit3").change(() => {
    // Check if switch is checked
    if (!$("#edit3").is(":checked")) {
      // disables the keyboard on the title textfield
      $("#title3").addClass("keyboard-disable");
      return;
    }

    // enables the keyboard on the title textfield
    $("#title3").removeClass("keyboard-disable");

    // Sets selected blog id
    currentBlogID = "blog3";

    // Gets saved value from local storage if its supported by the browser
    $.get(SERVER_URL + "/getBlog", { blogIndex: 3 }).done(setBlog);

    // focus the blog textarea so the keybaord will update
    $("#textbox").focus();
  });

  $("#publish1").change(() => {
    // Prevents publishing unless in edit mode
    if (!$("#edit1").is(":checked"))
      $("#publish1").prop("checked", !$("#publish1").is(":checked"));
  });

  $("#publish2").change(() => {
    // Prevents publishing unless in edit mode
    if (!$("#edit2").is(":checked"))
      $("#publish2").prop("checked", !$("#publish2").is(":checked"));
  });

  $("#publish3").change(() => {
    // Prevents publishing unless in edit mode
    if (!$("#edit3").is(":checked"))
      $("#publish3").prop("checked", !$("#publish3").is(":checked"));
  });

  /**
   * this code has functions that handles
   * post and get data form the server
   *
   * Created: Mohammed Al-Bashiri March 25, 2022
   * Modified: Mohammed Al-Bashiri March 26, 2022
   */
  /**
  // when clicking save button the user is asked twice if he/she want to save
  // Saves to the server when clicking the save button
  // using Post functions
  $("#save").on("click", function () {
    let text = "Do you want to save?";
    if (confirm(text) == true) {
      let text = "Are you sure you want to save?";
      if (confirm(text) == true) {
        if ($("#edit1").is(":checked")) {
          let x = { name: $("#textbox1").val() };
          $.post(SERVER_URL + "/myPost1", x, callback1).fail(errorCallback1);
        } else if ($("#edit2").is(":checked")) {
          let x = { name: $("#textbox2").val() };
          $.post(SERVER_URL + "/myPost2", x, callback1).fail(errorCallback1);
        } else if ($("#edit3").is(":checked")) {
          let x = { name: $("#textbox3").val() };
          $.post(SERVER_URL + "/myPost3", x, callback1).fail(errorCallback1);
        }
      }
    }
  });
  **/
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
  let allBlogsUnchecked = !edit1.checked && !edit2.checked && !edit3.checked;

  blog.style.visibility = keyboard.style.visibility = isBlogVisable
    ? "visible"
    : "hidden";
  edit1.style.visibility =
    edit1.checked || allBlogsUnchecked ? "visible" : "hidden";
  edit2.style.visibility =
    edit2.checked || allBlogsUnchecked ? "visible" : "hidden";
  edit3.style.visibility =
    edit3.checked || allBlogsUnchecked ? "visible" : "hidden";
}

function setBlog(req) {
  console.log(req);
  $("#textbox").val(req.content);
  // Updates keybaord
  $("#textbox").focus();
}

/**
 * This function saves whatever is in the textbox to local storage.
 *
 * SDR March 6, 2022 + Colby O'Keefe (A00428974)
 * Created: Mohammed Al-Bashiri March 25, 2022
 * Modified: Colby O'Keefe(A00428974)
 */
function save() {
  const packet = {
    blogIndex: parseInt(currentBlogID.replace(/blog/i, "")),
    blogContent: $("#textbox").val(),
    blogTitle: $("#" + currentBlogID.replace(/blog/i, "title")).val(),
  };

  $.post(SERVER_URL + "/saveBlog", packet);
}

/*
  Cancels the current blog edit
  Created: Mohammed Al-Bashiri March 25, 2022
  Modified: Colby O'Keefe(A00428974)
*/
function cancel(req) {
  let text = "Do you want to Cancel?";
  if (confirm(text) == true) {
    let text = "Are you sure you want to Cancel?";
    if (confirm(text) == true) {
      edit1.checked = edit2.checked = edit3.checked = false;
      getKbd();
    }
  }
}

/*
  Creates the clear button that erases the latest word in the current blog edit.

  Author(s): Felipe Duque Rivera (A00446745)
  Modfified: March 26, 2022 Colby & Mohammed
*/
function erase() {
  // Completely clears the textbox
  //let formate = /^[!@#$%^&()_+-=[]{};':"|,.<>/?]$/;
  let text = $("#textbox").val();
  let lastindex = text.lastIndexOf(" ");
  // let lastword = text.substring(lastindex, text.length);
  // var regEx = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  // if (regEx.test(lastword)) {

  // }
  if (lastindex === -1) $("#textbox").val("");
  else $("#textbox").val(text.substring(0, lastindex));
  $("#textbox").focus();
}

/**
 * console log callback functions, errors and
 * callback function to get data from the server
 *
 * Created: Mohammed Al-Bashiri March 25, 2022
 * Modified: Mohammed Al-Bashiri March 26, 2022

// console log the callback1
function callback1(returnedData) {
  console.log(returnedData);
}
// console log errors
function errorCallback1(err) {
  console.log(err.responseText);
}
// callback fumctions to retrieve data from the server
function callback2(res) {
  $("#textbox1").val(res[0]);
  $("#textbox2").val(res[1]);
  $("#textbox3").val(res[2]);
}
**/
