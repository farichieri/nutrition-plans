const formatToFixed = (num: number): number => {
  return num % 1 !== 0 ? Number(num.toFixed(0)) : num;
};

export { formatToFixed };
