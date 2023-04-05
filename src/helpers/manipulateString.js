export const initialName = (strName) => {
  let name = strName.split(' ');
  let initial;

  if (!name[1]) initial = name[0][0];
  else initial = name[0][0] + name[1][0];

  return initial.toUpperCase();
};
