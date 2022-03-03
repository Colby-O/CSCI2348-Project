
function addChar(char) {
    $("#textbox").val($("#textbox").val() + char);
}

function backsapce() {
    let value = $("#textbox").val();
    if(value.length) {
        $("#textbox").val(() => {
            return value.substring(0, value.length - 1);
        });
    }
}