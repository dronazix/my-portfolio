export function errorHandler(response) {
  if (response.ok) {
    return response
  } else {
    const error = new Error(response.statusText)

    error.status = response.status
    error.response = response

    throw error
  }
}
