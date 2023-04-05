export const getData = (name, opt = {}) => {
  const { object = true } = opt;
  if (!name) return;
  let data = localStorage.getItem(name);

  if (object) {
    data = JSON.parse(data);
  }

  return data;
};
