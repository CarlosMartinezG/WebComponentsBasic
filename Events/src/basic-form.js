import "./input.js";
import "./button.js";

class BasicForm extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.shadowRoot.innerHTML = /* html */`
            <app-input label="Nombre de usuario"></app-input>
            <app-button>Registrar</app-button>
        `
    }
}

customElements.define("app-form", BasicForm);