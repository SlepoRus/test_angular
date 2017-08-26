var express = require('express');
var data = require('./app/data');
var app = express();

app.listen(9090, (err) => {
  console.log(err || "all running")
})

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/all', (req,res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(200).end(JSON.stringify({data: data.slice(0,20), count: data.length}));
})
app.get('/filter', (req,res) => {
  const { date, status, text, limit, page } = req.query;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  let dateCheck = (n) => {
    if (date !== "0") {
      let dDate = date.split('.');
      let tDate = n.created.split('.');
      if (dDate[0] == tDate[1] && dDate[1] == tDate[2])
      if (dDate[0] == tDate[1] && dDate[1] == tDate[2])
      return true;
    } else { return true }
    return false;
  }

  let openCheck = (n) => {
    if (status == "all") return true;
    if (status == n.status) return true;
    return false;
  }

  let textCheck = (n) => {
    if (text.length == 0) return true;
    if (n.title.includes(text)) return true;
    return false;
  }

  let model = data.filter((n) => {
      if (dateCheck(n) && openCheck(n) && textCheck(n))
      return n;
  });
  return res.status(200).end(JSON.stringify({data:model.slice(limit*(page-1), limit*page), count:model.length}));
})
