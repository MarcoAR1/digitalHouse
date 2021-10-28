import { actionMannager, actionInProgress } from './funcionesDeTareas.js'

if (!actionInProgress) console.log('ingresa una accion')
process.stdin.on('data', (data) => {
  const entrada = data.toString().trim()
  if (entrada === 'exit') process.exit()
  actionMannager(entrada)
})
