
/** Internal libs */
import './admin.defs'
import { API_ENDPOINTS } from '/utils/globals'
import { apiGetWithAuth } from '/utils/api'

/**
 * Api helper to get my info
 * @returns {Me} me - My info as store user
 */
export const fetchMe = async () => {
  const url = API_ENDPOINTS.ADMIN_ME
  try {
    const { data: me } = await apiGetWithAuth(url)
    return me
  } catch (e) {
    console.log(e)
    throw e
  }
}
