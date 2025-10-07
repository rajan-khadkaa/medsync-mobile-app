const today = () => {
  const day = new Date();
  return day;
};

const yesterday = () => {
  const day = new Date();
  return day.setDate(day.getDate() - 1);
  // return day.toDateString();
};

const tomorrow = () => {
  const day = new Date();
  return day.setDate(day.getDate() + 1);
  // return day.toDateString();
};

export { yesterday, today, tomorrow };
