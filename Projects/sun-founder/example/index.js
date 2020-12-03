const Raspi = require('raspi-io').RaspiIO
const { Board } = require("johnny-five")

const board = new Board({
  io: new Raspi()
});

board.on('ready', () => {
  console.log('Board is ready 🎉')

  board.repl.inject({
    // component
  })
})
