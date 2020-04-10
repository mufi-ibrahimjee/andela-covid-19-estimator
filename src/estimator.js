const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const convert = require('xml-js');
const logResponseTime = require('./utils/responsetime');

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
  res.set('Content-Type', 'text/xml');
  res.send(result).status(200);
  return 0;
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  try {
    const dataBuffer = fs.readFileSync('logs.json');
    const dataJSON = dataBuffer.toString();
    res.send(JSON.parse(dataJSON));
  }
  catch (e) {
    res.send([]);
  }
  return 0;
});

app.listen(port, () => {
});

const covid19ImpactEstimator = (data) => {
  const given = data;
  let time = 0;
  if (given.periodType === 'days') {
    time = Math.floor(given.timeToElapse / 3);
  }
  if (given.periodType === 'weeks') {
    time = Math.floor((given.timeToElapse * 7) / 3);
  }
  if (given.periodType === 'months') {
    time = Math.floor((given.timeToElapse * 30) / 3);
  }
  const cii = given.reportedCases * 10;
  const ibrti = cii * (2 ** time);
  const scbrti = Math.floor(0.15 * ibrti);
  const calci = ibrti * given.region.avgDailyIncomePopulation;
  const cis = given.reportedCases * 50;
  const ibrts = cis * (2 ** time);
  const scbrts = Math.floor(0.15 * ibrts);
  const calcs = ibrts * given.region.avgDailyIncomePopulation;

  return {
    data: given,
    impact: {
      currentlyInfected: cii,
      infectionsByRequestedTime: ibrti,
      severeCasesByRequestedTime: scbrti,
      hospitalBedsByRequestedTime: Math.ceil((0.35 * given.totalHospitalBeds) - (scbrti)),
      casesForICUByRequestedTime: Math.ceil(0.05 * ibrti),
      casesForVentilatorsByRequestedTime: Math.floor(0.02 * ibrti),
      dollarsInFlight: Math.floor(calci * given.region.avgDailyIncomeInUSD * (time * 3))
    },
    severeImpact: {
      currentlyInfected: cis,
      infectionsByRequestedTime: ibrts,
      severeCasesByRequestedTime: scbrts,
      hospitalBedsByRequestedTime: Math.ceil((0.35 * given.totalHospitalBeds) - (scbrts)),
      casesForICUByRequestedTime: Math.ceil(0.05 * ibrts),
      casesForVentilatorsByRequestedTime: Math.floor(0.02 * ibrts),
      dollarsInFlight: Math.floor(calcs * given.region.avgDailyIncomeInUSD * (time * 3))

    }
  };
};

export default covid19ImpactEstimator;
