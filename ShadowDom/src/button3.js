const buttonTemplate = document.createElement("template");
buttonTemplate.innerHTML = /* html */`
    <style>
        :host{ /* style of app-button, solo en shadowroot */
            display:flex;
            align-self: flex-start;
            justify-content: flex-start;
            flex-flow: wrap;
        }

        :host([inprogress]){
            color: #404040;
        }
        
        .btn{
            background: var(--btn-bg-color, #e1111c);
            font-family: Davivienda, Arial, Helvetica, sans-serif;
            color: var(--btn-color, #ffffff);
            font-size: 18px;
            font-weight: bold;
            padding: 8px 16px;
            min-width: 224px;
            min-height: 48px;
            border-radius: 24px;
            border: none;
            margin: 16px 0px;
            cursor: pointer;
        }

        .btn:disabled{
            background: #e1e0e3;
            color: #6e6e6e;
        }

        .fade{
            animation: fading 0.3s linear;
        }

        @keyframes fading{
            0%{color:#e1e0e3}
            100%{color: #6e6e6e;}
        }
    </style>

    <button class="btn"><slot>Label</slot></button>
`

class Button extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));
        this.button = this.shadowRoot.querySelector("button");
        this.initialValue = this.innerHTML;
    }

    set inprogress(progress){
        if(progress){
            this.setAttribute("inprogress", "true");
        } else{
            this.removeAttribute("inprogress");
        }
    }

    get inprogress(){
        return this.getAttribute("inprogress");
    }

    static get observedAttributes(){
        return["inprogress"];
    }

    attributeChangedCallback(attribute, oldValue, newValue){
        if(newValue){
            this.innerHTML = "Loading...";
            this.button.setAttribute("disabled", "true");
            this.button.classList.add('fade');
        } else {
            this.innerHTML = this.initialValue;
            this.button.removeAttribute("disabled");
            this.button.classList.remove('fade');
        }
    }
}

customElements.define("app-button", Button);