import "@google/model-viewer/dist/model-viewer.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ProductList from "./components/ProductList/ProductList";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
