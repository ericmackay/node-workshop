var request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
    return request("http://api.open-notify.org/iss-now.json").then(response => {
        // Parse as JSON
        var data = JSON.parse(response);
        // Return object with lat and lng
        var issPosition = {
            lat: data.iss_position.latitude,
            lng: data.iss_position.longitude
        }
        return issPosition;
        //return {lat: data.issPosition.latitude,
        // lng: data.iss_position.longitude}
    })
}

function getAddressPosition(address) {
    return request('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(response => {
        var data = JSON.parse(response);

        return data.results[0].geometry.location;
    });
}

function getCurrentTemperatureAtPosition(position) {
    return request('https://api.darksky.net/forecast/e3b964beb2d21faaada2d9b609c2e885/' + position.lat + ',' + position.lng).then(response => {
        var data = JSON.parse(response);
        return data.currently.temperature;
    });
}


function getCurrentTemperature(address) {
    return request('https://api.darksky.net/forecast/e3b964beb2d21faaada2d9b609c2e885/' + address).then(response => {
        var data = JSON.parse(response);

        return data.currently.temperature;
    });
}

function getDistanceFromIss(address) {
    return Promise.all([getIssPosition(), getAddressPosition(address)]).then(results => {
        return getDistance(results[0], results[1]);
    });

// Promise.all returns an array whith the data returned from getIssPosition in [0] ** when this promise is finished ** and the data from getAddressPosition in [1] ** when this promise is finished **.

// Returns a new promise using that data when the previous promises are finished executing.
}

exports.getIssPosition = getIssPosition;
exports.getAddressPosition = getAddressPosition;
exports.getCurrentTemperatureAtPosition = getCurrentTemperatureAtPosition;
exports.getCurrentTemperature = getCurrentTemperature;
exports.getDistanceFromIss = getDistanceFromIss;
