import response from '../response'
import createLogger from 'logging'
import {
  getEventByUserId
} from '../mangodb'
import Validator from '../validator'

const logger = createLogger('routes/paymentApproved.js')
const loggerInvalidId = createLogger('routes/paymentApproved.js - invalidId')

let schema = {
  user_id: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9-_]+$/,
    length: {
      min: 12,
      max: 64
    },
    message: 'user_id required min:12 max:64'
  }
}

let validator = Validator(schema)
export default (app) => {
  app.get('/paymentApproved/:userId', (req, res) => {
    let errors = validator.validate({user_id: req.params.userId})
    if (errors.length) {
        let errorMessage = ''
        for (let i = 0; i < errors.length; i++) {
            errorMessage += errors[i].toString()
            if (i !== errors.length - 1) {
                errorMessage += ','
            }
        }
      response.error(res, errorMessage)
    } else {
      getEventByUserId(req.params.userId)
        .then(result => {
          if (result.length === 0) {
            loggerInvalidId.error(`UserId requested: ${req.params.userId}`)
            response.error(res, 'user id does not exist')
          } else {
            response.success(res, {
              event_id: result[0].event_id,
              name: result[0].name,
              payment: {
                id: result[0].payment.id,
                status: result[0].payment.status,
                created_at: result[0].payment.created_at,
                updated_at: result[0].payment.updated_at,
                partner_end_user_id: result[0].payment.partner_end_user_id,
                fiat_total_amount: {
                    currency: result[0].payment.fiat_total_amount.currency,
                    amount: result[0].payment.fiat_total_amount.amount
                }
              },
              timestamp: result[0].timestamp
            })
          }
        })
        .catch((err) => {
          logger.error(err)
        })
    }
  })
}
