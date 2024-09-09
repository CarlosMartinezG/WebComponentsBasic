const buttonTemplate = document.createElement("template");
buttonTemplate.innerHTML = `
    <style>
        .btn{
            background: #e1111c;
            font-family: Davivienda, Arial, Helvetica, sans-serif;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            padding: 8px 16px;
            min-width: 224px;
            min-height: 48px;
            border-radius: 24px;
            border: none;
            margin: 16px auto;
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

    <button class="btn">Label</button>
`

class Button extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const label = this.getAttribute("label");
        this.appendChild(buttonTemplate.content.cloneNode(true));
        this.button = this.querySelector("button");
        this.button.textContent = label;
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
            this.button.textContent = "Loading...";
            this.button.setAttribute("disabled", "true");
            this.button.classList.add('fade');
        } else {
            this.button.textContent = this.getAttribute("label");
            this.button.removeAttribute("disabled");
            this.button.classList.remove('fade');
        }
    }
}

customElements.define("app-button", Button);