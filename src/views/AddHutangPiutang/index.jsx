import React from 'react';
import style from './styles/main.module.scss';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import moment from 'moment';
import { saveData } from './helpers/array';
import { getData } from 'src/helpers/localStorage';
import localName from 'src/constants/localName';
import { listData } from '../HutangPiutang/helpers/array';
import path from 'src/constants/path';
import { getCurrencyString, getValue } from 'src/helpers/curency';

const userAnonim = {
  id: -1,
  name: 'Anonim',
};

const AddTransaksi = () => {
  const [toogle, settoogle] = React.useState(['Utang Saya', 'Utang Pelanggan']);
  const [isUtangSaya, setIsUtangSaya] = React.useState(true);
  const [user, setUser] = React.useState(userAnonim);
  const [detailUser, setDetailUser] = React.useState();
  const [payload, setPayload] = React.useState({
    nominal: 0,
    desc: '',
    tgl: moment().format('YYYY-MM-DDTHH:mm'),
    date: moment().format('YYYY-MM-DD HH:mm'),
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const pelanggan = getData(localName.choicePelanggan);
    if (pelanggan) {
      const { list } = listData();
      const filter = list.find((item) => item.user.id === pelanggan.id);
      if (filter) {
        const { isUtangSaya, nominal } = filter;
        if (isUtangSaya && nominal !== 0) settoogle(['Utang Saya', 'Bayar Utang']);
        else if (!isUtangSaya && nominal !== 0) settoogle(['Bayar Utang', 'Utang Pelanggan']);
      }
      setUser(pelanggan);
      setDetailUser(filter);
    }
  }, []);

  const handleChoice = () => {
    localStorage.removeItem(localName.choicePelanggan);
    navigate(path.pelanggan, { state: true });
  };

  const handleSubmit = () => {
    if (payload.nominal === 0) {
      alert('Nominal transaksi tidak boleh 0');
      return;
    }
    const body = {
      ...payload,
      isUtangSaya,
      user,
    };
    const err = saveData(body);
    if (!err) navigate(-1);
  };

  const setNominal = (value, status) => {
    if (detailUser) {
      const maxUtangSaya = detailUser.isUtangSaya && !status;
      const maxUtangPelanggan = !detailUser.isUtangSaya && status;
      if (maxUtangSaya && getValue(value) <= Math.abs(detailUser.nominal)) {
        setPayload((prev) => ({ ...prev, nominal: getValue(value) }));
      } else if (maxUtangSaya && getValue(value) > Math.abs(detailUser.nominal)) {
        setPayload((prev) => ({ ...prev, nominal: Math.abs(detailUser.nominal) }));
      } else if (maxUtangPelanggan && getValue(value) <= Math.abs(detailUser.nominal)) {
        setPayload((prev) => ({ ...prev, nominal: getValue(value) }));
      } else if (maxUtangPelanggan && getValue(value) > Math.abs(detailUser.nominal)) {
        setPayload((prev) => ({ ...prev, nominal: Math.abs(detailUser.nominal) }));
      } else {
        setPayload((prev) => ({ ...prev, nominal: getValue(value) }));
      }
    } else {
      setPayload((prev) => ({ ...prev, nominal: getValue(value) }));
    }
  };
  const handleNominal = (e) => {
    const { value } = e.target;
    setNominal(value, isUtangSaya);
  };

  const handleStatus = () => {
    if (detailUser) {
      setIsUtangSaya((prev) => {
        const status = !prev;
        setNominal(payload.nominal.toString(), status);
        return status;
      });
    } else {
      setIsUtangSaya((prev) => !prev);
    }
  };

  return (
    <div className={style.container}>
      <header>
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Tambah Hutang Piutang</h1>
      </header>
      <section>
        <button className={style.choice} onClick={handleChoice}>
          {user.id >= 0 ? (
            user.name
          ) : (
            <>
              <i className="fa-solid fa-user-plus"></i>Pilih Kontak Pelanggan
            </>
          )}
        </button>
        {detailUser && detailUser.nominal !== 0 && (
          <>
            <div className={style.detailUser}>
              <p>{detailUser.isUtangSaya ? 'Utang Saya' : 'Utang Pelanggan'}</p>
              <p>{getCurrencyString(Math.abs(detailUser.nominal))}</p>
            </div>
          </>
        )}
        <div className={style.select}>
          <label htmlFor="type1">
            <input
              id="type1"
              name="type"
              type="radio"
              checked={isUtangSaya}
              onChange={handleStatus}
            />
            <div className={style.custom}>{toogle[0]}</div>
          </label>
          <label htmlFor="type2">
            <input
              id="type2"
              name="type"
              type="radio"
              checked={!isUtangSaya}
              onChange={handleStatus}
            />
            <div className={style.custom}>{toogle[1]}</div>
          </label>
        </div>
        <div className={cx(style.formGrub, isUtangSaya ? style.piutang : style.take)}>
          <label>Masukkan Nominal</label>
          <input type="text" value={getCurrencyString(payload.nominal)} onChange={handleNominal} />
        </div>

        <div className={style.form}>
          <div className={style.formGrub}>
            <label>Catatan (jika ada)</label>
            <input
              name="desc"
              type="text"
              placeholder="Masukkan catatan "
              value={payload.desc}
              onChange={(e) => setPayload((prev) => ({ ...prev, desc: e.target.value }))}
            />
          </div>
          <div className={style.formGrub}>
            <input
              name="tgl"
              type="datetime-local"
              placeholder="Masukkan catatan "
              value={payload.tgl}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  tgl: moment(e.target.value).format('YYYY-MM-DDTHH:mm'),
                  date: moment(e.target.value).format('YYYY-MM-DD HH:mm'),
                }))
              }
            />
          </div>
        </div>
        <button className={style.save} onClick={handleSubmit}>
          SIMPAN
        </button>
      </section>
    </div>
  );
};

export default AddTransaksi;
