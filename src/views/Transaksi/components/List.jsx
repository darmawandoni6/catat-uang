import React from 'react';
import style from '../styles/main.module.scss';
import Detail from './Detail';
import moment from 'moment/moment';
import Drawer from 'src/components/Drawer';

const List = ({ data }) => {
  const [show, setShow] = React.useState(false);
  const [detail, setDetail] = React.useState({});

  const calculator = (item, status) => {
    let res = 0;
    item.forEach((r) => {
      if (r.isPengeluaran === status) {
        res += r.nominal;
      }
    });
    return res;
  };

  const handleChoice = (item) => {
    setShow(true);
    setDetail(item);
  };
  const detailTransaksi = React.useMemo(() => {
    if (detail.user) {
      return [
        {
          label: 'Nama',
          value: detail.user.name,
        },
        {
          label: 'Phone',
          value: detail.user.phone ?? '-',
        },
        {
          label: detail.isPengeluaran ? 'Uang Keluar' : 'Uang Masuk',
          value: detail.nominal,
          isPengeluaran: detail.isPengeluaran,
        },
        {
          label: 'Catatan',
          value: detail.desc || '-',
        },
        {
          label: 'Tanggal',
          value: moment(detail.tgl).format('DD MMM YYYY HH:mm'),
        },
      ];
    }
    return [];
  }, [detail.user]);

  return (
    <div className={style.list}>
      <header>
        <ul>
          <li>Nama</li>
          <li>Uang Masuk</li>
          <li>Uang Keluar</li>
        </ul>
      </header>
      <section>
        {!data[0] ? (
          <div className={style.empty}>
            <h1>Tidak ada data ...</h1>
          </div>
        ) : (
          <div className={style.data}>
            {data.map((item, i) => (
              <React.Fragment key={i}>
                <ul className={item[0] && style.header}>
                  <li>{item[0]}</li>
                  <li>{calculator(item[1], false).toLocaleString('id')}</li>
                  <li>{calculator(item[1], true).toLocaleString('id')}</li>
                </ul>
                {item[1].map((d, id) => (
                  <ul key={id} className={style.user} onClick={() => handleChoice(d)}>
                    <li>
                      <h4> {d.user.name}</h4>
                      <p>{d.desc}</p>
                    </li>
                    <li className={style.uangMasuk}>
                      {!d.isPengeluaran ? d.nominal.toLocaleString('id') : '-'}
                    </li>
                    <li className={style.uangKeluar}>
                      {d.isPengeluaran ? d.nominal.toLocaleString('id') : '-'}
                    </li>
                  </ul>
                ))}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
      <Drawer header="Detail Transaksi" show={show} setShow={() => setShow(false)}>
        {detailTransaksi.map((item, i) => (
          <Detail {...item} key={i} />
        ))}
      </Drawer>
    </div>
  );
};

export default List;
