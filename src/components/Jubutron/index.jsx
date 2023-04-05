import React from 'react';
import style from './styles/main.module.scss';
import localName from 'src/constants/localName';
import { getCurrencyString } from 'src/helpers/curency';
import { getData } from 'src/helpers/localStorage';

const Jubutron = ({ data }) => {
  const [name, setName] = React.useState('Saya');

  React.useEffect(() => {
    const profile = getData(localName.profile);
    if (profile) setName(profile.name);
  }, []);

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Jubutron);
