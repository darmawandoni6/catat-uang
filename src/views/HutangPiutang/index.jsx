import React from 'react';
import style from './styles/main.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from './components/Filter';
import List from './components/List';
import { listData } from './helpers/array';
import path from 'src/constants/path';
import localName from 'src/constants/localName';
import Jubutron from 'src/components/Jubutron';
import ButtonAdd from 'src/components/ButtonAdd';

const HutangPiutang = () => {
  const [data, setData] = React.useState([]);
  const [money, setMoney] = React.useState({
    utangSaya: 0,
    utangPelanggan: 0,
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    let { list, utangSaya, utangPelanggan } = listData();
    setMoney({
      utangSaya: utangSaya ?? 0,
      utangPelanggan: utangPelanggan ?? 0,
    });
    setData(list);
  }, []);

  const handleBtnForm = () => {
    localStorage.removeItem(localName.choicePelanggan);
    navigate(pathname + path.addHutangPiutang);
  };

  const handleSearch = (value) => {
    let { list } = listData();
    const filter = list.filter((item) =>
      item.user.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setData(filter);
  };

  return (
    <div className={style.container}>
      <Jubutron
        report="Lihat Laporan Hutang Piutang"
        data={[
          {
            label: 'Utang Saya',
            value: money.utangSaya,
          },
          {
            label: 'Utang Pelanggan',
            value: money.utangPelanggan,
          },
        ]}
      />
      <ButtonAdd text="UTANG PIUTANG" handleClick={handleBtnForm} />
      <Filter onChange={handleSearch} />
      <List data={data} />
    </div>
  );
};

export default HutangPiutang;
