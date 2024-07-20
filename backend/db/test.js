const resistors = require("./capacitors.json");
const resistorsObj = [];
const voltages = [
  6.3, 10, 16, 25, 35, 50, 63, 100, 160, 200, 250, 400, 450, 630, 1000,
];

for (const serie in resistors) {
  if (Object.hasOwnProperty.call(resistors, serie)) {
    const { values, tolerance } = resistors[serie];
    for (const capacity of values) {
      for (const voltage of voltages) {
        resistorsObj.push({ inductance: capacity, voltage, tolerance, serie });
      }
    }
  }
}

console.log(JSON.stringify(resistorsObj));
