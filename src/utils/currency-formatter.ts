export const currencyFormatter = (num: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(num);

  return "$" + formatted;
};
