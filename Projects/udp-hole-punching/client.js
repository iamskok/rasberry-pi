const PORT = 5050
const HOST = 'External IP'

const dgram = require('dgram');
const client = dgram.createSocket('udp4')

client.on('message', (msg) => {
  try {
    const data = JSON.parse(msg.toString())

    if (data.type === 'node') {
      const message = JSON.stringify({
        type: 'p2p',
        text: `message::: ${process.argv[2] || Math.floor(Math.random() * (10 ** 6))}`,
      })
      const [address, port] = data['hash'].split(':')

      setInterval(() => {
        console.log('sending to', `${address}:${port}`)

        client.send(message, +port, '127.0.0.1', (err) => {
          if (err) console.error('sending to point:', err)
        })
      }, 500 + Math.random() * 3000)
    } else if (data.type === 'p2p') {
      console.log('\x1b[36m%s\x1b[0m', data.text)
    }
  } catch (error) {
    console.log(error)
    console.log(msg.toString())
  }
})

client.send(Buffer.from('Hello world'), PORT, HOST, (err) => {
  if (err) console.error('sending to server:', err)
});
