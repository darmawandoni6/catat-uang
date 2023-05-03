import React from 'react';
import style from './styles/main.module.scss';
import localName from 'src/constants/localName';
import { getCurrencyString } from 'src/helpers/curency';
import { getData } from 'src/helpers/localStorage';

const optFilter = ['Hari', 'Bulan', 'Tahun', 'Semua'];

const Jubutron = ({ data, filterMoney, active }) => {
  const [name, setName] = React.useState('Saya');

  React.useEffect(() => {
    const profile = getData(localName.profile);
    if (profile) setName(profile.name);
  }, []);

  React.useEffect(() => {}, [active]);

  const handleFilter = (idx) => {
    if (filterMoney) filterMoney(idx);
  };

  return (
    <div className={style.top}>
      <div className={style.wrapperCard}>
        <div className={style.title}>
          <h1>
            <i className="fa-solid fa-circle-dollar-to-slot"></i>
            {`Uang ${name}`}
          </h1>
        </div>

        <div className={style.card}>
          <div className={style.body}>
            <section>
              <div className={style.left}>
                <h2>{getCurrencyString(data[0].value)}</h2>
                <p>{data[0].label}</p>
              </div>
              <div className={style.right}>
                <h2>{getCurrencyString(data[1].value)}</h2>
                <p>{data[1].label}</p>
              </div>
            </section>
            {active >= 0 && (
              <div className={style.filter}>
                {optFilter.map((item, i) => (
                  <button
                    key={i}
                    className={active === i ? style.active : ''}
                    onClick={() => handleFilter(i)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Jubutron);
