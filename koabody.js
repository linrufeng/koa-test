const koa = require('koa');
const koaBody = require('koa-body');
const static = require('koa-static');
const path = require('path');
const fs = require('fs');
const staticPath = './build';

const app = new koa();
app.use(static(
    path.join( __dirname,  staticPath)
));
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
const Router = require('koa-router');
let router = new Router();
router.post('/uploadfile', async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    console.log(file)
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
    console.log(filePath);
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    //reader.pipe(upStream);
    return ctx.body = "上传成功！";
  });
  app.use(router.routes());
  app.listen(3000);
