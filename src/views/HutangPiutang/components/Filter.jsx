import React from 'react';
import style from '../styles/main.module.scss';

const Filter = ({ onChange }) => {
  const handleSearch = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className={style.filter}>
      <div className={style.formGrub}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="search" onChange={handleSearch} placeholder="Search" />
      </div>
    </div>
  );
};

export default Filter;
