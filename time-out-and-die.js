/**
 * Created by Philip A Senger on 10/09/15.
 */

var Promise = require ( 'bluebird' );

function task( name ) {
    return new Promise(function (resolve, reject) {
            setTimeout( resolve, 5000 );
        })
        .cancellable()
        .timeout(1000)
        .catch(Promise.CancellationError, function(error) {
            console.log('Task ' + name + ' cancelled', error);
        })
        .catch ( Promise.TimeoutError, function ( error ) {
            console.log('Task ' + name + ' timed out', error);
        } );
}

var promiseA = task('A');
var promiseB = task('B');

if ( promiseB.isCancellable() ) {
    console.log( 'promiseB is cancellable.' );
    promiseB.cancel();
}
