import {
  MAX_REQUEST_ATTEMPTS,
  API_URL,
  MANIFEST_FILE_NAME,
  defaultManifest,
  REQUEST_DELAY
} from './constants.js'
import {errorHandler} from './error-handler.js'
import {json} from './json.js'
import {wait} from './wait.js'

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

export function getManifestFromRepos(username = '') {
  let attempts = MAX_REQUEST_ATTEMPTS

  const request = () => fetch(`${API_URL}/users/${username}/repos`)
    .then(errorHandler)
    .then(json)
    .then(function (repos) {
      const trees = repos.map(function (repo) {
        const url = `${API_URL}/repos/${repo.owner.login}/${repo.name}/git/trees/${repo.default_branch}`

        return fetch(url)
          .then(errorHandler)
          .then(json)
          .then((tree) => (tree.__created_at = repo.created_at, tree))
      })

      return Promise.all(trees)
    })
    .then(function (trees) {
      const blobs = trees.filter(function (tree) {
        tree.tree = tree.tree.filter((blob) => blob.path === MANIFEST_FILE_NAME)

        return tree.tree.length
      }).map(function (tree) {
        return fetch(tree.tree[0].url)
          .then(errorHandler)
          .then(json)
          .then((blob) => (blob.__created_at = tree.__created_at, blob))
      })

      return Promise.all(blobs)
    })
    .then(function (blobs) {
      const manifests = blobs.map(function (blob) {
        try {
          const manifest = JSON.parse(b64DecodeUnicode(blob.content))

          return (manifest.created_at = new Date(blob.__created_at), manifest)
        } catch {
          return null
        }
      }).filter((manifest) => manifest)
        .map((manifest) => Object.assign({}, defaultManifest, manifest))

      return manifests.length ? manifests : null
    })
    .catch(function (error) {
      if (!attempts--) {
        throw error
      }

      return wait(REQUEST_DELAY).then(request)
    })

  return request()
}
