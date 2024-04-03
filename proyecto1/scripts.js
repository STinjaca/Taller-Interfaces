
var content = document.querySelector(".content")

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumber = getRandomInt(1, 3);
function crearCompetidor(i){
    const dis = new Map();
    dis.set(1, ["a","630px","discoVerde.png"]) 
    dis.set(2, ["s","687px", "discoRojo.png"])
    dis.set(3, ["d","744px", "discoAmarillo.png"])
    dis.set(4, ["f","799px", "discoAzul.png"])
    dis.set(5, ["g","857px", "discoNaranja.png"])

    var [letra, margen, imagen] = dis.get(getRandomInt(1, 5));
    var competidorDiv = document.createElement("div");
    competidorDiv.setAttribute("class", "circulo1");
    competidorDiv.dataset.distancia = 0;
    content.appendChild(competidorDiv)
    var competidorImg = document.createElement("img");
    competidorImg.setAttribute("src", imagen);
    competidorImg.setAttribute("width", "50px");
    competidorDiv.dataset.letra = letra;
    competidorImg.style.marginLeft = margen;
    competidorImg.style.marginTop = "0px";
    competidorDiv.appendChild(competidorImg)
    // competidorDiv.innerHTML = i
}


generacion = "";
intervalo = "";
puntaje = 0;
teclas = new Map();
teclas.set("a", false) 
teclas.set("b", false)
teclas.set("c", false)
teclas.set("d", false)
teclas.set("e", false)

function start(){

    var puntuacion = document.getElementById("puntuacion");
    generacion = setInterval(function(){
        crearCompetidor(1);
        }, 1000)

    intervalo = setInterval(function (){

        var elementos = document.querySelectorAll(".circulo1");
        elementos.forEach(function (elemento){
            var distanciaActual = parseInt(elemento.dataset.distancia);
            var margenActual = parseInt(elemento.style.marginTop.replace("px", ""));
            var nuevaMargenTop = distanciaActual * 10;
            if (nuevaMargenTop > 590) {
                elemento.remove();
                puntaje-=1
                puntuacion.textContent = "Puntuación: " + puntaje
            } else {
                if (teclas.get(elemento.dataset.letra) && margenActual >= 480 && margenActual <= 520){
                    console.log("SI")
                    elemento.remove();  
                    teclas.set(elemento.dataset.letra, false) 
                    puntaje+=1
                    puntuacion.textContent = "Puntuación: " + puntaje
                } 
                else {
                    elemento.style.marginTop = nuevaMargenTop + "px";
                    elemento.dataset.distancia = distanciaActual + 1;
                    elemento.style.marginLeft = elemento.dataset.top;
                }
            }
        })

    teclas.forEach(function(valor, clave) {
        if (valor === true) {
            puntaje-=1
            puntuacion.textContent = "Puntuación: " + puntaje
            teclas.set(clave, false); // Establecer el valor en falso
        }
    });

}, 100);

    

}

document.addEventListener("keyup", function (evt){
    console.log(evt.key)
    letra = ""
    if(evt.key === "a" || evt.key ==="A"){
        teclas.set("a", true)
        letra = "a"
    }
    if(evt.key === "s" || evt.key ==="S"){
        teclas.set("s", true)
        letra = "s"
    }
    if(evt.key === "d" || evt.key ==="D"){
        teclas.set("d", true)
        letra = "d"
    }
    if(evt.key === "f" || evt.key ==="F"){
        teclas.set("f", true)
        letra = "f"
    }
    if(evt.key === "g" || evt.key ==="G"){
        teclas.set("g", true)
        letra = "g"
    }

    if(evt.key === "p" || evt.key ==="P"){
        if (teclas.get("p")){
            start()
            teclas.set("p", false)
        } else {
            clearInterval(intervalo)
            clearInterval(generacion)
            teclas.set("p", true)
        }

    }

    if(letra != ""){
        var stop = document.querySelector(".stop." + letra);
        if (stop) {
            stop.style.opacity = "0.1"; // Cambiar la opacidad del stop al 10%
            setTimeout(function() {
                stop.style.opacity = "1"; // Revertir la opacidad del stop a 100% después de 200 milisegundos
            }, 200);
    }
    }

})



start()