const fs = require('fs');

const saveLogs = (logs) => {
  const dataJSON = logs + '\r\n';
  fs.appendFileSync('logs.json', dataJSON);
};
const addLog = (method, path, statusCode, elapsedTimeInMs) => {
  const log = method + '\t\t' + path + '\t\t';
  const logs = log + statusCode + '\t\t' + elapsedTimeInMs + ' ' + 'ms';
  saveLogs(logs);
};
function logResponseTime(req, res, next) {
  const startHrTime = process.hrtime();
  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6) * 100;
    if (req.path !== '/api/v1/on-covid-19/logs') {
      addLog(req.method, req.path, res.statusCode, elapsedTimeInMs);
    }
  });
  next();
}

module.exports = logResponseTime;
