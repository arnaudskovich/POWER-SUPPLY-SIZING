const e = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  { json } = e,
  dotenv = require("dotenv");

const FixedRegulator = require("./models/FixedRegulator");
const AdjustableRegulator = require("./models/AdjustableRegulator");
const Transformer = require("./models/Transformer");
const Diode = require("./models/Diodes");
const Capacitor = require("./models/Capacitor");
const Resistor = require("./models/Resistor");

dotenv.config();

const app = e();

app.use(cors());

app.post("/size/fixed/unique", json(), async function (req, res) {
  const { vOut, iOut, vIn, vInFrequency } = req.body;
  //START SELECTING APROPRIATED FIXED REGULATOR
  let isFixedRegulator = true;
  let sRegulator = await FixedRegulator.findOne({
    outputVoltage: vOut,
    maxOutputCurrent: { $gte: iOut },
  }).sort({ inputMin: 1 });
  //IF NO FIXED REGULATOR MATCH SELECT ONE FROM ADJUSTABLE
  if (!sRegulator || !sRegulator._id) {
    sRegulator = await AdjustableRegulator.findOne({
      outputMax: { $gt: vOut },
      maxOutputCurrent: { $gte: iOut },
    }).sort({ inputMin: 1 });
    isFixedRegulator = false;
  }
  if (!sRegulator || !sRegulator._id) {
    return res
      .status(200)
      .json({ error: true, message: "Pas de régulateur approprié trouvé" });
  }
  //NOW SHOULD USE VDROP = 2 or max(2, (inputMin-outputMin*)1.5) in case of adjustable regulators
  console.log(sRegulator);
  const vDropByRegulator =
    Math.max(
      2,
      isFixedRegulator
        ? sRegulator.inputMin - sRegulator.outputVoltage
        : sRegulator.inputMin - sRegulator.outputMin
    ) * 1.5;
  //ESTIMATE INPUT VOLTAGE FOR REGULATOR
  const estimatedRegulatorVin = Math.min(
    sRegulator.inputMax,
    vOut + vDropByRegulator
  );
  //EVALUATE RECTIFIER VOLTAGE DROP
  const rectifierVoltageDrop = 0.7 * 2 * 1.2;

  //SELECT TRANSFORMER
  const sTransformer = await Transformer.findOne({
    inputVoltage: { $gte: vIn },
    outputVoltage: {
      $gte: (estimatedRegulatorVin + rectifierVoltageDrop) * 1.05,
    },
    frequency: vInFrequency,
    outputCurrent: { $gte: (iOut * 1.1) / 1000 }, //In Amps
  }).sort({ outputVoltage: 1, inputVoltage: 1, outputCurrent: 1 });
  console.log(estimatedRegulatorVin + rectifierVoltageDrop, sTransformer);

  let rectifierStageMaxVoltage = sTransformer.outputVoltage * 1.5;
  const rectifierStageMinVoltage = estimatedRegulatorVin;
  //SELECT rectifier STAGE AND CALCULATE ELEMENTS
  const rectifier = await Diode.findOne({
    Vrevmax: { $gt: rectifierStageMaxVoltage },
    Ifwd: { $gte: (iOut / 1000) * 1.1 },
  });
  console.log(rectifier);

  //CALCULATE FILTER STAGE AND SELECT APPROPRIATED C value

  let capacityValue =
    (iOut * 1000000) /
    1000 /
    (vInFrequency *
      (sTransformer.outputVoltage -
        2 * rectifier.Vdrop -
        rectifierStageMinVoltage));
  capacityValue = capacityValue.toFixed(0);
  const exponent = Math.pow(10, String(capacityValue).length - 1);
  let capacityValueBtw0And10 = capacityValue / exponent;
  console.log(capacityValue, capacityValueBtw0And10);

  const capValue = await Capacitor.findOne({
    capacity: { $gt: capacityValueBtw0And10 },
    voltage: { $gt: sTransformer.outputVoltage * 1.5 },
    serie: "E192",
  }).sort({ capacity: 1 });

  if (!isFixedRegulator) {
    const resis = eval("(" + sRegulator.calculateResistors + ")(" + vOut + ")");
    console.log(resis);
    // const resN = await Resistor.findOne({resistance:{$gte:resis[2]}})
    sRegulator.calculateResistors = JSON.stringify(resis);
  }

  capValue.capacity *= exponent;
  let capVal = capValue;
  capVal.exponent = exponent;
  console.log(capValue);
  res.status(200).json({
    regulateur: sRegulator,
    filtrage: capVal,
    redresseur: rectifier,
    transformateur: sTransformer,
  });
});

app.post("/size/adjustable/unique", json(), async function (req, res) {
  const { vOutmin, vOutMax, iOut, vIn, vInFrequency } = req.body;
  //START SELECTING APROPRIATED FIXED REGULATOR

  sRegulator = await AdjustableRegulator.findOne({
    outputMax: { $gt: vOutMax },
    maxOutputCurrent: { $gte: iOut },
  }).sort({ inputMin: 1 });

  let isFixedRegulator = false;

  if (!sRegulator || !sRegulator._id) {
    return res
      .status(200)
      .json({ error: true, message: "Pas de régulateur approprié trouvé" });
  }
  //NOW SHOULD USE VDROP = 2 or max(2, (inputMin-outputMin*)1.5) in case of adjustable regulators
  console.log(sRegulator);
  const vDropByRegulator =
    Math.max(
      2,
      isFixedRegulator
        ? sRegulator.inputMin - sRegulator.outputVoltage
        : sRegulator.inputMin - sRegulator.outputMin
    ) * 1.5;
  //ESTIMATE INPUT VOLTAGE FOR REGULATOR
  const estimatedRegulatorVin = Math.min(
    sRegulator.inputMax,
    vOut + vDropByRegulator
  );
  //EVALUATE RECTIFIER VOLTAGE DROP
  const rectifierVoltageDrop = 0.7 * 2 * 1.2;

  //SELECT TRANSFORMER
  const sTransformer = await Transformer.findOne({
    inputVoltage: { $gte: vIn },
    outputVoltage: {
      $gte: (estimatedRegulatorVin + rectifierVoltageDrop) * 1.05,
    },
    frequency: vInFrequency,
    outputCurrent: { $gte: (iOut * 1.1) / 1000 }, //In Amps
  }).sort({ outputVoltage: 1, inputVoltage: 1, outputCurrent: 1 });
  console.log(estimatedRegulatorVin + rectifierVoltageDrop, sTransformer);

  let rectifierStageMaxVoltage = sTransformer.outputVoltage * 1.5;
  const rectifierStageMinVoltage = estimatedRegulatorVin;
  //SELECT rectifier STAGE AND CALCULATE ELEMENTS
  const rectifier = await Diode.findOne({
    Vrevmax: { $gt: rectifierStageMaxVoltage },
    Ifwd: { $gte: (iOut / 1000) * 1.1 },
  });
  console.log(rectifier);

  //CALCULATE FILTER STAGE AND SELECT APPROPRIATED C value

  let capacityValue =
    (iOut * 1000000) /
    1000 /
    (vInFrequency *
      (sTransformer.outputVoltage -
        2 * rectifier.Vdrop -
        rectifierStageMinVoltage));
  capacityValue = capacityValue.toFixed(0);
  const exponent = Math.pow(10, String(capacityValue).length);
  let capacityValueBtw0And10 = capacityValue / exponent;
  console.log(capacityValue, capacityValueBtw0And10);

  const capValue = await Capacitor.findOne({
    capacity: { $gt: capacityValueBtw0And10 },
    voltage: { $gt: sTransformer.outputVoltage * 1.5 },
    serie: "E192",
  });

  capValue.capacity *= exponent;
  let capVal = capValue;
  capVal.exponent = exponent;
  console.log(capValue);
  res.status(200).json({
    regulateur: sRegulator,
    filtrage: capVal,
    redresseur: rectifier,
    transformateur: sTransformer,
  });
});

mongoose.connect("mongodb://localhost:27017/PowerSupplySizing");

app.listen(process.env.PORT);
