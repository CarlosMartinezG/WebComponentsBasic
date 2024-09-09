const template = document.createElement("template");
template.innerHTML = /* html */ `
    <style>
        label {
            font-family: Davivienda, Arial, Helvetica, sans-serif;
            color: var(--label-color, #404040);
            font-size: 16px;
            font-weight: 600;
            margin:0px 0px 8px 8px;
            min-width:268px;
            width: min-content;
            display:flex;
            align-self: flex-start;
            justify-content: center;
            flex-flow: column;
        }
        input{
            font-family: Davivienda, Arial, Helvetica, sans-serif;
            color: var(--input-color, #6e6e6e);
            font-size: 16px;
            font-weight: normal;
            margin:0px 0px 8px;
            padding:8px;
            border: 1px solid var(--input-border, #8c8c8c);
            border-radius:8px;
            min-width:268px;
            height:24px;
            display:flex;
            align-self: flex-start;
            justify-content: center;
            flex-flow: column;
        }

        span {
            font-family: Davivienda, Arial, Helvetica, sans-serif;
            color: var(--label-color, #6e6e6e);
            font-size: 14px;
            font-weight: normal;
            margin:0px 0px 0px 8px;
            min-width:268px;
            width: min-content;
            display:flex;
            align-self: flex-start;
            justify-content: center;
            flex-flow: column;
            margin-bottom:24px;
        }
        :host([validation="invalid"]) span {
            display:block;
            color:#b70412;
        }

        :host([validation="invalid"]) input {
            border: 1px solid #e1111c;
        }

        :host([validation="valid"]) span {
            display:block;
            color:#6e6e6e;
        }

        :host([validation="valid"]) input {
            border: 1px solid #8c8c8c;
        }
    </style>
    <label></label>
    <input>
    <span>Helper</span>
`

class Input extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    get helper(){
        return this.getAttribute("helper");
    }

    set helper(helper){
        this.setAttribute("helper", helper);
    }

    get validation(){
        return this.getAttribute("validation");
    }

    set validation(validation){
        this.setAttribute("validation", validation);
    }

    connectedCallback(){
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const label = this.shadowRoot.querySelector("label");
        label.textContent = this.getAttribute("label");

        this.span = this.shadowRoot.querySelector("span");
        this.span.textContent = this.getAttribute("helper");

        const input = this.shadowRoot.querySelector("input");
        input.type = this.getAttribute("type");

        input.addEventListener("input", (event) =>{
            event.stopPropagation();
            input.dispatchEvent(new CustomEvent('app-input', {
                bubbles: true, /*para que vaya arriba, van los dos*/
                composed: true,
                detail: event.target.value
            }))
        });
    }

    static get observedAttributes(){
        return ["helper"];
    }

    attributeChangedCallback(attribute, oldValue, newValue){
        this.span.textContent = newValue;
    }
}

customElements.define("app-input", Input);