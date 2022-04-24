export const getNextDay = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toLocaleString();
};

console.log(getNextDay());
