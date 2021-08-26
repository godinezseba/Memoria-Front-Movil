export const colors = {
  'a': '#63aa5a',
  'b': '#ffe731',
  'c': '#fbb900',
  'd': '#fb8800',
  'e': '#e30613',
}

export const floatToChar = (number) => {
  if (number < 1.5) return 'a';
  if (number < 2.5) return 'b';
  if (number < 3.5) return 'c';
  if (number < 4.5) return 'd';
  else return 'e';
}