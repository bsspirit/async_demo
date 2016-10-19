var async = require('async');

var t = require('../t');
var log = t.log;

/**
 * 使用异步操作对集合中的元素进行筛选。需要注意的是，在async 2.x版本中, iterator的callback有两个参数，
 * err和truthValue, 其中truthValue(或叫test)只能接收true或false。
 *
 * 对于出错，该函数没有做出任何处理，直接由nodejs抛出。所以需要注意对Error的处理。
 *
 * async提供了两种方式：
 * 1. 并行执行：filter
 * 2. 顺序执行：filterSereis
 */
// filter(arr, iterator(item, callback(err, test)), callback(err, results))

var arr = [1,2,3,4,5];

/**
 * 并行执行，对arr进行筛选。
 */
async.filter(arr, function(item, callback) {
    log('1.1 enter: ' + item);
    setTimeout(function() {
        log('1.1 test: ' + item);
        callback(null, item>=3);
    }, 200);
}, function(err, results) {
    log('1.1 results: ', results);
});
//16.739> 1.1 enter: 1
//16.749> 1.1 enter: 2
//16.749> 1.1 enter: 3
//16.749> 1.1 enter: 4
//16.749> 1.1 enter: 5
//16.749> 1.3 enter: 1
//16.949> 1.1 test: 1
//16.949> 1.1 test: 2
//16.949> 1.1 test: 3
//16.949> 1.1 test: 4
//16.949> 1.1 test: 5
//16.949> 1.1 results: [ 3, 4, 5 ]


/**
* 如果出错，将会由nodejs抛出，导致出错。为保证其它代码正常运行，注释掉该测试。
*
* try..catch：抓不到这个错误
*/
/*
async.filter(arr, function(item, callback) {
    log('1.2 enter: ' + item);
    setTimeout(function() {
        log('1.2 handle: ' + item);
        if(item===2) {
            throw new Error('myerr');
        }
        callback(null, item>=3);
    }, 100);
}, function(err, results) {
    log('1.2 results: ', results);
});
*/

/**
* 串行执行，对arr进行筛选。
*/
// 1.3
async.filterSeries(arr, function(item, callback) {
    log('1.3 enter: ' + item);
    setTimeout(function() {
        log('1.3 handle: ' + item);
        callback(null, item>=3);
    }, 200);
}, function(err, results) {
    log('1.3 results: ', results);
});
// 16.749> 1.3 enter: 1
// 16.949> 1.3 handle: 1
// 16.949> 1.3 enter: 2
// 17.149> 1.3 handle: 2
// 17.149> 1.3 enter: 3
// 17.369> 1.3 handle: 3
// 17.369> 1.3 enter: 4
// 17.589> 1.3 handle: 4
// 17.589> 1.3 enter: 5
// 17.789> 1.3 handle: 5
// 17.789> 1.3 results: [ 3, 4, 5 ]


/*
* reject跟filter正好相反，当测试为true时，抛弃之
*/
// reject(arr, iterator(item, callback(err, test)), callback(err, results)
async.reject(arr, function(item, callback) {
    log('1.4 enter: ' + item);
    setTimeout(function() {
        log('1.4 test: ' + item);
        callback(null, item>=3);
    }, 200);
}, function(err, results) {
    log('1.4 results: ', results);
});
// 31.359> 1.4 enter: 1
// 31.359> 1.4 enter: 2
// 31.359> 1.4 enter: 3
// 31.359> 1.4 enter: 4
// 31.359> 1.4 enter: 5
// 31.559> 1.4 test: 1
// 31.559> 1.4 test: 2
// 31.559> 1.4 test: 3
// 31.559> 1.4 test: 4
// 31.559> 1.4 test: 5
// 31.569> 1.4 results: [ 1, 2 ]


/**
 * 串行执行，对arr进行筛选。
 */
// 1.3
async.rejectSeries(arr, function(item, callback) {
    log('1.5 enter: ' + item);
    setTimeout(function() {
        log('1.5 handle: ' + item);
        callback(null, item>=3);
    }, 200);
}, function(err, results) {
    log('1.5 results: ', results);
});
//43.592> 1.5 enter: 1
//43.799> 1.5 handle: 1
//43.800> 1.5 enter: 2
//44.004> 1.5 handle: 2
//44.007> 1.5 enter: 3
//44.210> 1.5 handle: 3
//44.211> 1.5 enter: 4
//44.412> 1.5 handle: 4
//44.413> 1.5 enter: 5
//44.614> 1.5 handle: 5
//44.616> 1.5 results: [ 1, 2 ]