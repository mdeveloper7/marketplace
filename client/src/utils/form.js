import { REGEX } from '/utils/globals'

export const INPUT_TYPE = {
  TEXT: 'text',
  PASSWORD: 'password'
}

export const VALIDATION = {
  REQUIRED: (val) => !val,
  MAX: (max) => (val) => {
    const valType = typeof val
    switch (valType) {
      case 'number': {
        return max >= valType
      }
      case 'string': {
        return max >= valType.length
      }
      default: {
        return false
      }
    }
  },
  EMAIL: (val) => !REGEX.EMAIL.test(val),
  PASSWORD: (val) => !REGEX.PASSWORD.test(val),
  PHONE: (val) => val.length <= 15,
  EQUALS: (val, formState) => {
    console.log(formState)
    return false;
  }
}

export const MISSING_MESSAGE = 'falta propiedad'
