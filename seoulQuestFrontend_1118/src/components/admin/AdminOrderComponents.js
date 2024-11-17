import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminOrderComponents = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]); // 주문 데이터 상태
    const [reservations, setReservations] = useState([]); // 예약 데이터 상태l

    useEffect(() => {

        const fetchOrdersAndReservations = () => {
            const sampleOrders = [
                { id: 1, customer: 'Emma Watson', date: '2023-07-01', status: '체험 완료', address: '25 Oxford Road', product: '전통 문화 체험 투어', total: 50000, paymentMethod: '카드 결제' },
                { id: 2, customer: 'Tylor Swift', date: '2023-08-03', status: '배송 완료', address: '123 Beverly Hills Dr', product: '한복 인형', total: 75000, paymentMethod: '현금 결제' },
                { id: 3, customer: 'Cristiano Ronaldo', date: '2023-09-01', status: '취소됨', address: 'Av. de Concha Espina', product: '전통 도자기 체험', total: 40000, paymentMethod: '휴대폰 결제' },
                { id: 4, customer: 'Robert Downey Jr', date: '2023-09-18', status: '환불 요청', address: '444 Birch Rd', product: '역사 탐방 투어', total: 70000, paymentMethod: '간편 결제' },
                { id: 5, customer: 'Rachel McAdams', date: '2023-09-31', status: '배송 중', address: '222 Santa Monica Blvd', product: '지역 특산물 기념품', total: 35000, paymentMethod: 'PayPal' },
                { id: 6, customer: 'Scarlett Johansson', date: '2023-10-13', status: '배송 준비 중', address: '101 Maple Dr', product: '전통 한지 공예품', total: 90000, paymentMethod: 'PayPal' },
            ];

            const sampleReservations = [
                {
                    id: 1, customer: '전광철', date: '2023-10-28', status: '체험 완료', tourType: '전통 음악 투어', Count: '5', total: 650000,
                    paymentMethod: '현금 결제'
                },
                { id: 2, customer: 'Dwayne Johnson', date: '2023-11-11', status: '예약 확정', tourType: '도시 탐험 투어', Count: '6', total: 90000, paymentMethod: '카드 결제' },
                { id: 3, customer: '김제니', date: '2023-12-05', status: '예약 대기 중', tourType: 'DIY 공예 워크숍', Count: '4', total: 60000, paymentMethod: '계좌 이체' },
                { id: 4, customer: 'Vin Diesel', date: '2023-12-25', status: '예약 취소 요청', tourType: '전통 의상 체험 투어', Count: '10', total: 150000, paymentMethod: 'PayPal' },
                { id: 5, customer: '이지은', date: '2024-01-03', status: '예약 대기 중', tourType: '전통 공연 관람 투어', Count: '2', total: 300000, paymentMethod: '계좌 이체' },
                { id: 6, customer: 'Charlie Puth', date: '2024-01-05', status: '예약 대기 중', tourType: '테마 여행 투어', Count: '1', total: 150000, paymentMethod: 'PayPal' },
            ];

            setOrders(sampleOrders);
            setReservations(sampleReservations);
        };

        fetchOrdersAndReservations();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">주문 및 예약 관리</h1>

            {/* 대기 중인 주문 및 예약 수를 요약하여 보여주는 카드 */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">처리중인 주문자</h2>
                    <p>{orders.filter(order => order.status === 'Pending').length} 주문자</p>
                    <button
                        onClick={() => navigate('/admin/orders')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        주문 승인
                    </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">예약 대기 중</h2>
                    <p>{reservations.filter(reservation => reservation.status === 'Pending').length} 예약자</p>
                    <button
                        onClick={() => navigate('/admin/reservations')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        예약 승인
                    </button>
                </div>
            </div>

            {/* 주문 목록 테이블 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                <h2 className="text-xl font-bold p-4 bg-gray-100">주문자</h2>
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                주문자 ID
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                고객 이름
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                주문 날짜
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                주문 상태
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                배송 주소
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                상품 목록
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                주문 금액
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                결제 방법
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-100 cursor-pointer">
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.id}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.customer}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.date}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.status}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.address}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.product}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.total} 원</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.paymentMethod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 예약 목록 테이블 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="text-xl font-bold p-4 bg-gray-100">예약자</h2>
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                예약자 ID
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                고객 이름
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                예약 날짜
                            </th>
                            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                예약 상태
                            </th>
                            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                투어 유형
                            </th>
                            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                예약 인원
                            </th>
                            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                결제 금액
                            </th>
                            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                결제 방법
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id} className="hover:bg-gray-100 cursor-pointer">
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reservation.id}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reservation.customer}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reservation.date}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reservation.status}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reservation.tourType}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reservation.Count} 명</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reservation.total} 원</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reservation.paymentMethod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrderComponents;
