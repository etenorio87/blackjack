"use strict";
;
document.body.onload = () => {
    const nombreUsuarioPh = document.getElementById('usuario-nombre-ph');
    const btnNew = document.getElementById('btn-new');
    const btnCard = document.getElementById('btn-card');
    const btnStop = document.getElementById('btn-stop');
    const userCardsContainer = document.getElementById('user-cards');
    const userContPh = document.querySelector('#user-container small');
    const cpuCardsContainer = document.getElementById('cpu-cards');
    const cpuContPh = document.querySelector('#cpu-container small');
    const numeros = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const figuras = ['C', 'D', 'H', 'S'];
    const mazo = [];
    let userValueCont = 0;
    let cpuValueCont = 0;
    let nombreUsuario;
    const turnoCPU = () => {
        do {
            const carta = mazoBarajado.pop();
            if (carta) {
                const img = crearImagen(carta);
                cpuValueCont += carta.value;
                cpuCardsContainer === null || cpuCardsContainer === void 0 ? void 0 : cpuCardsContainer.appendChild(img);
                cpuContPh.innerText = cpuValueCont + '';
            }
        } while (userValueCont <= 21 && cpuValueCont < userValueCont);
        setTimeout(() => {
            if ((cpuValueCont > userValueCont && cpuValueCont <= 21) || userValueCont > 21) {
                alert('Usted ha perdido!');
            }
            else {
                alert('Usted ha ganado');
            }
            console.log(mazoBarajado);
        }, 300);
    };
    btnCard === null || btnCard === void 0 ? void 0 : btnCard.addEventListener('click', () => {
        const carta = mazoBarajado.pop();
        if (carta) {
            const img = crearImagen(carta);
            userValueCont += carta.value;
            userCardsContainer === null || userCardsContainer === void 0 ? void 0 : userCardsContainer.appendChild(img);
            userContPh.innerText = userValueCont + '';
            console.log(userValueCont);
            if (userValueCont > 21) {
                btnCard.setAttribute('disabled', '');
                turnoCPU();
            }
        }
    });
    btnStop === null || btnStop === void 0 ? void 0 : btnStop.addEventListener('click', () => {
        btnCard === null || btnCard === void 0 ? void 0 : btnCard.setAttribute('disabled', '');
        turnoCPU();
    });
    btnNew === null || btnNew === void 0 ? void 0 : btnNew.addEventListener('click', () => {
        iniciarPartida();
    });
    const crearImagen = (carta) => {
        const img = document.createElement('img');
        img.className = 'gcard';
        img.src = `assets/img/cards/${carta.key}.png`;
        return img;
    };
    const calcularValorCarta = (numero) => {
        switch (numero) {
            case 'A': return 11;
            case 'J':
            case 'Q':
            case 'K': return 10;
            default: return Number.parseInt(numero);
        }
    };
    const iniciarPartida = () => {
        do {
            nombreUsuario = prompt('Escriba el nombre');
        } while (nombreUsuario == null || !/^[A-Za-z]{2,}$/.test(nombreUsuario));
        nombreUsuario = nombreUsuario.charAt(0).toUpperCase().concat(nombreUsuario.substring(1).toLowerCase());
        if (nombreUsuarioPh != null) {
            nombreUsuarioPh.innerText = nombreUsuario;
        }
    };
    const barajarMazo = (mazo) => {
        const nuevoMazo = [...mazo];
        return nuevoMazo.sort((a, b) => Math.random() - 0.5);
    };
    for (let numero of numeros) {
        for (let figura of figuras) {
            mazo.push({ key: numero + figura, value: calcularValorCarta(numero) });
        }
    }
    const mazoBarajado = barajarMazo(mazo);
};
