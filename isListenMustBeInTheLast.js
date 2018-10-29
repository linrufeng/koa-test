//listen可以放到开始么
const koa = require('koa');
const app = new koa();
//把监听接口写在最前
app.listen(3015);
//中间间
const main1 = ()=>{
    console.log(1)
}

const test1 = async (ctx,next) => {
    ctx.body = "hello world 1"
}
const test2 = async (ctx,next) => {
    ctx.body = "hello world 2"
}
//然后使用一个路由
const route = require("koa-router");
const route1 = new route();
route1
    .get("/",test1)
    .get("/2",test2);
 app.use(route1.routes())
//中间件 合成

const compose = require('koa-compose');
const addAll = compose([main1]);
   
app.use(addAll);