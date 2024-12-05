import React, { useState, useEffect } from 'react';
import {Table,Button,Card,Drawer,Space,Input,Select,message,} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchCoupons ,changeActive } from '../../api/AdminApi'; // Import API call

const { Option } = Select;

const AdminCouponComponents = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [filterStatus,setFilterStatus] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchType, setSearchType] = useState('all'); // Default search type
  const [searchValue, setSearchValue] = useState('');
  const [active, setActive] = useState(false);

 //Fetch coupon data from API
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

// 추후 구현
//   const handleClickIsActive = async (couponId) => {
//     setLoading(true);
//     try {
//         // 서버로 쿠폰 ID 전송
//         await changeActive(couponId);

//         // 서버 요청 성공 시, 쿠폰 상태 업데이트
//         const updatedCoupons = coupons.map((coupon) =>
//             coupon.couponId === couponId
//                 ? { ...coupon, isActive: !coupon.isActive } // 상태 토글
//                 : coupon
//         );
//         setCoupons(updatedCoupons);
//         setFilteredCoupons(updatedCoupons); // 필터링된 목록 업데이트

//         message.success('쿠폰 활성화 상태가 변경되었습니다.');
//     } catch (error) {
//         message.error('쿠폰 활성화 상태 변경에 실패했습니다.');
//     } finally {
//         setLoading(false);
//     }
// };


   // Handle Search and Filter
   useEffect(() => {
    const filtered = coupons.filter((coupon) => {
      const lowerValue = searchValue.toLowerCase();
      const removeHyphenValue = searchValue.split('-').join('');
      const removeWonAndCommaValue = searchValue.split('₩').join('').split(',').join('');
      
      //필터 상태에 따른 조건
      const matchesStatus = filterStatus === 'all' 
        ? true //모든 쿠폰 포함
        : filterStatus === 'active'
        ? coupon.isActive //활성화된 쿠폰만
        : !coupon.isActive; //비활성화된 쿠폰만

      //검색어에 따른 조건
      const matchesSearch = 
        `${coupon.couponId}`.includes(searchValue) ||
        `${coupon.couponName}`.toLowerCase().includes(lowerValue) ||
        `${coupon.discount}`.includes(removeWonAndCommaValue) ||
        `${coupon.expirationDate}`.split('-').join('').includes(removeHyphenValue) ;
        // ||
        // (lowerValue === 'active' && coupon.isActive) ||
        // (lowerValue === 'inactive' && !coupon.isActive);

        return matchesStatus && matchesSearch;
    });

    setFilteredCoupons(filtered);
  }, [searchValue, filterStatus, coupons]);

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
      render: (date) =>
          date ? date
      // dayjs(date).format('YYYY-MM-DD') 
      : '결제 정보 없음',
    },
    {
      title: '쿠폰 활성화 상태',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive,record) => 
          (
        <Space>
          <Button
              className='p-1 w-20'
            //   onClick ={handleClickIsActive(record.couponId)}
          >
              {isActive? "Active": "Inactive"}
          </Button>
        </Space>
      ),
    },
    //추가 구현해야함
    {
      title: '쿠폰 보유 사용자 목록',
      dataIndex: 'userCouponList',
      key: 'userCouponList',
      render: (list) =>
          list ? list : '쿠폰 보유 사용자 목록',
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
            {/* <Option value="쿠폰 활성화 상태" >all</Option> */}
            <Option value="all">all</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>

          {/* Search Input */}
          <Input
            placeholder="쿠폰 검색 (번호, 이름, 할인금액, 만기일)"
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
          total: coupons.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        columns={columns}
        dataSource={filteredCoupons}
        rowKey="couponId"
        loading={loading}
      />

    </div>
  );
};

export default AdminCouponComponents;
