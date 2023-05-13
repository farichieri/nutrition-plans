const formatWeight = (from: string, to: string) => {};

const formatHeight = (from: string, to: string) => {};

const formatToFixed = (num: number): number => {
  return num % 1 !== 0 ? Number(num.toFixed(0)) : num;
};

export { formatHeight, formatWeight, formatToFixed };
