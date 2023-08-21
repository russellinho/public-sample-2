import createLogger from 'logging'
import debugLogger from 'debug'

import response from './response'
import {
  productValidation
} from './config'

const logger = createLogger('sourceValidate.js')
const debug = debugLogger('validation:bypass')

export default function sourceValidate (validationOptions = productValidation) {
  return function (req, res, next) {
    if (req.headers['referer'] === validationOptions.referrerAppleiOS) {
      if (validationOptions.apiKeys.includes(req.headers[validationOptions.apiKeyHeaderName])) {
        req.mewSourceApplication = 'ios'
        debug('Mobile Bypass Success IOS')
        next()
      } else {
        logger.error('Invalid API key: IOS')
        response.error(res, 'Invalid API key')
      }
    } else if (req.headers['referer'] === validationOptions.referrerAndroid) {
      if (validationOptions.apiKeys.includes(req.headers[validationOptions.apiKeyHeaderName])) {
        req.mewSourceApplication = 'android'
        debug('Mobile Bypass Success Android')
        next()
      } else {
        logger.error('Invalid API key: Android')
        response.error(res, 'Invalid API key')
      }
    } else if (validationOptions.specialWebOrigins.includes(req.headers['origin'])) {
      req.mewSourceApplication = 'mew'
      debug('Web Bypass Success')
      next()
    } else if (/quote/.test(req.route.path)) {
      next()
    } else if (/order/.test(req.route.path)) {
      next()
    }
  }
}
