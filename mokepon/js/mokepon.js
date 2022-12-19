let ataqueJugador

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById("boton-mascota")
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener(" click" , ataquefuego)
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener("click" , ataqueAgua)
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.addEventListener("click" , ataqueTierra)

}

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById ("ratigueya")
    let spanMascotaJugador = document.getElementById("mascota-jugador")

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "hipodoge"
    } else if (inputCapipepo.checked) {
       spanMascotaJugador.innerHTML = "capipepo"
    } else if (inputRatigueya.checked){
       spanMascotaJugador.innerHTML = "ratigueya"
    } else {
        alert("Selecciona una mascota")
    }  

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")


    if (ataqueAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = "Hipodoge"
    } else if (ataqueAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = "Capipepo"
    } else {
        spanMascotaEnemigo.innerHTML = "Ratigueya"
    }

}

function ataquefuego(){
    ataqueJugador = "FUEGO"
}
function ataqueAgua(){
    ataqueJugador = "AGUA"
}
function ataqueTierra(){
    ataqueJugador = "TIERRA"
}


function aleatorio(min, max ) {
    return Math.floor(Math.random() * ( max - min + 1 ) + min )
 }


window.addEventListener("load", iniciarJuego)