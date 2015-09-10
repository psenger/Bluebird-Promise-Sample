/**
 * Created by Philip A Senger on 10/09/15.
 */

var Promise = require ( 'bluebird' );

function task() {
    return new Promise(function (resolve, reject) {
            setTimeout( resolve, 5000 );
        })
        .cancellable()
        .timeout(1000)
        .catch(Promise.CancellationError, function(error) {
            console.log('Task cancelled', error);
        })
        .catch ( Promise.TimeoutError, function ( error ) {
            console.log('Task timed out', error);
        } );
}

var promiseA = task();
var promiseB = task();

if ( promiseB.isCancellable() ) {
    console.log( 'promiseB is cancellable.' );
    promiseB.cancel();
}
