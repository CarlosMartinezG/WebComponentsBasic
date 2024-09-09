const template = document.createElement("template");
template.innerHTML = /* html */ `
    <style>
        label {
            font-family: Davivienda, Arial, Helvetica, sans-serif;
            color: var(--label-color, #404040);
            font-size: 16px;
            font-weight: 600;
            margin:24px 0px 8px;
            min-width:268px;
            display:flex;
            align-self: center;
            justify-content: flex-start;
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
            display:flex;
            align-self: center;
            justify-content: flex-start;
            flex-flow: column;
        }
    </style>
    <label></label>
    <input>
`

class Input extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const label = this.shadowRoot.querySelector("label");
        label.textContent = this.getAttribute("label");

        const input = this.shadowRoot.querySelector("input");

        input.addEventListener("input", (event) =>{

            event.stopPropagation();

            input.dispatchEvent(new CustomEvent('app-input', {
                bubbles: true, /*para que vaya arriba, van los dos*/
                composed: true,
                detail: event.target.value
            }))
        });
    }
}

customElements.define("app-input", Input);