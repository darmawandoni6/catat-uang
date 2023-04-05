import React from 'react';
import style from '../../styles/main.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import localName from 'src/constants/localName';
import { getData } from 'src/helpers/localStorage';

const defaultPayload = {
  name: '',
  phone: '',
};
const Form = ({ onClose, user }) => {
  const [payload, setPayload] = React.useState(defaultPayload);

  const { state } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) setPayload(user);
  }, [user]);

  const saveData = () => {
    let pelanggan = getData(localName.pelanggan) ?? [];
    let err = false;

    if (!pelanggan[0]) {
      pelanggan.push({ id: 0, ...payload });
    } else {
      const find = pelanggan.find((item) => item.phone === payload.phone);
      if (find) {
        alert(`Nomor Pelanggan Sudah Terdaftar Sebagai ${find.name}`);
        err = true;
      } else {
        pelanggan.push({ id: pelanggan.length, ...payload });
      }
    }

    if (!err) {
      localStorage.setItem(localName.pelanggan, JSON.stringify(pelanggan));
      if (state) {
        localStorage.setItem(
          localName.choicePelanggan,
          JSON.stringify({ id: pelanggan.length, ...payload })
        );
        navigate(-1);
      }
      setPayload(defaultPayload);
      onClose();
    }
  };

  const editData = () => {
    let pelanggan = getData(localName.pelanggan) ?? [];
    const idx = pelanggan.findIndex((item) => item.id === user.id);
    pelanggan[idx] = { ...user, ...payload };
    localStorage.setItem(localName.pelanggan, JSON.stringify(pelanggan));
    setPayload(defaultPayload);
    onClose();
  };

  const handleSubmit = () => {
    if (user) {
      editData();
    } else {
      saveData();
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      value = value.replaceAll(/\D/g, '');
    }
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className={style.formGrub}>
        <label>Nama Pelanggan</label>
        <input
          type="text"
          name="name"
          value={payload.name}
          onChange={handleChange}
          placeholder="Masukkan nama pelanggan"
        />
      </div>
      <div className={style.formGrub}>
        <label>Nomor Telepon</label>
        <input
          type="text"
          name="phone"
          value={payload.phone}
          onChange={handleChange}
          placeholder="Masukkan no. telp"
        />
      </div>
      <button className={style.save} type="submit">
        SIMPAN
      </button>
    </form>
  );
};

export default Form;
