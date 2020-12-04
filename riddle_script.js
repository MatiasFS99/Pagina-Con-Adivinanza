const btn = document.getElementById("enviar");
const continuar = document.getElementById("siguiente")
const texto = document.getElementById("entrada");
const pista = document.getElementById("pista");
const pista2 = document.getElementById("pista2");

var respuesta = "";
var intentos = 0;
var puntos = 0;
var comparacion = "";
var pregunta = 0;
var perdiste = 0;



var array_adivinanzas =[
    //pregunta , Respuesta, pista, pista2
    ["¿Que tipo de puerto se usaba para conectar las impresoras antes del usb?", "paralelo", "Era el puerto de comunicacion mas rapido", "tenia 25 pines"],
    ["¿Que tipo de puerto era el mas utilizado para conectar discos duros?", "ide", "No era SCSI ni Floppy", "tambien le decian puerto PATA"],
    ["¿Que puerto de expansion fue el dominante antes del PCI?", "isa", "Se creo una modificacion especificamente para placas de video llamada vlb", "Existio hasta la era del pentium III cuando lo descontinuaron"]
];

var adivinanzas_totales = array_adivinanzas.length;

function dibujar_pantalla(){
    if(pregunta <= (adivinanzas_totales - 1) ){
        continuar.disabled = true;
        texto.value = null
        intentos = 0;
        pista.innerText = "";
        pista2.innerText = "";
        document.getElementById("titulo").innerHTML = array_adivinanzas[pregunta][0];
        respuesta = array_adivinanzas[pregunta][1].toUpperCase();
        document.getElementById("stats").innerHTML = "Puntos: " + puntos + " intentos restantes: " + (3 - intentos);
    }
    else{
        Victoria();
    }
}

dibujar_pantalla();

btn.onclick = function () {
    comparacion = texto.value.toUpperCase();
    intentos++;
    if(comparacion == respuesta){
        puntos = puntos + (4 - intentos + 1);
        alert("Respuesta Correcta")
        document.getElementById("stats").innerHTML = "Puntos: " + puntos + " intentos restantes: " + (3-intentos);
        btn.disabled = true;
        continuar.disabled = false;
    }
    else{
        alert("Respuesta incorrecta")
        if(intentos == 1){
            pista.innerHTML = array_adivinanzas[pregunta][2]
        }
        if(intentos == 2){
            pista2.innerHTML = array_adivinanzas[pregunta][3]
        }
        if(intentos == 3){
            btn.disabled = true;
            continuar.disabled = false;
            perdiste++;
        }
        document.getElementById("stats").innerHTML = "Puntos: " + puntos + " intentos restantes: " + (3-intentos);
    }
}

continuar.onclick = function() {
    if(perdiste == 0){
        pregunta = pregunta + 1;
        dibujar_pantalla();
        btn.disabled = false;
        continuar.disabled = true;
    }
    else{
        Fin_Del_Juego();
    }
}

function Fin_Del_Juego(){
    document.getElementById("adivinanza").innerHTML="Fin del Juego, llegaste a la pregunta n: " + (pregunta + 1) + " de " + adivinanzas_totales + "con una puntuacion de: " + puntos;
    document.getElementById("adivinanza").innerHTML+= '<br><input type="button" class="btn btn-primary" id="reiniciar" value="reintentar?">';
    const reinicio = document.getElementById("reiniciar");
    reinicio.onclick = function(){
        location.reload();
    }
}

function Victoria(){
    document.getElementById("adivinanza").innerHTML="Fin del Juego Ganaste, tu puntuacion fue de: " + puntos;
    document.getElementById("adivinanza").innerHTML+= '<br><input type="button" class="btn btn-primary" id="reiniciar" value="reintentar?">  ';
    if(puntos == (adivinanzas_totales*4)){ document.getElementById("adivinanza").innerHTML+= '<a href="quiz.html"><input type="button" class="btn btn-primary" id="reiniciar" value="Intentar quiz?"><a>'; }
    const reinicio = document.getElementById("reiniciar");
    reinicio.onclick = function(){
        location.reload();
    }
}

