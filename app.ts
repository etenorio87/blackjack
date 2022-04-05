
interface ICarta {
    value: number,
    key: string
};

document.body.onload = () => {

    const nombreUsuarioPh = document.getElementById('usuario-nombre-ph');
    const btnNew = document.getElementById('btn-new');
    const btnCard = document.getElementById('btn-card');
    const btnStop = document.getElementById('btn-stop');
    const userCardsContainer = document.getElementById('user-cards');
    const userContPh = document.querySelector('#user-container small') as HTMLElement;
    const cpuCardsContainer = document.getElementById('cpu-cards');
    const cpuContPh = document.querySelector('#cpu-container small') as HTMLElement;

    const numeros: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const figuras: string[] = ['C', 'D', 'H', 'S'];
    const mazo: ICarta[] = [];
    
    let userValueCont = 0;
    let cpuValueCont = 0;

    let nombreUsuario: string | null;


    const turnoCPU = (): void => {

        do {
            const carta =  mazoBarajado.pop();
            if (carta) {
                const img = crearImagen(carta);
                cpuValueCont += carta.value;
                cpuCardsContainer?.appendChild(img);
                cpuContPh.innerText = cpuValueCont + '';
            }

        } while ( userValueCont <= 21 && cpuValueCont < userValueCont );

        setTimeout(() => {

            if ( (cpuValueCont > userValueCont && cpuValueCont <= 21) || userValueCont > 21 ) {
                alert('Usted ha perdido!');
            } else {
                alert('Usted ha ganado');
            }

            console.log( mazoBarajado );

        }, 300);

        

    }


    btnCard?.addEventListener('click', () => {
        const carta =  mazoBarajado.pop();
        if (carta) {
            const img = crearImagen(carta);
            userValueCont += carta.value;
            userCardsContainer?.appendChild( img );
            userContPh.innerText = userValueCont + '';
            console.log( userValueCont );

            if ( userValueCont > 21 ) {
                btnCard.setAttribute('disabled', '');
                turnoCPU();
            }
        }
        
    });

    btnStop?.addEventListener('click', () => {
        btnCard?.setAttribute('disabled', '');
        turnoCPU();
    });
    btnNew?.addEventListener('click', () => {
        iniciarPartida();
    });

    const crearImagen = (carta: ICarta): HTMLElement => {
        const img = document.createElement('img');
        img.className = 'gcard';
        img.src = `assets/img/cards/${carta.key}.png`;

        return img;
    }

    
    const calcularValorCarta = (numero: string): number => {

        switch (numero) {
            case 'A' : return 11;
            case 'J':
            case 'Q':
            case 'K': return 10;
            default : return Number.parseInt(numero);
        }
    }

    const iniciarPartida = () => {

        do {
            nombreUsuario = prompt('Escriba el nombre');
    
        } while (nombreUsuario == null || !/^[A-Za-z]{2,}$/.test(nombreUsuario));
    
        nombreUsuario = nombreUsuario.charAt(0).toUpperCase().concat( nombreUsuario.substring(1).toLowerCase() );
    
    
        if (nombreUsuarioPh != null) {
            nombreUsuarioPh.innerText = nombreUsuario as string;
        }

    }

    const barajarMazo = (mazo: ICarta[]): ICarta[] => {

        const nuevoMazo = [...mazo];
        return nuevoMazo.sort( (a: ICarta, b: ICarta): number => Math.random() - 0.5 );

    }

    

    

    for ( let numero of numeros ) {
    
        for (let figura of figuras) {

            mazo.push( { key: numero + figura, value: calcularValorCarta(numero) } );

        }

    }

   const mazoBarajado = barajarMazo(mazo);



};


