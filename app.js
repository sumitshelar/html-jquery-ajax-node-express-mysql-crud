const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');



const db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'nodedb'
});

// connect
db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('mysql connected');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

  // Default path or route
  app.get('/', function(req, res) {
    // Deliver html file
    res.sendFile(path.join(__dirname + '/public/index.html'));
    app.use(express.static(__dirname + '/public'));
  });


app.get('/createpoststable', (req, res) => {
	// let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255) PRIMARY KEY id)';
	let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql, (err, result) => {
		if(err){
		throw err;
	}
	console.log(result);
	res.send('Table created Successfully');
	});
});

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});*/

app.get('/addpost1', (req, res) => {
    let post = {title:'Post One', body:'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});

app.post('/insertdata', (req, res) => {
    // req.body, req.params.id
    // console.log(req);

      console.log(req.body.title);
      console.log(req.body.bodycontent);

      var titleis = req.body.title;
      var bodycontent = req.body.bodycontent;
  // always send a response:
        res.json({ ok: true });

/*    console.log("req");
    console.log(req.data);*/
    
    let post = {title: titleis, body: bodycontent};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        // console.log(query + "yupp");
        // res.send(query);
        // res.redirect("/");
    });
});

app.post('/editdata', (req, res) => {

          console.log(req.body.title);
      console.log(req.body.bodycontent);

    var id = req.body.id;
    var titleis = req.body.title;
    var bodycontent = req.body.bodycontent;

    // let post = {title: titleis, body: bodycontent};
    let sql = `UPDATE posts SET title = '${titleis}',body = '${bodycontent}' WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        // console.log(query + "yupp");
        // res.send(query);
        // res.redirect("/");
    });
});

// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title:'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

app.get('/addpost3', (req, res) => {
    // let post = {title:'Post One', body:'This is post number one'};
    // let sql = 'INSERT INTO posts SET ?';
    var sql = "INSERT INTO posts (title, body) VALUES ('Company Inc', 'Highway 37')";
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 3 added...');
    });
});

app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        // console.log(results);
        // res.send('Posts fetched...');
        res.send(results);

    });
});

app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
res.send(result);
    });
});

app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

app.listen('3000', () => {
	console.log('server started on port 3000');
});