async_demo
==========

A demo for async.

+ http://blog.fens.me/nodejs-async/
+ http://blog.fens.me/nodejs-async-timer/

INSTALL
===========================

```{bash}
git clone https://github.com/bsspirit/async_demo.git
cd  async_demo
```

Change Log
===================================

参考async@0.2.9版本的规范

https://github.com/caolan/async

1. forEach.js改名为each.js
2. each.js文件中的async.forEach，改为async.each
3. map.js增加mapLimit函数
4. filter_reject.js对注释补充
5. filter_reject.js增加rejectSeries函数
6. reduce.js增加注释
7. detect.js增加注释
8. sortBy.js增加注释
9. some.js对注释补充
10. every.js对注释补充和修改
11. series.js调整注释格式
12. parallel.js调整注释格式
13. parallel.js增加parallelLimit函数
14. whilist_until.js调整注释格式
15. whilist_until.js增加doWhilst函数
16. whilist_until.js增加doUntil函数
17. whilist_until.js增加forever函数
18. waterfall.js调整注释格式
19. 增加compose.js文件
20. apply.js补充注释并增加一个实例
21. 修改nextTick.js实例
22. 增加times.js文件，包括times和timesSeries函数
23. 修改iterator.js实例
24. 修正auto.js关于第二个实例的错误解释
25. 修改queue.js实例和注释
26. 修改cargo.js文件
27. 增加applyEach.js文件
28. 修改utils.js实例和注释


Change Log
===================================

参考async@2.1.2版本的规范

1.filter_reject.js 修正回调函数, 如:callback(null, test)
