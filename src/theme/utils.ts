/**
 * Shades a color by a percentage and returns changed color as an hexadecimal color.
 *
 * @param color the hexadecimal color to modify
 * @param percent the shade value as a percentage
 */
function shadeColor(color: string, percent: number) {
  const hex = color.replace('#', '');
  const r = Math.round((parseInt(hex.substring(0, 2), 16) * (100 + percent)) / 100);
  const g = Math.round((parseInt(hex.substring(2, 4), 16) * (100 + percent)) / 100);
  const b = Math.round((parseInt(hex.substring(4, 6), 16) * (100 + percent)) / 100);
  const rHex = (r <= 255 ? r : 255).toString(16).padStart(2, '0');
  const gHex = (g <= 255 ? g : 255).toString(16).padStart(2, '0');
  const bHex = (b <= 255 ? b : 255).toString(16).padStart(2, '0');
  return `#${rHex}${gHex}${bHex}`;
}

export { shadeColor };
