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
  const scbrti = 0.15 * ibrti;
  const cis = given.reportedCases * 50;
  const ibrts = cis * (2 ** time);
  const scbrts = 0.15 * ibrts;

  return {
    data: given,
    impact: {
      currentlyInfected: cii,
      infectionsByRequestedTime: ibrti,
      severeCasesByRequestedTime: scbrti,
      hospitalBedsByRequestedTime: (0.35 * given.totalHospitalBeds) - (scbrti)
    },
    severeImpact: {
      currentlyInfected: cis,
      infectionsByRequestedTime: ibrts,
      severeCasesByRequestedTime: scbrts,
      hospitalBedsByRequestedTime: (0.35 * given.totalHospitalBeds) - (scbrts)
    }
  };
};

export default covid19ImpactEstimator;
