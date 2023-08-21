import app from '../src'
import chai from 'chai'
import request from 'supertest'
import ExchangeRateSchema from '../src/mangodb/exchange_rate_schema'
const assert = chai.assert

describe('Currency tests', () => {
    describe('get fiat currency valid', () => {
        it('should return a valid fiat currency', (done) => {
            request(app)
            .get('/current-currencies')
            .send()
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                assert.equal(response['fiat']['USD'].symbol, 'USD')
                assert.equal(response['fiat']['USD'].name, 'US Dollar')
                done();
            })
        }).timeout(5000)
    })

    describe('get fiat currency invalid', () => {
        it('should be undefined in the response', (done) => {
            request(app)
            .get('/current-currencies')
            .send()
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                assert.isUndefined(response['fiat']['KRW'])
                done();
            })
        }).timeout(5000)
    })

    describe('get digital currency valid', () => {
        it('should return a valid digital currency', (done) => {
            request(app)
            .get('/current-currencies')
            .send()
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                assert.equal(response['digital']['BTC'].symbol, 'BTC')
                assert.equal(response['digital']['BTC'].name, 'Bitcoin')
                done();
            })
        }).timeout(5000)
    })

    describe('get digital currency invalid', () => {
        it('should be undefined in the response', (done) => {
            request(app)
            .get('/current-currencies')
            .send()
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                assert.isUndefined(response['digital']['HEX'])
                done();
            })
        }).timeout(5000)
    })

    describe('get exchange rates', () => {
        let ee;
        beforeEach((done) => {
            // user is an instance of User Model
            ee = new ExchangeRateSchema({
                pair_key: 'KRWVND',
                base_currency: 'KRW',
                rate_currency: 'VND',
                min: 10,
                max: 2000000,
                rate: 10
            })
            ee.save()
                .then(() => {
                    done();
                });
        });
        
        it('Removes a User using its instance', (done) => {
            request(app)
            .get('/exchange-rates')
            .send()
            .expect(200)
            .end((err, res) => {
                let body = res.body
                assert.typeOf(body, 'Object')
                assert.equal(body.error, false)
                let response = body.result
                assert.typeOf(response, 'Object')
                assert.isNotNull(ee);

                ExchangeRateSchema.find({
                    pair_key: 'KRWVND',
                }).remove()
                // Checking if the user was deleted from DB or not
                .then(() => ExchangeRateSchema.findOne({ pair_key: 'KRWVND' }))
                .then((ee) => {
                    assert(ee === null);
                    done();
                });
            })
        });
    })
})