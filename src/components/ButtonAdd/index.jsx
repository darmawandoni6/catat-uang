import React from 'react';
import style from './styles/main.module.scss';

const ButtonAdd = ({ text, handleClick }) => {
  return (
    <div className={style.container}>
      <button className={style.btnFixed} onClick={handleClick}>
        <i className="fa-solid fa-plus"></i>
        <span>{text}</span>
      </button>
    </div>
  );
};

export default React.memo(ButtonAdd);
