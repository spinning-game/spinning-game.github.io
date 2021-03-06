'use strict';

function makeGetRequest(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    var serverResponse = request.responseText;

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            callback(data);
        } else {
            // We reached our target server, but it returned an error
            callback('error');
        }
    };

    request.onerror = function () {
        callback('error');
    };

    request.send();

};