import suma from './suma.js'
import resta from './resta.js'
import multiplicacion from './multiplicacion.js'
import division from './division.js'
import modulo from './modulo.js'
import potencia from './potencia.js'

process.stdin.on("data",(data) => {
    const operator = data.toString().trim()
    const separator = operator.split(" ")

    if(separator[1] === "+") console.log(suma((+separator[0]), +separator[2]))

    if(separator[1] === "-") console.log(resta((+separator[0]), +separator[2]))

    if(separator[1] === "*") console.log(multiplicacion((+separator[0]), +separator[2]))

    if(separator[1] === "/") console.log(division((+separator[0]), +separator[2]))

    if(separator[1] === "%") console.log(modulo((+separator[0]), +separator[2]))

    if(separator[1] === "**") console.log(potencia((+separator[0]), +separator[2]))

})
