function calculateMean(array) {
  return array.reduce((acc, value) => {
    return acc + value;
  }, 0) / array.length;
}

function calculateStandardDeviation(array, mean) {
  return Math.sqrt(array.reduce((acc, value) => {
    return acc + Math.pow(value - mean, 2);
  }, 0) / array.length);
}

function evaluateTemp(array, temp) {
  const mean = calculateMean(array);
  const stdDeviation = calculateStandardDeviation(array, mean);

  const withinHalfDegree = Math.abs(mean - temp) <= 0.5;

  if (withinHalfDegree && stdDeviation < 3) {
    return 'ultra precise';
  } else if (withinHalfDegree && stdDeviation < 5) {
    return 'very precise';
  } else {
    return 'precise';
  }
}

function evaluateHumidity(array, humidity) {
  return array.every((dataPoint) => {
    return Math.abs(dataPoint - humidity) <= 1;
  }) ? 'keep' : 'discard';
}

function evaluateLogFile(logFile) {
  const data = logFile.split('\n');

  const [, temp, humidity] = data.shift().split(' ');
  const groupedData = {};
  const result = {};

  let currentCategory;

  for (let line = 0; line < data.length; line++) {
    if (data[line][0] === 't' || data[line][0] === 'h') {
      currentCategory = data[line].split(' ')[1];
      groupedData[currentCategory] = [];
    } else {
      groupedData[currentCategory].push(parseFloat(data[line].split(' ')[1]));
    }
  };

  for (let category in groupedData) {
    result[category] = category[0] === 't' ?
      evaluateTemp(groupedData[category], temp) : evaluateHumidity(groupedData[category], humidity);
  }

  return result;
}

module.exports = evaluateLogFile;
