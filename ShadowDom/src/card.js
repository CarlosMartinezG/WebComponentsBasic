const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = /* html*/ `
    <style>
        div{
            background: #e1e0e3;
            font-family: Davivienda, Arial, Helvetica, sans-serif;
            color: #404040;
            font-size: 18px;
            font-weight: normal;
            padding: 16px;
            min-width:224px;
            border: none;
            margin: 0px auto;
            float:flex;
        }
    </style>

    <div>
        <slot name="card-header">Card header</slot>
    </div>
    <div>
        <slot name="card-header">Card body</slot>

        <slot></slot>
    </div>
`


class Card extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
    }
}

customElements.define("app-card", Card);