import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCustomerList, getCustomerOrders, getCustomerReservations } from '../../api/AdminApi';

const AdminCustomerComponents = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomerList();
                setCustomers(data);
                setError(null);
            } catch (error) {
                console.error('고객 데이터 로딩 실패:', error);
                setError('고객 데이터를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(customer => {
        const fullName = `${customer.firstname} ${customer.lastname}`;
        return fullName.includes(searchTerm) ||
            customer.email.includes(searchTerm) ||
            customer.phoneNumber.includes(searchTerm);
    });

    const handleCustomerClick = async (customer) => {
        setSelectedCustomer(customer);
        setActiveTab('profile');
        try {
            const ordersData = await getCustomerOrders(customer.email);
            const reservationsData = await getCustomerReservations(customer.email);
            setOrders(ordersData);
            setReservations(reservationsData);
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
        }
    };

    const openModal = (order) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mb-8 bg-white rounded-lg shadow p-6">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="고객 검색 (이름, 이메일, 전화번호)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 p-2 border rounded"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">고객 목록</h2>
                    <div className="space-y-4">
                        {filteredCustomers.map(customer => (
                            <div
                                key={customer.id}
                                onClick={() => handleCustomerClick(customer)}
                                className="p-4 border rounded cursor-pointer hover:bg-gray-50"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">
                                            {customer.firstname} {customer.lastname}
                                        </h3>
                                        <p className="text-sm text-gray-500">{customer.email}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {customer.nickName}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedCustomer && (
                    <div className="col-span-2 bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-bold">
                                    {selectedCustomer.firstname} {selectedCustomer.lastname}
                                </h2>
                                <p className="text-gray-500">닉네임: {selectedCustomer.nickName}</p>
                            </div>
                        </div>

                        <div className="flex border-b mb-6">
                            {[
                                { id: 'profile', label: '프로필' },
                                { id: 'orders', label: '주문 내역' },
                                { id: 'bookings', label: '예약 내역' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-10 py-2 ${activeTab === tab.id
                                            ? 'border-b-2 border-blue-500 text-blue-600'
                                            : 'text-gray-500'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'profile' && (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-semibold mb-6 text-lg flex items-center text-gray-800">
                                        <i className="fas fa-user w-5 h-5 mr-2"></i>
                                        기본 정보
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <span className="w-28 text-gray-600 text-sm">이메일</span>
                                            <span className="text-gray-800">: {selectedCustomer.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-28 text-gray-600 text-sm">연락처</span>
                                            <span className="text-gray-800">: {selectedCustomer.phoneNumber}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-28 text-gray-600 text-sm">생년월일</span>
                                            <span className="text-gray-800">: {selectedCustomer.birthday}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-semibold mb-6 text-lg flex items-center text-gray-800">
                                        <i className="fas fa-home w-5 h-5 mr-2"></i>
                                        주소 정보
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <span className="w-28 text-gray-600 text-sm">국가</span>
                                            <span className="text-gray-800">: {selectedCustomer.country}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-28 text-gray-600 text-sm">도</span>
                                            <span className="text-gray-800">: {selectedCustomer.state}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-28 text-gray-600 text-sm">도시</span>
                                            <span className="text-gray-800">: {selectedCustomer.city}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-28 text-gray-600 text-sm">상세주소</span>
                                            <span className="text-gray-800">: {selectedCustomer.street}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-28 text-gray-600 text-sm">우편번호</span>
                                            <span className="text-gray-800">: {selectedCustomer.zipCode}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                {orders.map((order, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="font-medium text-gray-800 flex items-center">
                                                <i className="fas fa-shopping-bag w-5 h-5 mr-2"></i>
                                                주문번호: {order.orderId}
                                            </span>
                                            <button
                                                onClick={() => openModal(order)}
                                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                                            >
                                                <i className="fas fa-eye w-4 h-4 mr-1"></i>
                                                배송 정보 보기
                                            </button>
                                        </div>
                                        <div className="bg-white rounded-lg divide-y divide-gray-100">
                                            {order.paymentItems.map((item, idx) => (
                                                <div key={idx} className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-gray-800">{item.pname}</span>
                                                        <div className="text-right">
                                                            <div className="flex items-center gap-6">
                                                                <span className="text-sm text-gray-600">수량: {item.pqty}개</span>
                                                                <span className="w-32 text-right font-medium">₩{item.pprice.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 bg-white rounded-lg p-4">
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600 flex items-center">
                                                        <i className="fas fa-calendar w-4 h-4 mr-2"></i>
                                                        결제일
                                                    </span>
                                                    <span className="text-gray-800">{order.paymentDate}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600 flex items-center">
                                                        <i className="fas fa-credit-card w-4 h-4 mr-2"></i>
                                                        결제 수단
                                                    </span>
                                                    <span className="text-gray-800">{order.paymentMethod}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600 flex items-center">
                                                        <i className="fas fa-ticket-alt w-4 h-4 mr-2"></i>
                                                        사용 쿠폰
                                                    </span>
                                                    <span className="text-gray-800">{order.usedCoupon || '없음'}</span>
                                                </div>
                                                <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200">
                                                    <span className="font-medium text-gray-800">총 금액</span>
                                                    <span className="font-bold text-lg text-blue-600">₩{order.totalPrice.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'bookings' && (
                            <div className="space-y-6">
                                {reservations.map((reservation, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="font-medium text-gray-800 flex items-center">
                                                <i className="fas fa-calendar-alt w-5 h-5 mr-2"></i>
                                                예약번호: {reservation.reservationId}
                                            </span>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                                {reservation.status || '예약 확정'}
                                            </span>
                                        </div>
                                        <div className="bg-white rounded-lg divide-y divide-gray-100">
                                            {reservation.paymentItems.map((item, idx) => (
                                                <div key={idx} className="p-4">
                                                    <div className="flex flex-col sm:flex-row justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-800 mb-2">{item.tname}</h4>
                                                            <div className="flex items-center text-sm text-gray-600 space-x-4">
                                                                <span className="flex items-center">
                                                                    <i className="fas fa-calendar w-4 h-4 mr-1"></i>
                                                                    {item.tdate}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <i className="fas fa-users w-4 h-4 mr-1"></i>
                                                                    {item.tqty}명
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 sm:mt-0 text-right">
                                                            <span className="font-medium text-lg text-gray-800">
                                                                ₩{item.tprice.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 bg-white rounded-lg p-4">
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600 flex items-center">
                                                        <i className="fas fa-calendar-check w-4 h-4 mr-2"></i>
                                                        결제일
                                                    </span>
                                                    <span className="text-gray-800">{reservation.paymentDate}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600 flex items-center">
                                                        <i className="fas fa-credit-card w-4 h-4 mr-2"></i>
                                                        결제 수단
                                                    </span>
                                                    <span className="text-gray-800">{reservation.paymentMethod}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600 flex items-center">
                                                        <i className="fas fa-ticket-alt w-4 h-4 mr-2"></i>
                                                        사용 쿠폰
                                                    </span>
                                                    <span className="text-gray-800">{reservation.usedCoupon || '없음'}</span>
                                                </div>
                                                <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200">
                                                    <span className="font-medium text-gray-800">총 금액</span>
                                                    <span className="font-bold text-lg text-blue-600">
                                                        ₩{reservation.totalPrice.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {reservation.memo && (
                                            <div className="mt-4 bg-yellow-50 rounded-lg p-4">
                                                <div className="flex items-start">
                                                    <i className="fas fa-info-circle w-5 h-5 text-yellow-600 mr-2 mt-0.5"></i>
                                                    <div>
                                                        <span className="block text-sm font-medium text-yellow-800 mb-1">예약 메모</span>
                                                        <p className="text-sm text-yellow-700">{reservation.memo}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {selectedOrder && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h2 className="text-lg font-bold mb-4">배송 정보</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">수령인</p>
                                <p className="font-medium">{selectedOrder.fullName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">연락처</p>
                                <p className="font-medium">{selectedOrder.phoneNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">배송지</p>
                                <p className="font-medium">
                                    {selectedOrder.country} {selectedOrder.state} {selectedOrder.city} {selectedOrder.street} {selectedOrder.zipCode}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="mt-4 w-full bg-stone-400 text-white py-2 rounded-md hover:bg-stone-500"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCustomerComponents;