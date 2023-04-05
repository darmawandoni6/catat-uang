import React from 'react';
import style from '../styles/main.module.scss';
import cx from 'classnames';

const Detail = ({ label, value, isPengeluaran }) => {
  const nominal = typeof isPengeluaran === 'boolean';
  const uangKeluar = nominal && isPengeluaran;
  const uangMasuk = nominal && !isPengeluaran;

  return (
    <div className={style.detail}>
      <div className={style.label}>{label}</div>
      <div
        className={cx(
          style.value,
          { [style.uangMasuk]: uangMasuk },
          { [style.uangKeluar]: uangKeluar }
        )}
      >
        {nominal ? value.toLocaleString('id') : value}
      </div>
    </div>
  );
};

export default Detail;
