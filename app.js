//基本的使用

const koa = require('koa');
const app = new koa();

// //中间层

// // const main2 = async res =>{
// //     console.log('1')
// // }


// demo1 打印 hello world 
    
    // app.use(async ctx =>{
    //     ctx.body = 'hello world'
    // });
// demo2 托管静态资源

    const static = require('koa-static');
    const path = require('path');

    const staticPath = './build';
    app.use(static(
        path.join( __dirname,  staticPath)
    ));
// demo3 路由器文件 页面

    
    
        // const main = async res =>{
        //     //get test1  我们发现我们控制台这时候 是可以打印 1 的，但是 接口请求返回的是 404
        //     console.log('1')
        // }
        // const main2 = async ctx =>{
        //     // get test2 我们发现 我们接口返回了 我们要写的
        //     ctx.response.body = 'hello world'
        // }
        // 第一种写法 最基本的功能实现     
            // const router = require('koa-route');         
            // app.use(router.get("/test1", main))            
            // app.use(router.get("/test2", main2))
        // 第二种写法 链式写法
            //const Router = require('koa-router');    
            // let router2 = new Router();
            // router2
            //     .get("/test1",main)
            //     .get("/test2",main2);
            // app.use(router2.routes())
        // 第三种方法 链式写法 分类
            // const Router = require('koa-router');
            // let router3 = new Router();
            // router3
            //     .get("/test1",main)
            //     .get("/test2",main2)
            // let router4 = new Router();
            // router4
            //     .get("/test3",main)
            //     .get("/test4",main)
            // //主路由
            // let mainRouter = new Router();
            // mainRouter.use(router3.routes()).use(router4.routes())
            // app.use(mainRouter.routes())

    // demo4 如何获取用户信息
            const main = async ctx =>{
                //get test1  我们发现我们控制台这时候 是可以打印 1 的，但是 接口请求返回的是 404
                
                console.log('1')
            }
            const main2 = async (ctx,next) =>{
                // get test2 我们发现 我们接口返回了 我们要写的               
                let ctxQuery = ctx.query;
                let ctxQueryStr = ctx.querystring;
                //错误处理
                
                ctx.response.body = {
                    test:"hello world!",
                    code:0,
                    data:{
                        ctxQuery,ctxQueryStr
                    }
                }
            }
            const Router = require('koa-router');
            let router3 = new Router();
            router3
                .get("/test1",main)
                .get("/test2",main2)
            let router4 = new Router();
            router4
                .get("/test3",main)
                .get("/test4",main)
            //主路由
            //移动到 demo 7 
    // demo 5 重定向
            // let redirectRote = new Router();
            // const main5 =  ctx => {
               
            //     ctx.response.body = '<a href="/">Index Page</a>';
            //     ctx.response.redirect('/');
            // };
            // redirectRote.get("/test5",main5)
            // app.use(redirectRote.routes())
    // demo 6 中间件栈
        const one = (ctx, next) => {
        //ctx.throw(500); //demo 9 测试用例
            console.log('>> one');
            next();
            console.log('<< one');
        }
        
        const two = (ctx, next) => {
            console.log('>> two');
            next(); 
            console.log('<< two');
        }
        
        const three = (ctx, next) => {
            console.log('>> three');
            next();
            //ctx.throw(500);
            console.log('<< three');
           
        }
    //demo 9 中间件错误处理
        const handler = async(ctx,next) => {
            try{
                await next();
            } catch (err) {
                ctx.response.status = err.statusCode || err.status || 500;
                ctx.response.body = {
                  message: err.message
                };
                ctx.app.emit('error', err, ctx);
            }
        }
        //然后在 compose 中添加 我们把他添加到最外层然后在 mian2中执行看下
        // app.use(one);
        // app.use(two);
        // app.use(three);
    // dome 10 链接数据库 
        const monk = require('monk');
        const mongodb = monk('localhost/huiwei');
        const user = mongodb.get('userInfoList')
        //必须异步操作，不然读不出来数据
        const main3 = async ctx => {
            const data1 = await user.find()
            console.log(data1)
            //ctx.response.body = data1
        }
    // dome 11 使用 koa-body 上传文件 表单操作
        const koaBody = require('koa-body');
        const fromRoute = new Router();
        const froms = async (ctx,next) =>{
            const files = ctx.request.body.files || {};
            console.log(files)
        }
        fromRoute.post('/test5',froms);
        //一定要先把koaBody 中间件 写在最外层 
        app.use(koaBody({multipart: true}))
        app.use(fromRoute.routes());
    // demo 7 中间件合成
        const compose = require('koa-compose');
        const addAll = compose([handler,one,two,three,main3]);
    //，所有例子的中间件都是同步的，不包含异步操作。如果有异步操作（比如读取数据库），中间件就必须写成 async 函数
    //例如读取数据库
        app.on('error', function(err) {
            console.log('logging error ', err.message);
            console.log(err);
        });
        app.use(addAll);
        let mainRouter = new Router();
        mainRouter.use(router3.routes()).use(router4.routes())
        app.use(mainRouter.routes())
// 添加接口 the end
app.listen(3000)