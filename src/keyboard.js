/*
 * This file contains the code for the keyboard.
 *
 * Author(s): Colby O'Keefe (A00428974)
 */

/*
 * Handles logic for alphanumeric characters + space + enter (\n).
 */
function addChar(char) {
    $("#textbox").val($("#textbox").val() + char);
}

/*
 * Handles logic for backspace.
 */
function backsapce() {
    let value = $("#textbox").val();
    if(value.length) {
        $("#textbox").val(() => {
            return value.substring(0, value.length - 1);
        });
    }
}
