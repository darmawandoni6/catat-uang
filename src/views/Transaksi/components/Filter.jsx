import React from 'react';
import style from '../styles/main.module.scss';

const Filter = ({ handleChange }) => {
  return (
    <div className={style.filter}>
      <div className={style.formGrub}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="search" placeholder="Search" onChange={handleChange} />
      </div>
      {/* <button className={style.btnFilter}>
        <i className="fa-solid fa-filter"></i>
      </button> */}
    </div>
  );
};

export default Filter;
