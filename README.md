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
    <async-dialog id="dialog-sign-in">
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

Asynchronous dialogs allows you to change style of dialogs. It comes with various custom properties and classes to help you. <br>

## Custom properties

There are many custom properties. We devided them in several categories. And we will explain each one of them.

### Dialog
These custom properties directly affet dialogs.
<table>
    <tr>
        <th>Custom property</th>
        <td>Initial value</td>
        <td>Description</td>
    </tr>
    <tr>
        <th>--overlay-color</th>
        <td>rgba(0, 0, 0, 0.5)</td>
        <td>dialog backdrop color</td>
    </tr>
    <tr>
        <th>--border-style</th>
        <td>solid</td>
        <td>dialog border style</td>
    </tr>
    <tr>
        <th>--border-width</th>
        <td>3px</td>
        <td>dialog border width</td>
    </tr>
    <tr>
        <th>--border-color</th>
        <td>black</td>
        <td>dialog border color</td>
    </tr>
</table>

### Header, body and footer
These properties help you to style header, body and footer of dialog
<table>
    <tr>
        <th>Custom property</th>
        <td>Initial value</td>
        <td>Description</td>
    </tr>
    <tr>
        <th>--header-background-color</th>
        <td>#bbb</td>
        <td>changes background color of dialog's header</td>
    </tr>
    <tr>
        <th>--header-color</th>
        <td>black</td>
        <td>changes font color of dialog's header</td>
    </tr>
    <tr>
        <th>--body-background-color</th>
        <td>white</td>
        <td>changes background color of dialog's body</td>
    </tr>
    <tr>
        <th>--body-color</th>
        <td>black</td>
        <td>changes font color of dialog's body</td>
    </tr>
    <tr>
        <th>--footer-background-color</th>
        <td>#bbb</td>
        <td>changes background color of dialog's footer</td>
    </tr>
</table>

### OK dialog button
These properties will help you to style button which value of *dialog-result* attribbute is equal to **ok**.
    <table>
        <tr>
            <th>Custom property</th>
            <td>Initial value</td>
            <td>Description</td>
        </tr>
        <tr>
            <th>--ok-background-color</th>
            <td>#0066cc</td>
            <td>changes the background color of the button </td>
        </tr>
        <tr>
            <th>--ok-border-style</th>
            <td>solid</td>
            <td>changes the border style of the button </td>
        </tr>
        <tr>
            <th>--ok-border-width</th>
            <td>2px</td>
            <td>changes the background width of the button </td>
        </tr>
        <tr>
            <th>--ok-border-color</th>
            <td>value of --ok-background-color</td>
            <td>changes the border color of the button </td>
        </tr>
        <tr>
            <th>--ok-color</th>
            <td>white</td>
            <td>changes the font color of the button </td>
        </tr>
        <tr>
            <th>--ok-hover-background-color</th>
            <td rowspan=5>As an initial value, these 5 have values of corresponding previous properties</td>
            <td rowspan="5"> these 5 have the exact same effect as previous 5, but their effect are applied on hover. </td>
        </tr>
        <tr>
            <th>--ok-hover-border-style</th>
        </tr>
        <tr>
            <th>--ok-hover-border-width</th>
        </tr>
        <tr>
            <th>--ok-hover-border-color</th>
        </tr>
        <tr>
            <th>--ok-hover-color</th>
        </tr>
    </table>


### Cancel dialog button
These properties will help you to style button which value of *dialog-result* attribbute is equal to **cancel**.
    <table>
        <tr>
            <th>Custom property</th>
            <td>Initial value</td>
            <td>Description</td>
        </tr>
        <tr>
            <th>--cancel-background-color</th>
            <td>white</td>
            <td>changes the background color of the button </td>
        </tr>
        <tr>
            <th>--cancel-border-style</th>
            <td>solid</td>
            <td>changes the border style of the button </td>
        </tr>
        <tr>
            <th>--cancel-border-width</th>
            <td>2px</td>
            <td>changes the background width of the button </td>
        </tr>
        <tr>
            <th>--cancel-border-color</th>
            <td>value of --cancel-background-color</td>
            <td>changes the border color of the button </td>
        </tr>
        <tr>
            <th>--cancel-color</th>
            <td>black</td>
            <td>changes the font color of the button </td>
        </tr>
        <tr>
            <th>--cancel-hover-background-color</th>
            <td rowspan=5>As an initial value, these 5 have values of corresponding previous properties</td>
            <td rowspan="5"> these 5 have the exact same effect as previous 5, but their effect is applied on hover. </td>
        </tr>
        <tr>
            <th>--cancel-hover-border-style</th>
        </tr>
        <tr>
            <th>--cancel-hover-border-width</th>
        </tr>
        <tr>
            <th>--cancel-hover-border-color</th>
        </tr>
        <tr>
            <th>--cancel-hover-color</th>
        </tr>
    </table>

### Yes dialog button
These properties will help you to style button which value of *dialog-result* attribbute is equal to **yes**.
    <table>
        <tr>
            <th>Custom property</th>
            <td>Initial value</td>
            <td>Description</td>
        </tr>
        <tr>
            <th>--yes-background-color</th>
            <td>#20aa16</td>
            <td>changes the background color of the button </td>
        </tr>
        <tr>
            <th>--yes-border-style</th>
            <td>solid</td>
            <td>changes the border style of the button </td>
        </tr>
        <tr>
            <th>--yes-border-width</th>
            <td>2px</td>
            <td>changes the background width of the button </td>
        </tr>
        <tr>
            <th>--yes-border-color</th>
            <td>value of --yes-background-color</td>
            <td>changes the border color of the button </td>
        </tr>
        <tr>
            <th>--yes-color</th>
            <td>white</td>
            <td>changes the font color of the button </td>
        </tr>
        <tr>
            <th>--yes-hover-background-color</th>
            <td rowspan=5>As an initial value, these 5 have values of corresponding previous properties</td>
            <td rowspan="5"> these 5 have the exact same effect as previous 5, but their effect is applied on hover. </td>
        </tr>
        <tr>
            <th>--yes-hover-border-style</th>
        </tr>
        <tr>
            <th>--yes-hover-border-width</th>
        </tr>
        <tr>
            <th>--yes-hover-border-color</th>
        </tr>
        <tr>
            <th>--yes-hover-color</th>
        </tr>
    </table>

### No dialog button
These properties will help you to style button which value of *dialog-result* attribbute is equal to **no**.
    <table>
        <tr>
            <th>Custom property</th>
            <td>Initial value</td>
            <td>Description</td>
        </tr>
        <tr>
            <th>--no-background-color</th>
            <td>#e22222</td>
            <td>changes the background color of the button </td>
        </tr>
        <tr>
            <th>--no-border-style</th>
            <td>solid</td>
            <td>changes the border style of the button </td>
        </tr>
        <tr>
            <th>--no-border-width</th>
            <td>2px</td>
            <td>changes the background width of the button </td>
        </tr>
        <tr>
            <th>--no-border-color</th>
            <td>value of --no-background-color</td>
            <td>changes the border color of the button </td>
        </tr>
        <tr>
            <th>--no-color</th>
            <td>white</td>
            <td>changes the font color of the button </td>
        </tr>
        <tr>
            <th>--no-hover-background-color</th>
            <td rowspan=5>As an initial value, these 5 have values of corresponding previous properties</td>
            <td rowspan="5"> these 5 have the exact same effect as previous 5, but their effect is applied on hover. </td>
        </tr>
        <tr>
            <th>--no-hover-border-style</th>
        </tr>
        <tr>
            <th>--no-hover-border-width</th>
        </tr>
        <tr>
            <th>--no-hover-border-color</th>
        </tr>
        <tr>
            <th>--no-hover-color</th>
        </tr>
    </table>

## Css classes
There are 3 classes that this library provides you with. These help you to build elements for dialog. **You do not have to use them. You can add your own classes when building dialog's content.**
<table>
    <tr>
        <th>Class name</th>
        <td>Description</td>
    </tr>
    <tr>
        <th>dialog-input-field</th>
        <td>Helps you to style label with span and input elements</td>
    </tr>
    <tr>
        <th>dialog-checkbox-radio</th>
        <td>Helps you to style label with span and input type radio/checkbox elements</td>
    </tr>
    <tr>
        <th>dialog-text</th>
        <td>Helps you to style label with some text in it</td>
    </tr>
</table>
Also there are 5 custom properties that will help you change design of elements with these classes.

<table>
    <tr>
        <th>Custom property</th>
        <td>Initial value</td>
        <td>Description</td>
    </tr>
    <tr>
        <th>--input-field-background-color</th>
        <td>white</td>
        <td>changes the background color of the input element </td>
    </tr>
    <tr>
        <th>--input-field-border-style</th>
        <td>solid</td>
        <td>changes the border style of the input element </td>
    </tr>
    <tr>
        <th>--input-field-border-width</th>
        <td>2px</td>
        <td>changes the background width of the input element </td>
    </tr>
    <tr>
        <th>--input-field-border-color</th>
        <td>black</td>
        <td>changes the border color of the input element </td>
    </tr>
    <tr>
    <tr>
        <th>--input-filed-focus</th>
        <td>#0066cc</td>
        <td>when input element is focused, change its border color and font color of text above it </td>
    </tr>
        <th>--radio-checkbox-checked</th>
        <td>#0066cc</td>
        <td>when radiobutton/checkbox color is checked, change its background color and font color of text next to it. </td>
    </tr>
</table>

## Designing native and custom dialogs
Now, we'll show you how to design library's native dialogs and custom dialogs. Every dialog has its unique id and you use it to change style of our dialogs. In the code below you can see how to do that.
```css
/* Alert dialog */
#dialog-alert {
    --border-color: #D0342C;
    --header-background-color: #D0342C;
    --header-color: white;
    --footer-background-color: white;
    --ok-background-color: #D0342C;
    --ok-hover-background-color: #d74942;
}

/* Prompt dialog */
#dialog-prompt {
    --border-color: #7fba00;
    --header-background-color: #7fba00;
    --header-color: white;
    --footer-background-color: white;
    --ok-background-color: #7fba00;
    --ok-hover-background-color: hsl(79, 100%, 45%);
    --cancel-background-color: rgb(200, 200, 200);
    --cancel-hover-background-color: #fff;
    --input-field-border-color: rgb(200,200,200);
    --input-field-focus: #7fba00;
}

/* Confirm dialog */
#dialog-confirm {
    --border-color: #00a4ef;
    --header-background-color: #00a4ef;
    --header-color: white;
    --footer-background-color: white;
    --ok-background-color: #00a4ef;
    --ok-hover-background-color: #14b5ff;
    --cancel-background-color: rgb(200, 200, 200);
    --cancel-hover-background-color: #fff;
}

/* SingleOption dialog */
#dialog-single-option {
    --border-color: #f25022;
    --header-background-color: #f25022;
    --header-color: white;
    --footer-background-color: white;
    --ok-background-color: #f25022;
    --ok-hover-background-color: hsl(13, 89%, 60%);
    --cancel-background-color: rgb(200, 200, 200);
    --cancel-hover-background-color: #fff;
    --radio-checkbox-checked: #f25022;
}

/* MultiOption dialog */
#dialog-multi-option {
    --border-color: #000;
    --header-background-color: #000;
    --header-color: white;
    --footer-background-color: white;
    --ok-background-color: #000;
    --ok-hover-background-color: #fff;
    --ok-hover-border-color: black;
    --ok-hover-color: black;
    --cancel-background-color: rgb(200, 200, 200);
    --cancel-hover-background-color: #fff;
    --radio-checkbox-checked: #000;
}

/* MultiOption dialog */
#dialog-ync {
    --border-color: #7066e0;
    --header-background-color: #7066e0;
    --header-color: white;
    --footer-background-color: white;
    --yes-background-color: #7666e0;
    --yes-hover-background-color: hsl(245, 66%, 70%);
    --cancel-background-color: rgb(200, 200, 200);
    --cancel-hover-background-color: #fff;
}

/* SignIn dialog */
#dialog-sign-in {
    --border-color: #ffb900;
    --header-background-color: #ffb900;
    --header-color: white;
    --footer-background-color: white;
    --ok-background-color: #ffb900;
    --ok-hover-background-color: hsl(44, 100%, 55%);
    --cancel-background-color: rgb(200, 200, 200);
    --cancel-hover-background-color: #fff;
    --input-field-border-color: rgb(200, 200, 200);
    --input-field-focus: #ffb900;
    --radio-checkbox-checked: #ffb900;
}
```
[See how this works](https://voldybv.github.io/async-dialog/demo_5.html)