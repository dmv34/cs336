var express = require('express');
var app = express();
var http_status = require('http-status-codes');
var bodyParser = require('body-parser')

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(3000, function (req, res) {
  console.log('Example app listening on port 3000!');
});

app.get('/request', function(req, res) {
  res.send("Hello Request")
});

app.head('/request', function(req, res) {
  res.send("Got a HEAD request")
});

app.put('/request', function(req, res) {
  res.send("Got a PUT request")
});

app.post('/request', function(req, res) {
  res.send("Got a POST request")
});

app.delete('/request', function(req, res) {
  res.send("Got a DELETE request")
});

app.all('*', function(req, res){
  res.sendStatus(http_status.NOT_ACCEPTABLE)
});
