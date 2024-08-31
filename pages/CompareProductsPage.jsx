import React, { useState } from "react";
import { Button, Table, Modal, notification } from "antd";

const CompareProductsPage = ({ compareList, data, setCompareList }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleRemove = (product) => {
    setCompareList(compareList.filter((item) => item.id !== product.id));
    notification.info({ message: `${product.title} removed from compare list!` });
  };

  const handleAddMore = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    const totalSelected = compareList.length + selectedProducts.length;
    if (totalSelected > 4) {
      notification.error({
        message: "You can only compare up to 4 products at a time.",
      });
    } else {
      setCompareList([...compareList, ...selectedProducts]);
      notification.success({ message: "Products added to compare list!" });
      setModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleSelectionChange = (selectedRowKeys, selectedRows) => {
    const totalSelected = compareList.length + selectedRows.length;
    if (totalSelected > 4) {
      notification.error({
        message: "You can only select up to 4 products to compare.",
      });
    } else {
      setSelectedProducts(selectedRows);
    }
  };

  const availableProducts = data.filter(
    (product) => !compareList.some((item) => item.id === product.id)
  );

  const columns = [
    { title: 'Name', dataIndex: 'title' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Discount Percentage', dataIndex: 'discountPercentage' },
    { title: 'Brand', dataIndex: 'brand' },
    { title: 'Category', dataIndex: 'category' },
    {
      title: 'Action',
      render: (_, record) => (
        <Button onClick={() => handleRemove(record)}>Remove</Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Compare Products</h1>
      <Table
        dataSource={compareList}
        columns={columns}
        pagination={false}
        rowKey="id"
        bordered
      />
      <Button type="primary" style={{marginTop: "10px"}} onClick={handleAddMore} disabled={compareList.length >= 4}>
        Add More
      </Button>
      <Modal
        title="Add More Products"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Table
          rowSelection={{
            selectedRowKeys: selectedProducts.map((item) => item.id),
            onChange: handleSelectionChange,
          }}
          columns={columns.filter((col) => col.title !== 'Action')}
          dataSource={availableProducts}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 240 }}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};

export default CompareProductsPage;
