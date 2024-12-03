import React, { useState, useEffect } from 'react';
import { getCustomerList } from '../../api/AdminApi';

const AdminCustomerComponents = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API에서 고객 데이터 가져오기
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

    // 검색 필터링
    const filteredCustomers = customers.filter(customer => {
        const fullName = `${customer.firstname} ${customer.lastname}`;
        return fullName.includes(searchTerm) ||
            customer.email.includes(searchTerm) ||
            customer.phoneNumber.includes(searchTerm);
    });

    // 고객 선택
    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        setActiveTab('profile');
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* 검색 */}
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

            {/* 고객 목록 및 상세 정보 */}
            <div className="grid grid-cols-3 gap-8">
                {/* 고객 목록 */}
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

                {/* 고객 상세 정보 */}
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

                        {/* 탭 메뉴 */}
                        <div className="flex border-b mb-6">
                            {['profile'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-10 py-2 ${activeTab === tab
                                            ? 'border-b-2 border-blue-500 text-blue-600'
                                            : 'text-gray-500'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* 프로필 정보 */}
                        {activeTab === 'profile' && (
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-4 text-lg">기본 정보</h3>
                                    <p className="mb-2">이메일: {selectedCustomer.email}</p>
                                    <p className="mb-2">연락처: {selectedCustomer.phoneNumber}</p>
                                    <p className="mb-2">생년월일: {selectedCustomer.birthday}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-4 text-lg">주소 정보</h3>
                                    <p className="mb-2">국가: {selectedCustomer.country}</p>
                                    <p className="mb-2">도: {selectedCustomer.state}</p>
                                    <p className="mb-2">도시: {selectedCustomer.city}</p>
                                    <p className="mb-2">상세주소: {selectedCustomer.street}</p>
                                    <p className="mb-2">우편번호: {selectedCustomer.zipCode}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCustomerComponents;