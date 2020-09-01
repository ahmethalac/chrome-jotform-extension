let tempID = 0;
const colorPalette = ['#29BF12', '#FF5714', '#FEC601', '#2FD9C8', '#FF0035'];
let currentColorIndex = -1;

export const getTempID = () => {
  tempID -= 1;
  return String(tempID);
};

export const getRandomColor = () => {
  currentColorIndex += 1;
  return colorPalette[currentColorIndex % colorPalette.length];
};

export default 'dummyExport';
