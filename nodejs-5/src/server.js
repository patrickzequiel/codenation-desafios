const express = require('express')
const app = express()

app.get('/v1/movie', async (req, res, next) => {
  const random = Math.floor(Math.random() * (1000 - 1) - 1)
  const movie = fileJson.find(item => item.Rank === random)
  res.json({director: movie.Director, movie: movie.Title })

})

app.get('/v1/movie/:director', async (req, res, next) => {
  res.status(501).send('Not Implemented')
})

const start = async (port = 8080) => {
  app.listen(port, function () {
    console.info('%s listening at port %s', app.name, port)
  })
}

const stop = () => {
  app.close(() => {
    console.info('App Stopped')
  })
}

module.exports = {
  app,
  start,
  stop
}
