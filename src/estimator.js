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
  const time1 = time * 3;
  const difhi = Math.floor((calci * given.region.avgDailyIncomeInUSD) / time1);
  const difhs = Math.floor((calcs * given.region.avgDailyIncomeInUSD) / time1);

  return {
    data: given,
    impact: {
      currentlyInfected: cii,
      infectionsByRequestedTime: ibrti,
      severeCasesByRequestedTime: scbrti,
      hospitalBedsByRequestedTime: Math.ceil((0.35 * given.totalHospitalBeds) - (scbrti)),
      casesForICUByRequestedTime: Math.ceil(0.05 * ibrti),
      casesForVentilatorsByRequestedTime: Math.ceil(0.02 * ibrti),
      dollarsInFlight: Math.round(difhi * 100) / 100
    },
    severeImpact: {
      currentlyInfected: cis,
      infectionsByRequestedTime: ibrts,
      severeCasesByRequestedTime: scbrts,
      hospitalBedsByRequestedTime: Math.ceil((0.35 * given.totalHospitalBeds) - (scbrts)),
      casesForICUByRequestedTime: Math.ceil(0.05 * ibrts),
      casesForVentilatorsByRequestedTime: Math.ceil(0.02 * ibrts),
      dollarsInFlight: Math.round(difhs * 100) / 100

    }
  };
};

module.exports = covid19ImpactEstimator;
