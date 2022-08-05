const ora = require('ora')
const chalk = require('chalk')
const stripAnsi = require('strip-ansi')

const spinner = ora()
let lastMsg = null

exports.logWithSpinner = (symbol, msg) => {
  if (!msg) {
    msg = symbol
    symbol = chalk.green('✔')
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    })
  }
  spinner.text = ' ' + msg
  lastMsg = {
    symbol: symbol + ' ',
    text: msg
  }
  spinner.start()
}

exports.stopSpinner = (persist) => {
  if (!spinner.isSpinning) {
    return
  }

  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    })
  } else {
    spinner.stop()
  }
  lastMsg = null
}

const format = (label, msg) => {
  return msg.split('\n').map((line, i) => {
    return i === 0
      ? `${label} ${line}`
      : line.padStart(stripAnsi(label).length + line.length + 1)
  }).join('\n')
}

const chalkTag = msg => chalk.bgBlackBright.white.dim(` ${msg} `)

exports.log = (msg = '', tag = null) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg)
}

exports.warn = (msg, tag = null) => {
  console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)))
}

exports.done = (msg, tag = null) => {
  console.log(format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg))
}

exports.clearConsole = title => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) {
      console.log(title)
    }
  }
}
