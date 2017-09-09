const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: "",
  database: "library"
})
connection.connect();
const cors = require('cors');
//this is code to accept

const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
// app.get('/', function(req,res){
//   console.log('hello');
//   res.end('jet.com wold');
// };

app.get('/randomfight/:player1/:player2', function(req,res){
  var p1 = req.params.player1;
  var p2 = req.params.player2;
  console.log('Receive request to fight for players', p1, p2);
  if (Math.random() > 0.5) res.end(p1+ ' wins');
  else res.end(p2+' wins!');

});





app.get('/classics',function (req,res) {

  connection.query('SELECT * from classics', function(err, books){
    if (err) res.send(500);
    res.json(books);
  });
});

app.get('/authors',function (req,res) {

  connection.query('SELECT * from authors', function(err, authors){
    if (err) res.send(500);
    res.json(authors);
  });
});

app.post('/classics',function (req,res) {
console.log(req.body);
let query = `Insert INTO classics(author_id, title, type, year) `+
`VALUES(${req.body.author_id}, '${req.body.title}', '${req.body.category}', '${req.body.title}')`
console.log(query);
connection.query(query, function (err, result) {
  if (err){
    console.log(err);
    return res.send(500)
  }
  res.send('Success')

  });
});

app.post('/authors',function (req,res) {
console.log(req.body);
let query = `Insert INTO authors(first_name, last_name, nationality) `+
`VALUES(${req.body.first_name}, '${req.body.last_name}', '${req.body.nationality}')`
console.log(query);
connection.query(query, function (err, result) {
  if (err){
    console.log(err);
    return res.send(500)
  }
  res.send('Success')

  });
});

app.put('/classics/:id', function(req,res){
  let id = req.params.id;
  let rb = req.body;
  let query = 'Update classics SET ? WHERE id='+connection.escape(id);
  // if (rb.author_id) query += `author_id=${rb.author_id},`;
  // if (rb.title) query += `title='${rb.title}',`;
  // if (rb.year) query += `year='${rb.year}',`;
  // if (rb.category) query += `category='${rb.category}',`;
// query = query.substr(0,query.length-1);
// query += `WHERE id=${id}`;

  // `author_id=${rb.author_id}, title='${}', category=${}`  ;

  connection.query(query, function(err, rows) {
    if (err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send('Success updating id: '+id);
  });
});

app.delete('/classics/:id', function(req, res){
  let query = `Delete from classics WHERE id=${req.params.id}`;
  connection.query(query, function(err, result){
    if (err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send('Successfully deleted id: ' +req.params.id);
  })

})

app.delete('/authors/:id', function(req, res){
  let query = `Delete from authors WHERE id=${req.params.id}`;
  connection.query(query, function(err, result){
    if (err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send('Successfully deleted id: ' +req.params.id);
  })

})

app.listen(1337);
console.log("Server listening on port 1337");
