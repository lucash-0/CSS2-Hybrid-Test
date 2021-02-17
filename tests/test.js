const d = 44; //diameter

function tokens() {
  const xlowest = 50;
  const xhighest = 710;
  const ylowest = 50;
  const yhighest = 510;

  let tokens = [];
  let xrange = [];
  let yrange = [];

  let i = 0;
  while (i < 12) {
    const x = Math.round(xlowest + Math.random() * (xhighest - xlowest));

    const xcheck = xrange.every((xr) => {
      return x + d - xr < 0 || xr + d - x < 0;
    });

    if (xcheck) {
      xrange.push(x);
      i++;
    }
  }

  let j = 0;
  while (j < 12) {
    const y = Math.round(ylowest + Math.random() * (yhighest - ylowest));

    const ycheck = yrange.every((yr) => {
      return y + d / 2 - yr < 0 || yr + d / 2 - y < 0;
    });

    if (ycheck) {
      yrange.push(y);
      j++;
    }
  }

  for (let k = 0; k < 12; k++) {
    tokens.push({
      x: xrange[k],
      y: yrange[k],
      text: "" + (k + 1),
    });
  }
  console.log(tokens);
  return tokens;
}

return {
  width: 758,
  height: 558,
  diameter: d,
  tokens: tokens(),
};
