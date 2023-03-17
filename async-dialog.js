class BVDialog extends HTMLElement {
    constructor() {
        super();
        this.dialog_value = "";
        this.dialog_result = "";
        this.close = "";
        this._root = this.attachShadow({mode:"open"});
        this._root.innerHTML = `
            <div part="container">
                <div part="header">
                    <slot name="title"></slot>
                </div>
                <div part="body">
                    <span part="message">
                        <slot name="message"></slot>
                    </span>
                    <slot name="content"></slot>
                </div>
                <div part="footer">
                    <slot name="buttons">
                    </slot>
                </div>
            </div>
        `;
    }
    connectedCallback(){
    }
    static get observedAttributes() {
        return []
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
        }
    }
    disconnectedCallback() {

    }
    //custom methods
    async open() {
        var self = this;
        this._root.innerHTML += `
            <style>
                div[part=container] {
                    position: relative;
                    animation-name: dialog-show;
                    animation-duration: 0.5s;
                }
                @keyframes dialog-show {
                    from {
                        top: -50%;
                        opacity: 0;
                    }
                    to {
                        top: 0;
                        opacity: 1;
                    }
                }
            </style>
        `
        return new Promise((resolve) => {
            self.style.display = "flex";
            self.querySelectorAll("div[slot=buttons] button[dialog-result]").forEach((item) => {
                item.addEventListener("click", function() {
                    self.dialog_result = item.getAttribute("dialog-result");
                    self.dialog_value = self.collect_data();
                    self.style.display = "none";
                    resolve();
                });
            });
            self.close = function () {
                self.dialog_result = "Cancel";
                self.dialog_value = undefined;
                self.style.display = "none";
                resolve();
            }
        })
    }
    collect_data() {
        var fd = new FormData(this.querySelector("form[slot=content]"));
        var data = Array.from(fd.entries());
        var obj = {};
        
        for(var i = 0;i < data.length;i++) {
            if(obj[data[i][0]] == undefined) obj[data[i][0]] = 1;
            else obj[data[i][0]]++;
        }
        
        for (const key in obj) {
            if(obj[key] == 1) obj[key] = fd.get(key);
            else obj[key] = fd.getAll(key);
        }
        return obj;
    }
}
window.customElements.define("async-dialog", BVDialog);
class Dialog {
    static async Prompt(params) {
        if(params.title == undefined) params.title = "";
        if(params.message == undefined) params.message = "";
        if(params.placeholder == undefined) params.placeholder = "";
        
        var final_value = undefined;
        var dialog = document.createElement("async-dialog");
        if(params.cancel_after >= 1){
            setTimeout(() => {
                dialog.close()
            }, params.cancel_after * 1000);
        }
        dialog.innerHTML = `
            <div slot="title">${params.title}</div>
            <div slot="message">${params.message}</div>
            <form onsubmit="return false" slot="content">
                <label class="dialog-input-field">
                    <input type="text" placeholder="${params.placeholder}" name="prompt_value" />
                </label>
            </form>
            <div slot="buttons">
                <button class="dialog-cancel" dialog-result="Cancel">Cancel</button>
                <button class="dialog-ok" dialog-result="OK">OK</button>
            </div>
        `;
        document.body.append(dialog);
        await dialog.open();
        if(dialog.dialog_result == "OK") final_value = dialog.dialog_value.prompt_value;

        dialog.remove();

        return final_value;
    }
    static async Alert(params) {
        if(params.title == undefined) params.title = "";
        if(params.message == undefined) params.message = "";
        
        var dialog = document.createElement("async-dialog");
        if(params.cancel_after >= 1){
            setTimeout(() => {
                dialog.close()
            }, params.cancel_after * 1000);
        }
        dialog.innerHTML = `
            <div slot="title">${params.title}</div>
            <div slot="message">${params.message}</div>
            <form onsubmit="return false" slot="content">
            </form>
            <div slot="buttons">
                <button class="dialog-ok" dialog-result="OK">OK</button>
            </div>
        `;
        document.body.append(dialog);
        await dialog.open();
        dialog.remove();
    }
    static async Confirm(params) {
        if(params.title == undefined) params.title = "";
        if(params.message == undefined) params.message = "";
        
        var dialog = document.createElement("async-dialog");
        if(params.cancel_after >= 1){
            setTimeout(() => {
                dialog.close()
            }, params.cancel_after * 1000);
        }
        dialog.innerHTML = `
            <div slot="title">${params.title}</div>
            <div slot="message">${params.message}</div>
            <form onsubmit="return false" slot="content">
            </form>
            <div slot="buttons">
                <button class="dialog-cancel" dialog-result="Cancel">Cancel</button>
                <button class="dialog-ok" dialog-result="OK">OK</button>
            </div>
        `;
        document.body.append(dialog);
        await dialog.open();
        dialog.remove();

        if(dialog.dialog_result == "OK") return true;
        else return false;
    }
    static async YNC(params) {
        if(params.title == undefined) params.title = "";
        if(params.message == undefined) params.message = "";
        
        var dialog = document.createElement("async-dialog");
        
        if(params.cancel_after >= 1){
            setTimeout(() => {
                dialog.close()
            }, params.cancel_after * 1000);
        }
        dialog.innerHTML = `
            <div slot="title">${params.title}</div>
            <div slot="message">${params.message}</div>
            <form onsubmit="return false" slot="content">
            </form>
            <div slot="buttons">
                <button class="dialog-cancel" dialog-result="Cancel">Cancel</button>
                <button class="dialog-no" dialog-result="No">No</button>
                <button class="dialog-yes" dialog-result="Yes">Yes</button>
            </div>
        `;
        document.body.append(dialog);
        await dialog.open();
        dialog.remove();

        if(dialog.dialog_result == "Yes") return true;
        else if(dialog.dialog_result == "No") return false;
        
    }
    static async SingleOption(params) {
        if(params.title == undefined) params.title = "";
        if(params.message == undefined) params.message = "";
        
        var dialog = document.createElement("async-dialog");
        
        if(params.cancel_after >= 1){
            setTimeout(() => {
                dialog.close()
            }, params.cancel_after * 1000);
        }

        var dialog_controls = "";

        if(params.options) {
            params.options.forEach((item) => {
                var value, text;
                
                if(typeof item == "string") value = item, text = item;
                else if(item.text == undefined) value = text = item.value;
                else if(item.value == undefined) value = text = item.text;
                else value = item.value, text = item.text

                dialog_controls += `
                    <label class="dialog-chekbox-radio">
                        <input type="radio" name="singleoption_value" value="${value}">
                        <span>${text}</span>
                    </label>
                `
            })
        }
        dialog.innerHTML = `
            <div slot="title">${params.title}</div>
            <div slot="message">${params.message}</div>
            <form onsubmit="return false" slot="content">
                ${dialog_controls}
            </form>
            <div slot="buttons">
                <button class="dialog-cancel" dialog-result="Cancel">Cancel</button>
                <button class="dialog-ok" dialog-result="OK">OK</button>
            </div>
        `;
        document.body.append(dialog);
        
        await dialog.open();
        dialog.remove();

        if(dialog.dialog_result == "OK") return dialog.dialog_value.singleoption_value;
        else return undefined;
        
    }
    static async MultiOption(params) {
        if(params.title == undefined) params.title = "";
        if(params.message == undefined) params.message = "";
        
        var dialog = document.createElement("async-dialog");
        
        if(params.cancel_after >= 1){
            setTimeout(() => {
                dialog.close()
            }, params.cancel_after * 1000);
        }

        var dialog_controls = "";

        if(params.options) {
            params.options.forEach((item) => {
                var value, text;
                if(typeof item == "string") value = item, text = item;
                else if(item.text == undefined) value = text = item.value;
                else if(item.value == undefined) value = text = item.text;
                else value = item.value, text = item.text

                dialog_controls += `
                    <label class="dialog-chekbox-radio">
                        <input type="checkbox" name="multioption_value" value="${value}">
                        <span>${text}</span>
                    </label>
                `
            })
        }
        dialog.innerHTML = `
            <div slot="title">${params.title}</div>
            <div slot="message">${params.message}</div>
            <form onsubmit="return false" slot="content">
                ${dialog_controls}
            </form>
            <div slot="buttons">
                <button class="dialog-cancel" dialog-result="Cancel">Cancel</button>
                <button class="dialog-ok" dialog-result="OK">OK</button>
            </div>
        `;
        document.body.append(dialog);
        
        await dialog.open();
        dialog.remove();

        if(dialog.dialog_result == "OK") return dialog.dialog_value.multioption_value;
        else return undefined;
        
    }
}