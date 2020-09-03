let tempID = 0;
const colorPalette = ['#29BF12', '#FF5714', '#FEC601', '#2FD9C8', '#FF0035'];

export const getTempID = () => {
  tempID -= 1;
  return String(tempID);
};

export const getRandomColor = () => colorPalette[Math.floor(Math.random() * colorPalette.length)];

export default 'dummyExport';
