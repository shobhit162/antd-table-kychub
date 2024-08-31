import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CompareProductsPage from "./pages/CompareProductsPage";
import "./styles.css";
import "./components/Sidebar.css"

const App = () => {
  const [compareList, setCompareList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div className="app">
      <Navbar />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className={`content ${isOpen? 'blur':''}`}>
        <Routes>
          <Route 
            path="/" 
            element={<ProductDetailsPage compareList={compareList} setCompareList={setCompareList} data={data} setData={setData}/>} 
          />
          <Route 
            path="/compare" 
            element={<CompareProductsPage compareList={compareList} data={data} setCompareList={setCompareList} />} 
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
