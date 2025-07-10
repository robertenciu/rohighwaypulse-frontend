import "./App.css";
import AllHighwaysPage from "./pages/AllHighwaysPage";
import HighwayCards from "./components/HighwayCards";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
