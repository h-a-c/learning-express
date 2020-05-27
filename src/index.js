const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
let Article = require('../models/article')
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set public folder 
app.use(express.static(path.join(__dirname, '../public')))

//Check connection
db.once('open', function() {
	console.log('Connected to MongoDB')
});
//Check db errors
db.on('error', function(err){
	console.log(err);
});

//Load View Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');


app.get('/', function(req, res) {
	Article.find({}, function(err, articles){
		res.render('index',{
			title: 'title',
			articles: articles
		});	
	});
	
});

//get an article
app.get('/article/:id', function(req, res) {
	Article.findById(req.params.id, function(err, article){
		if(err) {
			console.log(err);
		} else {
			res.render('article', {
				article:article
			})
		}
	});

})

// post request
app.post('/articles/add', function(req, res) {
	let article = new Article();
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;
	article.save(function(err){
		if(err){
			console.log(err)
		} else {
			res.redirect('/')
		}
	});
	return article;
})

// get request
app.get('/articles/add', function(req, res) {
	res.render('add_article', {
		title:'Add Article'
	})
})

app.listen(3000, function(){
	console.log('server listening on 3000');
});

