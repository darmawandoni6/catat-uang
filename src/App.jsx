import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import path from './constants/path';
import Footer from './components/Footer';
import useServiceWorker from './helpers/useServiceWorker';
const HutangPiutang = React.lazy(() => import('./views/HutangPiutang'));
const AddHutangPiutang = React.lazy(() => import('./views/AddHutangPiutang'));
const Profile = React.lazy(() => import('./views/Profile'));
const Pelanggan = React.lazy(() => import('./views/Pelanggan'));
const Transaksi = React.lazy(() => import('./views/Transaksi'));
const AddTransaksi = React.lazy(() => import('./views/AddTransaksi'));

const App = () => {
  const { waitingWorker, showReload, reloadPage } = useServiceWorker();

  React.useEffect(() => {
    if (showReload && waitingWorker && confirm('Update your Page ?')) {
      reloadPage();
    }
  }, [waitingWorker, showReload]);

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Navigate to={path.hutangPiutang} />} />
          <Route
            path={`${path.hutangPiutang}/*`}
            element={
              <Routes>
                <Route path="/" element={<HutangPiutang />} />
                <Route path={path.addHutangPiutang} element={<AddHutangPiutang />} />
              </Routes>
            }
          />
          <Route
            path={`${path.transaksi}/*`}
            element={
              <Routes>
                <Route path="/" element={<Transaksi />} />
                <Route path={path.addTransaksi} element={<AddTransaksi />} />
              </Routes>
            }
          />
          <Route path={path.pelanggan} element={<Pelanggan />} />
          <Route path={path.profile} element={<Profile />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
