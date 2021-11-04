require('dotenv').config()
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

const htmlViews = fs.readdirSync(path.join(__dirname, './DH-Heroes/view'))

app.use(express.static(path.join(__dirname, '/DH-Heroes/public')))

htmlViews.forEach((view) => {
  const currentPath = view.split('.')[0]
  app.get(`/${currentPath === 'index' ? '' : currentPath}`, (req, res) => {
    res.sendFile(path.join(__dirname, `./DH-Heroes/view/${view}`))
  })
})

{
  // app.get('/babbage', (req, res) => {
  //   res.sendFile(path.join(__dirname, './view/babbage.html'))
  // })
  // app.get('/berners-lee', (req, res) => {
  //   res.sendFile(path.join(__dirname, './view/berners-lee.html'))
  // })
  // app.get('/clarke', (req, res) => {
  //   res.sendFile(path.join(__dirname, './view/clarke.html'))
  // })
  // app.get('/hamilton', (req, res) => {
  //   res.sendFile(path.join(__dirname, './view/hamilton.html'))
  // })
  // app.get('/hopper', (req, res) => {
  //   res.sendFile(path.join(__dirname, './view/hopper.html'))
  // })
  // app.get('/lovelace', (req, res) => {
  //   res.sendFile(path.join(__dirname, './view/lovelace.html'))
  // })
  // app.get('/lovelace', (req, res) => {
  //   res.sendFile(path.join(__dirname, './view/lovelace.html'))
  // })
  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, './view/index.html'))
  // })
}

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT)
})

