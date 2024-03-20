class Crono {

    constructor(display) {
        this.display = display;

        this.cent = 0,
        this.seg = 0, 
        this.min = 0,  
        this.timer = 0;  
    }

    tic() {
        this.cent += 1;

        if (this.cent == 100) {
        this.seg += 1;
        this.cent = 0;
        }

        if (this.seg == 60) {
        this.min = 1;
        this.seg = 0;
        }

        this.display.innerHTML = this.min + ":" + this.seg + ":" + this.cent
    }

    start() {
       if (!this.timer) {
          this.timer = setInterval( () => {
              this.tic();
          }, 10);
        }
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    reset() {
        this.cent = 0;
        this.seg = 0;
        this.min = 0;

        this.display.innerHTML = "0:0:0";
    }
}

const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset")
}

const crono = new Crono(gui.display);

gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}

gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
}

gui.reset.onclick = () => {
    console.log("Reset!");
    crono.reset();
}

const clave = ['1', '2', '3', '4'];
const digitosClave = document.querySelectorAll('.digitos');

document.querySelectorAll('.tecla').forEach(tecla => {
    tecla.addEventListener('click', function() {
        const teclaPresionada = this.textContent;
        if (clave.includes(teclaPresionada)) {
            const indice = clave.indexOf(teclaPresionada);
            digitosClave[indice].textContent = teclaPresionada;
            digitosClave[indice].style.color = 'green';
            if (clave.join('') === Array.from(digitosClave).map(digito => digito.textContent).join('')) {
                crono.stop();
            }
        }
    });
});