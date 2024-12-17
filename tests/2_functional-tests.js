const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite('Translation POST request to /api/translate', () => {
        test('With text and locale fields', (done) => {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit',
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'text');
                    assert.property(res.body, 'translation');
                    assert.include(res.body.translation, `<span class="highlight">favorite</span>`);
                    done();
                })
        });

        test('With text and invalid locale field', (done) => {
            chai
                .request(server).
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit.',
                    locale: 'invalid-locale'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                })
        });

        test('With missing text field', (done) => {
            chai
        })
    })
});
