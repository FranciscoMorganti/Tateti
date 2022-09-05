const tatetiTablero= document.querySelector('.tateti__tablero');
const contador= document.querySelector('.contador-movimientos__numero');
const header= document.querySelector('header');
const contenedorApp= document.querySelector('.contenedor-app');
const rootStyles= document.documentElement.style;
const contenedorModalGanador= document.querySelector('.contenedor-modal-ganador');

let fichaJugador1= 'X';
let fichaJugador2= 'O';
let nombreJugador1= 'Pepe';
let nombreJugador2= 'Juan';
let colorJugador1= 'red';
let colorJugador2= 'blue';
let tablero= [];
let esTurnoJugador1= true;
let partidaIniciada= true;
let cambiandoFicha= false;
let casillaSeleccionada;
let indexCasillaSeleccionada;
let movimientosPosibles= {
    0: [1,3,4],
    1: [0,2,4],
    2: [1,5,4],
    3: [0,6,4],
    5: [2,8,4],
    6: [3,7,4],
    7: [6,8,4],
    8: [5,7,4]
}

header.addEventListener('click', e => {
    if(e.target.name === 'moon-outline' || e.target.name === 'sunny-outline'){
        e.target.name === 'sunny-outline'? e.target.parentElement.innerHTML= '<ion-icon name="moon-outline"></ion-icon>' : e.target.parentElement.innerHTML= '<ion-icon name="sunny-outline"></ion-icon>';
        e.target.name === 'sunny-outline'? rootStyles.setProperty('--color-principal', '#000') : rootStyles.setProperty('--color-principal', '#fff');
        contenedorApp.classList.toggle('contenedor-app--modo-oscuro');
        contenedorApp.children[2].children[0].classList.toggle('contador-movimientos--modo-oscuro');
        contenedorApp.children[1].children[5].children[0].classList.toggle('modal-ganador--modo-oscuro')
    }
});

tatetiTablero.addEventListener('click', e => {
    if(e.target.className == 'tateti__casilla-marcador'){
        if(partidaIniciada){
            if(cambiandoFicha){
                moverFicha(e.target, casillaSeleccionada, indexCasillaSeleccionada, Array.from(e.path[2].children).indexOf(e.target.parentElement));
            }else if(e.target.innerHTML !== '' && tablero.filter(casilla => casilla === 'X' || casilla === 'O').length === 6){
                if(e.target.innerHTML === fichaJugador1){
                    if(esTurnoJugador1){
                        casillaSeleccionada= e.target;
                        cambiandoFicha= !cambiandoFicha;
                        indexCasillaSeleccionada= Array.from(e.path[2].children).indexOf(e.target.parentElement);
                    }else{
                        alert('no es tu turno papi');
                    }
                }else if(e.target.innerHTML === fichaJugador2){
                    if(!esTurnoJugador1){
                        casillaSeleccionada= e.target;
                        cambiandoFicha= !cambiandoFicha;
                        indexCasillaSeleccionada= Array.from(e.path[2].children).indexOf(e.target.parentElement);
                    }else{
                        alert('no es tu turno papi');
                    }
                }
            }else if(tablero.filter(casilla => casilla === 'X' || casilla === 'O').length < 6){
                ponerFicha(e.target);
            }
            console.log(Array.from(e.path[2].children).indexOf(e.target.parentElement));
            tablero= Array.from(e.path[2].children).map(casilla => casilla.children[0].innerHTML);
            comprobarGanador(tablero);
        }
    }
});

function ponerFicha(casilla){
    if(esTurnoJugador1){
        casilla.innerHTML= fichaJugador1;
        casilla.style.color= colorJugador1;
    }else if(!esTurnoJugador1){
        casilla.innerHTML= fichaJugador2;
        casilla.style.color= colorJugador2;
    }
    contador.innerHTML= parseFloat(contador.innerHTML) + 1;
    esTurnoJugador1= !esTurnoJugador1;
}

function sacarFicha(casilla){
    casilla.innerHTML= '';
}

function moverFicha(casilla, casillaAnterior, indexCasillaAnterior, indexCasillaActual){
    cambiandoFicha= !cambiandoFicha;
    if(indexCasillaAnterior === 4 && casilla.innerHTML === ''){
        ponerFicha(casilla);
        sacarFicha(casillaAnterior);
    }else if(indexCasillaAnterior !== 4 && casilla.innerHTML === ''){
        if(indexCasillaActual === movimientosPosibles[indexCasillaAnterior][0] || indexCasillaActual === movimientosPosibles[indexCasillaAnterior][1] || indexCasillaActual === movimientosPosibles[indexCasillaAnterior][2]){
            ponerFicha(casilla);
            sacarFicha(casillaAnterior);
        }
    }
}

function comprobarGanador(tablero){
    if(tablero[0] === 'X' && tablero[1] === 'X' && tablero[2] === 'X' || tablero[3] === 'X' && tablero[4] === 'X' && tablero[5] === 'X' || tablero[6] === 'X' && tablero[7] === 'X' && tablero[8] === 'X' ||tablero[0] === 'X' && tablero[3] === 'X' && tablero[6] === 'X' ||tablero[1] === 'X' && tablero[4] === 'X' && tablero[7] === 'X' ||tablero[2] === 'X' && tablero[5] === 'X' && tablero[8] === 'X' ||tablero[0] === 'X' && tablero[4] === 'X' && tablero[8] === 'X' ||tablero[2] === 'X' && tablero[4] === 'X' && tablero[6] === 'X'){
        fichaJugador1 === 'X'? mostrarGanador(nombreJugador1, colorJugador1, nombreJugador2) : mostrarGanador(nombreJugador2, colorJugador2, nombreJugador1);
    }else if(tablero[0] === 'O' && tablero[1] === 'O' && tablero[2] === 'O' || tablero[3] === 'O' && tablero[4] === 'O' && tablero[5] === 'O' || tablero[6] === 'O' && tablero[7] === 'O' && tablero[8] === 'O' ||tablero[0] === 'O' && tablero[3] === 'O' && tablero[6] === 'O' ||tablero[1] === 'O' && tablero[4] === 'O' && tablero[7] === 'O' ||tablero[2] === 'O' && tablero[5] === 'O' && tablero[8] === 'O' ||tablero[0] === 'O' && tablero[4] === 'O' && tablero[8] === 'O' ||tablero[2] === 'O' && tablero[4] === 'O' && tablero[6] === 'O'){
        fichaJugador1 === 'O'? mostrarGanador(nombreJugador1, colorJugador1, nombreJugador2) : mostrarGanador(nombreJugador2, colorJugador2, nombreJugador1);
    }
}

function mostrarGanador(nombreGanador, colorGanador, nombrePerdedor){
    contenedorModalGanador.style.visibility= 'visible';
    contenedorModalGanador.children[0].style.marginTop= '0vh';
    contenedorModalGanador.children[0].style.border= `4px solid ${colorGanador}`;
    contenedorModalGanador.children[0].children[0].style.color= colorGanador;
    Array.from(contenedorModalGanador.children[0].children[1].children).forEach(texto => texto.style.color= colorGanador);
    contenedorModalGanador.children[0].children[1].children[0].innerHTML= `Gana ${nombreGanador}`;
    contenedorModalGanador.children[0].children[1].children[1].innerHTML= `Ha vencido a ${nombrePerdedor}<br>en tan solo:`;
    contenedorModalGanador.children[0].children[1].children[2].innerHTML= `${contador.innerHTML}<br>movimientos`;
}