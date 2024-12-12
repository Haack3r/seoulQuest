import React, { useState, useEffect } from 'react';
import {Table,Button,Card,Space,Input,Select,message,} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchCoupons ,changeActive} from '../../api/AdminApi'; // Import API call
import dayjs from 'dayjs';

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

    const handleClickIsActive = async (couponId) =>{
        setLoading(true);
        try{
            // const data = await changeActive(couponId);
            setActive(!active);
            
        }catch (error) {
            message.error('쿠폰 정보를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }
  
    useEffect(() => {
      loadCoupons(); 
    }, []);
  
    // Handle Search and Filter
    useEffect(() => {
      const filtered = coupons.filter((coupon) => {
        const lowerValue = searchValue.toLowerCase();
        const removeHyphenValue = searchValue.split('-').join('');
        const removeWonAndCommaValue = searchValue.split('₩').join('').split(',').join('');
        
        //필터 상태에 따른 조건
        const matchesStatus = filterStatus === ''
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
        title: '쿠폰 활성화 여부',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (isActive) => 
            (
          <Space>
            <Button
                className='p-1 w-20'
                onClick ={handleClickIsActive()}
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
   <Card className="mb-4 p-4 shadow-md bg-white rounded-lg">
  <div className="flex gap-4">
    <Select
      id="filterStatus"
      defaultValue=""
      onChange={(value) => setFilterStatus(value)}
      className="h-10 w-44 border border-gray-300 rounded-md shadow-sm"
    >
      <Option value="">쿠폰 활성화 여부</Option>
      <Option value="active">Active</Option>
      <Option value="inactive">Inactive</Option>
    </Select>

    <Input
      placeholder="쿠폰 검색 (번호, 이름, 할인금액, 만기일)"
      prefix={<SearchOutlined className="text-gray-400 text-base" />}
      onChange={(e) => setSearchValue(e.target.value)}
      className="h-10 w-full sm:w-96 border border-gray-300 rounded-md px-3"
    />
  </div>
</Card>



    {/* Reservations Table */}
    <Table
      columns={columns}
      dataSource={filteredCoupons}
      rowKey="couponId"
      loading={loading}
    />

  </div>
  )
}

export default AdminCouponComponents