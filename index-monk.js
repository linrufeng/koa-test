const db = require('monk')('localhost/schools')

const jigoulist = db.get('jigoulist');

jigoulist.insert({name:'小豆豆',msg:"成长是需要陪伴的"})