import moment from 'moment';
import localName from 'src/constants/localName';
import { getData } from 'src/helpers/localStorage';

export const listData = () => {
  try {
    const data = {};
    const transaksi = getData(localName.transaksi) ?? [];
    let uangMasuk = 0;
    let uangKeluar = 0;

    transaksi.forEach((item) => {
      const dt = item.tgl ?? item.date;
      const title = moment(dt).format('DD MMM YYYY');
      if (item.isPengeluaran) {
        uangKeluar += item.nominal;
      } else {
        uangMasuk += item.nominal;
      }
      if (data[title]) {
        data[title].push(item);
      } else {
        data[title] = [item];
      }
    });
    return { list: data, uangMasuk, uangKeluar };
  } catch (error) {
    alert('listData => ' + error);
    return error;
  }
};
