import axios from 'axios'
import './auth.defs'
import ApiLogger from '/utils/apiLogger'
import { API_ENDPOINTS } from '/utils/globals'
import { apiPost } from '/utils/api'
/**
  * api helper function as forgot password request
  * @param {string} email - store email
  * @param {bool} [fails=false] - indicates if requests should fail on purpose or not
  */
export const forgotPassword = (usernameOrEmail, fails = false) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const url = API_ENDPOINTS.FORGOT_PASSWORD;

      if(fails) {
        const response = { status: 500, data: {message: 'failure'} };
        ApiLogger.debug(response.status, url, response.data);
       
        return rej(new Error());
      }

      const response = { status: 200, data: []};
      ApiLogger.debug(response.status, url, response.data);
      res(response);
    }, 2000);
  });
};



/**
 * api helper function as sign up request
 * @param {AuthNewUser} newUser - new user inputs
* @param {bool} [fail=false] - indicates if requests should fail on purpose or not
 */
export const postSignUp = (newUser, fails) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const url = API_ENDPOINTS.SIGN_UP;
      if(fails) {
        const response = { status: 500, data: {message: 'failure'} };
        ApiLogger.debug(response.status, url, response.data);

        rej(new Error());
        return;
      }
      
      const response = { status: 200, data: []};
      ApiLogger.debug(response.status, url, response.data);
      res(response);

    }, 2000);
  });
};

/**
 * api helper function as sign in request
 * @param {AuthUser} user - new user inputs
* @param {bool} [fail=false] - indicates if requests should fail on purpose or not
 */
export const signIn = async (user) => {
  try {
    const { data: me } = await apiPost(
      API_ENDPOINTS.SIGN_IN, {
        email: user.email,
        password: user.password
      })
    return me
  } catch (e) {
    console.log(e)
    throw e
  }
}
