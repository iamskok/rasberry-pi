const Raspi = require('raspi-io').RaspiIO
const { Board, Led, Button } = require("johnny-five")

const board = new Board({
  io: new Raspi()
});

let red, green, button

board.on('ready', () => {
  console.log('Board is ready 🎉')

  red = new Led('P1-11')
  green = new Led('P1-12')
  button = new Button({
    pin: 'P1-13',
    isPullup: true,
    holdtime: 1000
  })

  const state = {
    color: 'red',
    isOn: false,
    isBlocked: false,
  }


  board.repl.inject({
    green,
    red,
    button,
  })

  button.on("up", function() {
    console.log("up")
    if (!state.isBlocked) {
      state.isOn = !state.isOn
    } else {
      state.isBlocked = false
    }
    update(state)
  });

  button.on("hold", function() {
    console.log("hold")
    if (state.isOn) {
      state.color = state.color === 'red' ? 'green' : 'red'
      state.isBlocked = true
      update(state)
    }
  })

  function update({ isOn, color }) {
    if (isOn) {
      color === 'red' ?
        red.on() && green.off() :
        green.on() && red.off()
    } else {
      red.off()
      green.off()
    }
  }
})

board.on('exit', () => {
  red.stop().off()
  green.stop().off()
})