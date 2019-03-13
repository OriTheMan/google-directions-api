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

    it('avoid should be formated', function(done) {
        distance.avoid('dest_1')
        var opts = distance.getOptions();
        expect(opts.avoid).to.equal('dest_1');

        distance.avoid(['dest_1'])
        opts = distance.getOptions();
        expect(opts.avoid).to.equal('dest_1');

        distance.avoid(['dest_1', 'dest_2'])
        opts = distance.getOptions();
        expect(opts.avoid).to.equal('dest_1|dest_2');

        done();
    });

    it('units should be imperial', function(done) {
        distance.units('imperial')
        var opts = distance.getOptions();
        
        expect(opts.units).to.equal('imperial');
        done();
    });

})