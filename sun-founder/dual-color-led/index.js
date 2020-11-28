const Raspi = require('raspi-io').RaspiIO
const { Board, Led } = require("johnny-five")

const board = new Board({
  io: new Raspi()
});

let red, green

board.on('ready', () => {
  console.log('Board is ready 🎉')

  red = new Led('P1-11')
  green = new Led('P1-12')

  board.repl.inject({
    green,
    red
  })

  green.blink()

  // 1. Alternate LED blinking
  // const state = {
  //   red: 0,
  //   green: 1,
  // }

  // board.loop(1000, () => {
  //   board.digitalWrite('P1-11', state.red ^= 1)
  //   board.digitalWrite('P1-12', state.green ^= 1)
  // })

  // 2. Single LED animation
  // red.pulse({
  //   easing: 'linear',
  //   duration: 4000,
  //   cuePoints: [0, 0.5, 0.55, 0.6, 0.65, 0.7, 0.85, 1.0],
  //   keyFrames: [50, 50, 150, 50, 150, 50, 250, 50],
  //   onstop() {
  //     console.log('Red led animation stopped');
  //   }
  // });

  // 3. Fade in and fade out
  // board.loop(1300, () => {
  //   red.fadeIn()
  //   green.fadeOut()
  // })

  // board.loop(1700, () => {
  //   red.fadeOut()
  //   green.fadeIn()
  // })
})

board.on('exit', () => {
  red.stop().off()
  green.stop().off()
})