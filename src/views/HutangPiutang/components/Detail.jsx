import React from 'react';
import style from '../styles/main.module.scss';
import cx from 'classnames';

const Detail = ({ label, value, isUtangSaya }) => {
  const nominal = typeof isUtangSaya === 'boolean';
  const utangSaya = nominal && isUtangSaya;
  const utangPelanggan = nominal && !isUtangSaya;

  return (
    <div className={style.detail}>
      <div className={style.label}>{label}</div>
      <div
        className={cx(
          style.value,
          { [style.utangSaya]: utangSaya },
          { [style.utangPelanggan]: utangPelanggan }
        )}
      >
        {nominal ? value.toLocaleString('id') : value}
      </div>
    </div>
  );
};

export default Detail;
