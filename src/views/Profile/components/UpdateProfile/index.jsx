import React from 'react';
import style from '../../styles/main.module.scss';
import localName from 'src/constants/localName';

const boxShadow = `boxShadow-UpdateProfile`;
const container = `container-UpdateProfile`;

const UpdateProfile = ({ show, onClose, update }) => {
  const [payload, setPayload] = React.useState({
    name: '',
    phone: '',
  });

  React.useEffect(() => {
    if (show) {
      const bx = document.getElementById(boxShadow);
      bx.style.display = 'block';

      const ct = document.getElementById(container);
      ct.style.height = '90vh';
      return () => {
        bx.style.display = 'none';
        ct.style.height = '0px';
      };
    }
  }, [show]);

  const handleBackdrop = (e) => {
    if (e.target.id === boxShadow) {
      onClose();
    }
  };

  const handleSubmit = () => {
    localStorage.setItem(localName.profile, JSON.stringify(payload));
    update();
    onClose();
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      value = value.replaceAll(/\D/g, '');
    }
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={style.UpdateProfile}>
      <div className={style.boxShadow} id={boxShadow} onClick={handleBackdrop} />

      <div className={style.container} id={container}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <h1>Update Profile</h1>
            <button onClick={onClose}>X</button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className={style.formGrub}>
              <label>Nama Profile</label>
              <input
                type="text"
                name="name"
                value={payload.name}
                maxLength={20}
                onChange={handleChange}
                placeholder="Masukkan nama profile"
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
            <button type="submit">SIMPAN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
