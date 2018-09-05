//注意这里是后台，没有window对象
let bodyParser = require('body-parser');
//对数据进行解析
//本地数据
let data = [
    {item: '浙江农林大学'},
    {item: '今天很残酷，明天更残酷，后天很美好'},
    {item: '世上本没有路，走的人多了也就成了路'}
];


//写业务逻辑
function todoController(app){
    let urlencodeParser = bodyParser.urlencoded({extended: false});
    let bp = bodyParser.json();
    //获取数据
    app.get('/todo', function(req, res){
        res.render('todo', {toDos: data});
    });
    //传递数据
    app.post('/todo', urlencodeParser,function(req, res){
        if(!req.body) return res.sendStatus(400);
        //post请求可以用req.body来接收
       console.log(req.body);
       data.unshift(req.body);
    });
    //删除数据
    app.delete('/todo/:item', function(req, res){
        //console.log(req.params.item);
        data = data.filter(function(todo){
            return req.params.item !== todo.item;
        });
        res.json(data);
    });
}

module.exports = todoController;