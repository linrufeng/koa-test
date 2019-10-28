const mongoose = require('./db');
const Schema = mongoose.Schema;
const pinglun = new Schema({
    id:Object,
    name:String,
    msg:String
})
//  评论模版
const pinglunModel = mongoose.model('pinglunlist', pinglun);

const jigou = new Schema({
    name:String,
    msg:String
},{ collection: 'jigoulist' })
// 机构模版
const jigouModel = mongoose.model('',jigou);
// 增加
async function saveJigou(obj){
    let test = new jigouModel(obj)
    let data2 = await  new Promise((resolve,reject)=>{
        test.save((err,res)=>{            
            resolve(res)
        })
    })
    return data2 
}
// 增加
saveJigou({
    name:'海绵家族2',
    
}).then(res=>{
    console.log(res,"李林森")
})