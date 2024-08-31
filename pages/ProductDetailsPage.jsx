import React from "react";
import ProductTable from "../components/ProductTable";

const ProductDetailsPage = ({ compareList, setCompareList, data, setData }) => {
  const handleCompare = (product) => {
    if (compareList.length >= 4 || compareList.includes(product)) {
      return;
    }
    setCompareList([...compareList, product]);
  };

  return (
    <div>
      <h1>Product Details</h1>
      <ProductTable onCompare={handleCompare} compareList={compareList} data={data} setData={setData} />
    </div>
  );
};

export default ProductDetailsPage;
