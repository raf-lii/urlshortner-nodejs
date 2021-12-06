require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
// const mongoose = require('mongoose');
const UrlModel = require('./models/UrlModel');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  const random = Math.floor(Math.random() * 10000);

  dns.lookup(url, (err, address, family) => {

    if(err){
      res.json({error: "invalid url"});
    }else{
      const input = UrlModel.connected({original_url: url, short_url: random});
      input.save()
        .then(result => {
          console.log(result);
          res.json({original_url: url, short_url:random});
        });
    }

  });
});

app.get('/api/shorturl/:url', (req,res) => {
  
  const url = parseInt(req.params.url);
  const data = UrlModel.connected;
  data.find({short_url: url})
    .then(result => {
      res.redirect("http://" + result[0]["original_url"]);
    })
    
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
