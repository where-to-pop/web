export const generateRandomColor = (input: string) => {
  if (!input) {
    return COLOR[0];
  }

  const char = input.charCodeAt(0);
  const colorIndex = char % COLOR.length;
  return COLOR[colorIndex];
};

const COLOR = [
  '#181F29',
  '#EFD807',
  '#F6951E',
  '#FF543E',
  '#E14548',
  '#7C4400',
  '#FA96C2',
  '#E57AD9',
  '#EF2D9B',
  '#C695E7',
  '#9125EF',
  '#69D5E6',
  '#0EDBE5',
  '#73A1E3',
  '#23ADB4',
  '#2848FF',
  '#6FC76A',
  '#A5D740',
  '#01D588',
  '#29CC00',
  '#0D8C22',
  '#949494',
] as const;
