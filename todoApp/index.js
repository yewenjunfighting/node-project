//项目主入口
let express = require('express');

//引入自定义的模块
let todoController = require('./controller/todoController');

let index = express();

//设置视图引擎,使用ejs模板

index.set('view engine', 'ejs');

index.use(express.static('./public'));

todoController(index);
index.listen(1131);

console.log('serve is working');

