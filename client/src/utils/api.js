/** External libs */
import axios from 'axios'
/** Internal libs */
import ApiLogger from '/utils/apiLogger'
import { LOCAL_STORAGE_KEY, APP_ROUTES } from '/utils/globals'
import { deserializeDataFromStorageOf, removeDataFromStorageOf } from '/utils/storage'

export const apiGet = async (...args) => await axios.get(...args)

export const apiPost = async (...args) => await axios.post(...args)

export const apiPut = async (...args) => await axios.put(...args)

export const apiPatch = async (...args) => await axios.put(...args)

export const apiDelete = async (...args) => await axios.put(...args)

/** Helper function to get auth headers */
function _getAuthHeaders () {
  const { token = '' } = deserializeDataFromStorageOf(LOCAL_STORAGE_KEY.IDENTITY) || {}
  const headers = {
    authorization: `Bearer ${token}`
  }
  return headers
}

export const apiGetWithAuth = async (...args) => {
  const headers = _getAuthHeaders()
  const oldOptions = args[1] || {}
  const nextOptions = {
    ...oldOptions
  }
  if (nextOptions.headers) {
    nextOptions.headers = {
      ...nextOptions.headers,
      ...headers
    }
  } else {
    nextOptions.headers = headers
  }
  args[1] = nextOptions
  return await axios.get(...args)
}
export const apiPostWithAuth = (...args) => {
  throw new Error('Non implemented')
}
export const apiPutWithAuth = (...args) => {
  throw new Error('Non implemented')
}
export const apiPatchWithAuth = (...args) => {
  throw new Error('Non implemented')
};
export const apiDeleteWithAuth = (...args) => {
  throw new Error('Non implemented')
}

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  const { config: { url }, request } = response
  const { status } = response
  ApiLogger.debug({ status, url, res: response, req: request, collapsed: true })
  return response
}, function (error) {
  const { config: { url } } = error
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  if (error.response) {
    const { status } = error.response
    ApiLogger.debug({ status, url, res: error.response, req: error.request, collapsed: true })
    if (status === 401) {
      try {
        removeDataFromStorageOf(LOCAL_STORAGE_KEY.IDENTITY)
      } catch (e) {
        console.log(e)
      } finally {
        window.location = APP_ROUTES.SIGN_IN
      }
    }
  } else {
    ApiLogger.debug({ error, url, collapsed: true })
  }

  return Promise.reject(error)
})
