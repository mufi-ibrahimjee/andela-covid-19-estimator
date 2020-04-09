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
  return {
    data: given,
    impact: {
      currentlyInfected: given.reportedCases * 10,
      infectionsByRequestedTime: (given.reportedCases * 10) * (2 ** time)
    },
    severeImpact: {
      currentlyInfected: given.reportedCases * 50,
      infectionsByRequestedTime: (given.reportedCases * 50) * (2 ** time)
    }
  };
};

export default covid19ImpactEstimator;
