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
  const cis = given.reportedCases * 50;
  const ibrts = cis * (2 ** time);
  const scbrts = Math.floor(0.15 * ibrts);

  return {
    data: given,
    impact: {
      currentlyInfected: cii,
      infectionsByRequestedTime: ibrti,
      severeCasesByRequestedTime: scbrti,
      hospitalBedsByRequestedTime: Math.floor((0.35 * given.totalHospitalBeds) - (scbrti))-1
    },
    severeImpact: {
      currentlyInfected: cis,
      infectionsByRequestedTime: ibrts,
      severeCasesByRequestedTime: scbrts,
      hospitalBedsByRequestedTime: Math.floor((0.35 * given.totalHospitalBeds) - (scbrts))-1
    }
  };
};

export default covid19ImpactEstimator;
