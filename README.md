# Asynchronous dialogs
**Asynchronous dialogs** is a vanilla javascript library which main purpose is to create and use modal dialogs. This library works with asynchronous code and uses **async**, **await** and **promises** to give you old-school modal dialog experience. This library defines a web component (async-dialog, which will be important later) and comes with 6 modal dialogs.

***

# Include library to your project

Before you can use features of this library, you must include necessary javascript and css files. To do that, copy the code below and paste it to your code.
```html
<script src="https://voldybv.github.io/async-dialog/async-dialog.js"></script>
<link rel="styleSheet" href="https://voldybv.github.io/async-dialog/async-dialog.css">
```

***

# Modal dialogs

As metioned before, there are varios modal dialogs you can use. In total there are 6 of them, and they are:

+ **Alert**
+ **Prompt**
+ **Confirm**
+ **SingleOption**
+ **MultiOption**
+ **YNC**

You can only use them in asynchronous functions. To call them, use global class Dialog that this library provides you with. You pass object as parameter with following properties (***Dialogs may have different object properties.***):

| Property name            | Dialog                             | Description                                                     |
| ------------------------ | ---------------------------------- | --------------------------------------------------------------- |
| **title**                | All of them                        | *Text that will be displayed in header of the dialog*           |
| **message**              | All of them                        | *Text that represents message of the dialog*                    |
| **cancel_after**         | All of them                        | *The number of seconds after which the dialog will auto cancel* |
| **placeholder**          | Prompt                             | *Placeholder thext for input field*                             |
| **options**              | SingleOption, MultiOption          | *Array of string or* ***option objects***                       |

**If *cancel_after* is less than 1, the dialog wont close until user clicks one of dialog buttons**

## Alert, Prompt, Confirm

These 3 work similar to 3 native javascript dialogs. 


```javascript
async function Alert_Dialog() {
    await Dialog.Alert({
        title: "Alert dialog",
        message: "This is one simple alert dialog",
        cancel_after: 30
    });
}
async function Prompt_Dialog() {
    var name = await Dialog.Prompt({
        title: "Prompt dialog",
        message: "Please, enter your name.",
        placeholder: "John Doe",
        cancel_after: 30
    });
    document.querySelector("#prompt-dialog-result").innerHTML = name;
}
async function Confirm_Dialog() {
    var dialog_value = await Dialog.Confirm({
        title: "Confirm dialog",
        message: "If you want to proceede, click OK.",
        cancel_after: 30
    });
    document.querySelector("#confirm-dialog-result").innerHTML = dialog_value;
}
```

In the code above we defined 3 asynchronous functions, 1 for each dialog.

[See how this works](https://voldybv.github.io/async-dialog/demo_1.html)


## SingleOption and MultiOption

**SingleOption** dialog defines a list of options for user to choose from. User can only choose 1 option. <br>
**MultiOption** same as SingleOption dialog, but user can choose more than 1 option. <br>
Property **options** is array of string variables or ***option objects*** that represents list of options for users. <br>
**Option objects are objects that have *value* property and *text* property**. *Value* property is used by code, and *text* property is displayed to user.

```javascript
async function SingleOption_1() {
    var dialog_value = await Dialog.SingleOption({
        title: "Options as array of string",
        message: "Choose your gender?.",
        options: ["Male", "Female", "I don't want to specify"],
        cancel_after: 30
    });
    document.querySelector("#so1").innerHTML = dialog_value;
}
async function SingleOption_2() {
    var dialog_value = await Dialog.SingleOption({
        title: "Options as array of option objects",
        message: "Choose your gender?.",
        options: [
            {value: "m", text: "Male"},
            {value: "f", text: "Female"},
            {value: "none", text: "I don't want to specify"}
        ],
        cancel_after: 30
    });
    document.querySelector("#so2").innerHTML = dialog_value;
}
async function MultiOption_1() {
    var dialog_value = await Dialog.MultiOption({
        title: "Options as array of string",
        message: "Choose your hobby?.",
        options: ["Acting", "Cooking", "Bikking", "Singing", "Drawing"],
        cancel_after: 30
    });
    document.querySelector("#mo1").innerHTML = dialog_value;
}
async function MultiOption_2() {
    var dialog_value = await Dialog.MultiOption({
        title: "Options as array of option objects",
        message: "Choose your gender?.",
        options: [
            {value: "hobby-id-1", text: "Acting"},
            {value: "hobby-id-2", text: "Coocking"},
            {value: "hobby-id-3", text: "Biking"},
            {value: "hobby-id-4", text: "Singing"},
            {value: "hobby-id-5", text: "Drawing"}
        ],
        cancel_after: 30
    });
    document.querySelector("#mo2").innerHTML = dialog_value;
}
```

In the code above we defined 4 asynchronous functions, 2 for each dialog. This code shows us how to use options property as an array of string or as any array of option objects.

[See how this works](https://voldybv.github.io/async-dialog/demo_2.html)

## YNC

**YNC** is similar to Confirm dialog, but insted of *Cancel* and *OK* buttons, there are *Cancel*, *No*, and *Yes* buttons. Depending on which button the user clicked, the dialog will return the following values:
+ *ture* if user clicks yes
+ *false* if user clicks no
+ *undefined* if user clicks cancel

```javascript
async function YNC_Dialog() {
    var dialog_value = await Dialog.YNC({
        title: "Confirm dialog",
        message: "Do you want to save changes before closing?.",
        cancel_after: 30
    });
    document.querySelector("#ync-dialog-result").innerHTML = dialog_value;
}
```

In the code above we defined 1 asynchronous to show how YNC dialog works.

[See how this works](https://voldybv.github.io/async-dialog/demo_3.html)

***

# Creating modal dialogs

Asynchronous dialogs allows you to define custom modal dialogs. To do that, you must first understand how to build dialogs. <br>
Dialogs are built with **async-dialog** web component that this library provides you with. In the code below you can see template,according to which all dialogs are written.


```html
<async-dialog id="dialog-DialogName">
    <div slot="title"></div>
    <div slot="message"></div>
    <form onsubmit="return false" slot="content">
    </form>
    <div slot="buttons">
    </div>
</async-dialog>
```

## Creating SignIn dialog

Now that you know the template for creating dialogs, it is time to create functions for calling dialogs. <br>
In this example, we'll make SignIn dialog which will be simple sign in form <br><br>

First of all create javascript file and include it into you project. After that, follow the steps below. <br><br>

## Step 1: 

Create empty object that will cointain all of your functions for custom dialogs. We called it **CustomDialogs**. Then add asynchronous method to the object.

```javascript
//create empty object
var CustomDialogs = {};

//add asynchronous function
CustomDialogs.SignIn = async function(params) {
    //all you will write all of the following code here
}
```

## Step 2:

Check if *title*, *message* and *cancel_after* are undefined.

```javascript
//Check if title, message, and cancel after are undefined
if(params.title == undefined) params.title = "";
if(params.message == undefined) params.message = "";
if(params.cancel_after == undefined) params.cancel_after = -1;
``` 

## Step 3: 

Write code for dialog, and then add *title* and *message* to dialog.

```javascript
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
```

## Step 4: 

Add elements to your dialog.

```javascript
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
```

CSS class *dialog-input-filed* will be explained in [Applying CSS to dialogs](#applying-css-to-dialogs) <br><br>

## Step 5:

Add dialog buttons to dialog.

```javascript
//Add dialog buttons to dialog
dialog.querySelector("div[slot=buttons]").innerHTML = `
    <button class="dialog-cancel" dialog-result="Cancel">Cancel</button>
    <button class="dialog-ok" dialog-result="OK">Sign In</button>
`;
```
Dialog buttons will be explained in [Dialog buttons and Dialog Result](#dialog-buttons-and-dialog-result) <br><br>

## Step 6:

Set the time after the dialog will autocancel

```javascript
//Set the time afte dialog will autocancel
if(params.cancel_after >= 1){
    setTimeout(() => {
        dialog.close();
    }, params.cancel_after * 1000);
}
```

## Step 7:

Show the dialog and define on which dialog result the dialog will return *dialog_value*.<br>
Property *dialog_value* is data that user entered.

```javascript
//Add dialog to DOM
document.body.append(dialog);

//Open dialog
await dialog.open();

//Remove dialog from DOM
dialog.remove();

//Define on which dialog result the dialog will return a value
if(dialog.dialog_result == "OK") return dialog.dialog_value;
else return undefined;
```

## Final touch
We have created our first custom dialog called SignIn. Now you can use it.

```javascript
async function SignIn() {
    var dialog_value = await CustomDialogs.SignIn({
        title: "Sign In dialog",
        message: "Fill out the form to sign in.",
        cancel_after: 30
    });
    console.log(dialog_value);
}
```

In the code above we defined 1 asynchronous to show how use custom dialogs.

[See how this works](https://voldybv.github.io/async-dialog/demo_4.html);

***

# Dialog buttons and Dialog Result
**Dialog buttons** are buttons that close dialog and set *dialog_value* property and *dialog_result* property. <br>
Property *dialog_value* is object that contains data that user has entered in dialog. <br>
Property *dialog_result* is text that helps you to determine which button user has clicked. This library comes with 4 default dialog buttons. You can see them in the table below.

| Dialog result | CSS class     |
| ------------- | --------------|
| OK            | dialog-ok     |
| Cancel        | dialog-cancel |
| Yes           | dialog-yes    |
| No            | dialog-no     |

```html
    <!-- HTML code for every dialog button -->
    <button class="" dialog-result=""> Dialog button <button>
```
**Every dialog button must have *dialog-result* attribute. Value of attribute can be anything. Dialog result is there to help you determine which dialog button user have clicked.**

***

# Applying CSS to dialogs