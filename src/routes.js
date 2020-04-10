const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const convert = require('xml-js');
const logResponseTime = require('./utils/responsetime');
const covid19ImpactEstimator = require('./estimator.js');

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logResponseTime);

app.post('/api/v1/on-covid-19', (req, res) => {
  if (!req.body) {
    return res.send({
      error: 'You must provide data!'
    });
  }
  const a = covid19ImpactEstimator(req.body);
  res.send(a).status(200);
  return 0;
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  if (!req.body) {
    return res.send({
      error: 'You must provide data!'
    });
  }
  const a = covid19ImpactEstimator(req.body);
  res.send(a).status(200);
  return 0;
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  if (!req.body) {
    return res.send({
      error: 'You must provide data!'
    });
  }
  const a = covid19ImpactEstimator(req.body);
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  const result = convert.json2xml(a, options);
  res.set('Content-Type', 'application/xml');
  res.send(result).status(200);
  return 0;
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  try {
    const dataBuffer = fs.readFileSync('logs.json');
    const dataJSON = dataBuffer.toString();
    res.send(JSON.parse(dataJSON));
    res.set('Content-Type', 'text/plain');
  } catch (e) {
    res.send([]);
  }
  return 0;
});

app.listen(port, () => {
});
