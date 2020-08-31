let tempID = 0;
const colorPalette = ['#C216FF', '#FFA800', '#FF1616', '#000AFF'];

export const getTempID = () => {
  tempID -= 1;
  return tempID;
};

export const getRandomColor = () => colorPalette[Math.floor(Math.random() * colorPalette.length)];
export default 'dummyExport';
