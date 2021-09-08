export const colors = {
  'a': '#63aa5a',
  'b': '#ffe731',
  'c': '#fbb900',
  'd': '#fb8800',
  'e': '#e30613',
}

export const letters = ['a', 'b', 'c', 'd', 'e'];

export const floatToChar = (number) => {
  if (number < 1.5) return 'a';
  if (number < 2.5) return 'b';
  if (number < 3.5) return 'c';
  if (number < 4.5) return 'd';
  if (number > 5) return 'e';
  return null;
}

export const intToDeforestation = {
  1: 'No afecta',
  2: 'Afecta pero esta acreditada',
  3: 'Afecta y no esta acreditada',
}