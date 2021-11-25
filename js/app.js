import { clearBlankSpaces,getRandom } from "./functions.js";
//Variables de alcance global
let serie = []; //Array donde almacenaremos temporalmente los resultados de los diferentes ejercicos

//Eventos
/**
 * Generar un número aleatorio
   Pide al ordenador que te genere un numero entero aleatorio entre 0 y 10 y lo muestre en pantalla.
   return Math.floor(Math.random() * (max - min +1)) + min;
 */
document.querySelector("#b_generar").onclick = () => {
    const aleatorio = getRandom(0,10); //obtenemos número aleatorio. Mirar función. Utilizo constante puesto que no se volverá a cambiar el valor
    //Almacenamos
    serie.push(aleatorio);
    //console.log(aleatorio); //para ver los resultados

    //Presentamos los resultados de forma individual y en un array que será global llamado serie
    const output_serie = document.querySelector("#serie_generar");
    const output_generar = document.querySelector("#msg_generar");
    output_serie.textContent = `[${serie.join()}]`; //join() para que un array sea devuelto en formato texto (String)
    output_generar.textContent = aleatorio;

}

/**
 * Ejercicio Aleatorio
   Seleccionaremos un número aleatorio entre 1 y 100. Habrá 10 intentos para adivinarlo.
   Daremos pistas al usuario de si el número introducido es demasiado bajo o alto. 
 */
let intentos = 0; //contador de intentos
let intentos_usuario = []; //intentos escritos por el usuario
//Generamos aleatorio
const aleatorio = getRandom(1,100); //obtenemos número aleatorio entre 1 y 100
document.querySelector("#b_aleatorio").onclick = e => {
    //Obtenemos los elementos donde mostrar los mensajes
    const output = document.querySelector("#msg_aleatorio");
    const output_serie = document.querySelector("#serie_aleatorio");
    //Limpiamos el mensaje antes de mostrarlo por si queda texto de una acción anterior
    output.textContent = "";    
    //Obtenemos los datos del usuario
    const input = document.querySelector("#aleatorio");
    let num = clearBlankSpaces(input.value); //Filtramos el campo limpiando espacios. Ver función
    let msg; //Mensajes de si el usuario se aproxima a la tirada o ganó
    //Validadmos si tenemos un número
    if(/^\d+$/.test(num) && !isNaN(num)){ //Caso de número. isNaN --> "Si no es un número" daría true, por lo tanto lo ponemos en negativo !isNaN
        num = Number(num); //transformamos el String num en Number
        if(num>aleatorio){
            msg =`${num} es mayor que el número generado.`
        }else if(num<aleatorio){
            msg =`${num} es menor que el número generado.`
        }else{
            msg =`ACERTATES. GANASTE.`
        }
        intentos_usuario.push(num); //almacenamos
        intentos++;
        intentos
        output_serie.innerHTML = `Intento ${intentos}. Tiraste: ${intentos_usuario.join("-")}.<br>${msg}`;
        
    }else{
        output.innerHTML = `<strong style="background-color: yellow; color: red">"${input.value}" no es un número entero válido</strong>`;
    }

    if(intentos===10 || msg==="ACERTATES. GANASTE."){
        e.target.disabled = true;
        e.target.style.backgroundColor="black";
    }
}

