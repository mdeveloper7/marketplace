import config from '/config'

export const APP_ROUTES = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  FORGOT_PASSWORD: '/auth/forgot-password',
  HOME: '/',
  MY_STORE: '/admin/my-store',
  CATEGORIES: '/admin/categories',
  DASHBOARD: '/admin/dashboard',
  PRODUCTS: '/admin/productos',
  SALES: '/admin/ventas',
  ADMIN: '/admin'
}

export const FORM = {
  MIN_BUSINESS_NAME_CHARACTERS: 5,
  MIN_EMAIL_CHARACTERS: 10,
  MIN_PASSWORD_CHARACTERS: 6
}

export const REGEX = {
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  PASSWORD: /(?=.*[A-Za-z])(?=.*\d){6,}/
}

console.log(config)
export const SERVER = `${config.SERVER_PROTOCOL}://${config.SERVER_HOST}:${config.SERVER_PORT}`

export const API_ENDPOINTS = {
  FORGOT_PASSWORD: `${SERVER}/api/v1/auth/forgot-password`,
  SIGN_UP: `${SERVER}/api/v1/auth/admin/sign-up`,
  SIGN_IN: `${SERVER}/api/v1/auth/admin/sign-in`,
  ADMIN_ME: `${SERVER}/api/v1/admin/me`
}

export const LOCAL_STORAGE_PREFIX = 'CNK_MK'

export const LOCAL_STORAGE_KEY = {
  IDENTITY: 'IDENTITY'
}

export const GENERIC_ERROR_NETWORK_ERROR_MESSAGE = 'Ups!! algo anda mal, porfavor intenta de nuevo mas tarde.'

/** @enum Palette color enum */
export const THEME = {
  DEFAULT: 'DEFAULT',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  DANGER: 'DANGER'
}
