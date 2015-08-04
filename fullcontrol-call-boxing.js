/**
 * Created by Philip A Senger on 4/08/15.
 */
var Promise = require("bluebird");

var makeBoomBoom = true;

/**
 * Chaining, and returning Promise.
 * ---
 *
 * This is the best possible solution, because you
 * control the flow of the promises.
 *
 */
var promise = new Promise(function (resolve, reject) {
        console.log('1 start');
        resolve({msg: 'hello'});
    });

// Chaining
promise
    .then(function (result) {
        console.log('2', result);
        result.newmsg = "hello from 2";
        return new Promise(function (resolve, reject) {
            resolve( result );
        });
    })
    .then(function (result) {
        console.log('3', result);
        result.newmsg = "hello from 3";
        return new Promise(function (resolve, reject) {
            resolve( result );
        });
    })
    .then(function (result) {
        console.log('4', result);
        result.newmsg = "hello from 4";
        return new Promise(function (resolve, reject) {
            if (makeBoomBoom) {
                throw new Error('Eels in my hovercraft');
            }
            resolve( result );
        });
    })
    .then(function (result) {
        console.log('5', result);
        result.newmsg = "hello from 5";
        return new Promise(function (resolve, reject) {
            resolve( result );
        });
    })
    .then(function (result) {
        console.log('6', result);
        return new Promise(function (resolve, reject) {
            resolve( result );
        });
    })
    .catch(function (e) {
        console.error('error:', e);
    })
    .finally(function () {
        console.log('fini.');
    });
