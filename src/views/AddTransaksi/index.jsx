import React from 'react';
import style from './styles/main.module.scss';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import moment from 'moment';
import { saveData } from './helpers/array';
import localName from 'src/constants/localName';
import { getData } from 'src/helpers/localStorage';
import { getCurrencyString, getValue } from 'src/helpers/curency';
import path from 'src/constants/path';

const userAnonim = {
  id: -1,
  name: 'Anonim',
};

const AddTransaksi = () => {
  const [isPengeluaran, setPengeluaran] = React.useState(true);
  const [user, setUser] = React.useState(userAnonim);
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
      setUser(pelanggan);
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
      isPengeluaran,
      user,
    };
    const err = saveData(body);
    if (!err) navigate(-1);
  };

  return (
    <div className={style.container}>
      <header>
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Tambah Transaksi</h1>
      </header>
      <section>
        <div className={style.select}>
          <label htmlFor="type1">
            <input
              id="type1"
              name="type"
              type="radio"
              checked={isPengeluaran}
              onChange={() => setPengeluaran((prev) => !prev)}
            />
            <div className={style.custom}>Pengeluaran</div>
          </label>
          <label htmlFor="type2">
            <input
              id="type2"
              name="type"
              type="radio"
              checked={!isPengeluaran}
              onChange={() => setPengeluaran((prev) => !prev)}
            />
            <div className={style.custom}>Pemasukan</div>
          </label>
        </div>
        <div className={cx(style.formGrub, isPengeluaran ? style.piutang : style.take)}>
          <label>Masukkan Nominal</label>
          <input
            type="text"
            value={getCurrencyString(payload.nominal)}
            onChange={(e) => setPayload((prev) => ({ ...prev, nominal: getValue(e.target.value) }))}
          />
        </div>
        <button className={style.choice} onClick={handleChoice}>
          {user.id >= 0 ? (
            user.name
          ) : (
            <>
              <i className="fa-solid fa-user-plus"></i>Pilih Kontak Pelanggan
            </>
          )}
        </button>
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
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  tgl: moment(e.target.value).format('YYYY-MM-DDTHH:mm'),
                  date: moment(e.target.value).format('YYYY-MM-DD HH:mm'),
                }))
              }
              value={payload.tgl}
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
