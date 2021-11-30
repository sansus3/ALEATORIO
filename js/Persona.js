class Persona {
    #genero = "f";
    /**
     * 
     * @param {String} nombre 
     * @param {String} genero "f|m" Por defecto "f"
     */
    constructor(nombre = "", genero = "f") {
        this._nombre = nombre;
        this._edad = new Date();
        this.genero=genero;
    }
    /**
     * Setter Género de la persona
     * @param {String} genero "f|m". Por defecto "f"
     */
    set genero(genero="f") {//setter
        genero = genero.toLowerCase();
        this.#genero = genero === "f" ? genero : "m";
    }
    /**
     * Función para introducir edad
     * @param {object|string} edad Utilizar el objeto new Date o un string bajo formato "aaaa-mm-dd"(1999-01-01)
     */
    setEdad(edad){
        if(typeof edad==='object'){
            this._edad = edad;
        }else if(typeof edad === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(edad)){
            edad = edad.split("-")
            this._edad = new Date(edad[0],edad[1],edad[2]);
        }
    }
    /**
     * Retorna Género de la persona
     * @returns String "f|m"
     */
    getGenero(){//getter sin get 
        return this.#genero==="f"?"Mujer":"Hombre";
    }
    /**
     * Retorna la fecha en formato String
     * @returns String "Fecha en formato String"
     */
    get edad(){//getter
        return `${this._edad.getDate()}/${this._edad.getMonth()}/${this._edad.getFullYear()}`;
    }
    /**
     * Informe detallado de la persona en formato HTML
     * @returns String
     */
    obtDetalles() {
        return `
            <ul class="campos">
                <li>Nombre: ${this._nombre}</li>
                <li>Género: ${this.getGenero()}</li>
                <li>Edad: ${this.edad}</li>
            <ul>
        `;
    }
}

export {Persona};