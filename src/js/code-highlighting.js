/* my javascript code highlighting v1.0 */

const KEYWORDS = [
  'abstract',
  'arguments',
  'await',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'const',
  'continue',
  'constructor',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'eval',
  'false',
  'final',
  'finally',
  'float',
  'from',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'in',
  'instanceof',
  'int',
  'interface',
  'let',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
  'yield',
  'class',
  'enum',
  'export',
  'extends',
  'import',
  'super',
  'of'
]
const OPERATORS = [
  '\\+=',
  '\\+\\+',
  '\\+',
  '-=',
  '--',
  '-',
  '\\*=',
  '\\*\\*',
  '\\*',
  '\\/=',
  '\\/',
  '&=',
  '&&',
  '&',
  '!==',
  '!=',
  '!',
  '=>',
  '===',
  '==',
  '=',
  '>>=',
  '<<=',
  '>>>=',
  '\\^=',
  '\\^',
  '\\|=',
  '\\|\\|',
  '\\|',
  '<=',
  '<<',
  '<',
  '>=',
  '>>>',
  '>>',
  '>',
  '%',
  '~',
  '\\?',
  ',',
  ':'
]
const BRACKETS = [
  '\\[',
  '\\]',
  '\\(',
  '\\)',
  '\\{',
  '\\}'
]
const STANDARD_OBJECTS = [
  'Object',
  'Function',
  'Boolean',
  'Symbol',
  'Error',
  'AggregateError',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
  'InternalError',
  'Number',
  'BigInt',
  'Math',
  'Date',
  'String',
  'RegExp',
  'Array',
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Int32Array',
  'Uint32Array',
  'BigInt64Array',
  'BigUint64Array',
  'Float32Array',
  'Float64Array',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'DataView',
  'Atomics',
  'JSON',
  'WeakRef',
  'FinalizationRegistry',
  'Iterator',
  'AsynIterator',
  'Prmoise',
  'GeneratorFunction',
  'AsyncGeneratorFunction',
  'Generator',
  'AsyncGenerator',
  'AsyncFunction',
  'Reflect',
  'Proxy'
]

const SPEC = {
  COMMENT: 'COMMENT',
  STRING: 'STRING',
  KEYWORD: 'KEYWORD',
  OPERATOR: 'OPERATOR',
  BRACKET: 'BRACKET',
  DOT: 'DOT',
  DIGIT: 'DIGIT',
  STANDARD_OBJECT: 'STANDARD_OBJECT',
  CUSTOM_STANDARD_OBJECT: 'CUSTOM_STANDARD_OBJECT',
  CLASS_NAME: 'CLASS_NAME',
  FUNCTION_NAME: 'FUNCTION_NAME'
}

const REGEX_MULTILINE_COMMENT = /\/\*[\s\S]*?(?:\*\/|$)/g
const REGEX_COMMENT = /\/\/[^\n]*/g
const REGEX_STRING = /'(?:\\'|[^'\n])*'?|"(?:\\"|[^"\n])*"?|`(?:\\`|[^`])*`?/g
const REGEX_KEYWORD = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g')
const REGEX_OPERATOR = new RegExp(`(${OPERATORS.join('|')})`, 'g')
const REGEX_BRACKET = new RegExp(`(${BRACKETS.join('|')})`, 'g')
const REGEX_DOT = /(?<!\d)(\.)(?!\d)/g
const REGEX_DIGIT = /(\b\d+\.\d*|\.\d+|\b\d+)/g
const REGEX_SPEC_STRING = new RegExp(specString(`(${Object.values(SPEC).join('|')})`, '(\\S+?)'), 'g')
const REGEX_WHITESPACE = /[^\S\t\n\r]/g
const REGEX_NEWLINE = /\n\r?/g
const REGEX_STANDARD_OBJECT = new RegExp(`\\b(${STANDARD_OBJECTS.join('|')})\\b`, 'g')
const REGEX_CLASS_NAME = /(class\s+)((:?[^\d\W]|\$)[\w\$]*)/g
const REGEX_FUNCTION_NAME = /((?:[^\d\W]|\$)[\w\$]*)(\s*\()/g

const CLASS_PREFIX = 'CH'
const HTML_HIGHLIGHTING_CLASSES = {
  [SPEC.COMMENT]: `${CLASS_PREFIX}-comment`,
  [SPEC.STRING]: `${CLASS_PREFIX}-string`,
  [SPEC.KEYWORD]: `${CLASS_PREFIX}-keyword`,
  [SPEC.OPERATOR]: `${CLASS_PREFIX}-operator`,
  [SPEC.BRACKET]: `${CLASS_PREFIX}-bracket`,
  [SPEC.DOT]: `${CLASS_PREFIX}-dot`,
  [SPEC.DIGIT]: `${CLASS_PREFIX}-digit`,
  [SPEC.STANDARD_OBJECT]: `${CLASS_PREFIX}-standard-object`,
  [SPEC.CUSTOM_STANDARD_OBJECT]: `${CLASS_PREFIX}-custom-standard-object`,
  [SPEC.CLASS_NAME]: `${CLASS_PREFIX}-class-name`,
  [SPEC.FUNCTION_NAME]: `${CLASS_PREFIX}-function-name`
}

const WHITESPACE_CHAR = '&nbsp;'
const HTML_TAG = 'span'

function specString(label, data) {
  return `@___${label}__${data}___@`
}

function toHTML(className, content) {
  return `<${HTML_TAG} class="${className}">${content}</${HTML_TAG}>`
}

function maskCommentsInString(codeString) {
  return codeString
    .replace(REGEX_STRING, function (match) {
      return match
        .replace('//', '@@___DOUBLE_SLASH___@@')
        .replace('/*', '@@___SLASH_ASTERISK___@@')
        .replace('*/', '@@___ASTERISK_SLASH___@@')
    })
}

function unmaskCommentsInString(codeString) {
  return codeString
    .replace(REGEX_STRING, function (match) {
      return match
        .replace('@@___DOUBLE_SLASH___@@', '//')
        .replace('@@___SLASH_ASTERISK___@@', '/*')
        .replace('@@___ASTERISK_SLASH___@@', '*/')
    })
}

function cutCommentsIntoArray(comments, codeString) {
  const replacer = (match) => specString(SPEC.COMMENT, comments.push(match) - 1)

  return codeString
    .replace(REGEX_MULTILINE_COMMENT, replacer)
    .replace(REGEX_COMMENT, replacer)
}

function cutStringsIntoArray(strings, codeString) {
  return codeString
    .replace(REGEX_STRING, (match) => specString(SPEC.STRING, strings.push(match) - 1))
}

function replaceCustomStandardObjectsWithSpecStrings(codeString, customStandardObjects) {
  if (customStandardObjects && customStandardObjects.length) {
    const regexCustomStandardObject = new RegExp(`\\b(${customStandardObjects.join('|')})\\b`, 'g')

    return codeString
      .replace(regexCustomStandardObject, (match, p1) => specString(SPEC.CUSTOM_STANDARD_OBJECT, p1))
  }

  return codeString
}

function replaceFunctionNamesWithSpecStrings(codeString) {
  return codeString
    .replace(REGEX_FUNCTION_NAME, function (match, p1, p2) {
      if (KEYWORDS.indexOf(p1) > -1) {
        return match
      }

      return specString(SPEC.FUNCTION_NAME, p1) + p2
    })
}

function replaceClassNamesWithSpecStrings(codeString) {
  return codeString
    .replace(REGEX_CLASS_NAME, (match, p1, p2) => p1 + specString(SPEC.CLASS_NAME, p2))
}

function replaceKeywordsWithSpecStrings(codeString) {
  return codeString
    .replace(REGEX_KEYWORD, (match, p1) => specString(SPEC.KEYWORD, p1))
}

function replaceOperatorsWithSpecStrings(codeString) {
  return codeString
    .replace(REGEX_OPERATOR, (match, p1) => specString(SPEC.OPERATOR, p1))
}

function replaceBracketsWithSpecStrings(codeString) {
  return codeString
    .replace(REGEX_BRACKET, (match, p1) => specString(SPEC.BRACKET, p1))
}

function replaceDotsWithSpecStrings(codeString) {
  return codeString
    .replace(REGEX_DOT, (match, p1) => specString(SPEC.DOT, p1))
}

function replaceDigitsWithSpecStrings(codeString) {
  return codeString
    .replace(REGEX_DIGIT, (match, p1) => specString(SPEC.DIGIT, p1))
}

function replaceStandardObjectsWithSpecStrings(codeString) {
  return codeString
    .replace(REGEX_STANDARD_OBJECT, (match, p1) => specString(SPEC.STANDARD_OBJECT, p1))
}

function replaceWhitespaces(codeString) {
  return codeString.replace(REGEX_WHITESPACE, WHITESPACE_CHAR)
}

function replaceSpacesInComments(comments) {
  return comments
    .map((comment) => comment.replace(REGEX_WHITESPACE, WHITESPACE_CHAR))
}

function replaceSpacesInStrings(strings) {
  return strings
    .map((string) => string.replace(REGEX_WHITESPACE, WHITESPACE_CHAR))
}

function wrapCommentsInHTML(comments) {
  return comments
    .map(function (comment) {
      if (comment.startsWith('/*')) {
        return comment
          .split(REGEX_NEWLINE)
          .map(function (line) {
            if (line === '') {
              return line
            }

            return toHTML(HTML_HIGHLIGHTING_CLASSES[SPEC.COMMENT], line)
          })
          .join('\n')
      } else {
        return toHTML(HTML_HIGHLIGHTING_CLASSES[SPEC.COMMENT], comment)
      }
    })
}

function wrapStringsInHTML(strings) {
  return strings
    .map(function (string) {
      if (string.startsWith('`')) {
        return string
          .split(REGEX_NEWLINE)
          .map(function (line) {
            if (line === '') {
              return line
            }

            return toHTML(HTML_HIGHLIGHTING_CLASSES[SPEC.STRING], line)
          })
          .join('\n')
      } else {
        return toHTML(HTML_HIGHLIGHTING_CLASSES[SPEC.STRING], string)
      }
    })
}

function insertCommentsAndStringsFromArrays(comments, strings, codeString) {
  return codeString
    .replace(REGEX_SPEC_STRING, function (match, p1, p2) {
      if (p1 === SPEC.COMMENT) {
        return comments[p2]
      }

      if (p1 === SPEC.STRING) {
        return strings[p2]
      }

      return match
    })
}

function specStringsToHTML(codeString) {
  return codeString
    .replace(REGEX_SPEC_STRING, function (match, p1, p2) {
      return toHTML(HTML_HIGHLIGHTING_CLASSES[p1], p2)
    })
}

export function codeHighlighting(codeString = '', customStandardObjects = []) {
  if (typeof codeString !== 'string') {
    throw new Error('Argument \'codeString\' is not a string')
  }

  let comments = []
  let strings = []

  codeString = maskCommentsInString(codeString)
  codeString = cutCommentsIntoArray(comments, codeString)
  codeString = unmaskCommentsInString(codeString)
  codeString = cutStringsIntoArray(strings, codeString)

  codeString = replaceCustomStandardObjectsWithSpecStrings(codeString, customStandardObjects)

  codeString = replaceFunctionNamesWithSpecStrings(codeString)
  codeString = replaceClassNamesWithSpecStrings(codeString)
  codeString = replaceKeywordsWithSpecStrings(codeString)
  codeString = replaceStandardObjectsWithSpecStrings(codeString)
  codeString = replaceOperatorsWithSpecStrings(codeString)
  codeString = replaceBracketsWithSpecStrings(codeString)
  codeString = replaceDotsWithSpecStrings(codeString)
  codeString = replaceDigitsWithSpecStrings(codeString)
  codeString = replaceWhitespaces(codeString)

  comments = replaceSpacesInComments(comments)
  comments = wrapCommentsInHTML(comments)
  strings = replaceSpacesInStrings(strings)
  strings = wrapStringsInHTML(strings)

  codeString = insertCommentsAndStringsFromArrays(comments, strings, codeString)
  codeString = specStringsToHTML(codeString)

  return codeString
}
