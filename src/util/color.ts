export const colors = {
  accepted: '#0f0',
  deleted: '#f00',
  rejected: '#ff0',
  waitlist: '#00f',
};
export const hexToRgb = (hex: string): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

export const stringToRgb = (color: string): number[] => {
  if (color.includes('#')) return hexToRgb(color);
  const colors = color.match(/\d+/g)?.map((value) => Number(value));
  return colors ? colors : [0, 0, 0];
};

export const generateRGBString = (rgb: number[]): string => {
  return 'rgb(' + rgb.join() + ')';
};

export const priorityColor = (
  priority,
  maxPriority,
  defaultColor: number[],
  generateGradient: (defaultColor: number[]) => { max: number; rgb: number[] }[]
): string => {
  const gradient = generateGradient(defaultColor);
  if (priority === undefined || maxPriority === undefined || priority === 0)
    return generateRGBString(gradient[0].rgb);
  if (priority === maxPriority)
    return generateRGBString(gradient[gradient.length - 1].rgb);
  let colorRange: [number, number] = [0, 0];
  const gradientMax = gradient[gradient.length - 1].max;

  for (let index = 0; index < gradient.length; index++) {
    const element = gradient[index];
    const p = priority / maxPriority;
    const e = element.max / 100;

    if (p <= e) {
      colorRange = [index - 1, index];
      break;
    }
  }

  let firstcolor_y = gradient[colorRange[0]];
  let secondcolor_y = gradient[colorRange[1]];
  firstcolor_y = firstcolor_y ? firstcolor_y : secondcolor_y;
  secondcolor_y = secondcolor_y ? secondcolor_y : firstcolor_y;

  const firstcolor = firstcolor_y.rgb;
  const secondcolor = secondcolor_y.rgb;

  //Calculate ratio between the two closest colors
  const firstcolor_x = maxPriority * (firstcolor_y.max / gradientMax);
  const secondcolor_x =
    maxPriority * (secondcolor_y.max / gradientMax) - firstcolor_x;
  const slider = maxPriority * (priority / maxPriority) - firstcolor_x;
  const ratio = slider / secondcolor_x;

  //Get the color with pickHex(thx, less.js's mix function!)
  const result = pickHex(secondcolor, firstcolor, ratio);

  return generateRGBString(result);
};

export const pickHex = (color1, color2, weight) => {
  const p = weight;
  const w = p * 2 - 1;
  const w1 = (w / 1 + 1) / 2;
  const w2 = 1 - w1;
  const rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2),
  ];
  return rgb;
};
