const Raspi = require('raspi-io').RaspiIO
const { Board, LCD } = require('johnny-five')

const board = new Board({
  io: new Raspi()
});

let lcd

board.on('ready', () => {
  console.log('Board is ready 🎉')

  lcd = new LCD({
    controller: 'LCD1602',
  });

  board.repl.inject({
    lcd
  })

  lcd.on()

  printText('Happy Monday', 2)

  lcd.useChar('smile');
  const symbols = Array(8).fill(':smile:')

  printText(symbols, 0, 1, false, 750)
  printText(symbols, 8, 1, true, 750)

  function printText(str, offset = 0, row = 0, reverse = false, delay = 500) {
    let i = 0
    const chars = [...str]
    const line = 15

    setInterval(() => {
      if (i < chars.length) {
        reverse ?
          lcd.cursor(row, line - i).print(chars[i]) :
          lcd.cursor(row, i + offset).print(chars[i])
        i++
      }
    }, delay)
  }
})

board.on('exit', () => {
  lcd.off()
})
