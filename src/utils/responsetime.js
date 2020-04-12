const fs = require('fs');

const saveLogs = (logs) => {
  const a = '\n';
  const dataJSON = `${logs}${a}`;
  fs.appendFileSync('logs.json', dataJSON);
};
const addLog = (method, path, statusCode, elapsedTimeInMs) => {
  const a = '\t\t';
  const log = `${method}${a}${path}${a}`;
  const logs = `${log}${statusCode}${a}${elapsedTimeInMs}ms`;
  saveLogs(logs);
};
function logResponseTime(req, res, next) {
  const startHrTime = process.hrtime();
  let path = '';
  res.on('finish', () => {
    const elapsedHrTim = process.hrtime(startHrTime);
    const elapsedTimeInM = Math.round(elapsedHrTim[0] * 1000 + elapsedHrTim[1] / 1e6);
    const elapsedTimeInMs = elapsedTimeInM.toString().padStart(2, 0);
    if (req.path === '/api/v1/on-covid-19/') {
      path = '/api/v1/on-covid-19';
    } else {
      path = req.path;
    }
    addLog(req.method, path, res.statusCode, elapsedTimeInMs);
  });
  next();
}

module.exports = logResponseTime;
