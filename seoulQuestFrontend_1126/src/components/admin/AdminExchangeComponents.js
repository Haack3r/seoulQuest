import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

const AdminExchangeComponents = () => {
  const [requests, setRequests] = useState([]); // 교환 요청 목록을 저장하는 상태 변수
  const [filterType, setFilterType] = useState(''); // 요청을 필터링하는 데 사용할 유형을 저장하는 상태 변수
  const [filterStatus, setFilterStatus] = useState(''); // 요청의 상태 (예: 진행 중, 완료 등)를 필터링하는 데 사용할 상태 변수
  const [selectedRequest, setSelectedRequest] = useState(null); // 사용자가 선택한 요청을 저장하는 상태 변수
  const [searchQuery, setSearchQuery] = useState(''); // 사용자 입력을 통해 검색할 요청의 쿼리를 저장하는 상태 변수
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달(팝업)창의 가시성을 제어하는 상태 변수

  useEffect(() => {

    // 배송 및 교환 요청에 대한 가상의 데이터 배열을 생성
    const fetchedRequests = [
      { id: 1, type: '반품', status: '진행 중', product: '상품 A', reason: '불량', customer: '고객 1', date: '2024-11-01', adminMemo: '' },
      { id: 2, type: '교환', status: '완료', product: '상품 B', reason: '사이즈 교환', customer: '고객 2', date: '2024-11-02', adminMemo: '' },
      { id: 3, type: '반품', status: '취소', product: '상품 C', reason: '단순 변심', customer: '고객 3', date: '2024-11-03', adminMemo: '' },
      { id: 4, type: '교환', status: '진행 중', product: '상품 D', reason: '색상 교환', customer: '고객 4', date: '2024-11-04', adminMemo: '' },
    ];
    setRequests(fetchedRequests);
  }, []);

  const updateRequestStatus = (id, newStatus) => {

    // prevRequests를 콜백 함수의 매개변수로 받아, 이 데이터를 기반으로 업데이트
    setRequests((prevRequests) =>

      // 일치하는 경우, 객체를 복사한 후({ ...req }) 상태(status)를 newStatus로 변경하여 새로운 객체를 반환
      prevRequests.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  const updateAdminMemo = (id, memo) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) => (req.id === id ? { ...req, adminMemo: memo } : req))
    );
  };

  const showModal = (request) => {  //  모달을 열고 해당 데이터를 모달에 표시하도록 설정하는 함수
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {  // 모달을 닫고 선택된 요청 데이터를 초기화하는 함수
    setIsModalVisible(false);
    setSelectedRequest(null); // 모달이 닫힐 때 선택된 요청 데이터를 지워 다음에 모달이 열릴 때 이전 데이터가 남아 있지 않도록함
  };

  const filteredRequests = requests.filter(
    (request) =>
      (!filterType || request.type === filterType) &&
      (!filterStatus || request.status === filterStatus) &&

      // searchQuery가 request.customer(고객 이름) 또는 request.product(제품 이름)에 포함되어 있으면 조건을 통과
      (request.customer.includes(searchQuery) || request.product.includes(searchQuery))
  );

  // '진행 중'인 것만 필터링 이후에 요청 배열의 길이를 구해 ongoingRequests에 저장
  const ongoingRequests = requests.filter((request) => request.status === '진행 중').length;

  // '완료'인 것만 필터링 이후에 요청 배열의 길이를 구해 completedRequestsㅁ에 저장
  const completedRequests = requests.filter((request) => request.status === '완료').length;

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">반품 및 교환 관리</h2>

      {/* 요청 요약 영역 */}
      <div className="bg-white p-4 rounded shadow-md mb-10">
        <h3 className="text-xl font-semibold mb-2">요청 요약</h3>
        <p>진행 중 요청: {ongoingRequests}</p>
        <p>완료된 요청: {completedRequests}</p>
        <p>전체 요청: {requests.length}</p>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="mb-3 flex">
        <div className="mr-4">
          <label className="mr-1">요청 유형:</label>

          {/* 이벤트 객체 e의 target.value를 setFilterType 함수에 전달하여 filterType 상태를 선택한 값으로 업데이트 */}
          <select onChange={(e) => setFilterType(e.target.value)} value={filterType} className="border rounded p-1">
            <option value="">전체</option>
            <option value="반품">반품</option>
            <option value="교환">교환</option>
          </select>
        </div>

        <div className="mr-4">
          <label className="mr-2">상태:</label>
          <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus} className="border rounded p-1">
            <option value="">전체</option>
            <option value="진행 중">진행 중</option>
            <option value="완료">완료</option>
            <option value="취소">취소</option>
          </select>
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="고객 이름 또는 제품명 검색"
            value={searchQuery} // searchQuery 상태가 업데이트될 때마다 입력 필드의 값도 변경

            // 이벤트가 발생할 때마다 setSearchQuery 함수를 호출하여 현재 입력된 값을 searchQuery 상태로 업데이트
            onChange={(e) => setSearchQuery(e.target.value)}

            className="border p-1 rounded w-full"
          />
        </div>
      </div>

      {/* 요청 목록 테이블 */}
      <table className="w-full bg-white shadow-md rounded overflow-hidden mb-10 text-center">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-2">ID</th>
            <th className="p-2">유형</th>
            <th className="p-2">상태</th>
            <th className="p-2">제품</th>
            <th className="p-2">사유</th>
            <th className="p-2">고객</th>
            <th className="p-2">날짜</th>
            <th className="p-2">상태 업데이트</th>
            <th className="p-2">메모</th>
            <th className="p-2">상세 보기</th>
          </tr>
        </thead>
        <tbody>

          {/* 배열을 순회하며 각 요청 객체 (request)에 대한 <tr> (테이블 행)을 생성 */}
          {filteredRequests.map((request) => (

            // 요청의 고유 ID를 사용
            // 마우스를 올리면 배경색이 회색으로 변경
            <tr key={request.id} className="border-b hover:bg-gray-50">

              {/* 요청의 ID를 표시하는 테이블 셀 */}
              <td className="p-2">{request.id}</td>

              {/* 요청의 유형을 표시하는 테이블 셀 */}
              <td className="p-2">{request.type}</td>

              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-sm ${request.status === '완료' ? 'bg-green-100 text-green-800' :
                  request.status === '진행 중' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {request.status}
                </span>
              </td>

              <td className="p-2">{request.product}</td>
              <td className="p-2">{request.reason}</td>
              <td className="p-2">{request.customer}</td>
              <td className="p-2">{request.date}</td>
              <td className="p-2">

                <select

                  // 현재 요청의 상태를 보여주며, 요청의 상태가 변경되면 선택된 값도 자동으로 업데이트
                  value={request.status}

                  onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="진행 중">진행 중</option>
                  <option value="완료">완료</option>
                  <option value="취소">취소</option>
                </select>
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={request.adminMemo} // 입력 필드에 표시되는 값을 request 객체의 adminMemo 속성으로 설정
                  placeholder="메모"
                  className="border p-1 rounded w-full"
                  onChange={(e) => updateAdminMemo(request.id, e.target.value)} // 관리자가 입력한 메모를 업데이트하는 함수
                />
              </td>
              <td className="p-2">
                <button
                  className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600"
                  onClick={() => showModal(request)}  // 해당 요청의 세부 정보를 모달 창으로 표시하는 함수 
                >
                  보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 상세 정보 모달 */}
      <Modal
        title="반품/교환 요청 상세 정보"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <button
            key="close"
            className="bg-gray-500 text-white rounded px-4 py-2 mr-2"
            onClick={handleModalClose}
          >
            닫기
          </button>
        ]}
        width={600}
      >
        {selectedRequest && (
          <div className="p-4">

            {/* 레이아웃을 사용하여 두 개의 열을 생성 */}
            <div className="grid grid-cols-2 gap-4">

              {/* DIV가 그리드의 두 열을 모두 차지 */}
              <div className="col-span-2 bg-gray-50 p-4 rounded">

                <h3 className="text-lg font-semibold mb-4">기본 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><strong>요청 ID:</strong> {selectedRequest.id}</p>
                    <p className="mb-2"><strong>요청 유형:</strong> {selectedRequest.type}</p>
                    <p className="mb-2"><strong>현재 상태:</strong> {selectedRequest.status}</p>
                    <p className="mb-2"><strong>요청 날짜:</strong> {selectedRequest.date}</p>
                  </div>
                  <div>
                    <p className="mb-2"><strong>고객명:</strong> {selectedRequest.customer}</p>
                    <p className="mb-2"><strong>제품명:</strong> {selectedRequest.product}</p>
                    <p className="mb-2"><strong>요청 사유:</strong> {selectedRequest.reason}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-2 bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-4">상태 관리</h3>
                <div className="mb-4">
                  <label className="block mb-2">상태 업데이트:</label>
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => updateRequestStatus(selectedRequest.id, e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="진행 중">진행 중</option>
                    <option value="완료">완료</option>
                    <option value="취소">취소</option>
                  </select>
                </div>
              </div>

              <div className="col-span-2 bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-4">관리자 메모</h3>
                <textarea

                  //  selectedRequest 객체의 status 속성을 사용하여 현재 상태를 표시
                  value={selectedRequest.adminMemo}

                  // 사용자가 드롭다운의 선택 항목을 변경할 때 호출되는 이벤트 핸들러
                  // e.target.value는 드롭다운에서 선택된 새로운 값을 가져옴
                  onChange={(e) => updateAdminMemo(selectedRequest.id, e.target.value)}

                  className="border p-2 rounded w-full h-32"
                  placeholder="관리자 메모를 입력하세요"
                />
              </div>

              <div className="col-span-2 bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-4">처리 날짜</h3>
                <div className="text-sm text-gray-600">
                  <p>요청 등록: {selectedRequest.date}</p>

                  {/* split('T')[0]을 사용하여 YYYY-MM-DD 형식으로 날짜 부분만 추출 */}
                  <p>최종 수정: {new Date().toISOString().split('T')[0]}</p>

                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* 최근 처리 요청 영역 */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">최근 처리된 요청</h3>
        <div className="bg-white p-4 rounded shadow-md">

          {/* list-disc: 목록 항목에 점을 추가*/}
          <ul className="list-disc pl-5">

            {requests
              .filter((request) => request.status === '완료') // 요청의 상태가 '완료'인 항목만 필터링
              .slice(0, 5)  // 필터링 된 요청 중 가장 최근 요청 5개만 선택

              .map((request) => (
                <li key={request.id} className="mb-2">
                  <strong>{request.date}</strong> : {request.customer}님의 {request.type} 요청 처리 완료
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminExchangeComponents;