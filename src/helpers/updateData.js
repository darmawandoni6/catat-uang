import { getData } from './localStorage';
import localName from 'src/constants/localName';

export default {
  hutangPiutang: () => {
    const data = getData(localName.hutangPiutang) ?? [];
    const filter = data.filter((item) => item.user.id === 0);
    filter.forEach((element) => {
      const idx = data.findIndex((item) => item.user.id === element.user.id);
      if (idx >= 0)
        data[idx] = {
          ...data[idx],
          user: {
            ...data[idx].user,
            id: 1,
          },
        };
    });
    if (filter[0]) localStorage.setItem(localName.hutangPiutang, JSON.stringify(data));
  },
};
