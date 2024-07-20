let a = ((Vout, Vref = 1.25, R1 = 240) => {
  const R2 = (Vout / Vref - 1) * R1;
  return { R1, R2 };
}).toString();


console.log(a);