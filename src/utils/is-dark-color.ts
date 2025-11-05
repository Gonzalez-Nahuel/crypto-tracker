export const isDarkColor = (bg: string): boolean => {
  const rgb = bg.match(/\d+/g);
  if (!rgb) return false;

  const [r, g, b] = rgb.map(Number);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 128;
};
