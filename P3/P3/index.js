//Javascript


//Coordenadas del proyectil
let xop = 8;
let yop = 350;
let xp = xop;
let yp = yop;
let ldx = 55; 
let ldy = 55; 
let pcolor = 'blue' 

//Coordenadas del objetivo
let xomin = 225;
let xomax = 775;
let xo = getRandomInt(xomin, xomax);
let yo = 370;
let ocolor = 'red';


//Display
const display = document.getElementById("display");  //Cronometro
const display1 = document.getElementById("display1");  //Ángulo de disparo
const display2 = document.getElementById("display2");  //Velocidad de disparo
const mensaje = document.getElementById("mensaje"); //Mensaje de victoria o derrota

const crono = new Crono(display);
const botonLanzar = document.getElementById("botonLanzar");
const botonIniciar = document.getElementById("botonIniciar");
const canvas = document.getElementById("ctiro");


canvas.width = 800;
canvas.height = 400;


const ctx = canvas.getContext("2d");

obt_coord = getRandomInt(xomin,xomax);

dibujarO(xo,yo); 

//Proyectil
dibujarP(xop, yop, ldx, ldy, pcolor);
angulo.oninput = () => {
    display1.innerHTML = angulo.value;
    angle = angulo.value;
}

velocidad.oninput = () => {
    display2.innerHTML = velocidad.value;
    velp = 0.1*velocidad.value;
}

let t=0;
//Función principales:
function lanzar() 
{
    g = 0.1*9.8;
    
    velx = velp*Math.cos((angle*Math.PI)/180); //Eje x
    vely = velp*Math.sin((angle*Math.PI)/180); //Eje y

    xp = xp + velx*t;
    yp = yp - vely*t + 0.5*g*t*t;
     
    t += 0.1;

    //Posiciones:
    iniciorangox = xo - 60;
    finrangox = xo + 60;
    rangox = (xp >= iniciorangox && xp <= finrangox);
    iniciorangoy = yo-20;
    finrangoy = yo+20;
    rangoy = (yp >= iniciorangoy && yp <= finrangoy);
    
    if (rangox && rangoy) {
        console.log('holaa buenass');
        crono.stop();
        alert("¡¡¡¡INCREÍBLE, VAYA PUNTERÍA!!!!");
        mensaje.innerHTML = "¡ENHORABUENA! Pulse Inciar si quiere seguir jugando"
        cancelAnimationFrame(repetir);
        return;
        
        
    }else if (!(rangox) && rangoy) {

        console.log('Hasta pronto...');
        crono.stop();
        alert("¡QUÉ PENA, INTENTALO DE NUEVO!");
        mensaje.innerHTML = "Pulse Inciar si quiere seguir jugando"
        cancelAnimationFrame(repetir);
        return;

    }     

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarO(xo,yo);
    ldx = 51;
    ldy = 51;
    pcolor = 'black';
    dibujarP(xp, yp, ldx, ldy, pcolor); 
    setInterval(dibujarP)

    repetir = requestAnimationFrame(lanzar);
    
}

//Funciones para el rectángulo
function dibujarP(x,y,lx,ly,pcolor) {

    ctx.beginPath();
    ctx.rect(x, y, lx, ly);
    ctx.strokeStyle = pcolor;
    ctx.lineWidth = 2;
    ctx.fillStyle = pcolor;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


//Funciones para el objetivo
function dibujarO(x,y) {

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.fillStyle = ocolor;
    ctx.fill()    
    ctx.stroke();
    ctx.closePath();
}


//Posición del objetivo
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//Función para el botón Lanzar
botonLanzar.onclick = () => {
    lanzar();
    crono.start();
}

//Función para el botón iniciar
botonIniciar.onclick = () => {
    location.reload();
    crono.stop();
    crono.reset();
}