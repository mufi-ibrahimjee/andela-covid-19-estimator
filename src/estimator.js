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
  const calci = ibrti * given.avgDailyIncomePopulation;
  const cis = given.reportedCases * 50;
  const ibrts = cis * (2 ** time);
  const scbrts = Math.floor(0.15 * ibrts);
  const calcs = ibrts * given.avgDailyIncomePopulation;

  return {
    data: given,
    impact: {
      currentlyInfected: cii,
      infectionsByRequestedTime: ibrti,
      severeCasesByRequestedTime: scbrti,
      hospitalBedsByRequestedTime: Math.ceil((0.35 * given.totalHospitalBeds) - (scbrti)),
      casesForICUByRequestedTime: Math.ceil(0.05 * ibrti),
      casesForVentilatorsByRequestedTime: Math.floor(0.02 * ibrti),
      dollarsInFlight: Math.floor(calci * given.avgDailyIncomeInUSD * (time * 3))
    },
    severeImpact: {
      currentlyInfected: cis,
      infectionsByRequestedTime: ibrts,
      severeCasesByRequestedTime: scbrts,
      hospitalBedsByRequestedTime: Math.floor((0.35 * given.totalHospitalBeds) - (scbrts)),
      casesForICUByRequestedTime: Math.floor(0.05 * ibrts),
      casesForVentilatorsByRequestedTime: Math.floor(0.02 * ibrts),
      dollarsInFlight: Math.floor(calcs * given.avgDailyIncomeInUSD * (time * 3))

    }
  };
};

export default covid19ImpactEstimator;
