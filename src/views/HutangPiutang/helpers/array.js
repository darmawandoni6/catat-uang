import localName from 'src/constants/localName';
import { getData } from 'src/helpers/localStorage';

const createNew = (res, item) => {
  return {
    id: res.length,
    user: item.user,
    nominal: item.isUtangSaya ? item.nominal + 0 : 0 - item.nominal,
    isUtangSaya: item.isUtangSaya,
    list: [
      {
        id: item.id,
        nominal: item.nominal,
        desc: item.desc,
        tgl: item.tgl,
        date: item.date,
        isUtangSaya: item.isUtangSaya,
      },
    ],
  };
};
export const listData = () => {
  let hutangPiutang = getData(localName.hutangPiutang) ?? [];
  const res = [];
  let utangSaya = 0;
  let utangPelanggan = 0;
  hutangPiutang.forEach((item) => {
    const idx = res.findIndex((find) => find.user.id === item.user.id);
    if (idx >= 0) {
      if (res[idx].isUtangSaya)
        utangSaya = item.isUtangSaya ? utangSaya + item.nominal : utangSaya - item.nominal;
      else
        utangPelanggan = !item.isUtangSaya
          ? utangPelanggan + item.nominal
          : utangPelanggan - item.nominal;

      if (res[idx].nominal === 0) {
        res.unshift(createNew(res, item));
      } else {
        const nominal = item.isUtangSaya
          ? item.nominal + res[idx].nominal
          : res[idx].nominal - item.nominal;

        res[idx].nominal = nominal;
        res[idx].list.unshift({
          id: item.id,
          nominal: item.nominal,
          desc: item.desc,
          tgl: item.tgl,
          date: item.date,
          isUtangSaya: item.isUtangSaya,
        });
      }
    } else {
      if (item.isUtangSaya) {
        utangSaya += item.nominal;
      } else {
        utangPelanggan += item.nominal;
      }

      res.unshift(createNew(res, item));
    }
  });
  return { list: res, utangSaya, utangPelanggan };
};
