import "./input.js";
import "./button.js";
import "./card.js";

class BasicForm extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.state = {
            username: null,
            email: null,
            password: null,
            passwordRepeat: null,
        }
    }

    connectedCallback(){
        this.shadowRoot.innerHTML = /* html */`
            <app-card>
                <h3 slot="card-header">Registro de usuario</h3>
                <app-input slot="card-body" label="Usuario" helper="Campo obligatorio" validation="none"></app-input>
                <app-input slot="card-body" label="Correo electrónico" validation="none"></app-input>
                <app-input slot="card-body" label="Contraseña" helper="Mínimo 8 caracteres" validation="none" type="password"></app-input>
                <app-input slot="card-body" label="Repetir contraseña" validation="none" type="password"></app-input>
                <app-button slot="card-body">Registrar</app-button>
            </app-card>
        `

        const appInputs = this.shadowRoot.querySelectorAll("app-input");
        const button  = this.shadowRoot.querySelector("app-button");

        const [usernameInput, emailInput, passwordInput, passwordRepeatInput] = appInputs;
        usernameInput.addEventListener("app-input", (event) =>{
            this.state.username = event.detail;
            usernameInput.validation="none";
        })

        emailInput.addEventListener("app-input", (event) =>{
            this.state.email = event.detail;
            emailInput.validation="none";
        })

        passwordInput.addEventListener("app-input", (event) =>{
            this.state.password = event.detail;

            if(this.state.password != this.state.passwordRepeat){
                passwordRepeatInput.helper = "Las contraseñas no coinciden";
                passwordRepeatInput.validation = "invalid";
            } else{
                passwordRepeatInput.helper = "Las contraseñas coinciden";
                passwordRepeatInput.validation = "valid";
            }
        })

        passwordRepeatInput.addEventListener("app-input", (event) =>{
            this.state.passwordRepeat = event.detail;

            if(this.state.password != this.state.passwordRepeat){
                passwordRepeatInput.helper = "Las contraseñas no coinciden";
                passwordRepeatInput.validation = "invalid";
            } else{
                passwordRepeatInput.helper = "Las contraseñas coinciden";
                passwordRepeatInput.validation = "valid";
            }
        })

        this.addEventListener("click-app-button", (event) =>{
            button.inprogress = true;
            setTimeout(() => {
                usernameInput.validation = "invalid";
                usernameInput.helper = "Ya existe un usuario con este nombre registrado";
                emailInput.validation = "invalid";
                emailInput.helper = "Campo olbigatorio";
                button.inprogress = false;
            }, 2000);
            console.log(this.state);
        })

    }
}

customElements.define("app-form", BasicForm);