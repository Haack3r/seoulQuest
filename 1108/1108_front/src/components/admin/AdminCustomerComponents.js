import React, { useState, useEffect } from 'react';

const AdminCustomerComponents = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [gradeFilter, setGradeFilter] = useState(''); // 고객의 등급에 따라 필터링을 할 때 사용하는 변수
    const [activeTab, setActiveTab] = useState('profile');
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false); // 고객 차단 모달의 표시 여부를 결정하는 변수
    const [blockReason, setBlockReason] = useState(''); // 차단 사유를 저장하는 변수
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);  // 답변 모달의 표시 여부를 관리하는 변수
    const [answerContent, setAnswerContent] = useState(''); // 선택된 고객 문의에 대한 답변 내용을 저장하는 변수

    // 임시 데이터
    useEffect(() => {
        const mockCustomers = [
            {
                id: 1,
                name: '방수오',
                email: 'Bang@example.com',
                phone: '010-1234-5678',
                registrationDate: '2024-09-15',
                grade: 'VIP',
                totalPurchase: 1500000,
                address: '서울시 강남구',
                status: '활성',
                orders: [
                    { id: 1, date: '2024-03-01', amount: 150000, status: '완료' },
                    { id: 2, date: '2024-02-15', amount: 200000, status: '진행중' }
                ],
                inquiries: [
                    {
                        id: 1,
                        date: '2024-03-05',
                        title: '배송 관련 문의',
                        status: '답변완료',
                        content: '주문한 상품이 아직 도착하지 않았습니다'
                    }
                ]
            },
            {
                id: 2,
                name: '김수환',
                email: 'Kim@example.com',
                phone: '010-1234-5678',
                registrationDate: '2024-10-15',
                grade: '일반',
                totalPurchase: 1500000,
                address: '서울시 서대문구',
                status: '활성',
                orders: [
                    { id: 1, date: '2024-09-01', amount: 250000, status: '완료' },
                    { id: 2, date: '2024-10-15', amount: 400000, status: '진행중' }
                ],
                inquiries: [
                    {
                        id: 2,
                        date: '2024-06-05',
                        title: '교환 문의',
                        status: '대기중',
                        content: '사이즈가 맞지 않아 교환하고 싶습니다'
                    }
                ]
            },
            {
                id: 3,
                name: '김민우',
                email: 'Chu@example.com',
                phone: '010-1234-5678',
                registrationDate: '2024-09-30',
                grade: '신규',
                totalPurchase: 1500000,
                address: '충청남도 서산시',
                status: '활성',
                orders: [
                    { id: 1, date: '2024-03-01', amount: 50000, status: '완료' },
                    { id: 2, date: '2024-02-15', amount: 250000, status: '진행중' }
                ],
                inquiries: [
                    {
                        id: 3,
                        date: '2024-08-05',
                        title: '문의 사항',
                        status: '답변완료',
                        content: '사이즈를 잘못 적었습니다'
                    }
                ]
            }
        ];
        setCustomers(mockCustomers);
    }, []);

    // 검색 및 필터링

    // customer 객체에 대해 조건을 검사하고, 조건을 충족하는 고객만 filteredCustomers에 포함
    const filteredCustomers = customers.filter(customer => {

        const matchesSearch =
            customer.name.includes(searchTerm) ||
            customer.email.includes(searchTerm) ||
            customer.phone.includes(searchTerm);

        const matchesGrade = gradeFilter ? customer.grade === gradeFilter : true;
        return matchesSearch && matchesGrade;
    });

    // 고객 선택
    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        setActiveTab('profile');    // 현재 활성화된 탭을 profile로 설정
    };

    // 등급 변경
    const handleGradeChange = (customerId, newGrade) => {
        const updatedCustomers = customers.map(customer =>
            customer.id === customerId

                // 일치하는 경우: 기존 customer 객체에 grade 속성을 newGrade로 업데이트한 새 객체를 생성
                // 일치하지 않는 경우: 기존 customer 객체를 그대로 유지
                ? { ...customer, grade: newGrade }
                : customer
        );
        setCustomers(updatedCustomers);

        // 고객의 id가 등급을 변경한 customerId와 일치하는 고객을 찾는 조건
        // 조건을 만족하는 첫 번째 고객 객체를 반환
        setSelectedCustomer(updatedCustomers.find(c => c.id === customerId));
    };

    // 차단 처리
    const handleBlockCustomer = (customerId) => {

        // selectedCustomer.status가 '활성'이고 blockReason (차단 사유)이 비어있을 때 실행
        if (selectedCustomer.status === '활성' && !blockReason.trim()) {
            alert('차단 사유를 입력해주세요.');
            return;
        }

        const updatedCustomers = customers.map(customer =>
            customer.id === customerId
                ? {
                    ...customer,
                    status: customer.status === '활성' ? '차단' : '활성',
                    blockReason: customer.status === '활성' ? blockReason : null,

                    // 차단 시 현재 날짜를 기록하고, 차단 해제 시 null로 설정
                    blockDate: customer.status === '활성' ? new Date().toISOString() : null
                }
                : customer
        );

        setCustomers(updatedCustomers);

        // find() 메서드는 배열에서 조건에 맞는 첫 번째 요소를 반환
        // updatedCustomers 배열에서 id가 customerId와 일치하는 고객을 찾아 반환
        setSelectedCustomer(updatedCustomers.find(c => c.id === customerId));

        setBlockReason(''); // 고객 차단이 완료된 후, 차단 사유 입력 필드를 초기화
        setIsBlockModalOpen(false);
        alert(`고객이 ${selectedCustomer.status === '활성' ? '차단' : '차단 해제'} 되었습니다.`);
    };

    // 답변 처리 함수 추가
    const handleAnswer = (inquiry) => {
        setSelectedInquiry(inquiry);
        setIsAnswerModalOpen(true); // true로 설정하면, 답변 작성 모달을 열게 됨
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            {/* 검색 및 필터링 */}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
                <div className="flex gap-4">

                    <input
                        type="text"
                        placeholder="고객 검색"
                        value={searchTerm}  // input 태그의 value 속성에 searchTerm 상태 값을 할당

                        // setSearchTerm에 e.target.value 값을 전달하면, searchTerm 상태가 사용자가 입력한 값으로 업데이트
                        onChange={(e) => setSearchTerm(e.target.value)}

                        className="flex-1 p-2 border rounded"
                    />

                    <select
                        value={gradeFilter}
                        onChange={(e) => setGradeFilter(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">전체 등급</option>
                        <option value="VIP">VIP</option>
                        <option value="일반">일반</option>
                        <option value="신규">신규</option>
                    </select>

                </div>
            </div>

            {/* 고객 목록 및 상세 정보 */}

            {/*  3개의 열로 나누어 표시하는 그리드 레이아웃을 설정 */}
            <div className="grid grid-cols-3 gap-8">
                {/* 고객 목록 */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">고객 목록</h2>
                    <div className="space-y-4">
                        {filteredCustomers.map(customer => (
                            <div
                                key={customer.id}
                                onClick={() => handleCustomerClick(customer)}
                                className={`p-4 border rounded cursor-pointer hover:bg-gray-50 
                                ${customer.status === '차단' ? 'bg-red-50' : ''}`}>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{customer.name}</h3>
                                        <p className="text-sm text-gray-500">{customer.email}</p>
                                    </div>

                                    {/* text-xs font-medium: 글씨 크기를 작고 중간 두께로 설정 */}
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium w-[48px] inline-block text-center
                                         ${customer.grade === 'VIP'
                                            ? 'bg-purple-100 text-purple-800'
                                            : customer.grade === '일반'
                                                ? 'bg-orange-100 text-orange-800'
                                                : 'bg-blue-100 text-blue-800'}`}>
                                        {customer.grade}
                                    </span>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 고객 상세 정보 */}
                {selectedCustomer && (
                    <div className="col-span-2 bg-white rounded-lg shadow p-6">

                        {/* items-center는 세로 방향으로 자식 요소들을 중앙에 배치 */}
                        {/* justify-between은 자식 요소들(고객 정보, 버튼)을 양쪽 끝에 배치 */}
                        <div className="flex justify-between items-center mb-6">

                            <div>
                                <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                                {selectedCustomer.status === '차단' && (
                                    <p className="text-red-600 text-sm">차단된 고객</p>
                                )}
                            </div>

                            <button
                                onClick={() => setIsBlockModalOpen(true)}
                                className={`px-4 py-2 rounded ${selectedCustomer.status === '활성'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-green-600 text-white'
                                    }`}>
                                {selectedCustomer.status === '활성' ? '차단' : '차단 해제'}
                            </button>

                        </div>

                        {/* 탭 메뉴 */}
                        <div className="flex border-b mb-6">
                            {['profile', 'orders', 'inquiries'].map(tab => (

                                <button
                                    key={tab}   // 튼에 고유한 키를 부여하여 렌더링
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-10 py-2 ${activeTab === tab
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500'
                                        }`}>

                                    {/* tab 문자열의 첫 번째 문자를 대문자로 변환 */}
                                    {/* 나머지 문자열은 그대로 유지하여 tab 값을 대문자로 시작하는 형태 */}
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>

                            ))}
                        </div>

                        {/* 탭 내용 */}
                        {activeTab === 'profile' && (
                            <div className="grid grid-cols-2 gap-6">

                                <div>
                                    <h3 className="font-semibold mb-4 text-lg">기본 정보</h3>
                                    <p className='mb-2'>이메일: {selectedCustomer.email}</p>
                                    <p className='mb-2'>연락처: {selectedCustomer.phone}</p>
                                    <p className='mb-2'>주소: {selectedCustomer.address}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-4 text-lg">등급 관리</h3>

                                    <select
                                        value={selectedCustomer.grade}
                                        onChange={(e) => handleGradeChange(selectedCustomer.id, e.target.value)}
                                        className="p-2 border rounded">
                                        <option value="VIP">VIP</option>
                                        <option value="일반">일반</option>
                                        <option value="신규">신규</option>
                                    </select>

                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div>
                                <h3 className="font-semibold mb-4 text-lg">주문 내역</h3>
                                <table className="w-full">

                                    <thead>
                                        <tr>
                                            <th className="text-left">주문번호</th>
                                            <th className="text-left">날짜</th>
                                            <th className="text-left">금액</th>
                                            <th className="text-left">상태</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {selectedCustomer.orders.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.date}</td>

                                                {/* 금액을 천 단위로 구분하고 원을 추가 */}
                                                <td>{order.amount.toLocaleString()}원</td>

                                                <td>{order.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        )}

                        {activeTab === 'inquiries' && (
                            <div>
                                {/* 문의 통계 */}
                                <div className="grid grid-cols-3 gap-4 mb-6">

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="text-sm text-blue-600 mb-1">전체 문의</h4>
                                        <p className="text-2xl font-bold">{selectedCustomer.inquiries.length}건</p>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="text-sm text-green-600 mb-1">답변 완료</h4>
                                        <p className="text-2xl font-bold">

                                            {/* 상태가 '답변완료'인 문의만 필터링하여 그 개수를 세고 표시 */}
                                            {selectedCustomer.inquiries.filter(i => i.status === '답변완료').length}건

                                        </p>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <h4 className="text-sm text-yellow-600 mb-1">대기 중</h4>
                                        <p className="text-2xl font-bold">
                                            {selectedCustomer.inquiries.filter(i => i.status === '대기중').length}건
                                        </p>
                                    </div>

                                </div>

                                {/* 문의 내역 테이블 */}
                                <div className="bg-white rounded-lg shadow">
                                    <div className="p-4 border-b">
                                        <h3 className="text-lg font-semibold">문의 내역</h3>
                                    </div>

                                    <div className="w-full">

                                        {/* divide-y는 테이블의 각 행 사이에 수평 구분선을 추가 */}
                                        <table className="w-full table-fixed min-w-full divide-y divide-gray-200">

                                            <thead className="bg-gray-50">
                                                <tr>

                                                    {/* uppercase는 텍스트를 대문자로 변환 */}
                                                    <th className="w-20 px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                        문의번호
                                                    </th>
                                                    <th className="w-28 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                        날짜
                                                    </th>
                                                    <th className="w-40 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">
                                                        제목
                                                    </th>
                                                    <th className="flex-1 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                        내용
                                                    </th>
                                                    <th className="w-24 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                                                        상태
                                                    </th>
                                                    <th className="w-20 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                        답변
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {selectedCustomer.inquiries.length > 0 ? (
                                                    selectedCustomer.inquiries.map(inquiry => (

                                                        <tr key={inquiry.id} className="hover:bg-gray-50">

                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {inquiry.id}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {new Date(inquiry.date).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm hidden sm:table-cell">
                                                                <div className="break-words">{inquiry.title}</div>
                                                            </td>

                                                            <td className="px-4 py-3 text-sm">
                                                                <div className="break-words">
                                                                    <span className="md:hidden inline-block font-medium mr-1">
                                                                        [{inquiry.title}]
                                                                    </span>
                                                                    {inquiry.content}
                                                                </div>
                                                            </td>

                                                            {/* md 이상 화면 크기에서만 이 셀을 표시 */}
                                                            <td className="py-3 text-sm hidden md:table-cell">
                                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                                                    ${inquiry.status === '답변완료' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                                    {inquiry.status}
                                                                </span>
                                                            </td>

                                                            {/* whitespace-nowrap: 텍스트가 줄 바꿈 없이 한 줄로 표시 */}
                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                <button
                                                                    onClick={() => handleAnswer(inquiry)}

                                                                    // 문의 상태가 '답변완료'인 경우, 버튼이 비활성화
                                                                    disabled={inquiry.status === '답변완료'}

                                                                    className={`text-sm font-medium ${inquiry.status === '답변완료'
                                                                        ? 'text-gray-400 cursor-not-allowed'    //  마우스 커서를 비활성화된 상태
                                                                        : 'text-blue-600 hover:text-blue-900'
                                                                        }`}>
                                                                    {inquiry.status === '답변완료' ? '완료' : '답변'}
                                                                </button>
                                                            </td>

                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                                            문의 내역이 없습니다.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 차단 모달 */}
            {isBlockModalOpen && (

                // inset-0은 상, 하, 좌, 우 모두 0의 여백
                // opacity-50은 투명도를 50%
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-bold mb-4">
                            {selectedCustomer.status === '활성' ? '고객 차단' : '차단 해제'}
                        </h3>

                        {selectedCustomer.status === '활성' && (
                            <textarea
                                value={blockReason}
                                onChange={(e) => setBlockReason(e.target.value)}
                                placeholder="차단 사유를 입력하세요"
                                className="w-full p-2 border rounded mb-4"
                                rows="3"
                            />
                        )}

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsBlockModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                취소
                            </button>

                            <button
                                onClick={() => handleBlockCustomer(selectedCustomer.id)}
                                className={`px-4 py-2 rounded text-white ${selectedCustomer.status === '활성'
                                    ? 'bg-red-600'
                                    : 'bg-green-600'
                                    }`}
                            >
                                {selectedCustomer.status === '활성' ? '차단하기' : '해제하기'}
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCustomerComponents;