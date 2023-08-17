export function json(response) {
  const contentType = response.headers.get('content-type')

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json()
  } else {
    throw new Error('This response is not a json object')
  }
}
