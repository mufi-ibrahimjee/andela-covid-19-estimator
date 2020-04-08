const covid19ImpactEstimator = (data) => {
    const given = data;
    return {
        data: given,
        impact: {
            currentlyInfected: given.reportedCases * 10,
            infectionsByRequestedTime: currentlyInfected * Math.pow(2, given.timeToElapse / 3)
        },
        severeImpact: {
            currentlyInfected: given.reportedCases * 50,
            infectionsByRequestedTime: currentlyInfected * Math.pow(2, given.timeToElapse / 3)
        }
    };
};
export default covid19ImpactEstimator;