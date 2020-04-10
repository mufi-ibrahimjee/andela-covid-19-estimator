const covid19ImpactEstimator = (data) => {
  const given = data;
  let time = 0;
  if (given.periodType === 'days') {
    time = Math.trunc(given.timeToElapse / 3);
  }
  if (given.periodType === 'weeks') {
    time = Math.trunc((given.timeToElapse * 7) / 3);
  }
  if (given.periodType === 'months') {
    time = Math.trunc((given.timeToElapse * 30) / 3);
  }
  const cii = given.reportedCases * 10;
  const ibrti = cii * (2 ** time);
  const scbrti = 0.15 * ibrti;
  const calci = ibrti * given.region.avgDailyIncomePopulation;
  const cis = given.reportedCases * 50;
  const ibrts = cis * (2 ** time);
  const scbrts = 0.15 * ibrts;
  const calcs = ibrts * given.region.avgDailyIncomePopulation;
  const time1 = time * 3;
  const difhi = parseFloat(((calci * given.region.avgDailyIncomeInUSD) / time1).toFixed(2));
  const difhs = parseFloat(((calcs * given.region.avgDailyIncomeInUSD) / time1).toFixed(2));

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
