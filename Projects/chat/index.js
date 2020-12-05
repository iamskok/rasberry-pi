var http = require('http')
var socketio = require('socket.io')
var fs = require('fs');

const server = http.createServer((_, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8'
  })

  fs.readFile('./index.html', (error, html) => {
    if (error) {
      throw error
    }
    response.end(html)
  })
})

const io = socketio(server)

io.on('connection', function (socket) {
  console.log('new connection')
  socket.on('message', function (data) {
    console.log(data)
    io.emit('message', data)
  })
})

server.listen(3000)
