const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../app').app;

describe('👋 End to End hello world test', () => {
    it('should return hello world', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                chai.assert.equal(res.text, 'Hello World!')
                done();
            });
    });
});