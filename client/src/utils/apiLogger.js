const OK_CSS =
  'font-family: "Open Sans Condensed", "Lucida Console"; font-size: 14px; color: teal; font-weight: light;'
const API_CSS =
  'font-family: "Open Sans Condensed", "Lucida Console"; font-size: 14px; color: cyan; font-weight: light;'
const ERROR_CSS =
  'font-family: "Open Sans Condensed", "Lucida Console"; font-size: 14px; color: red; font-weight: light;'

/** @class ApiLogger */
class ApiLogger {
  static debug ({ error, req, res, status, url, collapsed = false }) {
    let log = console.group
    if (collapsed) {
      log = console.groupCollapsed
    }
    if (error) {
      log(`%cAPI\t%cError\t%c${url}`, ...[API_CSS, ERROR_CSS, API_CSS])
      console.log('%o', error)
      console.groupEnd()
      return
    }

    const statusCss = status < 400 ? OK_CSS : ERROR_CSS
    log(`%cAPI\t%c${status}\t%c${url}`, ...[API_CSS, statusCss, API_CSS])
    console.log('\n%creq\t%o', ...[API_CSS, req])
    console.log('\n%cres\t%o', ...[API_CSS, res])
    console.groupEnd()
  }
}

export default ApiLogger
