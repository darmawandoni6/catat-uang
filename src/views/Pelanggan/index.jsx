import React from 'react';
import style from './styles/main.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from './components/Form';
import { sortData } from './helpers/array';
import { chekWA } from './helpers/useCase';
import localName from 'src/constants/localName';
import { getData } from 'src/helpers/localStorage';
import Drawer from 'src/components/Drawer';

const Pelanggan = ({ main }) => {
  const [list, setList] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [pelanggan, setPelanggan] = React.useState();

  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchData = () => {
    const pelanggan = sortData(getData(localName.pelanggan) ?? []);
    setList(pelanggan);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    const pelanggan = sortData(getData(localName.pelanggan) ?? []);

    const filter = pelanggan.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setList(filter);
  };

  const handleOpenWa = (phone) => {
    const wa = phone.replace('0', '62');
    window.open(`https://wa.me/${wa}`);
  };

  const handleChoice = (item) => {
    if (state) {
      localStorage.setItem(localName.choicePelanggan, JSON.stringify(item));
      navigate(-1);
    } else {
      setPelanggan(item);
    }
  };

  const reset = () => {
    setPelanggan(null);
    setShow(false);
  };

  return (
    <div className={style.container}>
      <header>
        {main ? (
          <button />
        ) : (
          <button onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        )}
        <input type="search" placeholder="Cari nama pelanggan" onChange={handleSearch} />
      </header>
      <section className={style.addNew} onClick={() => setShow(true)}>
        <div className={style.box}>
          <i className="fa-solid fa-user-pen"></i>
        </div>
        <span>Tambah Pelanggan Baru</span>
        <i className="fa-solid fa-chevron-right"></i>
      </section>
      <section className={style.wrapperList}>
        {list.map((item) => (
          <div className={style.list} key={item.phone}>
            <div className={style.content} onClick={() => handleChoice(item)}>
              <p>{item.name}</p>
              <p>{item.phone}</p>
            </div>
            {chekWA(item.phone) && !state && (
              <button className={style.wa} onClick={() => handleOpenWa(item.phone)}>
                <i className="fa-brands fa-whatsapp"></i>
              </button>
            )}
          </div>
        ))}
      </section>
      <Drawer
        header={pelanggan ? 'Edit Pelanggan' : 'Add New Pelanggan'}
        show={show || pelanggan}
        setShow={reset}
      >
        <Form
          onClose={() => {
            fetchData();
            reset();
          }}
          user={pelanggan}
        />
      </Drawer>
    </div>
  );
};

export default Pelanggan;
