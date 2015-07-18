"use strict";

var Promise = require("bluebird"),
    util = require('util'),
    randomString = require('random-string');

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
 * Work Simulator
 *
 * @param arrayOfIds
 * @param groupId
 * @returns {bluebird|exports|module.exports}
 */
function workSimulator ( arrayOfIds, groupId ) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var outbound = [];
            for (var i = 0; i < arrayOfIds.length; i++) {
                var obj = arrayOfIds[i];
                outbound.push( { id: obj, data : randomString( { length: 20 } ), groupId: groupId } );
            }
            resolve( outbound );
        }, getRandomInt( 100, 300 ) );
    });
}

/**
 * Given the item to work, based on its identity in the array, work on it.
 *
 * @param item
 * @param index
 * @param arrayLength
 * @returns {bluebird|exports|module.exports}
 */
function mapper ( item, index, arrayLength ) {

    if (process.env.debug) {
        console.log('mapper');
        console.log('\titem', JSON.stringify(item));
        console.log('\tindex', index);
        console.log('\tarrayLength', arrayLength);
    }

    return workSimulator( item, index );
}

/**
 * Group the values by ten items.
 *
 * @param total
 * @param item
 * @param index
 * @param arrayLength
 * @returns {*}
 */
function groupByTen ( total, item, index, arrayLength ) {

    if (process.env.debug) {
        console.log('groupByTen');
        console.log('\ttotal', JSON.stringify(total));
        console.log('\titem', JSON.stringify(item));
        console.log('\tindex', index);
        console.log('\tarrayLength', arrayLength);
    }

    // -------------------------------------------------
    // total is the running total, passed to this function
    // over and over again. We need to test total for the
    // "first time it is called". total will NOT be an array
    // and item will have the next value.
    // Total != [] && ( total = { n } && item = { n + 1 } )
    // -------------------------------------------------
    if (! util.isArray(total)) {
       total = [ [ total ] ];
    }
    // if we are grouping by 10 we need to break on the mod of the index.
    if ( ( index % 10 ) === 0 ) {
        total[ total.length ] = [ item ];
    } else {
        total[ total.length - 1 ] = total[ total.length - 1 ].concat( item );
    }

    return total;
}

/**
 * Reduce the total mapped values to a single value.
 *
 * @param total
 * @param item
 * @param index
 * @param arrayLength
 * @returns {Buffer|Array.<T>|string}
 */
function reducer ( total, item, index, arrayLength ) {

    if ( process.env.debug ) {
        console.log('reducer' );
        console.log('\ttotal', JSON.stringify(total) );
        console.log('\titem', JSON.stringify(item));
        console.log('\tindex', index );
        console.log('\tarrayLength', arrayLength );
    }

    // total is the running total, passed to this function
    // over and over again and item is the next value.
    // I want to reduce the mapped results to a single array.
    return total.concat( item );
}

var sizeTests = [  { maxLength: undefined, expectedLength: 100, expectedToFail: false, comment: 'expected all items of' }
                  ,{ maxLength: 0,         expectedLength: 0,   expectedToFail: true,  comment: 'This was expected to fail via the promise framework' }
                  ,{ maxLength: 10,        expectedLength: 10,  expectedToFail: false, comment: 'When expected results of the exact mod length of' }
                  ,{ maxLength: 11,        expectedLength: 11,  expectedToFail: false, comment: 'When expected one over the mod length of' }
                  ,{ maxLength: 13,        expectedLength: 13,  expectedToFail: false, comment: 'When expected three over the mod length of' }
                  ,{ maxLength: 50,        expectedLength: 50,  expectedToFail: false, comment: 'When expected half the total of' }
                  ,{ maxLength: 99,        expectedLength: 99,  expectedToFail: false, comment: 'When expected just short of the full of' }
];

for (var i = 0; i < sizeTests.length; i++) {

    var sizeTest = sizeTests[i];

    var x = [   ' 0', ' 1', ' 2', ' 3', ' 4', ' 5', ' 6', ' 7', ' 8', ' 9',
                '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
                '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
                '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
                '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
                '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
                '60', '61', '62', '63', '64', '65', '66', '67', '68', '69',
                '70', '71', '72', '73', '74', '75', '76', '77', '78', '79',
                '80', '81', '82', '83', '84', '85', '86', '87', '88', '89',
                '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'  ].slice(0, sizeTest.maxLength);

    (function( _sizeTest ){
        Promise.resolve( x )
            .reduce(groupByTen)
            .map(mapper)
            .reduce(reducer)
            .then(function (total) {
                if ( total.length == _sizeTest.expectedLength && ! _sizeTest.expectedToFail ) {
                    console.log('passed');
                } else if ( _sizeTest.expectedToFail ) {
                    console.error( 'failed : this was expected to fail and did not');
                } else {
                    console.error( 'failed : ' + _sizeTest.comment + ' ' + _sizeTest.expectedLength+ ' got ' + total.length );
                }
            })
            .catch(function(err){
                if ( _sizeTest.expectedToFail ) {
                    console.log( 'passed' );
                } else {
                    console.error( 'failed : ' + _sizeTest.comment  );
                }
            });
    }( sizeTest ));
}

