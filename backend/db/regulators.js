const Regulators = {
    fixed: [
        {
            name: "LM7805",
            inputMin: 7,
            inputMax: 35,
            outputVoltage: 5,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 65,
        },
        {
            name: "LM7812",
            inputMin: 14.5,
            inputMax: 35,
            outputVoltage: 12,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 65,
        },
        {
            name: "LM7905",
            inputMin: -35,
            inputMax: -7,
            outputVoltage: -5,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 65,
        },
        {
            name: "LM7912",
            inputMin: -35,
            inputMax: -14.5,
            outputVoltage: -12,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 65,
        },
        {
            name: "LM1117-3.3",
            inputMin: 4.5,
            inputMax: 12,
            outputVoltage: 3.3,
            maxOutputCurrent: 800,
            maxPowerDissipation: 1500,
            maxTemperature: 125,
            TJA: 50,
        },
        {
            name: "LM1117-5.0",
            inputMin: 4.5,
            inputMax: 12,
            outputVoltage: 5.0,
            maxOutputCurrent: 800,
            maxPowerDissipation: 1500,
            maxTemperature: 125,
            TJA: 50,
        },
        {
            name: "LM2940-5.0",
            inputMin: 6,
            inputMax: 26,
            outputVoltage: 5.0,
            maxOutputCurrent: 1000,
            maxPowerDissipation: 1500,
            maxTemperature: 125,
            TJA: 40,
        },
        {
            name: "LM317T",
            inputMin: 3,
            inputMax: 40,
            outputVoltage: 1.25,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 60,
        },
        {
            name: "LM338",
            inputMin: 4,
            inputMax: 40,
            outputVoltage: 1.2,
            maxOutputCurrent: 5000,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
        },
        {
            name: "LM350",
            inputMin: 3,
            inputMax: 35,
            outputVoltage: 1.2,
            maxOutputCurrent: 3500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
        },
        {
            name: "LM2937-5.0",
            inputMin: 6,
            inputMax: 26,
            outputVoltage: 5.0,
            maxOutputCurrent: 500,
            maxPowerDissipation: 1000,
            maxTemperature: 125,
            TJA: 70,
        },
        {
            name: "LM317L",
            inputMin: 4.2,
            inputMax: 12,
            outputVoltage: 1.25,
            maxOutputCurrent: 100,
            maxPowerDissipation: 800,
            maxTemperature: 125,
            TJA: 60,
        },
        {
            name: "LM7815",
            inputMin: 17,
            inputMax: 35,
            outputVoltage: 15,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 65,
        },
        {
            name: "LM7824",
            inputMin: 26.5,
            inputMax: 35,
            outputVoltage: 24,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 65,
        },
        {
            name: "LM7809",
            inputMin: 11,
            inputMax: 35,
            outputVoltage: 9,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 65,
        },
        {
            name: "LM723",
            inputMin: 8,
            inputMax: 40,
            outputVoltage: 5,
            maxOutputCurrent: 2000,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 60,
        },
        {
            name: "LM7808",
            inputMin: 10,
            inputMax: 35,
            outputVoltage: 8,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 65,
        },
        {
            name: "LM7820",
            inputMin: 22,
            inputMax: 35,
            outputVoltage: 20,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 65,
        },
        {
            name: "LM2940-12",
            inputMin: 14,
            inputMax: 26,
            outputVoltage: 12,
            maxOutputCurrent: 1000,
            maxPowerDissipation: 1500,
            maxTemperature: 125,
            TJA: 40,
        },
        {
            name: "LM2937-3.3",
            inputMin: 4.5,
            inputMax: 26,
            outputVoltage: 3.3,
            maxOutputCurrent: 500,
            maxPowerDissipation: 1000,
            maxTemperature: 125,
            TJA: 70,
        },
        {
            name: "LM2917",
            inputMin: 5,
            inputMax: 35,
            outputVoltage: 5,
            maxOutputCurrent: 1000,
            maxPowerDissipation: 1000,
            maxTemperature: 125,
            TJA: 60,
        }
    ],
    adjustable: [
        {
            name: "LM317",
            inputMin: 3,
            inputMax: 40,
            outputMin: 1.25,
            outputMax: 37,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 60,
            calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LM338",
            inputMin: 4,
            inputMax: 40,
            outputMin: 1.2,
            outputMax: 32,
            maxOutputCurrent: 5000,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
            calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LM350",
            inputMin: 4.25,
            inputMax: 35,
            outputMin: 1.2,
            outputMax: 33,
            maxOutputCurrent: 3000,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
            calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LT3080",
            inputMin: 1.2,
            inputMax: 36,
            outputMin: 0,
            outputMax: 34.5,
            maxOutputCurrent: 1300,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
            calculateResistors: (Vout, Vref = 0.6, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LM1117-ADJ",
            inputMin: 4.5,
            inputMax: 20,
            outputMin: 1.25,
            outputMax: 13.8,
            maxOutputCurrent: 800,
            maxPowerDissipation: 1500,
            maxTemperature: 125,
            TJA: 50,
            calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "L200",
            inputMin: 2.75,
            inputMax: 40,
            outputMin: 2.85,
            outputMax: 36,
            maxOutputCurrent: 2000,
            maxPowerDissipation: 20000,
            maxTemperature: 150,
            TJA: 60,
            calculateResistors: (Vout, Vref = 2.77, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LT3083",
            inputMin: 1.2,
            inputMax: 23,
            outputMin: 0,
            outputMax: 22,
            maxOutputCurrent: 3000,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
            calculateResistors: (Vout, Vref = 1.0, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "TPS7A4700",
            inputMin: 3,
            inputMax: 36,
            outputMin: 1.4,
            outputMax: 34,
            maxOutputCurrent: 1000,
            maxPowerDissipation: 1500,
            maxTemperature: 125,
            TJA: 45,
            calculateResistors: (Vout, Vref = 1.4, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "ADP7182",
            inputMin: -2.7,
            inputMax: -28,
            outputMin: -1.22,
            outputMax: -27,
            maxOutputCurrent: 200,
            maxPowerDissipation: 1000,
            maxTemperature: 125,
            TJA: 60,
            calculateResistors: (Vout, Vref = -1.22, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LT3085",
            inputMin: 0,
            inputMax: 36,
            outputMin: 0,
            outputMax: 35.5,
            maxOutputCurrent: 500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
            calculateResistors: (Vout, Vref = 1.0, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "TL783",
            inputMin: 3,
            inputMax: 125,
            outputMin: 1.25,
            outputMax: 125,
            maxOutputCurrent: 700,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 50,
            calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LP2951",
            inputMin: 2.3,
            inputMax: 30,
            outputMin: 1.235,
            outputMax: 29.3,
            maxOutputCurrent: 100,
            maxPowerDissipation: 1000,
            maxTemperature: 125,
            TJA: 80,
            calculateResistors: (Vout, Vref = 1.235, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LDO 723",
            inputMin: 2,
            inputMax: 36,
            outputMin: 0,
            outputMax: 34,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 50,
            calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LT1764A",
            inputMin: 2.7,
            inputMax: 20,
            outputMin: 1.21,
            outputMax: 19.2,
            maxOutputCurrent: 3000,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
            calculateResistors: (Vout, Vref = 1.21, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LT1963A",
            inputMin: 2.1,
            inputMax: 20,
            outputMin: 1.2,
            outputMax: 19,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 50,
            calculateResistors: (Vout, Vref = 1.2, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LT3081",
            inputMin: 1.2,
            inputMax: 36,
            outputMin: 0,
            outputMax: 34.5,
            maxOutputCurrent: 1500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
            calculateResistors: (Vout, Vref = 0.6, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LT3086",
            inputMin: 1.2,
            inputMax: 36,
            outputMin: 0,
            outputMax: 34.5,
            maxOutputCurrent: 2500,
            maxPowerDissipation: 15000,
            maxTemperature: 125,
            TJA: 40,
            calculateResistors: (Vout, Vref = 0.6, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LT1117-ADJ",
            inputMin: 4.75,
            inputMax: 20,
            outputMin: 1.25,
            outputMax: 13.8,
            maxOutputCurrent: 800,
            maxPowerDissipation: 1500,
            maxTemperature: 125,
            TJA: 50,
            calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        },
        {
            name: "LT1964",
            inputMin: 1.8,
            inputMax: 20,
            outputMin: 1.2,
            outputMax: 19,
            maxOutputCurrent: 200,
            maxPowerDissipation: 1000,
            maxTemperature: 125,
            TJA: 50,
            calculateResistors: (Vout, Vref = 1.2, R1 = 240) => {
                const R2 = ((Vout / Vref) - 1) * R1;
                return { R1, R2 };
            }
        }
    ]
};

const AdditionalRegulators = {
  fixed: [
    {
      name: "LT1086-5",
      inputMin: 6.5,
      inputMax: 30,
      outputVoltage: 5,
      maxOutputCurrent: 1500,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 50,
    },
    {
      name: "TLV1117-33",
      inputMin: 4.7,
      inputMax: 15,
      outputVoltage: 3.3,
      maxOutputCurrent: 1000,
      maxPowerDissipation: 1500,
      maxTemperature: 125,
      TJA: 50,
    },
    {
      name: "MIC29302WT",
      inputMin: 4.3,
      inputMax: 26,
      outputVoltage: 5,
      maxOutputCurrent: 3000,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 50,
    },
    {
      name: "UA7805",
      inputMin: 7,
      inputMax: 35,
      outputVoltage: 5,
      maxOutputCurrent: 1000,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 65,
    },
    {
      name: "AMS1117-3.3",
      inputMin: 4.5,
      inputMax: 15,
      outputVoltage: 3.3,
      maxOutputCurrent: 1000,
      maxPowerDissipation: 800,
      maxTemperature: 125,
      TJA: 50,
    },
    {
      name: "TS7805",
      inputMin: 7,
      inputMax: 25,
      outputVoltage: 5,
      maxOutputCurrent: 2000,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 50,
    },
    {
      name: "KIA7805",
      inputMin: 7,
      inputMax: 35,
      outputVoltage: 5,
      maxOutputCurrent: 1500,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 50,
    },
    {
      name: "KA78R12",
      inputMin: 14.5,
      inputMax: 35,
      outputVoltage: 12,
      maxOutputCurrent: 1000,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 50,
    },
    {
      name: "STL78L05",
      inputMin: 7,
      inputMax: 20,
      outputVoltage: 5,
      maxOutputCurrent: 100,
      maxPowerDissipation: 800,
      maxTemperature: 125,
      TJA: 50,
    },
    {
      name: "TS2950CZ-3.3",
      inputMin: 4,
      inputMax: 30,
      outputVoltage: 3.3,
      maxOutputCurrent: 150,
      maxPowerDissipation: 800,
      maxTemperature: 125,
      TJA: 60,
    },
  ],
  adjustable: [
    {
      name: "LT3080",
      inputMin: 1.2,
      inputMax: 36,
      outputMin: 0,
      outputMax: 34.5,
      maxOutputCurrent: 1300,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 40,
      calculateResistors: (Vout, Vref = 0.6, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "LT3081",
      inputMin: 1.2,
      inputMax: 36,
      outputMin: 0,
      outputMax: 34.5,
      maxOutputCurrent: 1500,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 40,
      calculateResistors: (Vout, Vref = 0.6, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "LT3085",
      inputMin: 1.2,
      inputMax: 36,
      outputMin: 0,
      outputMax: 35.5,
      maxOutputCurrent: 500,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 40,
      calculateResistors: (Vout, Vref = 1.0, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "LT3086",
      inputMin: 1.2,
      inputMax: 36,
      outputMin: 0,
      outputMax: 34.5,
      maxOutputCurrent: 2500,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 40,
      calculateResistors: (Vout, Vref = 0.6, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "LM338K",
      inputMin: 4,
      inputMax: 40,
      outputMin: 1.2,
      outputMax: 32,
      maxOutputCurrent: 5000,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 40,
      calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "LM350T",
      inputMin: 4.25,
      inputMax: 35,
      outputMin: 1.2,
      outputMax: 33,
      maxOutputCurrent: 3000,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 40,
      calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "LM317AT",
      inputMin: 3,
      inputMax: 40,
      outputMin: 1.25,
      outputMax: 37,
      maxOutputCurrent: 1500,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 60,
      calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "L200C",
      inputMin: 2.75,
      inputMax: 40,
      outputMin: 2.85,
      outputMax: 36,
      maxOutputCurrent: 2000,
      maxPowerDissipation: 20000,
      maxTemperature: 150,
      TJA: 60,
      calculateResistors: (Vout, Vref = 2.77, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "TL783C",
      inputMin: 3,
      inputMax: 125,
      outputMin: 1.25,
      outputMax: 125,
      maxOutputCurrent: 700,
      maxPowerDissipation: 15000,
      maxTemperature: 125,
      TJA: 50,
      calculateResistors: (Vout, Vref = 1.25, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "TPS7A4701",
      inputMin: 3,
      inputMax: 36,
      outputMin: 1.4,
      outputMax: 34,
      maxOutputCurrent: 1000,
      maxPowerDissipation: 1500,
      maxTemperature: 125,
      TJA: 45,
      calculateResistors: (Vout, Vref = 1.4, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "LP3878-ADJ",
      inputMin: 2.5,
      inputMax: 7,
      outputMin: 1.24,
      outputMax: 5.5,
      maxOutputCurrent: 800,
      maxPowerDissipation: 1500,
      maxTemperature: 125,
      TJA: 50,
      calculateResistors: (Vout, Vref = 1.24, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "NCP4681DSQ",
      inputMin: 1.4,
      inputMax: 5.5,
      outputMin: 0.8,
      outputMax: 5.5,
      maxOutputCurrent: 150,
      maxPowerDissipation: 500,
      maxTemperature: 125,
      TJA: 250,
      calculateResistors: (Vout, Vref = 0.8, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
    {
      name: "TS2951CS",
      inputMin: 2.3,
      inputMax: 30,
      outputMin: 1.25,
      outputMax: 29,
      maxOutputCurrent: 100,
      maxPowerDissipation: 1000,
      maxTemperature: 125,
      TJA: 80,
      calculateResistors: (Vout, Vref = 1.235, R1 = 240) => {
        const R2 = (Vout / Vref - 1) * R1;
        return { R1, R2 };
      },
    },
  ],
};
