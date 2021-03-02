const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.urlencoded({
  extended: true
}))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/math', (req, res) => res.render('pages/math'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.post('/math', function (req, res) {
  var firstnumber = Number(req.body.firstnumber);
  var operator = req.body.operator;
  var secondnumber = Number(req.body.secondnumber);
  var total = calc(firstnumber, secondnumber, operator);

  var params = {
    firstnumber: firstnumber,
    secondnumber: secondnumber,
    operator: operator,
    total: total
  };

  res.render('pages/result', params);
})

  app.get('math_service', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  var firstnumber = Number(req.body.firstnumber);
  var operator = req.body.operator;
  var secondnumber = Number(req.body.secondnumber);
  var total = calc(firstnumber, secondnumber, operator);

  res.json([{

    total: total
  }]);
})

function calc(firstnumber, secondnumber, operator) {
  if (operator == '+') {
    total = firstnumber + secondnumber;
  } else if (operator == '-') {
    total = firstnumber - secondnumber;
  } else if (operator == 'x') {
    total = firstnumber * secondnumber;
  } else if (operator == '/') {
    total = firstnumber / secondnumber;
  }
  return total;
}