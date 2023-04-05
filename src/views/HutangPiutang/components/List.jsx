import React from 'react';
import style from '../styles/main.module.scss';
import cx from 'classnames';
import Detail from './Detail';
import { initialName } from 'src/helpers/manipulateString';
import { getCurrencyString } from 'src/helpers/curency';
import Drawer from 'src/components/Drawer';

const List = ({ data }) => {
  const [list, setList] = React.useState([]);
  const [active, setActive] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [detail, setDetail] = React.useState({});

  React.useEffect(() => {
    let isUtangSaya = true;
    if (active === 1) isUtangSaya = false;

    const filter = data.filter((item) => {
      if (active === 2) return item.nominal === 0;
      return item.isUtangSaya === isUtangSaya && item.nominal !== 0;
    });
    setList(filter);
  }, [data]);

  const handleFilter = (pos) => {
    let isUtangSaya = true;
    if (pos === 1) isUtangSaya = false;

    const filter = data.filter((item) => {
      if (pos === 2) return item.nominal === 0;
      return item.isUtangSaya === isUtangSaya && item.nominal !== 0;
    });
    setList(filter);
    setActive(pos);
  };

  const handleChoice = (item) => {
    setShow(true);
    setDetail(item);
  };

  const handleReset = () => {
    setShow(false);
  };
  const detailHutang = React.useMemo(() => {
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
          label: detail.isUtangSaya ? 'Utang Saya' : 'Utang Pelanggan',
          value: detail.nominal !== 0 ? Math.abs(detail.nominal) : 'Lunas',
          isUtangSaya: detail.nominal > 0 && detail.isUtangSaya,
        },
      ];
    }
    return [];
  }, [detail.user]);

  const status = ({ statusHutang, status }) => {
    if (statusHutang && status) {
      return 'Utang Saya';
    }
    if (statusHutang && !status) {
      return 'Bayar Hutang';
    }

    if (!statusHutang && !status) {
      return 'Utang Pelanggan';
    }
    if (!statusHutang && status) {
      return 'Bayar Hutang';
    }

    return '-';
  };

  return (
    <div className={style.list}>
      <header>
        <ul>
          <li className={active === 0 ? style.active : ''} onClick={() => handleFilter(0)}>
            Utang Saya
          </li>
          <li className={active === 1 ? style.active : ''} onClick={() => handleFilter(1)}>
            Utang Pelanggan
          </li>
          <li className={active === 2 ? style.active : ''} onClick={() => handleFilter(2)}>
            Lunas
          </li>
        </ul>
      </header>
      <section>
        <div className={style.listData}>
          {!list[0] && (
            <div className={style.empty}>
              <h1>Tidak ada data ...</h1>
            </div>
          )}
          {list.map((item) => (
            <div className={style.mainList} key={item.id} onClick={() => handleChoice(item)}>
              <div className={style.label}>
                <div className={style.box}>{initialName(item.user.name)}</div>
                {item.user.name}
              </div>
              <div
                className={cx(
                  style.value,
                  item.isUtangSaya || item.nominal === 0 ? style.utangSaya : style.utangPelanggan
                )}
              >
                {item.nominal !== 0 ? getCurrencyString(Math.abs(item.nominal)) : 'Lunas'}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Drawer header="Detail Hutang" show={show} setShow={handleReset}>
        {detailHutang.map((item, i) => (
          <Detail {...item} key={i} />
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
              {detail.list?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{item.date}</td>
                  <td>
                    {status({
                      statusHutang: detail.isUtangSaya,
                      status: item.isUtangSaya,
                    })}
                  </td>
                  <td className={item.isUtangSaya ? style.utangSaya : style.utangPelanggan}>
                    {getCurrencyString(Math.abs(item.nominal))}
                  </td>
                  <td>{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Drawer>
    </div>
  );
};

export default React.memo(List);
