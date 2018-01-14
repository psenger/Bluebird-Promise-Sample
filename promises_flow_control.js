/**
 * Created by Philip A Senger on 12, Jan 2018
 *
 * This code will only work on Nodejs.
 *
 */

const Promise = require ( 'bluebird' );

/**
 * Promises generate while.. pushing to the process.nextTick
 * @param {function} condition - This function will be passed the work, returning true keeps the action going.
 * @param {function} action - some discrete piece of work to perform on the work.
 * @param {Object} work - an Object that is passed around, I was thinking of binding it, but it is not needed.
 */
const promiseWhile = ( condition, action, work ) => {
    return new Promise( (resolve, reject) => {
                            const loop = () => {
                                if (!condition( work )) {
                                    return resolve( work );
                                }
                                return Promise.cast(action( work )) // A way of casting incoming then-ables or promise subclasses to promises of the exact class specified, so that the resulting object's then is ensured to have the behavior of the constructor you are calling cast on.
                                    .then(loop)
                                    .catch(function (e) {
                                        reject(e);
                                    });
                            };
                            process.nextTick(loop);
                        });
};

/**
 * This is a predicate function which shall return true or false and indicate whether the end state has been reached. true if done, false otherwise.
 * @param {Object} work - an Object that is passed around. Holds all the work :smile:
 * @returns {boolean} - true indicates that the work should continue.
 */
const conditionFn = ( work ) => {
    console.log(`\tchecking if count <= 5 ... ${( work.count <= 5)}`);
    return work.count < 5;
};

/**
 * This is the async task to be performed, which itself should return a Promise.
 * @param {Object} work - an Object that is passed around.
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
const workFn = ( work ) => {
    console.log(`Worker function called, last result was = ${JSON.stringify(work)}`);
    return new Promise
                .delay(500) // here for demo purposes only.
                .then(()=>{
                    work.count++;
                    ! work.results && ( work.results = [] );
                    work.results.push( work.count );
                    console.log(`\they I woke up and count is now ${work.count}`);
                    return;
                });
};

let work = {
    count: 0
};

Promise.join( promiseWhile( conditionFn, workFn, work ) )
        .then(function ( result ) {
            console.log(`result = ${JSON.stringify(result,'\n',4)}`);
        }).catch(function (e) {
            console.log(e);
        });