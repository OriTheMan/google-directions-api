var expect  = require('chai').expect;
var distance = require('../index.js');
describe('Options tests', function() {
    beforeEach(function() {
        distance.reset();
      });

    it('Defaults', function(done) {
        var opts = distance.getOptions();

        var defaults = {
            origins: null,
            destinations: null,
            mode: 'driving',
            units: 'metric',
            language: 'en',
            avoid: null
        };

        expect(opts).to.eql(defaults);
        done();
    });

    it('mode should be walking', function(done) {
        distance.mode('walking')
        var opts = distance.getOptions();

        expect(opts.mode).to.equal('walking');
        done();
    });

    it('language should be he', function(done) {
        distance.language('he')
        var opts = distance.getOptions();
        
        expect(opts.language).to.equal('he');
        done();
    });

})