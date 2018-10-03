//注意这里是后台，没有window对象
let mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://todoapp:19971001abcABC@ds121753.mlab.com:21753/todo');
//创建图表
let todo_schema = new mongoose.Schema({
    item: String
});

//往数据库里存数据
//mlab会自动将todo的首字母变为大写，然后加上s充当表名
let Todo = mongoose.model('Todo', todo_schema);
//save这个函数的参数是一个回调函数
// Todo({item: 'Hello world'}).save(function(err, data){
//     if(err)throw err;
//     console.log(data + "is saved");
// });
let bodyParser = require('body-parser');
//对数据进行解析
//本地数据
// let data = [
//     {item: '浙江农林大学'},
//     {item: '今天很残酷，明天更残酷，后天很美好'},
//     {item: '世上本没有路，走的人多了也就成了路'}
// ];


//写业务逻辑
function todoController(app){
    let urlencodeParser = bodyParser.urlencoded({extended: false});
    let bp = bodyParser.json();
    //获取数据
    app.get('/todo', function(req, res){
        //当Todo这个表里去找数据，然后作为参数传到todo页面里
        //find的第一个参数为空对象的是因为要找出数据库里的所有数据
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {toDos: data});
        });
    });
    //传递数据
    app.post('/todo', urlencodeParser,function(req, res){
        if(!req.body) return res.sendStatus(400);
        //post请求可以用req.body来接收
       //req.body是要被存储的数据
       Todo(req.body).save(function(err, data){
           if(err)throw err;
           console.log(req.body + "is saved");
           res.json(data);
       });
       //data.unshift(req.body);
    });
    //删除数据
    app.delete('/todo/:item', function(req, res){
        //console.log(req.params.item);
        Todo.find({item: req.params.item}).remove(function(err, data){
            if(err) throw err;
            console.log(data, typeof data);
            res.json(data);
        });
        // data = data.filter(function(todo){
        //     return req.params.item !== todo.item;
        // });
        // res.json(data);
    });
}

module.exports = todoController;