'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _response = require('../response');

var _response2 = _interopRequireDefault(_response);

var _logging = require('logging');

var _logging2 = _interopRequireDefault(_logging);

var _mangodb = require('../mangodb');

var _validator = require('../validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logging2.default)('routes/paymentApproved.js');
var loggerInvalidId = (0, _logging2.default)('routes/paymentApproved.js - invalidId');

var schema = {
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
};

var validator = (0, _validator2.default)(schema);

exports.default = function (app) {
  app.get('/paymentApproved/:userId', function (req, res) {
    var errors = validator.validate({ user_id: req.params.userId });
    if (errors.length) {
      var errorMessage = '';
      for (var i = 0; i < errors.length; i++) {
        errorMessage += errors[i].toString();
        if (i !== errors.length - 1) {
          errorMessage += ',';
        }
      }
      _response2.default.error(res, errorMessage);
    } else {
      (0, _mangodb.getEventByUserId)(req.params.userId).then(function (result) {
        if (result.length === 0) {
          loggerInvalidId.error('UserId requested: ' + req.params.userId);
          _response2.default.error(res, 'user id does not exist');
        } else {
          _response2.default.success(res, {
            event_id: result[0].event_id,
            name: result[0].name,
            payment: {
              id: result[0].payment.id,
              amount: result[0].payment.status,
              created_at: result[0].payment.created_at,
              updated_at: result[0].payment.updated_at,
              partner_end_user_id: result[0].payment.partner_end_user_id,
              fiat_total_amount: {
                currency: result[0].payment.fiat_total_amount.currency,
                amount: result[0].payment.fiat_total_amount.amount
              }
            },
            timestamp: result[0].timestamp
          });
        }
      }).catch(function (err) {
        logger.error(err);
      });
    }
  });
};