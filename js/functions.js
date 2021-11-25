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

export {clearBlankSpaces,getRandom}; 