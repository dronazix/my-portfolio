import {deleteAsync} from 'del'

export function createClean() {
  function clean() {
    return deleteAsync('build')
  }

  return clean
}
