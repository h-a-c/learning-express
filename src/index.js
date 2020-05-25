const express = require('express')
const app = express()
const path = require('path')

//Load View Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');


app.get('/', function(req, res) {
	let articles = [
	{
		id:1,
		title: 'Article One',
		author: 'h-a-c',
		body: 'article one test'
	},
	{
		id:2,
		title: 'Article Two',
		author: 'k-s',
		body: 'article two test'
	},
	{
		id:3,
		title: 'Article Three',
		author: 'h-a-c',
		body: 'article three test'
	}
	];
	res.render('index',{
		title: 'title',
		articles: articles
	});
});

app.get('/articles/add', function(req, res) {
	res.render('add_article', {
		title:'Add Article'
	})
})

app.listen(3000, function(){
	console.log('server listening on 3000');
});

