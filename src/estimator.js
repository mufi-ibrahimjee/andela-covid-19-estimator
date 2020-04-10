const covid19ImpactEstimator = (data) => {
  const given = data;
  let time = 0;
  if (given.periodType === 'days') {
    time = given.timeToElapse / 3;
  }
  if (given.periodType === 'weeks') {
    time = (given.timeToElapse * 7) / 3;
  }
  if (given.periodType === 'months') {
    time = (given.timeToElapse * 30) / 3;
  }
  const timea = Math.trunc(time);
  const cii = given.reportedCases * 10;
  const ibrti = cii * (2 ** timea);
  const scbrti = 0.15 * ibrti;
  const calci = ibrti * given.region.avgDailyIncomePopulation;
  const cis = given.reportedCases * 50;
  const ibrts = cis * (2 ** timea);
  const scbrts = 0.15 * ibrts;
  const calcs = ibrts * given.region.avgDailyIncomePopulation;
  const time1 = time * 3;
  const difhi = parseFloat(((calci * given.region.avgDailyIncomeInUSD) / time1).toFixed(0)) - 1;
  const difhs = parseFloat(((calcs * given.region.avgDailyIncomeInUSD) / time1).toFixed(0)) - 1;

  return {
    data: given,
    impact: {
      currentlyInfected: cii,
      infectionsByRequestedTime: ibrti,
      severeCasesByRequestedTime: scbrti,
      hospitalBedsByRequestedTime: Math.trunc((0.35 * given.totalHospitalBeds) - (scbrti)),
      casesForICUByRequestedTime: Math.trunc(0.05 * ibrti),
      casesForVentilatorsByRequestedTime: Math.trunc(0.02 * ibrti),
      dollarsInFlight: difhi
    },
    severeImpact: {
      currentlyInfected: cis,
      infectionsByRequestedTime: ibrts,
      severeCasesByRequestedTime: scbrts,
      hospitalBedsByRequestedTime: Math.trunc((0.35 * given.totalHospitalBeds) - (scbrts)),
      casesForICUByRequestedTime: Math.trunc(0.05 * ibrts),
      casesForVentilatorsByRequestedTime: Math.trunc(0.02 * ibrts),
      dollarsInFlight: difhs

    }
  };
};

module.exports = covid19ImpactEstimator;
