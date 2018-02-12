/**
 * Created by harshmeet on 4/5/17.
 */
var express=require('express');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');

var app=express();
app.set('view engine', 'handlebars');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./routes/index');
app.use('/', routes);

// app.use(function(req, res) {
//     res.status(404);
//     res.render('404');
// });

app.listen(4000, function(){
    console.log('http://localhost:3000');
});

