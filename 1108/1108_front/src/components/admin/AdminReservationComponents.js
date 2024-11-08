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
  Drawer,
} from 'antd';
import { SearchOutlined, MailOutlined } from '@ant-design/icons';

const { Option } = Select;

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
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
  });
  const [notificationForm] = Form.useForm();

  // 예약 상태별 태그 설정
  const statusConfig = {
    confirmed: { color: 'green', text: '확정' },
    pending: { color: 'gold', text: '대기중' },
    cancelled: { color: 'red', text: '취소됨' },
    waiting: { color: 'blue', text: '대기자' }
  };

  // 예약 목록 조회
  const fetchReservations = () => {
    setLoading(true);
    let filteredData = [...mockData];

    if (filters.search) {
      filteredData = filteredData.filter(item =>
        item.reservationId.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.tourName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      filteredData = filteredData.filter(item => item.status === filters.status);
    }

    setReservations(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, [filters]);

  // 예약 상태 변경
  const handleStatusChange = (reservationId, newStatus) => {
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
    notificationForm.resetFields();
  };

  // 테이블 컬럼 정의
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
        <Tag color={statusConfig[status].color}>
          {statusConfig[status].text}
        </Tag>
      ),
    },
    {
      title: '작업',
      key: 'action',
      render: (_, record) => (
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
              prefix={<SearchOutlined />}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              style={{ width: 200 }}
            />
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
            >
              <Option value="all">전체</Option>
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
          rowKey="reservationId"
          loading={loading}
        />

        {/* 예약 상세 정보 Drawer */}
        <Drawer
          title="예약 상세 정보"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          width={400}
        >
          {selectedReservation && (
            <div>
              <p><strong>예약 번호:</strong> {selectedReservation.reservationId}</p>
              <p><strong>고객명:</strong> {selectedReservation.customerName}</p>
              <p><strong>연락처:</strong> {selectedReservation.phone}</p>
              <p><strong>이메일:</strong> {selectedReservation.email}</p>
              <p><strong>투어명:</strong> {selectedReservation.tourName}</p>
              <p><strong>예약 날짜:</strong> {new Date(selectedReservation.reservationDate).toLocaleString()}</p>
              <p><strong>참가 인원:</strong> {selectedReservation.participants}명</p>
              <p><strong>결제 금액:</strong> {selectedReservation.amount.toLocaleString()}원</p>
              <p><strong>집합 장소:</strong> {selectedReservation.meetingPoint}</p>
              {selectedReservation.specialRequests && (
                <p><strong>특별 요청사항:</strong> {selectedReservation.specialRequests}</p>
              )}
              <div style={{ marginTop: '20px' }}>
                <Select
                  style={{ width: 200 }}
                  value={selectedReservation.status}
                  onChange={(value) => handleStatusChange(selectedReservation.reservationId, value)}
                >
                  {Object.entries(statusConfig).map(([key, value]) => (
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
            notificationForm.resetFields();
          }}
          footer={null}
        >
          <Form
            form={notificationForm}
            onFinish={handleNotificationSend}
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