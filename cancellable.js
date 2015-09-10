/**
 * Created by Philip A Senger on 10/09/15.
 */

var Promise = require ( 'bluebird' ),
    sleep = require ( 'sleep' );

var n = 2; // 2 seconds.

var promise = new Promise ( function ( resolve, reject ) {
        sleep.sleep ( n );
        throw new Promise.CancellationError('Eels');
    } )
    .cancellable()
    .catch(Promise.CancellationError, function(e) {
        console.log ( 'My hovercraft is full of ' + e.message);
        throw e;
    });
