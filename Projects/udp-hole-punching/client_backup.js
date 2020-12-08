// const PORT = 666
// const HOST = 'External IP'
const PORT = 3000
const HOST = '192.168.1.79'

const dgram = require('dgram');
const client1 = dgram.createSocket('udp4')
const client2 = dgram.createSocket('udp4')

client2.on('message', (data) => {
  console.log('received from point:::', data)
})

client1.on('message', (msg, { address, port }) => {
  try {
    const data = JSON.parse(msg.toString())
    console.log('Data received from server : ', data)
    console.log('Received %d bytes from %s:%d\n', msg.length, address, port)

    if (data.type === 'node') {
      const message = `message::: ${process.argv[2] || Math.floor(Math.random() * (10 ** 6))}`
      const [address, port] = data['hash'].split(':')

      setInterval(() => {
        console.log('sending to', `${address}:${port}`)

        client2.send(message, +port, '127.0.0.1', (err) => {
          console.log('errrrrrrrr', err)
          if (err) console.error('sending to point:', err)
        })
      }, 1500)
    }
  } catch (error) {
    console.log(error)
    console.log(msg.toString())
  }
})

client1.connect(PORT, HOST, (err) => {
  if (err) console.error('client.connect:', err)
  const message = Buffer.from('Hello world')

  client1.send(message, (err) => {
    if (err) console.error('sending to server:', err)
  });
});

const localPort = parseInt(10 ** 4 + Math.random() * 10 ** 4)

console.log('localPort', localPort)

client2.bind(localPort)