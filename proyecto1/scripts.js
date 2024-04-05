
var content = document.querySelector(".content")
var factorAjuste = window.innerWidth / 1536;
console.log(factorAjuste)

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumber = getRandomInt(1, 3);
function crearCompetidor(i){
    const dis = new Map();
    dis.set(1, ["a", 40.9, "images/discoVerde.png"]) 
    dis.set(2, ["s", 44.7, "images/discoRojo.png"])
    dis.set(3, ["d", 48.5, "images/discoAmarillo.png"])
    dis.set(4, ["f", 52.2, "images/discoAzul.png"])
    dis.set(5, ["g", 55.9, "images/discoNaranja.png"])

    var valor = dis.get(getRandomInt(1, 5));

    var letra = valor[0];
    var left = valor[1] + "%"; // Aplica el cálculo proporcional
    var imagen = valor[2];
    var competidorDiv = document.createElement("div");
    competidorDiv.setAttribute("class", "circulo1");
    competidorDiv.dataset.distancia = 0;
    competidorDiv.dataset.letra = letra;
    competidorDiv.style.left = left;
    content.appendChild(competidorDiv)
    var competidorImg = document.createElement("img");
    competidorImg.setAttribute("src", imagen);
    competidorImg.setAttribute("width", "50vw");
    competidorImg.style.marginTop = "0px";
    competidorDiv.appendChild(competidorImg)
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
iniciado = false
pausa = false
velocidad= 100

function start() {
    var puntuacion = document.getElementById("puntuacion");
    generacion = setInterval(function() {
        crearCompetidor(1);
    }, velocidad*10);

    intervalo = setInterval(function() {
        var elementos = document.querySelectorAll(".circulo1");
        elementos.forEach(function(elemento) {
            var distanciaActual = parseInt(elemento.dataset.distancia);
            var nuevaMargenTop = distanciaActual * 10;
            var margenActual = elemento.offsetTop; // Posición relativa respecto al contenedor
            var contenedor = content.offsetHeight; // Altura del contenedor
            var margenMinimo = (contenedor/10)*6.3;
            var margenMaximo = (contenedor/10)*7; // Margen superior máximo relativo

            if (nuevaMargenTop > (contenedor/10)*7) {
                elemento.remove();
                puntaje -= 1;
                puntuacion.textContent = "Puntuación: " + puntaje;
            } else {
                if (teclas.get(elemento.dataset.letra) && margenActual >= margenMinimo && margenActual <= margenMaximo) {
                    console.log("SI");
                    elemento.remove();
                    teclas.set(elemento.dataset.letra, false);
                    puntaje += 1;
                    puntuacion.textContent = "Puntuación: " + puntaje;
                } else {
                    elemento.style.marginTop = nuevaMargenTop + "px";
                    elemento.dataset.distancia = distanciaActual + 1;
                }
            }
        });

        teclas.forEach(function(valor, clave) {
            if (valor === true) {
                puntaje -= 1;
                puntuacion.textContent = "Puntuación: " + puntaje;
                teclas.set(clave, false); // Establecer el valor en falso
            }
        });
    }, velocidad);
}




document.addEventListener("keyup", function (evt){
    if(iniciado){
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
    
        if(letra != ""){
            reproducirAudio(letra)
            var stop = document.querySelector(".stop." + letra);
            if (stop) {
                stop.style.opacity = "0.1";
                setTimeout(function() {
                    stop.style.opacity = "1"; 
                }, 200);
            }
        }
    }

})

function reproducirAudio(letra) {
    var ruta = "audios/" + letra + ".mp3"; 

    var audio = new Audio(ruta);
    audio.setAttribute("id", "notaAudio");

    audio.play();
}

const botonInciar = document.getElementById("iniciar");
botonInciar.addEventListener("click", function() {
    if (!iniciado){
        start()
        velocidad = 100
        iniciado = true
    } 
});


const botonReiniciar = document.getElementById("reiniciar");
botonReiniciar.addEventListener("click", function() {
    if (iniciado){
        clearInterval(intervalo)
        clearInterval(generacion)
        var elementos = document.querySelectorAll(".circulo1");
        elementos.forEach(function(elemento) {
            elemento.remove();
        });
        iniciado = false
        puntaje = 0
        puntuacion.textContent = "Puntuación: " + puntaje
    }

});

const botonPausaReaunar = document.getElementById("pausareaunar");
botonPausaReaunar.addEventListener("click", function() {
    if (pausa){
        start()
        pausa = false
    } else {
        clearInterval(intervalo)
        clearInterval(generacion)
        pausa = true
    }

});
const botonAumentar = document.getElementById("aumentar");
botonAumentar.addEventListener("click", function() {
    if (velocidad > 10){
        velocidad = velocidad*0.8
        clearInterval(intervalo)
        clearInterval(generacion)
        start()
        console.log(velocidad)
    }

});

const botonDisminuir = document.getElementById("disminuir");
botonDisminuir.addEventListener("click", function() {
    if (velocidad < 500){
        velocidad = velocidad/0.8
        clearInterval(intervalo)
        clearInterval(generacion)
        start()
    }

});


