import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Space, Input, Select, message, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchCoupons } from '../../api/AdminApi'; // Import API call

const { Option } = Select;

const AdminCouponComponents = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [selectedCouponUsers, setSelectedCouponUsers] = useState([]); // Users for modal

  // Fetch coupon data from API
  const loadCoupons = async () => {
    setLoading(true);
    try {
      const data = await fetchCoupons();
      setCoupons(data);
      setFilteredCoupons(data); // Initially display all reservations
    } catch (error) {
      message.error('쿠폰 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  // Handle Search and Filter
  useEffect(() => {
    const filtered = coupons.filter((coupon) => {
      const lowerValue = searchValue.toLowerCase();
      const removeHyphenValue = searchValue.split('-').join('');
      const removeWonAndCommaValue = searchValue.split('₩').join('').split(',').join('');

      // Filter status
      const matchesStatus =
        filterStatus === 'all'
          ? true
          : filterStatus === 'active'
          ? coupon.isActive
          : !coupon.isActive;

      // Search condition
      const matchesSearch =
        `${coupon.couponName}`.toLowerCase().includes(lowerValue) ||
        `${coupon.discount}`.includes(removeWonAndCommaValue) ||
        `${coupon.expirationDate}`.split('-').join('').includes(removeHyphenValue);

      return matchesStatus && matchesSearch;
    });

    setFilteredCoupons(filtered);
  }, [searchValue, filterStatus, coupons]);

  // Show Modal with selected coupon's users
  const showModal = (userCouponList) => {
    setSelectedCouponUsers(userCouponList || []); // Set users or empty array
    setIsModalVisible(true); // Show modal
  };

  // Hide Modal
  const hideModal = () => {
    setIsModalVisible(false);
    setSelectedCouponUsers([]);
  };

  const columns = [
    {
      title: '쿠폰 번호',
      dataIndex: 'couponId',
      key: 'couponId',
    },
    {
      title: '쿠폰명',
      dataIndex: 'couponName',
      key: 'couponName',
    },
    {
      title: '할인 금액',
      dataIndex: 'discount',
      key: 'discount',
      render: (price) => `₩${price.toLocaleString()}`,
    },
    {
      title: '만기일',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (date) => (date ? date : '결제 정보 없음'),
    },
    {
      title: '쿠폰 활성화 상태',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (isActive ? 'Active' : 'Inactive'),
    },
    {
      title: '쿠폰 보유 회원 목록',
      key: 'userCouponList',
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record.userCouponList)}>
          보기
        </Button>
      ),
    },
  ];

  const userColumns = [
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '회원 이름',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '사용 날짜',
      dataIndex: 'useDate',
      key: 'useDate',
      render: (useDate) => (useDate ? useDate : '미사용'),
    },
  ];

  return (
    <div className="p-8 bg-gray-100">
      <Card style={{ marginBottom: '16px' }}>
        <Space>
          {/* Search Type Selector */}
          <Select
            defaultValue="쿠폰 활성화 상태"
            style={{
              width: 150,
              height: 34,
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onChange={(value) => setFilterStatus(value)}
          >
            <Option value="all">all</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>

          {/* Search Input */}
          <Input
            placeholder="쿠폰 검색 (쿠폰명, 할인금액, 만기일)"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              width: 400,
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
        pagination={{
          position: ['bottomLeft'],
          pageSize: 10,
          showQuickJumper: true,
        }}
        columns={columns}
        dataSource={filteredCoupons}
        rowKey="couponId"
        loading={loading}
      />

      {/* Modal for Coupon Users */}
      <Modal
        title="쿠폰 보유 회원 목록"
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null} // No footer buttons
      >
        <Table
          columns={userColumns}
          dataSource={selectedCouponUsers}
          rowKey="email"
          pagination={false} // Disable pagination for modal
        />
      </Modal>
    </div>
  );
};

export default AdminCouponComponents;
