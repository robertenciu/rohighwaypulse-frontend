import './App.css';
import AllHighwaysPage from './pages/AllHighwaysPage';
import Layout from './components/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={} /> */}
          <Route path="highways" element={< AllHighwaysPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;