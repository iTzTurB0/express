const express = require('express');
const app = express();
const port = 3000;

const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day > 0 && day < 6 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(checkWorkingHours);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
