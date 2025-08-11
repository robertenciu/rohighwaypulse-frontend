import "./App.css";
import AllHighwaysPage from "./pages/AllHighwaysPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhotosPage from "./pages/PhotosPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="highways/:name?" element={<AllHighwaysPage />} />
          <Route path="photos" element={<PhotosPage />} />
          {/* <Route path="/highways/:name?" element={<AllHighwaysPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
