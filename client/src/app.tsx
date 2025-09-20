import { Suspense, lazy } from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Provider } from '@component/layout/hooks/provider';
import MainLayout from '@component/layout/main-layout';
import Loading from '@component/loading';

const Home = lazy(() => import('@page/home'));
const Bucket = lazy(() => import('@page/bucket'));
const Login = lazy(() => import('@page/login'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <Provider>
                <MainLayout>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/bucket/:id" element={<Bucket />} />
                  </Routes>
                </MainLayout>
              </Provider>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
