//Variables y Objetos

var selectedDimensions = document.querySelector('#dimensiones').value;

const selectors = {
    gridContainer: document.querySelector('.grid-container'),
    tablero: document.querySelector('.tablero'),
    movimientos: document.querySelector('.movimientos'),
    timer: document.querySelector('.timer'),
    comenzar: document.querySelector('.comenzar'),
    reinicio: document.querySelector('.reinicio'),
    win: document.querySelector('.win'),
    dimensiones: document.querySelector('#dimensiones'),

}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null  
}

const resetGame = () => {
    state.gameStarted = false;
    state.flippedCards = 0;
    state.totalFlips = 0;
    state.totalTime = 0;
    clearInterval(state.loop);
    selectors.timer.textContent = "0 segundos";
    selectors.movimientos.textContent = "0 movimientos";
    selectors.gridContainer.classList.remove('flipped')
    selectors.comenzar.classList.remove('disabled')

    generateGame();
    attachEventListeners();
}

selectors.reinicio.onclick = () =>{
    resetGame();
} 


//Tablero
const generateGame = () => {
    let dimensions = selectors.dimensiones.value;


    //Dimensiones del tablero
    if (dimensions % 2 !== 0 || dimensions < 2 || dimensions > 6) {
        throw new Error("El número de dimensiones debe ser un número par mayor o igual a 2.");
    }

    //Imágenes que utilizaremos
    const imagenes = ['Real', '', '', '', '', '','' ,'','','']

    const picks = pickRandom(imagenes, (dimensions * dimensions) / 2)
    
    const items = shuffle([...picks, ...picks])
    
    //Colocar las imágenes en el tablero
    const cards = `
        <div class="tablero" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    
    `
    selectors.tablero.innerHTML = cards;
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = [] 

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)

        randomPicks.push(clonedArray[randomIndex])
        //Para no repetir imágenes en el tablero
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}


const shuffle = array => {
    const clonedArray = [...array]

    //Desordenamos las imágenes que hay en el tablero aleatoriamente
    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}


const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        
        //Al pulsar sobre una carta, mostrarla
        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent);
        //Comenzar el juego
        } else if (eventTarget.className == 'comenzar' && !eventTarget.className.includes('disabled')) {
            startGame();
        }else if (selectedDimensions != selectors.dimensiones.value && state.gameStarted == false){
            selectedDimensions = selectors.dimensiones.value;
            resetGame();
        }
    })
}

generateGame()

attachEventListeners()


const startGame = () => {
    state.gameStarted = true
    selectors.comenzar.classList.add('disabled')

    //Ponemos en marcha el juego
    state.loop = setInterval(() => {
        state.totalTime++

        selectors.movimientos.innerText = `${state.totalFlips} movimientos`
        selectors.timer.innerText = `tiempo: ${state.totalTime} sec`
    }, 1000)
}



const flipCard = card => {
    //Ir sumando 1 por cada vez que giramos una carta
    state.flippedCards++
    state.totalFlips++

    //Iniciar
    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    //Comprobación
    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        //Confirmamos la pareja
        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }

    //Comprobación de que si nos quedan cartas sin girar y sino dar la victoria
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.gridContainer.classList.add('flipped')
            //Estadísticas
            selectors.win.innerHTML = `
                <span class="win-text">
                    ¡¡¡¡Enhorabuena has ganado!!!!<br />
                    Tus movimientos han sido <span class="highlight">${state.totalFlips}</span> <br />
                    y con un tiempo de <span class="highlight">${state.totalTime}</span> segundos.
                </span>
                `
            clearInterval(state.loop)
        }, 1000)
    }
}


const flipBackCards = () => {
    //Motramos las parejas que no hemos conseguido acertar
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })
    state.flippedCards = 0
}