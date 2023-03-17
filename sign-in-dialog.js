//create empty object
var CustomDialogs = {};

//add asynchronous function
CustomDialogs.SignIn = async function(params) {
    //Check if title, message, and cancel after are undefined
    if(params.title == undefined) params.title = "";
    if(params.message == undefined) params.message = "";
    if(params.cancel_after == undefined) params.cancel_after = -1;

    //Write code for dialog element
    var dialog = new DOMParser().parseFromString(`
        <async-dialog id="dialog-SignIn">
            <div slot="title"></div>
            <div slot="message"></div>
            <form onsubmit="return false" slot="content">
            </form>
            <div slot="buttons">
            </div>
        </async-dialog>
    `, "text/html").querySelector("async-dialog");
    
    //Add title to dialog
    dialog.querySelector("div[slot=title]").innerHTML = params.title;

    //Add message to dialog
    dialog.querySelector("div[slot=message]").innerHTML = params.message;

    //Add elements to dialog.
    //You can do it in many ways.
    //We will write html code to achive that
    dialog.querySelector("form[slot=content]").innerHTML = `
        <label class="dialog-input-field">
            <span>Enter your name</span>
            <input type="text" name="name">
        </label>
        <label class="dialog-input-field">
            <span>Enter your surname</span>
            <input type="text" name="surname">
        </label>
        <label class="dialog-input-field">
            <span>Enter your birthdate</span>
            <input type="date" name="birthdate">
        </label>
    `;

    //Add dialog buttons to dialog
    dialog.querySelector("div[slot=buttons]").innerHTML = `
        <button class="dialog-cancel" dialog-result="Cancel">Cancel</button>
        <button class="dialog-ok" dialog-result="OK">Sign In</button>
    `;

    //Set the time afte dialog will autocancel
    if(params.cancel_after >= 1){
        setTimeout(() => {
            dialog.close();
        }, params.cancel_after * 1000);
    }

    //Add dialog to DOM
    document.body.append(dialog);

    //Open dialog
    await dialog.open();

    //Remove dialog from DOM
    dialog.remove();

    //Define on which dialog result the dialog will return a value
    if(dialog.dialog_result == "OK") return dialog.dialog_value;
    else return undefined;
}