
/**
 * 中间件的执行顺序
 */

/**
 * 第一个例子
 */

//错误示例1
// let funPromise = function (time) {
//    return new Promise(function (resolve, reject) {
//        //Pending 进行中
//        setTimeout(function () {
//            resolve(); // Resolved（已完成，又称 Fulfilled）
//        }, time);
//    })
// };

// let funAsync = async function () {
//    let numArr = [1000, 2000, 3000];
//     // 会报错 await没有在async函数中
//    numArr.forEach(function(value, index){
//        await funPromise(value);
//    })
// }

// funAsync();
//大家看到了这个例子不能执行

//错误示例2
// let funPromise = function (time) {
//    return new Promise(function (resolve, reject) {
//        //Pending 进行中
//        setTimeout(function () {
//            resolve(time + ' : ' + new Date()); ; // Resolved（已完成，又称 Fulfilled）
//        }, time);
//    })
// };

// let funAsync = async function () {
//    let numArr = [5000, 3000, 1000];
//    numArr.forEach(async function(value, index){
//        let result = await funPromise(value);
//        console.log(result);
//    })
// }

// funAsync();

//正确示范
// let funPromise = function (time) {
//    return new Promise(function (resolve, reject) {
//        //Pending 进行中
//        setTimeout(function () {
//            // Resolved（已完成，又称 Fulfilled）
//            resolve(time + ' : ' + new Date());
//        }, time);
//    })
// };

// let funAsync = async function () {
//    let numArr = [1003, 1002, 1001];
//    // 三个funPromise()操作将是继发执行
//    for (let value of numArr){
//        console.log(value)
//        let result = await funPromise(value);
//        console.log(result);
//    }
//    console.log('zhenyulei')
// }

// funAsync();



/**
 * 第二个例子
 */
// let funPromise = function (time) {
//    return new Promise(function (resolve, reject) {
//        //Pending 进行中
//        setTimeout(function () {
//            resolve(); // Resolved（已完成，又称 Fulfilled）
//        }, time);
//    })
// };

// let funAsync = async function () {
//    // 在这里使用起来就像同步代码那样直观
//    console.log('start:  ' + new Date());
//    await funPromise(3000);
//    console.log('end:  '  + new Date());
// };

// funAsync();

/**
 * 第三个例子
 */
// let funPromise = function (time) {
//    return new Promise(function (resolve, reject) {
//        //Pending 进行中
//        setTimeout(function () {
//            resolve(); // Resolved（已完成，又称 Fulfilled）
//        }, time);
//    })
// };

// let funAsync_1 = async function () {
//    console.log('funAsync_1_start:  ' + new Date());
//    await funPromise(3000);
//    console.log('funAsync_1_end:  '  + new Date());
// };

// let funAsync_2 = async function () {
//    console.log('funAsync_2_start:  ' + new Date());
//    //等待 funAsync_1() 中的 Promise 运行结束
//    await funAsync_1();
//    console.log('funAsync_2_end:  '  + new Date());
// };

// funAsync_2();





/**
 * 注意点
 */
let funPromise = function (time) {
    return new Promise(function (resolve, reject) {
        //Pending 进行中
        setTimeout(function () {
            reject('1'); // 从 pending 变为 rejected
        }, time);
    })
};

let funAsync = async function () {
    console.log('start:  ' + new Date());
    try {
        await funPromise(3000);
        console.log('2');
    }  catch (err) {
        console.log(err);
    }
    console.log('end:  '  + new Date());
};

funAsync();