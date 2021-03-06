
var Promise = require("bluebird");

/**
 * In this example.
 *
 *  1
 *  2
 *  3 - onRejected
 *  5 - onFulfilled
 *  6 - onFulfilled
 */
var a = new Promise(function (resolve, reject) {
        console.log('1');
        resolve('hello');
    })
    .then(function (msg) { // deliberately throw an error in the onFulfilled
        console.log('2');
        var x;
        return x.what;
    })
    .then(
        function onFulfilled(msg) {
            console.log('3 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('3 - onRejected');
            return msg;
        }
    )
    /** Catch Block **/
    .catch(function (e) {
        console.log('4');
        console.log(e);
    })
    /** Finally Block **/
    .then(
        function onFulfilled(msg) {
            console.log('5 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('5 - onRejected');
            return msg;
        }
    )
    .then(
        function onFulfilled(msg) {
            console.log('6 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('6 - onRejected');
            return msg;
        }
    );

/**
 * In this example.
 *
 * 1
 * 2
 * 4
 * TypeError: Cannot read property 'what' of undefined
 *      at /Users/psenger/Dev/Bluebird-Promise-Sample/try-catch-finally.js:31:17
 *      at tryCatcher (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/util.js:26:23)
 *      at Promise._settlePromiseFromHandler (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/promise.js:510:31)
 *      at Promise._settlePromiseAt (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/promise.js:584:18)
 *      at Promise._settlePromiseAtPostResolution (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/promise.js:248:10)
 *      at Async._drainQueue (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/async.js:128:12)
 *      at Async._drainQueues (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/async.js:133:10)
 *      at Immediate.Async.drainQueues (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/async.js:15:14)
 *      at runCallback (timers.js:637:20)
 *      at tryOnImmediate (timers.js:610:5)
 *      at processImmediate [as _immediateCallback] (timers.js:582:5)
 * 5 - onFulfilled
 * 6 - onFulfilled
 */
var b = new Promise(function (resolve, reject) {
        console.log('1');
        resolve('hello');
    })
    .then(function (msg) { // deliberately throw an error in the onFulfilled
        console.log('2');
        var x;
        return x.what;
    })
    .then(
        function onFulfilled(msg) {
            console.log('3 - onFulfilled');
            return msg;
        }
    )
    /** Catch Block **/
    .catch(function (e) {
        console.log('4');
        console.log(e);
    })
    /** Finally Block **/
    .then(
        function onFulfilled(msg) {
            console.log('5 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('5 - onRejected');
            return msg;
        }
    )
    .then(
        function onFulfilled(msg) {
            console.log('6 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('6 - onRejected');
            return msg;
        }
    );

/**
 * In this example.
 *
 * 1
 * 2 - onFulfilled
 * 5
 * Error: Mr Monkey GO BOOM
 *      at onFulfilled (/Users/psenger/Dev/Bluebird-Promise-Sample/try-catch-finally.js:11:51)
 *      at tryCatcher (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/util.js:26:23)
 *      at Promise._settlePromiseFromHandler (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/promise.js:510:31)
 *      at Promise._settlePromiseAt (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/promise.js:584:18)
 *      at Promise._settlePromiseAtPostResolution (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/promise.js:248:10)
 *      at Async._drainQueue (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/async.js:128:12)
 *      at Async._drainQueues (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/async.js:133:10)
 *      at Immediate.Async.drainQueues (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/async.js:15:14)
 *      at runCallback (timers.js:789:20)
 *      at tryOnImmediate (timers.js:751:5)
 *      at processImmediate [as _immediateCallback] (timers.js:722:5)
 * 6 - onFulfilled
 */
var c = new Promise(function (resolve, reject) {
        console.log('1');
        resolve('hello');
    })
    .then(
        function onFulfilled(msg) {
            console.log('2 - onFulfilled');
            return Promise.reject(new Error('Mr Monkey GO BOOM'));
        }
    )
    .then(
        function onFulfilled(msg) {
            console.log('3 - onFulfilled');
            return msg;
        }
    )
    .then(
        function onFulfilled(msg) {
            console.log('4 - onFulfilled');
            return msg;
        }
    )
    /** Catch Block **/
    .catch(function (e) {
        console.log('5');
        console.log(e);
    })
    /** Finally Block **/
    .then(
        function onFulfilled(msg) {
            console.log('6 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('6 - onRejected');
            return msg;
        }
    );


/**
 * In this example. I think this is the hardest to understand.
 * if you have a rejection handler, and it doesn't reject, then it re-enters the flow.
 *
 * 1
 * 2 - onFulfilled
 * 3 - onRejected      <-- see here it is rejected, but because the handler returns an object, it re-enters.
 * 4 - onFulfilled
 * 6 - onFulfilled
 */
var d = new Promise(function (resolve, reject) {
        console.log('1');
        resolve('hello');
    })
    .then(
        function onFulfilled(msg) {
            console.log('2 - onFulfilled');
            return Promise.reject(new Error('Mr Monkey GO BOOM'));
        },
        function onRejected (msg) {
            console.log('2 - onRejected');
            return msg;
        }
    )
    .then(
        function onFulfilled(msg) {
            console.log('3 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('3 - onRejected');
            return msg;
        }
    )
    .then(
        function onFulfilled(msg) {
            console.log('4 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('4 - onRejected');
            return msg;
        }
    )
    /** Catch Block **/
    .catch(function (e) {
        console.log('5');
        console.log(e);
    })
    /** Finally Block **/
    .then(
        function onFulfilled(msg) {
            console.log('6 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('6 - onRejected');
            return msg;
        }
    );

/**
 * In this example. so, here I reject, and re-enter all the rejects, each one rejecting.
 *
 * 1
 * 2 - onFulfilled
 * 3 - onRejected
 * 4 - onRejected
 * 5
 * Error: Mr Monkey GO BOOM
 *      at onFulfilled (/Users/psenger/Dev/Bluebird-Promise-Sample/try-catch-finally.js:24:35)
 *      at tryCatcher (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/util.js:26:23)
 *      at Promise._settlePromiseFromHandler (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/promise.js:510:31)
 *      at Promise._settlePromiseAt (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/promise.js:584:18)
 *      at Promise._settlePromiseAtPostResolution (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/promise.js:248:10)
 *      at Async._drainQueue (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/async.js:128:12)
 *      at Async._drainQueues (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/async.js:133:10)
 *      at Immediate.Async.drainQueues (/Users/psenger/Dev/Bluebird-Promise-Sample/node_modules/bluebird/js/main/async.js:15:14)
 *      at runCallback (timers.js:789:20)
 *      at tryOnImmediate (timers.js:751:5)
 *      at processImmediate [as _immediateCallback] (timers.js:722:5)
 * 6 - onFulfilled
 */
var e = new Promise(function (resolve, reject) {
    console.log('1');
    resolve('hello');
})
    .then(
        function onFulfilled(msg) {
            console.log('2 - onFulfilled');
            return Promise.reject(new Error('Mr Monkey GO BOOM'));
        },
        function onRejected (msg) {
            console.log('2 - onRejected');
            return Promise.reject(msg);
        }
    )
    .then(
        function onFulfilled(msg) {
            console.log('3 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('3 - onRejected');
            return Promise.reject(msg);
        }
    )
    .then(
        function onFulfilled(msg) {
            console.log('4 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('4 - onRejected');
            return Promise.reject(msg);
        }
    )
    /** Catch Block **/
    .catch(function (e) {
        console.log('5');
        console.log(e);
    })
    /** Finally Block **/
    .then(
        function onFulfilled(msg) {
            console.log('6 - onFulfilled');
            return msg;
        },
        function onRejected (msg) {
            console.log('6 - onRejected');
            return msg;
        }
    );