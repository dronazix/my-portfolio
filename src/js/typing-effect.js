export function typingEffect(originalString, delay, step, end = () => {}) {
  if (typeof originalString !== 'string') {
    throw new Error('Argument \'originalString\' is not a string')
  }

  if (typeof delay !== 'number') {
    throw new Error('Argument \'delay\' is not a number')
  }

  if (typeof step !== 'function') {
    throw new Error('Argument \'step\' is not a function')
  }

  if (typeof end !== 'function') {
    throw new Error('Argument \'end\' is not a function')
  }

  let string = ''
  let position = 0

  let lastTime = performance.now()

  function printString(currentTime) {
    if (currentTime > lastTime) {
      if (position < originalString.length) {
        string += originalString[position]

        step(string)

        position++
      } else {
        end()

        return
      }

      lastTime = currentTime + delay
    }

    requestAnimationFrame(printString)
  }

  requestAnimationFrame(printString)
}
