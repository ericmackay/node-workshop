var request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
<<<<<<< HEAD
    return request("http://api.open-notify.org/iss-now.json")
        .then(
            function(response) {
                // Parse as JSON
                var data = JSON.parse(response);
                // Return object with lat and lng
                var issPosition= {
                    lat: data.iss_position.latitude,
                    lng: data.iss_position.longitude,
                }
            return issPosition;
        }
    )
}

function getAddressPosition(address) {

}

function getCurrentTemperatureAtPosition(position) {

}

function getCurrentTemperature(address) {

}

function getDistanceFromIss(address) {

}

=======
    return request('http://api.open-notify.org/iss-now.json')
        .then(
            function(res) {
                res=JSON.parse(res);
                return {
                    lat: res.iss_position.latitude,
                    lng: res.iss_position.longitude
                };
            }
        )
}

function getAddressPosition(address) {
    return request('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
        .then(function(response) {
            var data = JSON.parse(response);

            return data.results[0].geometry.location;
        });
}

function getCurrentTemperatureAtPosition(position) {
    return request('https://api.darksky.net/forecast/e85d4bafe6a41173ae34cf5614a395c9/' + position.lat + ',' + position.lng)
        .then(function(response) {
            var data = JSON.parse(response);

            return data.currently.temperature;
        });
}

function getCurrentTemperature(address) {
    return getAddressPosition(address)
        .then(getCurrentTemperatureAtPosition);
}

function getDistanceFromIss(address) {
    return Promise.all([
        getAddressPosition(address),
        getIssPosition()
    ]).then(function(results) {
        return getDistance(results[0], results[1]);
    });
}

exports.getDistance = getDistance;
>>>>>>> 4a84585b278ac643c0c5eef3fa1e79adc1109d2d
exports.getIssPosition = getIssPosition;
exports.getAddressPosition = getAddressPosition;
exports.getCurrentTemperatureAtPosition = getCurrentTemperatureAtPosition;
exports.getCurrentTemperature = getCurrentTemperature;
<<<<<<< HEAD
exports.getDistanceFromIss = getDistanceFromIss;
=======
exports.getDistanceFromIss = getDistanceFromIss;
>>>>>>> 4a84585b278ac643c0c5eef3fa1e79adc1109d2d
