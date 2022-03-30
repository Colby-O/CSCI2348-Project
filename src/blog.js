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

const MAX_NUM_SVAED_WORDS_PER_ROW = 2;

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

let checkedContainer = null;
let currentEditing = null;
let savedWordContainer = null;
let wordBankTextbox = null
let wordBankContainer = null;


let savedWords = [];

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
  wordBankTextbox = $("#words").get(0);
  checkedContainer = $("#blog-option-container").get(0);
  currentEditing = $("#currently-editing-blog").get(0);
  savedWordContainer = $("#saved-word-container").get(0);
  wordBankContainer = $("#word-bank-container").get(0);

  wordBankContainer.style.display = "none";

  $.get(SERVER_URL + "/getWordBank").done(fetchSavedWords);

  $.get(SERVER_URL + "/getBlog", { blogIndex: 1 }).done((req) => {
    $("#publish1").prop("checked", req.published);
  });
  $.get(SERVER_URL + "/getBlog", { blogIndex: 2 }).done((req) => {
    $("#publish2").prop("checked", req.published);
  });
  $.get(SERVER_URL + "/getBlog", { blogIndex: 3 }).done((req) => {
    $("#publish3").prop("checked", req.published);
  });

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

    currentEditing.innerHTML = "You are currently editing blog 1";

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

    currentEditing.innerHTML = "You are currently editing blog 2";

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

    currentEditing.innerHTML = "You are currently editing blog 3";

    // Gets saved value from local storage if its supported by the browser
    $.get(SERVER_URL + "/getBlog", { blogIndex: 3 }).done(setBlog);

    // focus the blog textarea so the keybaord will update
    $("#textbox").focus();
  });

  $("#publish1").change(() => {
    const packet = {
      blogIndex: 1,
      published: $("#publish1").is(":checked"),
    };
    $.post(SERVER_URL + "/publishBlog", packet);
  });

  $("#publish2").change(() => {
    const packet = {
      blogIndex: 2,
      published: $("#publish2").is(":checked"),
    };
    $.post(SERVER_URL + "/publishBlog", packet);
  });

  $("#publish3").change(() => {
    const packet = {
      blogIndex: 3,
      published: $("#publish3").is(":checked"),
    };
    $.post(SERVER_URL + "/publishBlog", packet);
  });
}

/* Colby O'Keefe (A00428974) */
function displayWarning(warningTitle, warningText, callback) {
  swal({
    title: warningTitle,
    text: warningText,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((confrim1) => {
    if (!confrim1) {
      swal("No changes were saved.");
      return;
    }
    swal({
      title: "ARE YOU SURE?!",
      text: "You will not be able to go back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confrim2) => {
      if (!confrim2) {
        swal("No changes were saved.");
        return;
      }
      callback();
    }); 
  }); 
}

/* Colby O'Keefe (A00428974) */
function fetchSavedWords(bank) {
  savedWordContainer.innerHTML = "";
  let rowDiv = null;
  bank.forEach((word, index) => {
    if (index % MAX_NUM_SVAED_WORDS_PER_ROW === 0) rowDiv = document.createElement("div");

    let deleteButton =  document.createElement("a");
    deleteButton.innerHTML = "<i class='bi bi-x-square'></i>"
    deleteButton.classList.add("btn", "btn-info", "delete-word-button");
    deleteButton.setAttribute("data-role", "button");
    deleteButton.onclick = () => displayWarning(`Are you sure you want to delete "${word}" from the word bank?`, "", () => deleteSavedWord(index, word));

    let wordName = document.createElement("a");
    wordName.innerHTML = word;
    wordName.classList.add("btn", "btn-light", "saved-word");
    
    let addButton = document.createElement("a");
    addButton.innerHTML = "Add";
    addButton.classList.add("btn", "btn-info", "add-word-button");
    addButton.setAttribute("data-role", "button");
    addButton.onclick = () => addWordToBlog(word);
    
    rowDiv.append(deleteButton, wordName, addButton);
    savedWordContainer.append(rowDiv);
  });
}

/* Colby O'Keefe (A00428974) */
function deleteSavedWord(index, word) {
  $.post(SERVER_URL + "/deleteWord", {"index": index});
  $.get(SERVER_URL + "/getWordBank").done(fetchSavedWords);
}

/* Colby O'Keefe (A00428974) */
function toggleWordBank() {
  if (wordBankContainer.style.display === "none") wordBankContainer.style.display = "block";
  else wordBankContainer.style.display = "none";
}

/* Colby O'Keefe (A00428974) */
function addWordToBank() {
  let word = $(wordBankTextbox).val();
  if (word === "") return;
  $.post(SERVER_URL + "/saveWord", {"word": word});
  $(wordBankTextbox).val("");
  $.get(SERVER_URL + "/getWordBank").done(fetchSavedWords);
}

/* Colby O'Keefe (A00428974) */
function addWordToBlog(word) {
  let currentValue = $("#textbox").val();
  $("#textbox").val(currentValue + `${word} `);
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
  checkedContainer.style.display = allBlogsUnchecked ? "block" : "none";
}

/* Colby O'Keefe (A00428974) */
function setBlog(req) {
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
 * Modified: Colby O'Keefe (A00428974) March 30th 2022
 */
function save() {
    const packet = {
      blogIndex: parseInt(currentBlogID.replace(/blog/i, "")),
      blogContent: $("#textbox").val(),
    }
    $.post(SERVER_URL + "/saveBlog", packet);
}

/*
  Cancels the current blog edit
  Created: Mohammed Al-Bashiri March 25, 2022
  Modified: Colby O'Keefe(A00428974)
  Modified: March 28, 2022 (SDR + FDR)
  Modified: Colby O'Keefe (A00428974) March 30th 2022
*/
function cancel(req) {
  edit1.checked = edit2.checked = edit3.checked = false;
  getKbd();
}

/*
  Creates the clear button that erases the latest word in the current blog edit.

  Author(s): Felipe Duque Rivera (A00446745)
  Modfified: March 26, 2022 Colby & Mohammed
*/
function erase() {
  let text = $("#textbox").val();
  let lastindex = text.lastIndexOf(" ");
  if (lastindex === -1) $("#textbox").val("");
  else $("#textbox").val(text.substring(0, lastindex));
  $("#textbox").focus();
}
