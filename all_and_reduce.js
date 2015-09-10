/**
 * Created by Philip A Senger on 6/08/15.
 */
"use strict";

var Promise = require("bluebird"),
    randomString = require('random-string');

/**
 * Returns a random integer between min (included) and max (excluded) Using Math.round() will give you a non-uniform distribution!
 *
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// create an array of promises.
var promises = [];

// create a promise that will fire off in some random amount of time, and push it into the array.
promises.push(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve( { id: 1, data : randomString( { length: 20 } )  } );
        }, getRandomInt( 100, 300 ) );
    })
}());

// create a promise that will fire off in some random amount of time, and push it into the array.
promises.push(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve( { id: 2, data : randomString( { length: 20 } )  } );
        }, getRandomInt( 100, 300 ) );
    })
}());

// create a promise that will fire off in some random amount of time, and push it into the array.
promises.push(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve( { id: 3, data : randomString( { length: 20 } )  } );
        }, getRandomInt( 100, 300 ) );
    })
}());

// create a promise that will fire off in some random amount of time, and push it into the array.
promises.push(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve( { id: 4, data : randomString( { length: 20 } )  } );
        }, getRandomInt( 100, 300 ) );
    })
}());

var starterObject = { results: [] };
// Execute them all, and reduce the results, to one final value.
Promise.all( promises )
        .reduce(function(total, item, index, arrayLength){
            total.results.push( item.data );
            return total;
        }, starterObject )
        .then(function( results ){
            console.log('Final results', results);
        });
