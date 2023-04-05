import React from 'react';
import style from './styles/main.module.scss';
import cx from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import path from 'src/constants/path';

const footer = ['/', path.hutangPiutang, path.transaksi, path.profile];

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = React.useCallback(
    (path) => {
      return pathname.includes(path);
    },
    [pathname]
  );

  const handleRoute = React.useCallback((active, path) => {
    if (!active) {
      navigate(path);
    }
  }, []);

  if (!footer.includes(pathname)) return <div />;

  return (
    <div className={style.container}>
      <div className={style.footer}>
        <div
          className={cx(style.menu, {
            [style.active]: active(path.hutangPiutang) || pathname === '/',
          })}
          onClick={() => handleRoute(active(path.hutangPiutang), path.hutangPiutang)}
        >
          <div className={style.wrapper}>
            <button>
              <i className="fa-solid fa-money-bills"></i>
            </button>
            <span>Utang</span>
          </div>
        </div>
        <div
          className={cx(style.menu, active(path.transaksi) && style.active)}
          onClick={() => handleRoute(active(path.transaksi), path.transaksi)}
        >
          <div className={style.wrapper}>
            <button>
              <i className="fa-solid fa-money-bill-transfer"></i>
            </button>
            <span>Transaksi</span>
          </div>
        </div>
        <div
          className={cx(style.menu, active(path.profile) && style.active)}
          onClick={() => handleRoute(active(path.profile), path.profile)}
        >
          <div className={style.wrapper}>
            <button>
              <i className="fa-solid fa-user"></i>
            </button>
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
