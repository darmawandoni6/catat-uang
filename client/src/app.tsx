import { Suspense, lazy } from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Loading from '@component/loading';

const Home = lazy(() => import('@page/home'));
const Login = lazy(() => import('@page/login'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
