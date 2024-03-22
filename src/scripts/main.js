const sumar = document.querySelector('#sumar')
const display = document.querySelector('#display')
const restar = document.querySelector('#restar')
import {update} from './utils/cronogy.js'

sumar.addEventListener('click', ()=>{
  display.innerText = parseInt(display.innerText) + 1
})

restar.addEventListener('click', ()=>{
    display.innerText = parseInt(display.innerText) - 1
})
update.start()
