import React, { useState, useEffect } from 'react';
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
import { fetchReservations } from '../../api/AdminApi'; // Import API call
import dayjs from 'dayjs';

const { Option } = Select;

const AdminReservationComponents = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchType, setSearchType] = useState('all'); // Default search type
  const [searchValue, setSearchValue] = useState('');

  // Fetch reservation data from API
  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await fetchReservations();
      setReservations(data);
      setFilteredReservations(data); // Initially display all reservations
    } catch (error) {
      message.error('예약 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations(); // Load reservations on component mount
  }, []);

  // Handle Search and Filter
  useEffect(() => {
    const filtered = reservations.filter((item) => {
      const lowerValue = searchValue.toLowerCase();

      // All Fields Search
      const matchesAllFields =
        `${item.orderId}`.toLowerCase().includes(lowerValue) ||
        `${item.firstname} ${item.lastname}`.toLowerCase().includes(lowerValue) ||
        item.torderItems.some((order) =>
          order.tname.toLowerCase().includes(lowerValue)
        ) ||
        dayjs(item.paymentDate).format('YYYY-MM-DD').includes(lowerValue);

      // Specific Field Search
      const matchesSpecificField =
        searchType === 'reservationId'
          ? `${item.orderId}`.toLowerCase().includes(lowerValue)
          : searchType === 'customerName'
          ? `${item.firstname} ${item.lastname}`.toLowerCase().includes(lowerValue)
          : searchType === 'tourName'
          ? item.torderItems.some((order) =>
              order.tname.toLowerCase().includes(lowerValue)
            )
          : searchType === 'paymentDate'
          ? dayjs(item.paymentDate).format('YYYY-MM-DD').includes(lowerValue)
          : false;

      return searchType === 'all' ? matchesAllFields : matchesSpecificField;
    });

    setFilteredReservations(filtered);
  }, [searchValue, searchType, reservations]);

  const columns = [
    {
      title: '예약 번호',
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
      title: '투어/상품명',
      dataIndex: 'torderItems',
      key: 'tourName',
      render: (torderItems) => torderItems.map((item) => item.tname).join(', '),
    },
    {
      title: '결제 날짜',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date) =>
        date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '결제 정보 없음',
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
              setSelectedReservation(record);
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
          {/* Search Type Selector */}
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
            <Option value="reservationId">예약 번호</Option>
            <Option value="customerName">고객명</Option>
            <Option value="tourName">투어/상품명</Option>
            <Option value="paymentDate">결제 날짜</Option>
          </Select>

          {/* Search Input */}
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

      {/* Reservations Table */}
      <Table
        columns={columns}
        dataSource={filteredReservations}
        rowKey="orderId"
        loading={loading}
      />

      {/* Reservation Details Drawer */}
      <Drawer
  title="예약 상세 정보"
  placement="right"
  onClose={() => setDrawerVisible(false)}
  visible={drawerVisible}
  width={400}
>
  {selectedReservation && (
    <div>
      {/* Reservation ID */}
      <p>
        <strong>예약 번호:</strong> {selectedReservation.orderId}
      </p>

      {/* Customer Details */}
      <p>
        <strong>고객명:</strong> {selectedReservation.firstname} {selectedReservation.lastname}
      </p>
      <p>
        <strong>연락처:</strong> {selectedReservation.phoneNumber}
      </p>
      <p>
        <strong>국가:</strong> {selectedReservation.country}
      </p>

      {/* Payment and Order Info */}
      <p>
        <strong>결제 상태:</strong> {selectedReservation.paymentStatus}
      </p>
      <p>
        <strong>결제 날짜:</strong>{' '}
        {selectedReservation.paymentDate
          ? dayjs(selectedReservation.paymentDate).format('YYYY-MM-DD HH:mm:ss')
          : '결제 정보 없음'}
      </p>
      <p>
        <strong>총 금액:</strong> ₩{selectedReservation.totalPrice.toLocaleString()}
      </p>

      {/* Tour/Products List */}
      <p>
        <strong>예약된 상품:</strong>
      </p>
      <ul>
        {selectedReservation.torderItems.map((item, idx) => (
          <li key={idx}>
            {item.tname} - ₩{item.tprice.toLocaleString()} x {item.tqty} (날짜:{' '}
            {dayjs(item.tdate).format('YYYY-MM-DD')})
          </li>
        ))}
      </ul>
    </div>
  )}
</Drawer>

    </div>
  );
};

export default AdminReservationComponents;
