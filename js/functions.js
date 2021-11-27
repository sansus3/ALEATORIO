/**
 * Función que limpia los espacios en blanco: tabulaciones, barra espaciadora, intro
 * @param {String} text Texto bruto con espacios en blanco
 * @returns {String} Texto formateado sin espacios en blanco
 */
const clearBlankSpaces = text => {    
    text = text.replace(/^\s+/,"");
    text = text.replace(/\s+$/,"");
    return text = text.replace(/\s+/g," ");
}

/**
 * 
 * @param {Number} min Número mínimo de la serie
 * @param {Number} max Número máximo de la serie 
 * @returns {Number} Número aleatorio entre max y min, ambos incluidos
 */
const getRandom = (min,max) => Math.floor(Math.random()*(max-min+1))+min;

/**
 * Función que quita los acentos de una cadena
 * El método normalize() retorna la Forma de Normalización Unicode de la cadena dada (si el valor no es una cadena, primero será convertido a ese tipo).
 * NFD — Forma de Normalización de Descomposición Canónica.
 * @param {String} str Texto con acentos
 * @returns {String} Texto sin acentos
 */
const removeAccents  = str => str.normalize("NFD").replace(/[\u0300-\u036f`´¨]/g,"");

export {clearBlankSpaces,getRandom,removeAccents}; 