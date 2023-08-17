import {codeHighlighting} from './code-highlighting.js'

export function code(element, codeString = '', customStandardObjects, caretPosition = -1) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('Argument \'element\' is not a HTMLElement')
  }

  if (typeof codeString !== 'string') {
    throw new Error('Argument \'codeString\' is not a string')
  }

  if (typeof caretPosition !== 'number') {
    throw new Error('Argument \'caretPosition\' is not a number')
  }

  const lineNumbers = element.querySelector('.code__line-numbers')
  const codeContainer = element.querySelector('.code__code-container')

  lineNumbers.innerHTML = ''
  codeContainer.innerHTML = ''

  codeString = codeHighlighting(codeString, customStandardObjects)
  codeString = codeString.split(/\n\r?/g)

  caretPosition = caretPosition === -1 ? codeString.length : caretPosition

  codeString.forEach(function (line, index) {
    const lineNumber = document.createElement('p')
    const codeLine = document.createElement('p')

    lineNumber.classList.add('code__line-number')
    lineNumber.innerText = index + 1

    if (line === '') {
      line = '<br>'
    }

    codeLine.classList.add('code__code-line')
    codeLine.innerHTML = line

    if (caretPosition === index + 1) {
      lineNumber.classList.add('code__line-number_current')
      codeLine.classList.add('code__code-line_caret')
    }

    lineNumbers.appendChild(lineNumber)
    codeContainer.appendChild(codeLine)
  })
}

export function caretBlinking(element) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('Argument \'element\' is not a HTMLElement')
  }

  const caret = element.querySelector('.code__code-line_caret')

  caret.classList.add('code__code-line_caret-blinking')
}

export function caretUnfocus(element) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('Argument \'element\' is not a HTMLElement')
  }

  const caret = element.querySelector('.code__code-line_caret')

  caret.classList.add('code__code-line_caret-unfocus')
}
