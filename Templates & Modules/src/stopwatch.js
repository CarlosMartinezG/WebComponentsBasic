import "./button.js";
import "./counter.js";

class stopWatch extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <app-counter></app-counter>
        <app-button label="Start"></app-button>
        <app-button label="Stop"></app-button>
        `
    }
}

customElements.define("app-stopwatch", stopWatch);