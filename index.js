'use strict';

var request = require('request'),
    qs = require('qs-google-signature');
  
var validTravelModes = ['driving', 'walking', 'bicycling', 'transit'];
var validUnits = ['metric', 'imperial'];
var validRestrictions = ['tolls', 'highways', 'ferries', 'indoor'];
var validTrafficModel = ['best_guess', 'pessimistic', 'optimistic'];
var validTransitMode = ['bus', 'subway', 'train', 'tram', 'rail'];
var validTransitRoutingPreference = ['less_walking', 'fewer_transfers'];

var GOOGLE_DIRECTIONS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json?',
  SEPARATOR = '|',

  // free api key
  GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || null,

  // maps for business users key
  GOOGLE_CLIENT_KEY = process.env.GOOGLE_BUSINESS_CLIENT_KEY || null,
  GOOGLE_SIGNATURE_KEY = process.env.GOOGLE_SIGNATURE_KEY || null;


var GoogleDirections = function() {
  this.options = {
    origin: null,
    destination: null,
    mode: 'driving',
    units: 'metric',
    language: 'en',
    avoid: null
  }
  if (GOOGLE_CLIENT_KEY && GOOGLE_SIGNATURE_KEY) {
    this.options.client = GOOGLE_CLIENT_KEY;
    this.options.signature = GOOGLE_SIGNATURE_KEY;
  } else {
    this.options.key = GOOGLE_API_KEY;
  }
};

function formatArray(arr) {
  if(!Array.isArray(arr)) {
    return arr;
  }
  
  return arr.join(SEPARATOR);
}

function makeRequest(options, callback) {
  var requestURL = GOOGLE_DIRECTIONS_API_URL + qs.stringify(options, GOOGLE_DIRECTIONS_API_URL);
  
  request(requestURL, function(err, response, data) {
    if (err || response.statusCode != 200) {
      return callback(new Error('Google API request error: ' + data));
    }
    callback(null, JSON.parse(data));
  })
}

GoogleDirections.prototype.matrix = function(args, cb) {

  // validate arguments

  if (arguments.length < 3) {
    throw new Error('Invalid number of arguments');
  }
  var callback = arguments[arguments.length - 1];
  if (typeof callback != 'function') {
    throw new Error('Missing callback function');
  }

  this.options.origin = arguments[0];
  this.options.destination = arguments[1];
  
  // makes a request to google api

  makeRequest(this.options, function(err, data) {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });

}

GoogleDirections.prototype.mode = function(mode) {
  if (validTravelModes.indexOf(mode) < 0) {
    throw new Error('Invalid mode: ' + mode);
  }
  this.options.mode = mode;
}

GoogleDirections.prototype.language = function(language) {
  this.options.language = language;
}

GoogleDirections.prototype.avoid = function(avoid) {
  /* if (validRestrictions.indexOf(avoid) < 0) {
    throw new Error('Invalid restriction: ' + avoid);
  } */
  this.options.avoid = formatArray(avoid);
}

GoogleDirections.prototype.units = function(units) {
  if (validUnits.indexOf(units) < 0) {
    throw new Error('Invalid units: ' + units);
  }
  this.options.units = units;
}

GoogleDirections.prototype.departure_time = function(departure_time) {
  this.options.departure_time = departure_time;
}

GoogleDirections.prototype.arrival_time = function(arrival_time) {
  this.options.arrival_time = arrival_time;
}

GoogleDirections.prototype.key = function(key) {
  delete this.options.client;
  delete this.options.signature;
  this.options.key = key;
}

GoogleDirections.prototype.client = function(client) {
  delete this.options.key;
  this.options.client = client;
}

GoogleDirections.prototype.signature = function(signature) {
  delete this.options.key;
  this.options.signature = signature;
}

GoogleDirections.prototype.traffic_model = function(trafficModel) {
  if (validTrafficModel.indexOf(units) < 0) {
    throw new Error('Invalid traffic model: ' + trafficModel);
  }
  this.options.traffic_model = trafficModel;
}

GoogleDirections.prototype.transit_mode = function(transitMode) {
/*   if (validTransitMode.indexOf(transitMode) < 0) {
    throw new Error('Invalid transit mode: ' + transitMode);
  } */
  this.options.transit_mode = transitMode;
}

GoogleDirections.prototype.transit_routing_preference = function(transitRoutingPreference) {
  this.options.transit_routing_preference = transitRoutingPreference;
}

GoogleDirections.prototype.reset = function() {
  this.options = {
    origins: null,
    destinations: null,
    mode: 'driving',
    units: 'metric',
    language: 'en',
    avoid: null
  };
}

GoogleDirections.prototype.waypoints = function(WayPoints) {
/*   if(this.options.mode == 'transit') {
    throw new Error('Waypoints not available in transit mode');
  } */

  this.options.waypoints = formatArray(WayPoints);
}

GoogleDirections.prototype.alternatives = function(Alternatives) {
  this.options.alternatives = Alternatives;
}

GoogleDirections.prototype.region = function(Region) {
  this.options.region = Region;
}

GoogleDirections.prototype.getOptions = function() {
  return this.options
}


module.exports = new GoogleDirections();
