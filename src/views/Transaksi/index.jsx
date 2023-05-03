import React from 'react';
import style from './styles/main.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from './components/Filter';
import List from './components/List';
import { listData } from './helpers/array';
import path from 'src/constants/path';
import Jubutron from 'src/components/Jubutron';
import ButtonAdd from 'src/components/ButtonAdd';
import localName from 'src/constants/localName';
import cx from 'classnames';
import { getCurrencyString } from 'src/helpers/curency';
import moment from 'moment/moment';

const Transaksi = () => {
  const [list, setList] = React.useState([]);
  const [nominal, setNominal] = React.useState({
    uangMasuk: 0,
    uangKeluar: 0,
  });
  const [filter, setFilter] = React.useState(1);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    handleFilter(filter);
  }, []);

  const handleBtnTrasaksi = () => {
    localStorage.removeItem(localName.choicePelanggan);
    navigate(pathname + path.addTransaksi);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const { list } = listData();

    const entri = Object.entries(list);
    const filter = entri.filter((item) => item[0].toLowerCase().includes(value.toLowerCase()));
    if (!filter[0]) {
      entri.forEach((item) => {
        let find = item[1].filter((item) =>
          item.user.name.toLowerCase().includes(value.toLowerCase())
        );
        if (find[0]) filter.push([item[0], find]);
      });
    }

    setList(filter);
  };

  const grandTotal = (nominal) => {
    const { uangMasuk, uangKeluar } = nominal;

    const sisa = uangMasuk - uangKeluar;

    return {
      minus: sisa < 0,
      uang: Math.abs(sisa),
    };
  };

  const handleFilter = (i) => {
    let { list } = listData();
    const data = Object.entries(list);
    const hari = moment().format('DD MMM YYYY');
    const bulan = moment().format('MMM YYYY');
    const tahun = moment().format('YYYY');

    let choice = '';
    switch (i) {
      case 0:
        choice = hari;
        break;
      case 1:
        choice = bulan;
        break;
      case 2:
        choice = tahun;
        break;

      default:
        break;
    }

    list = data.filter((item) => item[0].includes(choice));
    let uangMasuk = 0;
    let uangKeluar = 0;
    list.forEach((element) => {
      element[1].forEach((l) => {
        if (l.isPengeluaran) uangKeluar += l.nominal;
        else uangMasuk += l.nominal;
      });
    });
    setNominal({
      uangMasuk,
      uangKeluar,
    });
    setList(list);
    setFilter(i);
  };

  return (
    <div className={style.container}>
      <Jubutron
        report="Lihat Laporan Transaksi"
        data={[
          {
            label: 'Uang Masuk',
            value: nominal.uangMasuk,
          },
          {
            label: 'Uang Keluar',
            value: nominal.uangKeluar,
          },
        ]}
        filterMoney={handleFilter}
        active={filter}
      />
      <ButtonAdd text="TRANSAKSI" handleClick={handleBtnTrasaksi} />
      <Filter handleChange={handleChange} />
      <div className={cx(style.sisaUang, { [style.minus]: grandTotal(nominal).minus })}>
        Sisa Uang : <span>{getCurrencyString(grandTotal(nominal).uang)}</span>
      </div>
      <List data={list} />
    </div>
  );
};

export default Transaksi;
