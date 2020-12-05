const PORT = 3000
const HOST = '192.168.1.84' // internal IP

const clients = []
const clientHashes = new Set()

function getHash(address, port) {
  return `${address}:${port}`
}

const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('listening', function() {
  const address = server.address()
  console.log('UDP Server listening on ' + address.address + ':' + address.port)
});

server.on('message', function(message, remote) {
  const { address, port } = remote
  console.log(address + ':' + port + ' - ' + message)
  const hash = getHash(address, port)

  if (!clientHashes.has(hash)) {
    clients.push({
      address,
      port,
    })
    clientHashes.add(hash)
  }

  clients.forEach(client => {
    server.send(message, client.port, client.address, function(error) {
      if (error) {
        console.error(error)
      } else {
        console.log(`Data sent to ${client.address}:${client.port}`)
      }
    })
  })
})

server.bind(PORT, HOST);