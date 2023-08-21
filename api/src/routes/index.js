import quoteRoute from './quote'
import orderRoute from './order'
import statusByQuoteRoute from './statusByQuote'
import statusRoute from './status'
import exchangeRates from './exchangeRates'
import currentCurrencies from './currentCurrencies'
import paymentApproved from './paymentApproved'
export default (app) => {
  quoteRoute(app)
  orderRoute(app)
  statusByQuoteRoute(app)
  statusRoute(app)
  exchangeRates(app)
  currentCurrencies(app)
  paymentApproved(app)
}
