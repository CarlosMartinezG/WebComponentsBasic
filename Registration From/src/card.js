const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = /* html*/ `
    <style>
        .card{
            display:flex;
            align-self: center;
            justify-content: center;
            flex-flow: column;
            border: 1px solid var(--border-color, #e1e0e3);
            border-radius:16px;
            background: var(--card-bg-color, #fff);
            min-width:272px;
            width:fit-content;
            margin:16px auto;
        }   

        .card-header{
            display:flex;
            align-self: flex-start;
            justify-content: flex-start;
            flex-flow: wrap;
            padding:16px;
            font-family: Davivienda, Arial, Helvetica, sans-serif;
            color: var(--h1-color, #1d1d1d);
            font-size: 22px;
            font-weight: bold;
        }
        
        .card-body{
            display:flex;
            align-self: flex-start;
            justify-content: flex-start;
            flex-flow: column;
            padding:16px;
            font-family: Davivienda, Arial, Helvetica, sans-serif;
            color: var(--p-color, #1d1d1d);
            font-size: 18px;
            font-weight: normal;
        }
        ::slotted(h3){
            margin:0px;
        }
    </style>
    <div class="card">
        <div class="card-header">
            <slot name="card-header">Card header</slot>
        </div>
        <div class="card-body">
            <slot name="card-body">Card body</slot>
        </div>
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