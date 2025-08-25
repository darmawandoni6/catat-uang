import { Suspense, lazy } from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const Home = lazy(() => import('@page/home'));
const Login = lazy(() => import('@page/login'));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center space-x-2 bg-white dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="bg-primary h-4 w-4 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
            <div className="bg-primary h-4 w-4 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
            <div className="bg-primary h-4 w-4 animate-bounce rounded-full"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
