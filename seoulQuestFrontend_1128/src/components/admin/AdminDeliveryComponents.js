import React, { useState } from 'react';

// 배송 회사의 목록을 deliveryCompanies라는 배열에 정의
const deliveryCompanies = ['FedEx', 'DHL', 'UPS'];  

const AdminDeliveryComponents = () => {

  const [orders, setOrders] = useState([  // setOrders는 orders 상태를 업데이트하기 위한 함수
    {
      id: 1,
      customer: '이지은',
      status: '배달 완료',
      estimatedDelivery: '2024-11-05',  // 해당 주문의 예상 배송 날짜
      company: 'FedEx',
      trackingNumber: '123456789',      // 배송 추적을 위한 고유 번호
    },
    {
      id: 2,
      customer: '김제니',
      status: '배송 중',
      estimatedDelivery: '2024-11-06',
      company: 'DHL',
      trackingNumber: '654841655',
    },
    {
      id: 3,
      customer: '유지민',
      status: '대기 중',
      estimatedDelivery: '2024-11-07',
      company: 'UPS',
      trackingNumber: '987654321',
    },
    {
      id: 4,
      customer: '윤선호',
      status: '반품',
      estimatedDelivery: '2024-11-08',
      company: 'UPS',
      trackingNumber: '21684891',
    },
  ]);

  // setInventory는 inventory 상태를 업데이트하기 위한 함수
  const [inventory, setInventory] = useState([  
    { id: 1, product: '기념품 A', stock: 20 },
    { id: 2, product: '기념품 B', stock: 5 },
    { id: 3, product: '기념품 C', stock: 10 }
  ]);

  // 주문 상태를 업데이트하는 함수
  const updateOrderStatus = (id, newStatus) => {  

    setOrders(prevOrders => // setOrders를 사용하여 orders 상태를 업데이트

      prevOrders.map(order => // 이전 주문 배열을 순회하면서 새로운 주문 배열을 생성
        
        // 일치하면 기존 order 객체를 복사하고, status 속성을 newStatus로 업데이트한 새 객체를 반환
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // 주문의 배송 정보(배송 회사 및 추적 번호)를 업데이트하는 함수 정의
  const updateTrackingInfo = (id, newCompany, newTrackingNumber) => {

    setOrders(prevOrders => // setOrders를 사용하여 orders 상태를 업데이트

      prevOrders.map(order => // 이전 주문 배열을 순회하면서 새로운 주문 배열을 생성
        
        // 일치하면 기존 order 객체를 복사하고,
        // company 속성을 newCompany로, trackingNumber 속성을 newTrackingNumber로 업데이트한 새 객체를 반환
        // 일치하지 않는 경우 기존의 order 객체를 그대로 반환
        order.id === id ? { ...order, company: newCompany, trackingNumber: newTrackingNumber } : order
      )
    );
  };

  // 주문의 상태를 수동으로 업데이트하는 함수
  const handleManualStatusUpdate = (id, newStatus) => {

    updateOrderStatus(id, newStatus); // id와 newStatus를 인자로 전달하여, 지정된 주문의 상태를 새로운 상태로 업데이트
  };

  // 재고 수량을 업데이트하는 함수
  const handleInventoryUpdate = (id, newStock) => {
    
    setInventory(prevInventory =>

      prevInventory.map(item => // 이전 재고 배열을 순회하면서 새로운 재고 배열을 생성

        // 일치하면 item 객체를 복사하고, 재고 수량을 새로운 값으로 업데이트
        // 일치하지 않으면 기존 아이템 객체를 그대로 반환
        item.id === id ? { ...item, stock: newStock } : item
      )
    );
  };

  // 재고 경고를 계산하는 함수
  const calculateInventoryWarnings = () => {
    
    // inventory 배열에서 재고 수량이 10보다 적은 item을 필터링하여 반환
    return inventory.filter(item => item.stock < 10);
  };

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">배송 관리</h2>
      <table className="w-full border mb-8 text-center p-4 bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="border px-4 py-2">주문 번호</th>
            <th className="border px-4 py-2">고객명</th>
            <th className="border px-4 py-2">배송 상태</th>
            <th className="border px-4 py-2">예상 배송일</th>
            <th className="border px-4 py-2">배송업체</th>
            <th className="border px-4 py-2">추적 번호</th>
            <th className="border px-4 py-2">상태 변경</th>
            <th className="border px-4 py-2">수동 상태 업데이트</th>
          </tr>
        </thead>
        <tbody>

          {/* orders 배열을 순회하면서 각 주문 객체를 기반으로 새로운 JSX 요소(<tr>와 <td>)를 생성 */}
          {orders.map(order => (

            // 각 주문에 대한 테이블 행을 생성
            <tr key={order.id}> 
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.customer}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">{order.estimatedDelivery}</td>
              <td className="border px-4 py-2">

                <select
                  value={order.company} // 현재 주문의 배송 회사 값을 설정

                  // 선택이 변경될 때 updateTrackingInfo 함수를 호출
                  onChange={(e) => updateTrackingInfo(order.id, e.target.value, order.trackingNumber)}
                  className="border rounded px-2 py-1"
                > 
                  {/* 배송 회사 배열(deliveryCompanies)을 순회하여 각 배송 회사에 대한 <option> 요소를 생성 */}
                  {deliveryCompanies.map(company => (

                    // 각 배송 회사에 대한 옵션을 생성
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={order.trackingNumber}
                  onChange={(e) => updateTrackingInfo(order.id, order.company, e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="추적 번호 입력"
                />
              </td>
              <td className="border px-4 py-2">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="대기 중">대기 중</option>
                  <option value="배송 중">배송 중</option>
                  <option value="배달 완료">배달 완료</option>
                  <option value="반품">반품</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <select
                  onChange={(e) => handleManualStatusUpdate(order.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="대기 중">대기 중</option>
                  <option value="배송 중">배송 중</option>
                  <option value="배달 완료">배달 완료</option>
                  <option value="반품">반품</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-bold mb-4 ">재고 관리</h2>
      <table className="w-full border mb-8 text-center p-4 bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="border px-4 py-2">상품</th>
            <th className="border px-4 py-2">재고</th>
            <th className="border px-4 py-2">재고 업데이트</th>
          </tr>
        </thead>
        <tbody>

          {/* inventory 배열의 각 항목에 대해 반복 */}
          {inventory.map(item => (

            <tr key={item.id}>
              <td className="border px-4 py-2">{item.product}</td>
              <td className="border px-8 py-2">{item.stock}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={item.stock}

                  // 값이 변경될 때마다 handleInventoryUpdate 함수가 호출되어 해당 제품의 ID와 입력된 숫자를 인자로 전달
                  // parseInt를 사용하여 문자열을 정수로 변환
                  onChange={(e) => handleInventoryUpdate(item.id, parseInt(e.target.value))}

                  className="border rounded px-2 py-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-bold mb-4">저재고 경고</h2>
      <ul>
        {/* 함수를 호출하여 저재고 경고를 생성하고, 각 항목에 대해 반복 */}
        {calculateInventoryWarnings().map(item => (

          // 각 리스트 아이템에 고유한 키를 부여
          <li key={item.id} className="text-red-600">{item.product}: {item.stock}개 남음</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDeliveryComponents;
