const { exec } = require('child_process')

const PORT = 666
const HOST = 'External IP'

const dgram = require('dgram');
const message = Buffer.from('My KungFu is Good!');

const client = dgram.createSocket('udp4');

client.on('message',function(msg,info) {
  exec(`osascript -e 'display notification "${msg.toString()}" with title "This is the title"'`, (error) => {
    if (error) throw error
  })

  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

client.connect(PORT, HOST, (err) => {
  if (err) console.error('client.connect:', err)
  client.send(message, (err) => {
    if (err) console.error('client.send:', err)
  });
});
