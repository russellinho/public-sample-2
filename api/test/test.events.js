import chai from 'chai'
const assert = chai.assert
import uuidv4 from 'uuid/v4'
import {
    EventSchema
} from '../src/mangodb'

describe('Event tests', () => {
    let eventId = uuidv4()
    let paymentId = uuidv4()
    let userId = uuidv4()

    describe('test create event', () => {
        it('should create a quote event', (done) => {
            EventSchema({
                event_id: eventId,
                name: 'testEvent',
                payment: {
                  id: paymentId,
                  status: 'TEST',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  partner_end_user_id: userId,
                  fiat_total_amount: {
                    currency: 'USD',
                    amount: 5000
                  }
                },
                timestamp: new Date().toISOString()
            }).save()

            done()
        }).timeout(5000)
    })

    describe('test retrieve event by user id', () => {
        it('should retrieve the event', (done) => {
            let doc = EventSchema.findOne({ 'payment.partner_end_user_id': userId })
            assert.isNotNull(doc)
            done()
        }).timeout(5000)
    })

    describe('test retrieve event by user id and payment id', () => {
        it('should retrieve the event', (done) => {
            let doc = EventSchema.findOne({ 'payment.partner_end_user_id': userId, 'payment.id': paymentId })
            assert.isNotNull(doc)
            done()
        }).timeout(5000)
    })

    describe('test update event status', () => {
        it('should update the event', (done) => {
            EventSchema.findOneAndUpdate({
                event_id: eventId,
              }, {
                payment: {
                    status: 'TESTED'
                }
                })
            done()
        }).timeout(5000)
    })
})