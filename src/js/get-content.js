import {
  MAX_REQUEST_ATTEMPTS,
  CONTENT_URL,
  defaultContent,
  REQUEST_DELAY
} from './constants.js'
import {errorHandler} from './error-handler.js'
import {json} from './json.js'
import {wait} from './wait.js'

export function getContent() {
  let attempts = MAX_REQUEST_ATTEMPTS

  const request = () => fetch(CONTENT_URL)
    .then(errorHandler)
    .then(json)
    .then((content) => Object.assign({}, defaultContent, content))
    .catch(function (error) {
      if (!attempts--) {
        throw error
      }

      return wait(REQUEST_DELAY).then(request)
    })

  return request()
}
