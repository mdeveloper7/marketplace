/** Internal libs */
import { LOCAL_STORAGE_PREFIX } from '/utils/globals'

export const deserializeDataFromStorageOf = (key) => {
  try {
    console.log(`${LOCAL_STORAGE_PREFIX}:${key}`)
    const page = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}:${key}`)
    if (page) {
      return JSON.parse(page).data
    }
    return null
  } catch (e) {
    console.log(e)
  }
}

export const serializeDataToStorageOf = (key, data) => {
  const page = {
    data
  }
  try {
    return localStorage.setItem(`${LOCAL_STORAGE_PREFIX}:${key}`, JSON.stringify(page))
  } catch (e) {
    console.log(e)
  }
}

export const removeDataFromStorageOf = (key) => {
  try {
    return localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}:${key}`)
  } catch (e) {
    console.log(e)
  }
}