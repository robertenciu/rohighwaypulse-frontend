import "./App.css";
import AllHighwaysPage from "./pages/AllHighwaysPage";
import HighwayCards from "./components/HighwayCards";
import Registration from "./components/Registration";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={} /> */}
          <Route path="highways/:name?" element={<AllHighwaysPage />} />
          {/* <Route path="/highways/:name?" element={<AllHighwaysPage />} /> */}
          <Route path="register" element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
