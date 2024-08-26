/* Clear textarea */
const textarea = document.getElementById('input-text');
const instruccion = document.getElementById('instruccion');

textarea.addEventListener('input', () =>{
    if(textarea.value.trim() === ''){
        instruccion.classList.remove('hidden');
        mostrarContenido('');
        limpiarOutput(); 
    }else{
        instruccion.classList.add('hidden');
        limpiarOutput(); 
    }
    
});

/* Clear output box */
const mensaje = document.getElementById('contenido');
const espacioOutput = document.getElementById('espacio-output');

function limpiarOutput(){
    if(mensaje.textContent.trim()=== ''){
        espacioOutput.classList.remove('hidden');
    }else{
        espacioOutput.classList.add('hidden');
    }
}


/* Limit to only lowercase and no accents */
function esTextovalido(texto){
    if(/^[a-z\s]+$/.test(texto)){
        return true;
    }else{
        mostrarAlerta('Solo se admite minusculas y espacios')
        return false;
    }
}


/* Encrypt function */

const button_encriptar = document.getElementById('encriptar_btn');
button_encriptar.addEventListener('click', function(){
    const resultado = encriptar();
    if(resultado){
        mostrarContenido(resultado);
        limpiarOutput();
    }
});



function encriptar(){
    const textarea = document.getElementById('input-text');
    const texto = textarea.value;

    if(texto.trim() === ''){
        mostrarAlerta('Ingrese un texto para encriptar');
        return;
    }else if( texto.trim() !== '' && esTextovalido(texto.trim())){
        let mensaje = '';
        for(let i=0; i<texto.length; i++){
            let caracter = texto[i];

            switch(caracter){
                case 'a':
                    mensaje += 'ai'
                    break;
                case 'e':
                    mensaje += 'enter'
                    break;
                case 'i':
                    mensaje += 'imes'
                    break;
                case 'o':
                    mensaje += 'ober'
                    break;
                case 'u':
                    mensaje += 'ufat'
                    break;
                default:
                    mensaje += caracter;
                    break;
            }

        }

        return mensaje;
    }
}


/* Decrypt function */

const button_desencriptar = document.getElementById('desencriptar_btn');
button_desencriptar.addEventListener('click', function(){
    const resultado = desencriptar();
    if(resultado){
        mostrarContenido(resultado);
        limpiarOutput();
    }
});



function desencriptar(){
    const textarea = document.getElementById('input-text');
    const texto = textarea.value;
    if(texto.trim() === ''){
        mostrarAlerta('Ingrese un texto para desencriptar');
        return;
    }else if( texto.trim() !== '' && esTextovalido(texto.trim())){
        let mensaje = texto;
        
        mensaje = mensaje.replace(/ai/g, 'a');
        mensaje = mensaje.replace(/enter/g, 'e');
        mensaje = mensaje.replace(/imes/g, 'i');
        mensaje = mensaje.replace(/ober/g, 'o');
        mensaje = mensaje.replace(/ufat/g, 'u');
        

        return mensaje;
    }

}

/* Show text on screen */

function mostrarContenido(mensaje) { 
    const mostrarMensaje = document.getElementById('contenido');
    mostrarMensaje.textContent = mensaje;
    limpiarOutput();
}

/* ALERT MANAGEMENT */

/* Show alert */

function mostrarAlerta(mensaje){
    const alerta = document.querySelector('.alert');
    alerta.textContent = mensaje;
    alerta.classList.remove('hidden');
    alerta.classList.add('show');
    /* hide alert */
    setTimeout(() => ocultarAlerta(), 3000);
}

function ocultarAlerta(){
    const alerta = document.querySelector('.alert');
    alerta.classList.remove('show');
    alerta.classList.add('hidden');
}


/* Copy to clipboard function */
async function copiarAlPortapapeles() {
    const texto = document.getElementById('contenido').innerText; 
    try {
        if(texto.trim() == '') {
            mostrarAlerta('No hay ningún texto para seleccionar');
            return;  /* Exit method if there is no text to copy */
        }else{
        await navigator.clipboard.writeText(texto); 
        mostrarAlerta('Texto copiado al portapapeles'); 
        } 
    } catch (err) {
        console.error('Error al copiar el texto:', err); 
        mostrarAlerta('Error al copiar el texto'); 
    }
}

  /* Add the click event to the button */
const button_copy = document.getElementById('copiar_btn');
button_copy.addEventListener('click', copiarAlPortapapeles);

/* Change mode */
function changeMode() {
    const modo = document.getElementById('modo');
    const iconos = document.querySelectorAll('.icono');
    var root = document.documentElement;
    const shadowButton = document.querySelectorAll('button');
    
    if (modo.getAttribute("src") === "/images/dark-mode.svg") {
    modo.setAttribute("src", "/images/light-mode.svg");
    
    iconos.forEach(icono => {
        if (icono.alt === "Github icon") icono.setAttribute("src", "/images/github-logo-light.svg");
        if (icono.alt === "alura icon") icono.setAttribute("src", "/images/alura-logo-light.svg");
        if (icono.alt === "linkedin icon") icono.setAttribute("src", "/images/linkedin-logo-light.svg");
        if (icono.alt === "Encriptar boton") icono.setAttribute("src", "/images/lock-icon-light.svg");
        if (icono.alt === "Desencriptar boton") icono.setAttribute("src", "/images/unlock-icon-light.svg");
        if (icono.alt === "Copiar boton") icono.setAttribute("src", "/images/copy-icon-light.svg");
        if (icono.alt === "Github-icon-footer") icono.setAttribute("src", "/images/github-logo-light.svg");

    });
      /* Color changes for dark mode */
    root.style.setProperty('--first-color', '#8c426d');
    root.style.setProperty('--second-color', '#2c1f26');
    root.style.setProperty('--third-color', '#fff0f6');
    root.style.setProperty('--fourth-color', '#fff0f6');
    root.style.setProperty('--fifth-color', '#2c1f26');
    root.style.setProperty('--hover-color', '#b94589');
    root.style.setProperty('--shadow-color', "rgba(11, 7, 9, 0.4)");
    shadowButton.forEach(boton => {
        boton.style.boxShadow = '0rem 0.06rem 0rem 0rem var(--fourth-color)';
    });
    } else if (modo.getAttribute("src") === "/images/light-mode.svg") {
        modo.setAttribute("src", "/images/dark-mode.svg");
    iconos.forEach(icono => {
        if (icono.alt === "Github icon") icono.setAttribute("src", "/images/github-logo-dark.svg");
        if (icono.alt === "alura icon") icono.setAttribute("src", "/images/alura-logo-dark.svg");
        if (icono.alt === "linkedin icon") icono.setAttribute("src", "/images/linkedin-logo-dark.svg");
        if (icono.alt === "Encriptar boton") icono.setAttribute("src", "/images/lock-icon-dark.svg");
        if (icono.alt === "Desencriptar boton") icono.setAttribute("src", "/images/unlock-icon-dark.svg");
        if (icono.alt === "Copiar boton") icono.setAttribute("src", "/images/copy-icon-dark.svg");
        if (icono.alt === "Github-icon-footer") icono.setAttribute("src", "/images/github-logo-dark.svg")

    });
      /* Color changes for light mode */
    root.style.setProperty('--first-color', '#ff9ecd');
    root.style.setProperty('--second-color', '#fff0f6');
    root.style.setProperty('--third-color', '#34113f');
    root.style.setProperty('--fourth-color', '#8c426d');
    root.style.setProperty('--fifth-color', '#2c1f26');
    root.style.setProperty('--hover-color', '#f074b0');
    root.style.setProperty('--shadow-color', "rgb(44, 31, 38 ,0.4)");
    shadowButton.forEach(boton => {
        boton.style.boxShadow = '0rem 0.07rem 0rem 0rem var(--fourth-color)';
    });
    }
}



/* Set change color function to a button */

const button_mode = document.getElementById('mode_btn');
button_mode.addEventListener('click', changeMode);
