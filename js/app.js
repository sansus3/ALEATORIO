import { clearBlankSpaces,getRandom,removeAccents } from "./functions.js";
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
    const output_serie = document.querySelector("#serie_generar");// es un <div>
    const output_generar = document.querySelector("#msg_generar");// es otro <div>
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
let aleatorio = getRandom(1,100); //obtenemos número aleatorio entre 1 y 100. Se genera al cargar la página
document.querySelector("#b_aleatorio").onclick = e => {
    //Cogemos los elementos <div> donde mostrar los mensajes
    const output = document.querySelector("#msg_aleatorio");
    const output_serie = document.querySelector("#serie_aleatorio");
    //Limpiamos el mensaje antes de mostrarlo por si queda texto de una acción anterior
    output.textContent = "";    
    //Obtenemos los datos del usuario
    const input = document.querySelector("#aleatorio");
    let num = clearBlankSpaces(input.value); //Filtramos el campo limpiando espacios. Ver función en functions.js
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
        intentos_usuario.push(num); //almacenamos tiradas para que el usuario no tenga que recordar que tiró
        intentos++; //incrementamos y usuario pierde tirada. Recordemos que tiene 10
        output_serie.innerHTML = `Intento ${intentos}. Tiraste: ${intentos_usuario.join("-")}.<br>${msg}`;
        
    }else{
        output.innerHTML = `<strong style="background-color: yellow; color: red">"${input.value}" no es un número entero válido</strong>`;
    }

    if(intentos===10 || msg==="ACERTATES. GANASTE."){//Si gana o llega a 10 intentos se acaba el juego
        if(msg==="ACERTATES. GANASTE.")
            output.innerHTML= `<div>GANASTE. COMENZAR PARTIDA</div>`;
        else
            output.innerHTML= `<div>PERDISTE. Tiros (${intentos_usuario.join("-")}). COMENZAR PARTIDA</div>`;
        intentos = 0;
        intentos_usuario = [];
        aleatorio = getRandom(1,100);
        input.value = "";
        input.focus();
    }
}


//
//Funciones de los ejercicios adicionales
//
/**
 * Función que elimina un nodo del DOMO si este existe
 * @param {String} id Nombre para seleccionar el nodo
 */
const eliminarNodo = id => {
    const nodo = document.querySelector(id);
    if(nodo!==null){
        nodo.parentElement.removeChild(nodo);
    }
}
/**
 * Creación del contendor donde irán nuestros mensajes
 * @param {HTMLElement} parentElement Padre del elemento donde colgar nuestra caja de mensaje
 * @param {String} idNodo Nombre del atributo id de un elemento html. Sin la #. Válido 'id' y no '#id'
 * @returns {HTMLElement} Nodo creado
 */
const crearNodo = (parentElement,idNodo) => {
    const div = document.createElement("div"); //creamos un elemento
    const shadow = div.attachShadow({mode:'open'});
    div.id=idNodo; //Le asignamos un id
    div.setAttribute("role","alert");
    div.style.color = "red";
    parentElement.appendChild(div); //Le colgamos el div creado
    return shadow;
}
/**
 * Definir una función que muestre información sobre una cadena de texto que se le pasa como argumento. A partir de la cadena que se le pasa, la función determina si esa cadena está formada sólo por mayúsculas, sólo por minúsculas o por una mezcla de ambas
 */
document.querySelector("#enlace_1").onclick = e => {
    e.preventDefault(); //Detenemos la ejecución del enlace y su función de hipervínculo
    //Obtenemos la información
    const texto = clearBlankSpaces(prompt("Dame un texto"));
    //Buscamos coincidencias con match
    const minusculas = texto.match(/[a-zà-ÿ\u00f1]/g);//null si no encuentra
    const mayusculas = texto.match(/[A-ZÁÉÍÓÚÄËÏÖÜ\u00d1]/g);//null si no encuentra
    //console.log(`mayusculaS(${mayusculas})`)
     //Por si acaso existe un mensaje cuyo id es temporal lo eliminamos
     eliminarNodo("#temporal");  
    if(mayusculas!==null && minusculas!==null){
        const div = crearNodo(e.target.parentElement)
        div.innerHTML = `<mark>${texto}</mark>. Mayúsculas(${mayusculas.join()}) y Minúsculas(${minusculas.join()}) `;
    }else if(mayusculas!==null){
        const div = crearNodo(e.target.parentElement,"temporal")
        div.innerHTML = `<mark>${texto}</mark> tiene sólo mayúsculas`;
    }else if(minusculas!==null){
        const div = crearNodo(e.target.parentElement,"temporal")
        div.innerHTML = `<mark>${texto}</mark> tiene sólo minúsculas`;
    }    
}

/**
 * Definir una función que determine si la cadena de texto que se le pasa como parámetro es un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".
 */

document.querySelector("#enlace_2").onclick = e => {
    e.preventDefault();
    //Limpiamos nodos de mensajes residuales
    eliminarNodo("#temporal2");
    //Obtenemos la información
    let texto = prompt("Palíndromo:");
    //limpiamos espacios
    let textoFormateado = clearBlankSpaces(texto);
    //Minúsculas todo
    textoFormateado = textoFormateado.toLowerCase();
    //Quitamos todos los espacios
    textoFormateado = textoFormateado.replace(/\s+/g,"");
    //console.log(textoFormateado);
    //quitamos tildes
    textoFormateado = removeAccents(textoFormateado);
    //console.log(textoFormateado);
    const revertir = textoFormateado.split("").reverse().join("");
    //console.log(revertir);
    if(textoFormateado===revertir){
        const div = crearNodo(e.target.parentElement,"temporal2")
        div.innerHTML = `<mark>${texto}</mark> es un palíndromo`;
    }else{
        const div = crearNodo(e.target.parentElement,"temporal2")
        div.innerHTML = `<mark>${texto}</mark> NO es un palíndromo`;
    }
}