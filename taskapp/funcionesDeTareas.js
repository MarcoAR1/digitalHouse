import * as fs from 'fs'
const tareas = JSON.parse(fs.readFileSync('./tareas.json', 'utf-8'))
const input = process.argv[2]
export let actionInProgress = null

const insertTitleAndState = {
  title: false,
  state: false,
}
const task = {
  title: null,
  state: null,
}
export const addTask = (task, action) => {
  actionInProgress = 'agregar'
  if (!task.title && !insertTitleAndState.title) {
    console.log('ingresa un titulo')
    insertTitleAndState.title = true
    return
  }
  if (insertTitleAndState.title) {
    task.title = action
    insertTitleAndState.title = false
  }
  if (!task.state && task.title && !insertTitleAndState.state) {
    console.log('ingresa un estado')
    insertTitleAndState.state = true
    return
  }
  if (insertTitleAndState.state) {
    task.state = action
    insertTitleAndState.state = false
  }

  if (task.title && task.state) {
    tareas.push({ ...task })
    escribirJson(tareas)
    console.log(task)
    console.log('tarea agregada')
    task.title = null
    task.state = null
    actionInProgress = null
  }
}

const filtrarPorEstado = (estado) => {
  if (process.argv[3]) {
    process.argv[3] = null
    return console.log(tareas.filter((e) => e.state === estado))
  }
  if (actionInProgress) {
    actionInProgress = null
    return console.log(tareas.filter((e) => e.state === estado))
  }
  actionInProgress = 'filtrar'
  console.log('ingresa estado para filtrar')
}

export const deleteTask = (action) => {
  if (actionInProgress) {
    const index = tareas.findIndex((task) => task.title === action)
    if (index !== -1) return console.log('tarea no encontrada')
    tareas.splice(index, 1)
    escribirJson(tareas)
    console.log('tarea eliminada')
    actionInProgress = null
    return
  }

  console.log('introdusca el titulo de la task a borrar')
  actionInProgress = 'borrar'
}

export const showTask = () => console.log(tareas)

const escribirJson = (tareas) =>
  fs.writeFileSync('./tareas.json', JSON.stringify(tareas))

export const actionMannager = (action, texto) => {
  const currentAction = actionInProgress || action
  if (currentAction === 'agregar')
    return addTask(task, action, process.argv[3] || texto)
  if (currentAction === 'listar') return showTask(action)
  if (currentAction === 'borrar')
    return deleteTask(action, process.argv[3] || texto)
  if (currentAction === 'filtrar')
    return filtrarPorEstado(process.argv[3] || action)
  if (!currentAction)
    return console.log('Atención - Tienes que pasar una acción.')
  return console.log('No entiendo que quieres hacer')
}

actionMannager(input)
