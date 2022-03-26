/*
  Author: Sebastian Duque Rivera (A00441528) or SDR
  Author: Felipe Duque Rivera (A00446745) or FDR
  Author: Mohammed Al-Bashiri (A00391502)
  Author: Colby O'Keefe (A00428974)

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
    if (Storage !== void 0)
      $("#textbox").val(window.localStorage.getItem(currentBlogID));
    else $("#textbox").val("");

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
    if (Storage !== void 0)
      $("#textbox").val(window.localStorage.getItem(currentBlogID));
    else $("#textbox").val("");

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
    if (Storage !== void 0)
      $("#textbox").val(window.localStorage.getItem(currentBlogID));
    else $("#textbox").val("");

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

  const SERVER_URL = "http://140.184.230.209:3033";

  // Saves to the server when clicking the save button
  // using Post functions
  $("#save").on("click", function () {
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
  });

  /**
   * cancel button deletes new unsaves data and get
   * saved data from the server and refresh the page
   */
  $("#cancel").on("click", function () {
    $.get(SERVER_URL + "/myGet", callback2).fail(errorCallback1);
    window.location.href = window.location.href;
  });

  // get functions gets data from the server after refreshing the page
  $.get(SERVER_URL + "/myGet", callback2).fail(errorCallback1);
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

/**
 * This function saves whatever is in the textbox to local storage.
 *
 * SDR March 6, 2022 + Colby O'Keefe (A00428974)
 */
// function save() {
//   if (Storage !== void 0) {
//     // Saves the blogs content
//     localStorage.setItem(currentBlogID, $("#textbox").val());
//     // Saves the blogs title
//     localStorage.setItem(
//       currentBlogID.replace(/blog/i, "title"),
//       $("#" + currentBlogID.replace(/blog/i, "title")).val()
//     );
//   } else console.log("Browser doesn't support Web Storage...");
// }

/*
  Cancels the current blog edit

  Author(s): Colby O'Keefe(A00428974)
*/
// function cancel() {
//   // Restores saved blog
//   $("#textbox").val(window.localStorage.getItem(currentBlogID));
//   // Updates keybaord
//   $("#textbox").focus();
//   // Restores saved blogs title
//   updateBlogTitles();
// }

/*
  Creates the clear button that erases the latest word in the current blog edit.

  Author(s): Felipe Duque Rivera (A00446745)
*/
function erase() {
  // Completely clears the textbox
  $("#textbox").val("");
  $("#textbox").focus();
}

/**
 * console log callback functions, errors and
 * callback function to get data from the server
 *
 * Created: Mohammed Al-Bashiri March 25, 2022
 * Modified: Mohammed Al-Bashiri March 26, 2022
 */
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
