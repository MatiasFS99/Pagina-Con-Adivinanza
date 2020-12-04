var intentos = 3;
var puntos = 0;
var pregunta = 0;
var correcta = "0";
const Cantidad_Preguntas = 3;

const btn = document.querySelector('#btn');
const continuar = document.querySelector('#btn2');

const opcion1 = document.getElementById("choice1");
const opcion2 = document.getElementById("choice2");
const opcion3 = document.getElementById("choice3");


document.getElementById("resultados").innerHTML = '<br>Puntos: ' + puntos + ' intentos restantes: ' + intentos;
//listo las preguntas en un array



var array_preguntas = [
    //pregunta, respuesta1, respuesta2, respuesta3, ncorrecta, dato divertido o historico
    ["¿Que tipo de cable usa la conexion 10base2?", "Coaxial", "RJ-45", "RS-232", "1", "Tambien era llamada cheapernet porque era mas economica de realizar que las demas formas del ethernet"],
    ["¿Que tipo de ram es mas antigua?", "RIMM", "DIMM", "SIMM", "3", "las memorias RamBus(RIMM) tuvieron una vida comercial muy corta debido a sus precios, poco rendimiento y consumo/temperatura"],
    ["¿Que tienen en comun estos puertos? AGP, VLB", "Son Puertos de Expansion Generales", "Son Puertos De Expansion de Video", "Ambas son Correctas", "2", "El puerto VLB es una modificacion del isa creada para ser mas rapida la comunicacion de las placas de video, aunque solo duro poco mas de 1 año en el mercado antes de ser remplazado por pci"]
];

pasar_pregunta();

// Dibuja en pantalla las preguntas y el resultado correcto
function pasar_pregunta(){
    if ((pregunta + 1) < 4 ){
        document.getElementById("pregunta").innerHTML = array_preguntas[pregunta][0];
        document.getElementById("choice1").innerHTML = array_preguntas[pregunta][1];
        document.getElementById("choice2").innerHTML = array_preguntas[pregunta][2];
        document.getElementById("choice3").innerHTML = array_preguntas[pregunta][3];
        correcta = array_preguntas[pregunta][4];
    }
    else{
        document.getElementById("cuestionario").innerHTML = "<h1>Felicidades Completaste El quiz secreto<h1>";
        document.getElementById("cuestionario").innerHTML += "<br><label>Este quiz fue creado por accidente(me confundi el quiz con la adivinanza) y lo escondi porque me daba pena dejarlo ahi si ya lo habia completado :)</label>";
        document.getElementById("cuestionario").innerHTML += "<br><label> Ganaste el pato dorado</label>";
        document.getElementById("cuestionario").innerHTML += "<br><img src='imagenes/patoDorado.gif' alt='pato Dorado'/>";
    }
}

//Si no completas la encuesta terminas aca

function fallo(){
    document.getElementById("cuestionario").innerHTML = "Fallaste realizaste: " + puntos + "/" + Cantidad_Preguntas + " Preguntas Correctas";
    document.getElementById("cuestionario").innerHTML += "<br><h1>mas suerte la proxima</h1>";
}

// handle click button
btn.onclick = function () {
    if(intentos > 0){
        intentos = intentos - 1;
        const rbs = document.querySelectorAll('input[name="choice"]');
        let selectedValue;
        for (const rb of rbs) {
            if (rb.checked) {
                selectedValue = rb.value;
                rb.disabled;
                break;
            }
        }
        if (selectedValue == correcta){
            puntos = puntos + 1;
            alert("Correcto sumaste 1 punto, tu puntuacion total es: " + puntos);

            btn.disabled = true;
            continuar.disabled = false;
            document.getElementById("funfact").innerHTML = array_preguntas[pregunta][5];
        }
        else{
            alert("fallaste te quedan " + intentos + " intentos");
        }
    }
    else{
        alert("no te quedan intentos");
    }
    document.getElementById("resultados").innerHTML = '<br>Puntos: ' + puntos + ' intentos restantes: ' + intentos;
    
    if(intentos == 0){
        btn.disabled = true;
        continuar.disabled = false;
    }
};

continuar.onclick = function() {
    if(intentos == 0 && puntos<3){
        continuar.disabled = true;
        fallo();
        return;
    }
    pregunta++;
    correcta = "0";
    document.getElementById("funfact").innerHTML = "";
    pasar_pregunta();
    btn.disabled = false;
    continuar.disabled = true;
}