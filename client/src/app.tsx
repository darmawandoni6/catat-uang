import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from '@page/home';
import Login from '@page/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
