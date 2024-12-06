import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Drawer,
  Space,
  Input,
  Select,
  message,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchOrders } from '../../api/AdminApi';

const { Option } = Select;

// const initState = {
//   dtoList: [],
//   pageNumList: [],
//   pageRequestDTO: null,
//   prev: false,
//   next: false,
//   totalCount: 0,
//   prevPage: 0,
//   nextPage: 0,
//   totalPage: 0,
//   current: 1,
// };

const AdminOrderComponents = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchType, setSearchType] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  // Fetch order data from API
  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      message.error('주문 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Handle Search and Filter
  useEffect(() => {
    const filtered = orders.filter((item) => {
      const lowerValue = searchValue.toLowerCase();

      // All Fields Search
      const matchesAllFields =
        `${item.orderId}`.toLowerCase().includes(lowerValue) ||
        `${item.firstname} ${item.lastname}`.toLowerCase().includes(lowerValue) ||
        item.porderItems.some((order) =>
          order.pname.toLowerCase().includes(lowerValue)
        );

      // Specific Field Search
      const matchesSpecificField =
        searchType === 'ProductOrderId'
          ? `${item.orderId}`.toLowerCase().includes(lowerValue)
          : searchType === 'customerName'
            ? `${item.firstname} ${item.lastname}`.toLowerCase().includes(lowerValue)
            : searchType === 'productName'
              ? item.porderItems.some((order) =>
                order.pname.toLowerCase().includes(lowerValue)
              )
              : false;

      return searchType === 'all' ? matchesAllFields : matchesSpecificField;
    });

    setFilteredOrders(filtered);
  }, [searchValue, searchType, orders]);

  const columns = [
    {
      title: '주문 번호',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '고객명',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (_, record) => `${record.firstname} ${record.lastname}`,
    },
    {
      title: '상품명',
      dataIndex: 'porderItems',
      key: 'productName',
      render: (porderItems) => porderItems.map((item) => item.pname).join(', '),
    },
    {
      title: '총 금액',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `₩${price.toLocaleString()}`,
    },
    {
      title: '작업',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedOrder(record);
              setDrawerVisible(true);
            }}
          >
            상세정보
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-8 bg-gray-100">
      <Card style={{ marginBottom: '16px' }}>
        <Space>
          <Select
            defaultValue="all"
            style={{
              width: 150,
              height: 34,
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onChange={(value) => setSearchType(value)}
          >
            <Option value="all">전체</Option>
            <Option value="productOrderId">주문 번호</Option>
            <Option value="customerName">고객명</Option>
            <Option value="productName">상품명</Option>
          </Select>

          <Input
            placeholder="검색어를 입력하세요"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              width: 230,
              height: 34,
              display: 'inline-flex',
              alignItems: 'center',
              verticalAlign: 'middle',
            }}
          />
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="orderId"
        loading={loading}
      />

      <Drawer
        title="주문 상세 정보"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={400}
      >
        {selectedOrder && (
          <div>
            <p>
              <strong>주문 번호:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong>고객명:</strong> {selectedOrder.firstname} {selectedOrder.lastname}
            </p>
            <p>
              <strong>연락처:</strong> {selectedOrder.phoneNumber}
            </p>
            <p>
              <strong>국가:</strong> {selectedOrder.country}
            </p>
            <p>
              <strong>총 금액:</strong> ₩{selectedOrder.totalPrice.toLocaleString()}
            </p>

            <p>
              <strong>주문 상품:</strong>
            </p>
            <ul>
              {selectedOrder.porderItems.map((item, idx) => (
                <li key={idx}>
                  {item.pname} - ₩{item.pprice.toLocaleString()} , {item.pqty} 개
                </li>
              ))}
            </ul>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AdminOrderComponents;
