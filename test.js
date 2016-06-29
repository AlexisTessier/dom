window.karmaCustomEnv = {};
window.karmaCustomEnv.execute = function(karma, window) {
    var forEach = require('lodash/forEach');
    var map = require('lodash/map');
    var size = require('lodash/size');
    var specs = require('./specs');

    var suite = map(specs, function(spec, identifier) {
        return identifier;
    });

    karma.info({
        total: size(suite),
        suite: suite
    });

    forEach(specs, function(spec, identifier) {
        try{
            spec.test();

            karma.result({
                id: identifier,
                success: true,
                suite: suite
            });
        }catch(err){
            karma.result({
                id: identifier,
                success: false,
                suite: suite,
                log: [err.message]
            });
        } 
    });
    
    karma.complete({coverage: window.__coverage__});
};