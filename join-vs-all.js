/**
 * Created by Philip A Senger on 11/09/15.
 */

/**
 For All and Join can be used to coordinate multiple concurrent discrete promises.
 **/

var Promise = require ( 'bluebird' );

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

/**
 * Simple task.
 *
 * @param {string} name - the name of the task.
 * @param {boolean} fail - truthy value which will cause the promise to fail.
 * @returns {bluebird|exports|module.exports}
 */
function task( name, fail ) {
    return new Promise(function (resolve, reject) {
        var timeout = getRandomInt(0,5000);
        if ( fail ) {
            reject( new Error( name + ' failed') );
        }
        setTimeout( resolve, timeout  );
        resolve( { name: name, timeout: timeout } );
    });
}

/**
 * Fulfilment handler for JOIN. Note that each parameter is present. This could have been done with Arguments as a vararg.
 *
 * @param resultA
 * @param resultB
 * @param resultC
 * @param resultD
 * @returns {bluebird|exports|module.exports}
 */
function joinFulfilmentHandler( resultA, resultB, resultC, resultD ){
    return new Promise ( function ( resolve, reject ) {
        resolve( {  resultA:resultA,
                    resultB:resultB,
                    resultC:resultC,
                    resultD:resultD } );
    } );
}

/**
 * All Fulfilment handler. results is an array of results.
 *
 * @param {*[]} results
 * @returns {bluebird|exports|module.exports}
 */
function allFulfilmentHandler( results ){
    return new Promise ( function ( resolve, reject ) {
        var outBound = results.reduce( function(previousValue, currentValue, index, array){
            previousValue['result'+ currentValue.name] = {
                name: currentValue.name,
                timeout: currentValue.timeout
            };
            return previousValue;
        }, {} );
        resolve( outBound );
    } );
}

var promiseA = task('A');
var promiseB = task('B');
var promiseC = task('C' /** , true  **/);
var promiseD = task('D');

/**
 * Used for fix number of promises - more proficient ( according to the documentation )
 */
Promise.join( promiseA, promiseB, promiseC, promiseD, joinFulfilmentHandler )
    .then ( function ( result ) {
    console.log( 'final value = ' + JSON.stringify( result, '\t', 4 ) );
    } )
    .catch(function(e){
       console.error( e );
    });

/**
 * Used for dynamic number of promises
 */
Promise.all( [ promiseA, promiseB, promiseC, promiseD ] )
    .then( allFulfilmentHandler )
    .then ( function ( result ) {
        console.log( 'final value = ' + JSON.stringify( result, '\t', 4 ) );
    } )
    .catch(function(e){
        console.error( e );
    });
