
var Promise = require("bluebird");

var promise = new Promise(function (resolve, reject) {
    resolve("hello");
});

// When we create another promise, with more then's attached it is very difficult to identify where problems are
// + Additionally the returned object of a promise is also a promise. Therefore, there is no need to create one.
promise.then(
    function (answer) {
        return new Promise(function (resolve, reject) {
                                        resolve("hello");
                                    })
                                    .then(
                                        function (answer) {
                                        },
                                        function (reason) {
                                        })
                                    .then(
                                        function (answer) {
                                        },
                                        function (reason) {
                                        })
    },
    function (reason) {

    });
