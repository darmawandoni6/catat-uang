import React from 'react';
import style from './styles/main.module.scss';
import UpdateProfile from './components/UpdateProfile';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
import localName from 'src/constants/localName';
import { getData } from 'src/helpers/localStorage';

const list = [
  {
    icon: 'fa-solid fa-users',
    name: 'Pelanggan',
    link: path.pelanggan,
  },
  {
    icon: 'fa-solid fa-ban',
    name: 'Reset Hutang Piutang',
    type: localName.hutangPiutang,
    label: 'Hapus semua history hutang piutan ? ',
  },
  {
    icon: 'fa-solid fa-ban',
    name: 'Reset Transaksi',
    type: localName.transaksi,
    label: 'Hapus semua history transaksi ? ',
  },
];

const Profile = () => {
  const [profile, setProfile] = React.useState({});
  const [updateProfile, setUpdateProfile] = React.useState(false);

  const handleProfile = () => {
    const data = getData(localName.profile);

    if (data) setProfile(data);
    else setUpdateProfile(true);
  };
  React.useEffect(() => {
    handleProfile();
  }, []);

  const handleGo = ({ label, type }) => {
    if (confirm(label)) {
      localStorage.removeItem(type);
    }
  };
  return (
    <div className={style.Profile}>
      <header>
        <div className={style.row1}>
          <h1>Profile saya</h1>
          <div className={style.box} onClick={() => setUpdateProfile(true)}>
            <i className="fa-solid fa-user-pen"></i>
          </div>
        </div>
        <div className={style.row2}>
          <p>{profile.name}</p>
          <p>{profile.phone}</p>
        </div>
      </header>
      <section>
        <div className={style.container}>
          {list.map((item, i) => {
            if (item.link) {
              return (
                <Link to={item.link} className={style.list} key={i}>
                  <i className={item.icon} />
                  <p>{item.name}</p>
                </Link>
              );
            }
            return (
              <Link
                className={style.list}
                key={i}
                onClick={() => handleGo({ label: item.label, type: item.type })}
              >
                <i className={item.icon} />
                <p>{item.name}</p>
              </Link>
            );
          })}
        </div>
      </section>
      <UpdateProfile
        show={updateProfile}
        onClose={() => setUpdateProfile(false)}
        update={handleProfile}
      />
    </div>
  );
};

export default Profile;
