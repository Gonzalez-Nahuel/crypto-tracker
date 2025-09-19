export const formatNumberToPercentage = (num: number): string => {
  const number = Math.abs(num);
  return number.toFixed(2) + "%";
};
