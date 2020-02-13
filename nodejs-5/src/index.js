//const server = require('./server')
const fs = require('fs')
const JSONfile = fs.readFileSync('../imdb-movies.json', 'utf-8')

let filmes = JSON.parse(JSONfile)

const randomMovie = () => Math.floor(Math.random() * filmes.filter(encontrar => encontrar.Director).map(film => film.Title))

console.log(randomMovie())

//server.start()
