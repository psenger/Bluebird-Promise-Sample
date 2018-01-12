/**
 * Created by Philip A Senger on 12, Jan 2018
 *
 * This code will only work on Nodejs.
 *
 */

const Promise = require ( 'bluebird' );

let count = 0;

/**
 * Promises generate while.. pushing to the process.nextTick
 * @param condition
 * @param action
 */
const promiseWhile = (condition, action) => {
    return new Promise( (resolve, reject) => {
                            const results = [];
                            const loop = () => {
                                if (!condition()) {
                                    return resolve( results );
                                }
                                return Promise.cast(action( results )) // A way of casting incoming then-ables or promise subclasses to promises of the exact class specified, so that the resulting object's then is ensured to have the behavior of the constructor you are calling cast on.
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
 * @returns {boolean}
 */
const conditionFn = () => {
    console.log(`\tchecking if count <= 5 ... ${(count <= 5)}`);
    return count < 5;
};

/**
 * This is the async task to be performed, which itself should return a Promise.
 */
const workFn = ( results ) => {
    console.log(`Worker function called, last result was = ${results}`);
    return new Promise
                .delay(500) // here for demo purposes only.
                .then(()=>{
                    count++;
                    results.push( count );
                    console.log(`\they I woke up and count is now ${count}`);
                    return;
                });
}

Promise.join( promiseWhile(conditionFn, workFn) )
        .then(function ( result ) {
            console.log(`result = ${JSON.stringify(result,'\n',4)}`);
        }).catch(function (e) {
            console.log(e);
        });