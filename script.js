const tatetiTablero= document.querySelector('.tateti__tablero');
// const tatetiCasillas= document.querySelectorAll('.tateti__casilla-marcador');

let fichaJugador1= 'X';
let fichaJugador2= 'O';
let colorJugador1= 'red';
let colorJugador2= 'blue';
let esTurnoJugador1= true;
let partidaIniciada= true;

tatetiTablero.addEventListener('click', e => {
    if(e.target.className == 'tateti__casilla-marcador'){
        if(partidaIniciada){
            ponerFicha(e.target)
            // console.log(e.path[0])
            // console.log(e)
            // console.log(e.path[2].children[0])
            // if(e.target == e.path[2].children[0].childNodes[0]){
            //     console.log('0')
            // }
            // console.log(e.path[2].children.indexOf(e.target))
            // if(e.target.parentElement == e.path[2].children[2]){
            //     console.log('si')
            // }
            // let array= e.path[2].children;
            // console.log(Array.from(array));
            console.log(Array.from(e.path[2].children).indexOf(e.target.parentElement));
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
    esTurnoJugador1= !esTurnoJugador1;
}

function sacarFicha(casilla){
    casilla.innerHTML= '';
}

function moverFicha(casilla, casillaAnterior){
    sacarFicha(casillaAnterior);
    ponerFicha(casilla);
}