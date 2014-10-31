var async = require('async');

var t = require('./t');
var log = t.log;

/**
 * 如果想对同一个集合中的所有元素都执行同一个异步操作，可以利用each函数。
 *
 * async提供了三种方式：
 * 1. 集合中所有元素并行执行
 * 2. 一个一个顺序执行
 * 3. 分批执行，同一批内并行，批与批之间按顺序
 *
 * 如果中途出错，则错误将上传给最终的callback处理。其它已经启动的任务继续执行，未启动的忽略。
 */
// each(arr, iterator(item, callback), callback(err))


var arr = [{name:'Jack', delay: 200},
           {name:'Mike', delay: 100},
           {name:'Freewind', delay: 300}];

/**
 * 所有操作并发执行，且全部未出错，最终得到的err为undefined。注意最终callback只有一个参数err。
 */
// 1.1
async.each(arr, function(item, callback) {
    log('1.1 enter: ' + item.name);
    setTimeout(function(){
        log('1.1 handle: ' + item.name);
        callback(null, item.name);
    }, item.delay);
}, function(err) {
    log('1.1 err: ' + err);
});
// 输出如下：
// 42.244> 1.1 enter: Jack
// 42.245> 1.1 enter: Mike
// 42.245> 1.1 enter: Freewind
// 42.350> 1.1 handle: Mike
// 42.445> 1.1 handle: Jack
// 42.554> 1.1 handle: Freewind
// 42.554> 1.1 err: undefined


/**
 * 如果中途出错，则出错后马上调用最终的callback。其它未执行完的任务继续执行。
 */
async.each(arr,function(item, callback) {
    log('1.2 enter: ' +item.name);
    setTimeout(function() {
        log('1.2 handle: ' + item.name);
        if(item.name==='Jack') {
            callback('myerr');
        }
    }, item.delay);
}, function(err) {
    log('1.2 err: ' + err);
});
// 输出如下：
// 42.246> 1.2 enter: Jack
// 42.246> 1.2 enter: Mike
// 42.246> 1.2 enter: Freewind
// 42.350> 1.2 handle: Mike
// 42.445> 1.2 handle: Jack
// 42.446> 1.2 err: myerr
// 42.555> 1.2 handle: Freewind

/**
 * 与each相似，但不是并行执行。而是一个个按顺序执行。
 */
async.eachSeries(arr, function(item, callback) {
    log('1.3 enter: ' + item.name);
    setTimeout(function(){
        log('1.3 handle: ' + item.name);
        callback(null, item.name);
    }, item.delay);
}, function(err) {
    log('1.3 err: ' + err);
});
// 42.247> 1.3 enter: Jack
// 42.459> 1.3 handle: Jack
// 42.459> 1.3 enter: Mike
// 42.569> 1.3 handle: Mike
// 42.569> 1.3 enter: Freewind
// 42.883> 1.3 handle: Freewind
// 42.883> 1.3 err: undefined

/**
 * 如果中途出错，则马上把错误传给最终的callback，还未执行的不再执行。
 */
async.eachSeries(arr,function(item, callback) {
    log('1.4 enter: ' +item.name);
    setTimeout(function() {
        log('1.4 handle: ' + item.name);
        if(item.name==='Jack') {
            callback('myerr');
        }
    }, item.delay);
}, function(err) {
    log('1.4 err: ' + err);
});
// 42.247> 1.4 enter: Jack
// 42.460> 1.4 handle: Jack
// 42.460> 1.4 err: myerr

/**
 * 分批执行，第二个参数是同步执行的上限个数。当有任务完成时，就拿入新任务补充。
 */
async.eachLimit(arr, 2, function(item, callback) {
    log('1.5 enter: ' + item.name);
    setTimeout(function(){
        log('1.5 handle: ' + item.name);
        callback(null, item.name);
    }, item.delay);
}, function(err) {
    log('1.5 err: ' + err);
});
// 42.247> 1.5 enter: Jack
// 42.248> 1.5 enter: Mike
// 42.351> 1.5 handle: Mike             /* 一个任务完成
// 42.352> 1.5 enter: Freewind			/* 立即加入一个新的任务
// 42.461> 1.5 handle: Jack
// 42.664> 1.5 handle: Freewind
// 42.664> 1.5 err: undefined

/**
 * 如果中途出错，错误将马上传给最终的callback。当有任务完成时，依然拿入新任务补充。
 */
async.eachLimit(arr,2,function(item, callback) {
    log('1.6 enter: ' +item.name);
    setTimeout(function() {
        log('1.6 handle: ' + item.name);
        if(item.name==='Jack') {
            callback('myerr');
        }else{
			callback();
		}
    }, item.delay);
}, function(err) {
    log('1.6 err: ' + err);
});
// 42.248> 1.6 enter: Jack
// 42.248> 1.6 enter: Mike
// 42.352> 1.6 handle: Mike
// 42.352> 1.6 enter: Freewind 
// 42.462> 1.6 handle: Jack
// 42.462> 1.6 err: myerr
// 42.463> 1.6 handle: Freewind