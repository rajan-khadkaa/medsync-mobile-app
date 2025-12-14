const today = () => {
  const day = new Date();
  // return day.toDateString();
  return day.toISOString();
};

const yesterday = () => {
  const day = new Date();
  day.setDate(day.getDate() - 1);
  // return day.toDateString();
  return day.toISOString();
};

const tomorrow = () => {
  const day = new Date();
  day.setDate(day.getDate() + 1);
  // return day.toDateString();
  return day.toISOString();
};

export { yesterday, today, tomorrow };
