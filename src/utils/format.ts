const formatToFixed = (num: number): number => {
  return num % 1 !== 0 ? Number(num.toFixed(0)) : num;
};

const round = (value: number, step: number): number => {
  step || (step = 1.0);
  var inv = 1.0 / step;
  return Math.round(value * inv) / inv;
};

const formatTwoDecimals = (num: number | null) => {
  return Math.round(Number(Number(num) * 100)) / 100;
};

export { formatToFixed, round, formatTwoDecimals };
