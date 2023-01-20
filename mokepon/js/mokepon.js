const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let ataquesMokepon 
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assests/mokepons_mokepon_hipodoge_attack.png" , 5)
let capipepo = new Mokepon("Capipepo", "./assests/mokepons_mokepon_capipepo_attack.png" , 5)
let ratigueya = new Mokepon("Ratigueya", "./assests/mokepons_mokepon_ratigueya_attack.png" ,5)

hipodoge.ataques.push(
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },   
    { nombre: "🌱", id: "boton-tierra"},
)

capipepo.ataques.push(
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },   
    
)

ratigueya.ataques.push(
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra"},
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
     opcionDeMokepones = `
     <input type="radio" name="mascota" id=${mokepon.nombre} />
      <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src= ${mokepon.foto} alt=${mokepon.nombre}>
      </label>
     `
     contenedorTarjetas.innerHTML += opcionDeMokepones

      inputHipodoge = document.getElementById("Hipodoge")
      inputCapipepo = document.getElementById("Capipepo")
      inputRatigueya = document.getElementById("Ratigueya")

    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)


    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = "none"

    //sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "flex"
    iniciarMapa()

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("Selecciona una mascota")
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
   let ataques
   for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
       ataques = mokepones[i].ataques
    }
    
   }
   mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")
 }
   

function secuenciaAtaque() {
    botones.forEach((boton) => {
      boton.addEventListener("click", (e) => {
         if (e.target.textContent === "🔥") {
            ataqueJugador.push("FUEGO") 
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true
         }else if (e.target.textContent === "💧") {
            ataqueJugador.push("AGUA") 
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true
         }else {
            ataqueJugador.push("TIERRA") 
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true
         }
         ataqueAleatorioEnemigo ()

      })
    })
    
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)

    spanMascotaEnemigo.innerHTML= mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataqueAleatorioEnemigo.length -1)
    let ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre

    ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)

    if(ataque == "🔥") {
        ataqueEnemigo.push("FUEGO")
    }else if (ataque == "💧") {
        ataqueEnemigo.push("AGUA")
    }else {
        ataqueEnemigo.push("TIERRA")
    }
    
    console.log(ataqueEnemigo)
    
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
  
    for (let index = 0; index < ataqueJugador.length; index++) {
      if (ataqueJugador[index] === ataqueEnemigo[index]) {
        indexAmbosOponentes(index, index)
        crearMensaje("EMPATE")
    } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    } else {
        indexAmbosOponentes(index, index)
        crearMensaje("PERDISTE")
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
}

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue empate!!! 🤨")
    } else if (victoriasJugador >victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! GANASTE 🏆")
    }else {
        crearMensajeFinal("Lo siento, perdiste 😭")
    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal



    sectionReiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarPersonaje() {
    capipepo.x = capipepo.x + capipepo.velocidadX
    capipepo.y = capipepo.y + capipepo.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        capipepo.mapaFoto,
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto
    )
}

function moverDerecha() {
    // Mientras la posición X del mokepon sea 
    // menor or igual al ancho del mapa 
    // menos el ancho del mokepon dejar mover 
    // a la derecha sino dejarlo quieto
    if (capipepo.x <= (mapa.width - capipepo.ancho)) {
        capipepo.velocidadX = 5
    } else {
        capipepo.velocidadX = 0
    }
}

function moverIzquierda() {
    // Mientras la posición X del mokepon  
    // sea mayor o igual a 0 dejarlo mover 
    // a la izquierda sino dejarlo quieto
    if (capipepo.x >= 0) {
        capipepo.velocidadX = -5
    } else {
        capipepo.velocidadX = 0
    }
}

function moverAbajo() {
    // Mientras la posición Y del mokepon sea 
    // menor or igual a la altura del mapa 
    // menos la altura del mokepon dejar mover 
    // hacia abajo sino dejarlo quieto
    if (capipepo.y <= (mapa.height - capipepo.alto)) {
        capipepo.velocidadY = 5
    } else {
        capipepo.velocidadY = 0
    }
}

function moverArriba() {
    // Mientras la posición Y del mokepon  
    // sea mayor o igual a 0 dejarlo mover 
    // hacia abajo sino dejarlo quieto
    if (capipepo.y >= 0) {
        capipepo.velocidadY = -5
    } else {
        capipepo.velocidadY = 0
    }
}

function detenerMovimiento() {
    capipepo.velocidadX = 0
    capipepo.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.keyCode) {
        case 38: // ArrowUp
            moverArriba()
            break
        case 40: // ArrowDown
            moverAbajo()
            break
        case 37: // ArrowLeft
            moverIzquierda()
            break
        case 39: // ArrowRight
            moverDerecha()
            break
         default:
            break    
    }
}

function iniciarMapa() {
    intervalo = setInterval(pintarPersonaje, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

window.addEventListener("load", iniciarJuego)
