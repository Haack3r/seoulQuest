import React, { useState, useEffect } from 'react';
import {Table,Button,Card,Drawer,Space,Input,Select,message,} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchCoupons } from '../../api/AdminApi'; // Import API call
import dayjs from 'dayjs';

const { Option } = Select;

const AdminCouponComponents = () => {
    const [coupons, setCoupons] = useState([]);
    const [filteredCoupons, setFilteredCoupons] = useState([]);
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

    // const handleClickIsActive = async (couponId) =>{
        // setLoading(true);
        // try{
            // const data = await changeActive(couponId);
            // setActive(!active);
            
        // }catch (error) {
            // message.error('쿠폰 정보를 불러오는데 실패했습니다.');
        // } finally {
            // setLoading(false);
        // }
    // }
  
    useEffect(() => {
      loadCoupons(); 
    }, []);
  
    // Handle Search and Filter
    useEffect(() => {
      const filtered = coupons.filter((coupon) => {
        const lowerValue = searchValue.toLowerCase();
  
        // All Fields Search
        const matchesAllFields =
          `${coupon.couponId}`.toLowerCase().includes(lowerValue) ||
          `${coupon.couponName}`.toLowerCase().includes(lowerValue) ||
        //   coupon.torderItems.some((order) =>
        //     order.tname.toLowerCase().includes(lowerValue)
        //   ) ||
          dayjs(coupon.expirationDate).format('YYYY-MM-DD').includes(lowerValue);
  
        // Specific Field Search
        const matchesSpecificField =
          searchType === 'couponId'
            ? `${coupon.orderId}`.toLowerCase().includes(lowerValue)
            : searchType === 'couponName'
            ? `${coupon.couponName}`.toLowerCase().includes(lowerValue)
            : searchType === 'discount'
            ? `${coupon.discount}`.toLowerCase().includes(lowerValue)
            : searchType === 'expirationDate'
            ? dayjs(coupon.expirationDate).format('YYYY-MM-DD').includes(lowerValue)
            : searchType === 'isActive'
            ? `${coupon.isActive}`.toLowerCase().includes(lowerValue)
            : searchType === 'tourName'
            ? coupon.torderItems.some((order) =>
                order.tname.toLowerCase().includes(lowerValue)
              )
            : false;
  
        return searchType === 'all' ? matchesAllFields : matchesSpecificField;
      });
  
      setFilteredCoupons(filtered);
    }, [searchValue, searchType, coupons]);
  
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
        title: '할인 가격',
        dataIndex: 'discount',
        key: 'discount',
        render: (price) => `₩${price.toLocaleString()}`,
      },
      {
        title: '만기일',
        dataIndex: 'expirationDate',
        key: 'expirationDate',
        render: (date) =>
            date ? dayjs(date).format('YYYY-MM-DD') : '결제 정보 없음',
      },
      {
        title: '쿠폰 활성화 여부',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (isActive) => 
            (
          <Space>
            <Button
                className='p-1 w-20'
                // onClick ={handleClickIsActive()}
            //   {() => {
                // setActive(!active)
            //     setSelectedCoupon(record);
            //     setDrawerVisible(true);
            //   }}
            >
                {isActive? "Active": "Inactive"}
            </Button>
          </Space>
        ),
      },
      {
        title: '쿠폰 보유 사용자 목록',
        dataIndex: 'userCouponList',
        key: 'userCouponList',
        render: (date) =>
            date ? dayjs(date).format('YYYY-MM-DD') : '결제 정보 없음',
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
            width: 144,
            height: 34,
            display: 'inline-flex',
            alignItems: 'center',
          }}
          onChange={(value) => setSearchType(value)}
        >
          <Option value="all">전체</Option>
          <Option value="couponId">쿠폰 번호</Option>
          <Option value="couponName">쿠폰명</Option>
          <Option value="discount">할인 가격</Option>
          <Option value="expirationDate">만기일</Option>
          {/* <Option value="isActive">쿠폰 활성화 여부</Option> */}
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
            marginRight: 10
          }}
        />
      </Space>

      <div className="inline-flex mt-2">
          {/* <label className="mr-2">쿠폰 활성화 여부:</label> */}
          <select 
            // onChange={(e) => setFilterStatus(e.target.value)} 
            // value={filterStatus} 
            className="border rounded p-1.5 w-36">
            <option value="">쿠폰 활성화 여부</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
    </Card>

    {/* Reservations Table */}
    <Table
      columns={columns}
      dataSource={filteredCoupons}
      rowKey="couponId"
      loading={loading}
    />

    {/* Reservation Details Drawer */}
    {/* <Drawer
title="예약 상세 정보"
placement="right"
onClose={() => setDrawerVisible(false)}
visible={drawerVisible}
width={400}
>
{selectedCoupon && (
  <div> */}
    {/* Reservation ID */}
    {/* <p>
      <strong>쿠폰 번호:</strong> {selectedCoupon.couponId}
    </p> */}

    {/* Customer Details */}
    {/* <p>
      <strong>쿠폰명:</strong> {selectedCoupon.firstname} {selectedCoupon.lastname}
    </p>
    <p>
      <strong>연락처:</strong> {selectedCoupon.phoneNumber}
    </p>
    <p>
      <strong>국가:</strong> {selectedCoupon.country}
    </p> */}

    {/* Payment and Order Info */}
    {/* <p>
      <strong>결제 상태:</strong> {selectedCoupon.paymentStatus}
    </p>
    <p>
      <strong>결제 날짜:</strong>{' '}
      {selectedCoupon.paymentDate
        ? dayjs(selectedCoupon.paymentDate).format('YYYY-MM-DD HH:mm:ss')
        : '결제 정보 없음'}
    </p>
    <p>
      <strong>총 금액:</strong> ₩{selectedCoupon.totalPrice.toLocaleString()}
    </p> */}

    {/* Tour/Products List */}
    {/* <p>
      <strong>예약된 상품:</strong>
    </p>
    <ul>
      {selectedCoupon.torderItems.map((item, idx) => (
        <li key={idx}>
          {item.tname} - ₩{item.tprice.toLocaleString()} x {item.tqty} (날짜:{' '}
          {dayjs(item.tdate).format('YYYY-MM-DD')})
        </li>
      ))}
    </ul>
  </div>
)}
</Drawer> */}

  </div>
  )
}

export default AdminCouponComponents