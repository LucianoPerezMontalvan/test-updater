const sumar = document.querySelector('#sumar')
const display = document.querySelector('#display')
const restar = document.querySelector('#restar')
const {SerialPort} = require('serialport')

sumar.addEventListener('click', ()=>{
  display.innerText = parseInt(display.innerText) + 1
})

restar.addEventListener('click', ()=>{
    display.innerText = parseInt(display.innerText) - 1
})
console.log(SerialPort);
const port = new SerialPort({path: '/dev/ttyACM0', baudRate: 9600})