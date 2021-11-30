"use strict";
//Código alternativo
document.querySelector("#b_generar").addEventListener("click", (e)=>{
	const aleatorio=(max,min)=>Math.floor(Math.random() * ((max+1) - min)) + min;
	let array=new Array();
	for(let i=0;i<50;i++){
		
		array.push(aleatorio(10,0));
	}
	alert(array.join());
},false);


/******
*
*
*  ALEATORIO
*
*
*******/
let tirada=1;
let tiradaCadena="";
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let numElemento=document.querySelector("#aleatorio");
document.querySelector("#b_aleatorio").addEventListener("click",e=>{
	//alert(`parseInt("123a4") = ${parseInt("123a4")} - Number("123a4") = ${Number("123a4")}`);
	
	if(tirada===11){
		document.querySelector("#msg_aleatorio").innerHTML="GAME OVER";
	}else{
		let num=Number(numElemento.value);

		if(num>numeroAleatorio)
			document.querySelector("#msg_aleatorio").innerHTML="Más pequeño";
		else if(num<numeroAleatorio)
			document.querySelector("#msg_aleatorio").innerHTML="Más Grande";
		else if(num===numeroAleatorio)
			document.querySelector("#msg_aleatorio").innerHTML="Bravo";
		else
			document.querySelector("#msg_aleatorio").innerHTML="No es un número";

		tiradaCadena+=`${num} `;
		document.querySelector("#serie_aleatorio").innerHTML=tiradaCadena;
		tirada++;
	}	

});

// Math.round(5.67)  //<--6 redondea al más alto
// Math.floor(5.67)  //<--5  trunca
// //si bien es cierto que
// Math.round(5.34)  //<---5
// Math.floor(5.34)  //<---5
function calcularNumeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}



document.querySelector("#enlace_1").addEventListener("click",e=>{

e.preventDefault();
let texto=prompt("Dame texto");
let minusculas=0,mayusculas=0;

for(let i=0;i<texto.length;i++){
	if(texto.charAt(i)==" "){
	}else if(texto.charAt(i)==texto.charAt(i).toLowerCase())
		minusculas++;
	else
		mayusculas++;
}

window.alert(`${texto}: Mayúsculas: ${mayusculas} \r Minúsculas: ${minusculas}`);

});




 
 
 
const messageWindow=(palindromo)=>{

    let ventana=window.open("","Palíndromo","width=400px,height=300px,resizable=no");
    ventana.document.open();
    ventana.document.write(`<p>Resultado:</p>
        <p>${palindromo}</p>
        <button onclick="window.close();">Cerrar</button>`);
    ventana.document.close();
    //ventana.close(); // cerraremos la ventana despúes de 5 segundos
    setTimeout(function(){ventana.close()}, 5000);
};
 
const mostrarDatos=(e)=>{
	let palindromo="";
	let palindromoSinEspacios="";
	let mensaje="";
	let palindromoA=null;
	let palindromoB=null;
	let esPalindromo=true;
	let variosBlancos = /[ ]+/g;
	e.preventDefault();

	while(estaVacio(palindromo=prompt("Dame palíndromo"))){
		if(palindromo===null) break;
		alert("Mete un texto");
	}
	palindromo=palindromo.toLowerCase();
	palindromo=limpiarEspaciosAdicionales(palindromo);
	palindromoSinEspacios=palindromo.replace(variosBlancos,"");
	palindromoA=palindromoSinEspacios.split("");//convierte strig to array
	palindromoB=palindromoA.slice(); //explicar por que no palindromeB=palindromeA (variable por referencia)
	palindromoB.reverse();
	palindromoB.forEach((value,index)=>{
		if(palindromoA[index]!=palindromoB[index]){

			esPalindromo=false;
			return;
		}
	});

	mensaje=(esPalindromo)?`"${palindromo}" es un palíndromo`:`"${palindromo}" NO es un palíndromo`;
	messageWindow(mensaje);

     
};

document.querySelector("#enlace_2").addEventListener("click",mostrarDatos);
 

