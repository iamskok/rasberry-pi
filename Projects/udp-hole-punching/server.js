const PORT = 3000
// const HOST = '192.168.1.84' // internal IP
const HOST = '192.168.1.78'

const dgram = require('dgram')
const server = dgram.createSocket('udp4')

const clients = []
const clientHashes = new Set()

server.on('listening', () => {
  const { address, port } = server.address()

  console.log('UDP Server listening on ' + address + ':' + port)
})

server.on('message', (message, remote) => {
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

  console.log('LENGTH', clients.length)

  if (clients.length === 2) {
    for (let i = 0; i < clients.length; i++) {
      const hash = getHash(clients[i].address, clients[i].port)
      console.log('i', i, hash)
      const data = JSON.stringify({
        type: 'node',
        hash
      })
      for (let j = 0; j < clients.length; j++) {
        const itemHash = getHash(clients[j].address, clients[j].port)
        console.log('j', j, itemHash)
        console.log('itemHash === hash', itemHash === hash)

        if (itemHash === hash) continue

        const port = clients[j].port
        const address = clients[j].address
        console.log('before send', port, address)

        server.send(data, port, address, (error) => {
          if (error) {
            console.error(error)
          } else {
            console.log(`Data sent to ${address}:${port}`)
          }
        })
      }
    }
  }
})

function getHash(address, port) {
  return `${address}:${port}`
}

server.bind(PORT, HOST)