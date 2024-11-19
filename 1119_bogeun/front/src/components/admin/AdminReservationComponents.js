import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
  Tag,
  Card,
  Drawer, // 슬라이딩 사이드 패널 컴포넌트
} from 'antd';

import { SearchOutlined, MailOutlined } from '@ant-design/icons'; // 검색 아이콘, 메일 아이콘

const { Option } = Select;  // Ant Design에서 제공하는 드롭다운 선택 상자 (콤보 박스) 컴포넌트

// 임시 데이터
const mockData = [
  {
    reservationId: "A001",
    customerName: "유지민",
    tourName: "서울 고궁 투어",
    reservationDate: "2024-03-20T10:00:00",
    tourType: "문화 투어",
    status: "confirmed",
    phone: "010-1234-5678",
    email: "kim@example.com",
    participants: 2,
    amount: 100000,
    meetingPoint: "경복궁 정문",
    specialRequests: "편한 신발 준비해주세요"
  },
  {
    reservationId: "B002",
    customerName: "이지금",
    tourName: "명동 맛집 투어",
    reservationDate: "2024-03-21T14:00:00",
    tourType: "음식 투어",
    status: "pending",
    phone: "010-2345-6789",
    email: "lee@example.com",
    participants: 4,
    amount: 200000,
    meetingPoint: "명동역 3번 출구",
    specialRequests: "음식 알레르기 있음"
  },
  {
    reservationId: "C003",
    customerName: "박보영",
    tourName: "북한산 등산 투어",
    reservationDate: "2024-03-22T09:00:00",
    tourType: "자연 투어",
    status: "cancelled",
    phone: "010-3456-7890",
    email: "park@example.com",
    participants: 1,
    amount: 50000,
    meetingPoint: "북한산 입구",
  },
  {
    reservationId: "D004",
    customerName: "정유미",
    tourName: "동대문 쇼핑 투어",
    reservationDate: "2024-03-23T11:00:00",
    tourType: "쇼핑 투어",
    status: "waiting",
    phone: "010-4567-8901",
    email: "jung@example.com",
    participants: 3,
    amount: 150000,
    meetingPoint: "동대문역 1번 출구",
    specialRequests: "쇼핑 카트 필요"
  }
];

const AdminReservationComponents = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loading, setLoading] = useState(false);   // 비동기 데이터 요청 시 로딩 상태를 관리할 상태
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
  });

  const [notificationForm] = Form.useForm();

  // 예약 상태별 태그 설정
  const statusConfig = {
    confirmed: { color: 'green', text: '확정', width: '70px' },
    pending: { color: 'gold', text: '대기중', width: '70px' },
    cancelled: { color: 'red', text: '취소됨', width: '70px' },
    waiting: { color: 'blue', text: '대기자', width: '70px' }
  };

  // 예약 목록 조회
  const fetchReservations = () => {
    setLoading(true);
    let filteredData = [...mockData];

    if (filters.search) {
      filteredData = filteredData.filter(item =>
        item.reservationId.toLowerCase().includes(filters.search.toLowerCase()) ||  // 예약 ID에 검색어 포함
        item.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||   // 고객 이름에 검색어 포함
        item.tourName.toLowerCase().includes(filters.search.toLowerCase())          // 투어 이름에 검색어 포함 
      );
    }

    if (filters.status !== 'all') {
      filteredData = filteredData.filter(item => item.status === filters.status);
    }

    setReservations(filteredData);
    setLoading(false);

  };

  // filters 상태가 변경될 때마다 fetchReservations 함수를 호출하여 예약 목록을 필터링
  useEffect(() => {
    fetchReservations();
  }, [filters]);

  // 예약 상태 변경
  const handleStatusChange = (reservationId, newStatus) => {

    // 예약 목록의 각 항목을 순회하며, reservationId가 일치하는 항목을 찾아 새로운 상태로 변경
    const updatedReservations = reservations.map(item =>
      item.reservationId === reservationId ? { ...item, status: newStatus } : item
    );

    setReservations(updatedReservations);
    message.success('예약 상태가 변경되었습니다.');
  };

  // 알림 발송
  const handleNotificationSend = (values) => {
    message.success('알림이 발송되었습니다.');
    setNotificationModal(false);
    notificationForm.resetFields(); // 알림 발송 후 양식에 입력된 값을 초기 상태로 되돌림
  };

  // 테이블 정의
  const columns = [
    {
      title: '예약 번호',
      dataIndex: 'reservationId',
      key: 'reservationId',
    },
    {
      title: '고객명',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '투어/상품명',
      dataIndex: 'tourName',
      key: 'tourName',
    },
    {
      title: '예약 날짜',
      dataIndex: 'reservationDate',
      key: 'reservationDate',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (

        // 예약 상태에 맞는 색상과 텍스트를 정의한 객체
        <Tag color={statusConfig[status].color} style={{ width: statusConfig[status].width, textAlign: 'center' }}>
          {statusConfig[status].text}
        </Tag>
      ),
    },
    {
      title: '작업',
      key: 'action',
      render: (_, record) => (

        // 버튼들을 가로로 정렬하기 위한 Space 컴포넌트
        <Space>

          <Button onClick={() => {
            setSelectedReservation(record);
            setDrawerVisible(true);
          }}>
            상세정보
          </Button>
          <Button onClick={() => {
            setSelectedReservation(record);
            setNotificationModal(true);
          }}>
            알림
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='p-8 bg-gray-100'>
      <div style={{ padding: '24px' }}>

        {/* 검색 및 필터 영역 */}
        <Card style={{ marginBottom: '16px' }}>
          <Space>
            <Input
              placeholder="예약번호/고객명/투어명 검색"
              prefix={<SearchOutlined />} // 입력 필드의 왼쪽에 검색 아이콘을 표시
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              style={{ width: 230 }}
            />
            <Select
              defaultValue="all"
              style={{ width: 120 }}

              // 입력창에 텍스트를 입력할 때마다 filters 상태의 search 값을 업데이트
              onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
            >
              <Option value="all">전체</Option>

              {/* 객체의 각 항목을 순회하면서 Option 항목을 동적으로 생성 */}
              {/* 예약 상태에 맞는 텍스트를 옵션에 표시 */}
              {Object.entries(statusConfig).map(([key, value]) => (
                <Option key={key} value={key}>{value.text}</Option>
              ))}
            </Select>
          </Space>
        </Card>

        {/* 예약 목록 테이블 */}
        <Table
          columns={columns}
          dataSource={reservations}
          rowKey="reservationId"  // rowKey는 각 테이블 행에 고유한 식별자를 지정하는 속성
          loading={loading}
        />

        {/* 예약 상세 정보 */}
        <Drawer
          title="예약 상세 정보"
          placement="right"

          // setDrawerVisible(false)를 호출하여 드로어의 visible 상태를 false로 설정하고, 드로어를 숨김
          onClose={() => setDrawerVisible(false)}

          visible={drawerVisible}
          width={400}
        >
          {/* selectedReservation 객체가 존재할 때만 상세 정보가 렌더링 */}
          {selectedReservation && (

            <div>
              <p style={{ margin: '8px 0' }}><strong>예약 번호:</strong> {selectedReservation.reservationId}</p>
              <p style={{ margin: '8px 0' }}><strong>고객명:</strong> {selectedReservation.customerName}</p>
              <p style={{ margin: '8px 0' }}><strong>연락처:</strong> {selectedReservation.phone}</p>
              <p style={{ margin: '8px 0' }}><strong>이메일:</strong> {selectedReservation.email}</p>
              <p style={{ margin: '8px 0' }}><strong>투어명:</strong> {selectedReservation.tourName}</p>
              <p style={{ margin: '8px 0' }}><strong>예약 날짜:</strong> {new Date(selectedReservation.reservationDate).toLocaleString()}</p>
              <p style={{ margin: '8px 0' }}><strong>참가 인원:</strong> {selectedReservation.participants}명</p>

              {/* 날짜나 숫자 데이터를 사용자의 로케일(지역 설정)에 맞는 형식으로 변환하여 문자열로 반환하는 함수 */}
              <p style={{ margin: '8px 0' }}><strong>결제 금액:</strong> {selectedReservation.amount.toLocaleString()}원</p>

              <p style={{ margin: '8px 0' }}><strong>집합 장소:</strong> {selectedReservation.meetingPoint}</p>

              {selectedReservation.specialRequests && (
                <p style={{ margin: '8px 0' }}><strong>특별 요청사항:</strong> {selectedReservation.specialRequests}</p>
              )}

              <div style={{ marginTop: '20px' }}>
                <Select
                  style={{ width: 200 }}
                  value={selectedReservation.status}
                  onChange={(value) => handleStatusChange(selectedReservation.reservationId, value)}
                >
                  {/* statusConfig 객체를 배열 형태로 변환하여 [key, value] 형식의 배열로 반환 */}
                  {Object.entries(statusConfig).map(([key, value]) => (

                    // key와 value를 key 속성과 value 속성에 각각 설정
                    <Option key={key} value={key}>{value.text}</Option>

                  ))}
                </Select>
              </div>
            </div>
          )}
        </Drawer>

        {/* 알림 발송 모달 */}
        <Modal
          title="알림 발송"
          visible={notificationModal}
          onCancel={() => {
            setNotificationModal(false);
            notificationForm.resetFields(); // 알림 발송 폼의 입력 필드를 초기화
          }}
          footer={null} // 모달 창의 하단에 추가 버튼을 표시하지 않도록 설정
        >
          <Form
            form={notificationForm}
            onFinish={handleNotificationSend} // 알림 발송 요청을 처리하는 handleNotificationSend 함수를 호출
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: '제목을 입력해주세요' }]}
            >
              <Input placeholder="제목" />
            </Form.Item>

            <Form.Item
              name="content"
              rules={[{ required: true, message: '내용을 입력해주세요' }]}
            >
              <Input.TextArea rows={4} placeholder="내용" />
            </Form.Item>

            <Form.Item>

              {/* type="primary": 버튼을 주요 버튼 스타일 */}
              {/* block: 버튼이 가로 전체 크기로 표시 */}
              <Button type="primary" htmlType="submit" block icon={<MailOutlined />}>
                발송하기
              </Button>
            </Form.Item>

          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminReservationComponents;