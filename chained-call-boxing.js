/**
 * Created by Philip A Senger on 4/08/15.
 */
var Promise = require("bluebird");

/**
 * Chaining, without returning a Promise ( boxing )
 * ---
 *
 * Blue Bird will automatically wrap the a function with a passing-promise.
 * However, you forfeit flow control and subsequent results become undefined.
 *
 */
var makeBoomBoom = true;

var promise = new Promise(function (resolve, reject) {
    console.log('1');
    resolve({msg: 'hello'});
});

// Chaining
promise.then(function (result) {
        console.log('2', result);
        result.newmsg = "good by ";
    })
    .then(function (result) {
        console.log('3', result);
    })
    .then(function (result) {
        console.log('4', result);
        if (makeBoomBoom) {
            throw new Error('Eels in my hovercraft');
        }
    })
    .then(function (result) {
        console.log('5', result);
    })
    .then(function (result) {
        console.log('6', result);
    })
    .catch(function (e) {
        console.error('error', e);
    })
    .finally(function () {
        console.log('fini');
    });
