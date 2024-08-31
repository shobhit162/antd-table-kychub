import React, { useState, useEffect } from "react";
import { Table, Button, notification } from "antd";

const ProductTable = ({ onCompare, compareList, data, setData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length !== 0) {
      setLoading(false);
      return;
    }
    const getData = async() => {
      try{
        const responseData = await fetch('https://dummyjson.com/products');
        const responseJson = await responseData.json();
        setData(responseJson.products || []);
        setLoading(false);
      } catch(error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      } 
    };
    getData();
  }, []);

  const handleCompare = (record) => {
    if (compareList.length >= 4) {
      notification.error({
        message: "You can only compare up to 4 products at a time.",
      });
    } else {
      onCompare(record);
      notification.success({
        message: "Product added to compare list!",
      });
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'title', sorter: (a, b) => a.title.localeCompare(b.title)},
    { title: 'Description', dataIndex: 'description'},
    { title: 'Price', dataIndex: 'price', sorter: (a, b) => a.price - b.price },
    { title: 'Discount Percentage', dataIndex: 'discountPercentage', sorter: (a, b) => a.discountPercentage - b.discountPercentage},
    { title: 'Brand', dataIndex: 'brand'},
    { title: 'Category', dataIndex: 'category', sorter: (a, b) => a.category.localeCompare(b.category)},
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          disabled={compareList.includes(record)}
          onClick={() => handleCompare(record)}
        >
          Compare
        </Button>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} loading={loading} pagination={{ pageSize: 10 }} />;
};

export default ProductTable;
