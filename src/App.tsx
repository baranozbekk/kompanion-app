import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Page1 from './pages/Page1.tsx';
import Page2 from './pages/Page2.tsx';
import Page3 from './pages/Page3.tsx';
import Page4 from './pages/Page4.tsx';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup/1" replace />} />
        <Route path="/signup" element={<Navigate to="/signup/1" replace />} />
        <Route path="/signup/1" element={<Page1 />} />
        <Route path="/signup/2" element={<Page2 />} />
        <Route path="/signup/3" element={<Page3 />} />
        <Route path="/signup/4" element={<Page4 />} />
      </Routes>
    </Router>
  );
}

export default App;
