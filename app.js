var express = require('express');
var app = express();

app.use(express.json());
app.use(express.static('public'))

app.post('/status', function(req, res){
  res.send({ text: req.body.text });
});

app.listen(3000);
