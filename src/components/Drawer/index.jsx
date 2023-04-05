import React from 'react';
import style from './styles/main.module.scss';

const Drawer = ({ show, setShow, header, children }) => {
  const idDrawer = React.useId();
  const idContent = React.useId();

  React.useEffect(() => {
    if (show) {
      const backdrop = document.getElementById(idDrawer);
      backdrop.style.display = 'block';

      const content = document.getElementById(idContent);
      content.style.height = '90vh';

      return () => {
        backdrop.style.display = 'none';
        content.style.height = '0vh';
      };
    }
  }, [show]);

  const handleBackdrop = (e) => {
    const { id } = e.target;
    if (id === idDrawer) {
      setShow();
    }
  };

  return (
    <>
      <div className={style.Drawer} id={idDrawer} onClick={handleBackdrop} />
      <div className={style.wrapper} id={idContent}>
        <div className={style.content}>
          {header && (
            <div className={style.header}>
              <h1>{header}</h1>
              <button onClick={setShow}>X</button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
