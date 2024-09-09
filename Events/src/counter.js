class Counter extends HTMLElement{
    constructor(){
        super();
        console.log("Constructor");
        this.count = 0;
    }

    connectedCallback(){
        console.log("Connected");
        this.innerHTML = this.count;

        const until = this.getAttribute("until");
        this.interval = setInterval(() =>{
            if (this.count < until){
                this.count += 1;
                this.innerHTML = this.count;
            } else {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    disconnectedCallback(){
        console.log("Disconnected");
        clearInterval(this.interval);    
    }

    attributeChangedCallback(attribute, oldVal, newVal){
        console.log("Attribute changed"); 
    }

    adoptedCallback(){
        console.log("Adopted"); 
    }
}

customElements.define("app-counter", Counter);