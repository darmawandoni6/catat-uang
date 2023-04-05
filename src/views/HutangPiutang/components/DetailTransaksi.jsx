import React from 'react';
import style from '../styles/main.module.scss';
import cx from 'classnames';
import { getCurrencyString } from '@helpers/curency';

const DetailTransaksi = ({ data, setShow }) => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      const l = [
        {
          label: data.isHutang ? 'Utang Pelanggan' : 'Utang Saya',
          value: data.value,
          style: true,
          currency: true,
          isHutang: data.isHutang,
        },
      ];
      setList(l);
    }
  }, [data]);

  const customStyle = React.useCallback((item) => {
    if (item.isHutang) return style.hutang;
    return style.piutang;
  }, []);

  const status = React.useCallback(
    (item) => {
      return item.isHutang ? 'Utang Pelanggan' : 'Utang Saya';
    },
    [data]
  );

  return (
    <>
      <div className={style.header}>
        <h1>{data.user.name}</h1>
        <button className={style.close} onClick={() => setShow(null)}>
          X
        </button>
      </div>
      {list.map((item, i) => (
        <div className={style.detail} key={(item, i)}>
          <div className={style.label}>{item.label}</div>
          <div className={cx(style.value, item.style ? customStyle(item) : '')}>
            {item.currency ? getCurrencyString(Math.abs(item.value)) : item.value}
          </div>
        </div>
      ))}
      <div style={{ width: '100%', overflow: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Jumlah</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {data.list.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{item.tgl}</td>
                <td>{status(item)}</td>
                <td className={item.isHutang ? style.hutang : style.piutang}>
                  {getCurrencyString(item.value)}
                </td>
                <td>{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default React.memo(DetailTransaksi);
