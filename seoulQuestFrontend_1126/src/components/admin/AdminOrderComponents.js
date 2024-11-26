import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf"; // PDF 생성 라이브러리 import
import html2canvas from "html2canvas"; // DOM 요소를 캡처하여 이미지로 변환하는 라이브러리 import
import Graph from "./ui/Graph"; // 주문 관련 그래프 컴포넌트 import
import Widget from "./ui/Widget"; // 대시보드 위젯 컴포넌트 import
import { useAdminMovePages } from "../../hooks/useAdminMovePages"; // 페이지 이동을 위한 커스텀 훅 import

function AdminOrderComponents() {
  const orderDetailsRef = useRef(null); // 주문 세부정보를 참조하기 위한 useRef 훅
  const [widgetCol, setWidgetCol] = useState("md:grid-cols-3");
  const [orderCol, setOrderCol] = useState("md:grid-cols-2");
  const [graphColnVis, setGraphColnVis] = useState("md:visible"); // 그래프 가시성 상태 관리
  const [selectedOrder, setSelectedOrder] = useState(null); // 초기값을 null로 설정하여, selectedOrder가 초기에는 아무런 값도 가지지 않도록 한다
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("orderDate"); // 정렬 기준 상태 관리
  const [sortDirection, setSortDirection] = useState("asc"); // 정렬 방향 상태 관리

  const orders = [
    // 임시 데이터
    {
      orderNumber: 12345,
      customerName: "이지은",
      status: "완료",
      items: ["상품 A", "상품 B"],
      deliveryInfo: "서울특별시 강남구",
      totalAmount: 100000,
      trackingNumber: "TRACK123",
      shippingStatus: "배송 완료",
      orderDate: "2024-10-01",
      contact: "iu@customer.com",
    },
    {
      orderNumber: 12346,
      customerName: "김제니",
      status: "대기 중",
      items: ["상품 B"],
      deliveryInfo: "부산광역시 해운대구",
      totalAmount: 50000,
      trackingNumber: "",
      shippingStatus: "배송 준비 중",
      orderDate: "2024-10-02",
      contact: "jennie@customer.com",
    },
    {
      orderNumber: 12347,
      customerName: "유지민",
      status: "취소",
      items: ["상품 C"],
      deliveryInfo: "경기도 성남시 분당구",
      totalAmount: 70000,
      trackingNumber: "TRACK123",
      shippingStatus: "배송 완료",
      orderDate: "2024-10-03",
      contact: "karina@customer.com",
    },
  ];

  // 화면 크기에 따라 그리드 스타일을 변경하는 useEffect
  useEffect(() => {
    const handleResize = () => {
      // 사이즈 조절 처리 함수
      if (window.innerWidth <= 1024) {
        // 화면 크기가 1024px 이하일 때
        setWidgetCol("sm:grid-cols-1"); // 작은 화면에서 1열 그리드 레이아웃이 적용
        setOrderCol("sm:grid-cols-1");
        setGraphColnVis("sm:invisible");
      } else {
        // 화면 크기가 1024px 초과일 때

        setWidgetCol("md:grid-cols-3");
        setOrderCol("md:grid-cols-2");
        setGraphColnVis("md:visible");
      }
    };

    handleResize();

    // 브라우저 창의 크기가 변경될 때 발생하는 이벤트
    // 크기에 따라 레이아웃을 변경하거나 특정 요소의 크기를 업데이트하는 데 사용
    window.addEventListener("resize", handleResize);

    // handleResize 함수가 컴포넌트가 더 이상 필요하지 않을 때 resize 이벤트에 반응하지 않도록 설정
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOrderClick = (order) => setSelectedOrder(order); // 주문 클릭 시 선택된 주문 설정

  const handleSortChange = (field) => {
    // 정렬 기준 변경 함수
    const direction =
      field === sortOrder && sortDirection === "asc" ? "desc" : "asc"; // 현재 정렬 기준이 같으면 방향 변경
    setSortOrder(field); // 정렬 기준 설정
    setSortDirection(direction); // 정렬 방향 설정
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  // 필터링 된 주문 데이터
  const filteredOrders = orders
    .filter((order) => {
      // statusFilter가 없다면(false), matchesStatus는 true로 설정되어 모든 상태의 주문이 통과
      const matchesStatus = statusFilter ? order.status === statusFilter : true;

      const matchesSearch =
        // searchTerm이 customerName에 포함되어 있는지 확인하고, 포함되어 있다면 true, 그렇지 않으면 false를 반환
        order.customerName.includes(searchTerm) ||
        // item이 searchTerm을 포함되어 있는지 확인하고, item이 searchTerm을 포함하면 true, 그렇지 않으면 false를 반환
        order.items.some((item) => item.includes(searchTerm)) ||
        // item이 searchTerm을 포함하는지 검사한다 포함하면 true, 그렇지 않으면 false를 반환
        order.orderDate.includes(searchTerm);

      //  주문 상태가 필터 조건에 맞고, 주문 정보가 검색어와 일치하는 경우 true를 반환
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "orderDate") {
        // sortDirection이 'asc'(오름차순)이면 a.orderDate.localeCompare(b.orderDate)로 정렬하고, 그렇지 않으면 b.orderDate.localeCompare(a.orderDate)로 정렬
        return sortDirection === "asc"
          ? a.orderDate.localeCompare(b.orderDate)
          : b.orderDate.localeCompare(a.orderDate);
      }

      // totalAmount는 a.totalAmount - b.totalAmount를 통해 오름차순으로 정렬되고, 반대로 b.totalAmount - a.totalAmount는 내림차순 정렬
      return sortDirection === "asc"
        ? a.totalAmount - b.totalAmount
        : b.totalAmount - a.totalAmount;
    });

  const downloadOrderDetails = () => {
    // 주문 세부정보를 PDF로 다운로드하는 함수
    const input = orderDetailsRef.current; // orderDetailsRef에서 현재 참조하는 DOM 요소를 input 변수에 할당

    if (!input) {
      console.error("주문 세부 정보가 없습니다."); // input이 없는 경우 콘솔에 '주문 세부 정보가 없습니다.'라는 오류 메시지를 출력
      return;
    }

    // DOM 요소의 스크린샷을 찍어 <canvas> 요소로 반환
    // CORS를 사용하는 이미지도 캡처할 수 있도록 설정
    html2canvas(input, { useCORS: true })
      // html2canvas가 생성한 <canvas> 요소를 인수로 받아서 이후의 코드에서 사용
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); // canvas를 PNG 형식의 데이터 URL로 변환하여 imgData에 저장
        const pdf = new jsPDF("p", "mm", "a4"); // 'p'는 세로 방향, 'mm'는 단위를 밀리미터로, 'a4'는 용지 크기를 A4로 설정
        const imgWidth = 190; // PDF에서 이미지의 너비를 190mm로 설정
        const pageHeight = pdf.internal.pageSize.height; // PDF 페이지의 높이를 가져옴
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // 이미지의 비율을 유지하면서 높이를 계산

        let heightLeft = imgHeight; // 남은 이미지 높이를 초기화
        let position = 0; // 이미지의 시작 위치를 초기화

        // PDF의 첫 페이지에 이미지를 추가
        // x=10, y=position 위치에 이미지 추가
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);

        heightLeft -= pageHeight; // 남은 높이에서 현재 페이지 높이를 뺌

        // 남은 높이가 0 이상인 동안 반복하며 추가 페이지에 이미지를 추가ㄴ
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`주문_${selectedOrder.orderNumber}.pdf`); // PDF 파일 다운로드
      })
      .catch((error) => console.error("PDF 생성 중 오류:", error));

    alert("주문 세부 정보를 PDF로 다운로드합니다.");
  };

  return (
    <div className="dashboard items-center p-8 bg-gray-100 w-full">
      {/* 위젯 영역 */}
      <div className={`grid ${widgetCol} gap-4 p-4 bg-gray-100`}>
        <Widget title="총 주문 수" value={orders.length} />

        {/* filter 메서드를 사용하여 상태가 '완료'인 주문만 필터링하고, 그 길이를 계산하여 표시 */}
        <Widget
          title="완료된 주문"
          value={orders.filter((order) => order.status === "완료").length}
        />

        {/* filter 메서드를 사용하여 상태가 '취소'인 주문만 필터링하고, 그 길이를 계산하여 표시 */}
        <Widget
          title="취소된 주문"
          value={orders.filter((order) => order.status === "취소").length}
        />
      </div>

      {/* 주문 목록 영역 */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="font-bold text-lg mb-2">주문 목록</h3>
        <div className="mb-4 flex gap-2">
          <select
            // 현재 선택된 주문 상태를 나타내는 상태 변수
            value={statusFilter}
            // 사용자가 선택 목록에서 다른 옵션을 선택했을 때 실행되는 동작
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">모든 상태</option>
            <option value="대기 중">대기 중</option>
            <option value="완료">완료</option>
            <option value="취소">취소</option>
          </select>

          <input
            type="text"
            placeholder="검색 (고객명, 제품명, 날짜)"
            value={searchTerm} // useState 훅을 사용하여 정의, 사용자가 입력한 검색어가 저장
            onChange={(e) => setSearchTerm(e.target.value)} // 입력 필드의 값이 변경될 때 호출되는 함수
            className="border rounded p-2 flex-1"
          />
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              {/* cursor-pointer: 마우스 커서를 포인터로 변경하여 클릭 가능함을 나타냄 */}
              <th
                onClick={() => handleSortChange("orderNumber")}
                className="px-4 py-2 cursor-pointer"
              >
                주문 번호
              </th>
              <th
                onClick={() => handleSortChange("customerName")}
                className="px-4 py-2 cursor-pointer"
              >
                고객 이름
              </th>
              <th
                onClick={() => handleSortChange("status")}
                className="px-4 py-2 cursor-pointer"
              >
                상태
              </th>
              <th
                onClick={() => handleSortChange("orderDate")}
                className="px-4 py-2 cursor-pointer"
              >
                주문 날짜
              </th>
              <th
                onClick={() => handleSortChange("totalAmount")}
                className="px-4 py-2 cursor-pointer"
              >
                총 금액
              </th>
              <th className="px-4 py-2">주문 관리</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              // filteredOrders 배열을 순회하며 각 주문(order)에 대해 테이블 행<tr>을 생성
              <tr key={order.orderNumber} className="border-b">
                <td className="px-4 py-2 text-center">{order.orderNumber}</td>
                <td className="px-4 py-2 text-center">{order.customerName}</td>
                <td className="px-4 py-2 text-center">{order.status}</td>
                <td className="px-4 py-2 text-center">{order.orderDate}</td>

                {/* 숫자를 천 단위로 구분하여 표시하고, '원' 단위를 추가 */}
                <td className="px-4 py-2 text-center">
                  {order.totalAmount.toLocaleString()}원
                </td>

                <td className="px-4 py-2 text-center">
                  {/* 주문 상세 정보를 보기 위한 버튼 */}
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded text-center "
                    onClick={() => handleOrderClick(order)}
                  >
                    보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 보기 버튼 눌렀을 때 주문 세부정보 */}
      <div
        ref={orderDetailsRef}
        className="p-4 bg-white shadow-md rounded-lg mt-4"
      >
        {/* 선택된 주문이 있을 경우, 관련 정보를 표시하는 JSX를 렌더링 */}
        {/* 선택된 주문이 없을 경우, "주문 세부 정보가 없습니다."라는 메시지를 표시 */}
        {selectedOrder ? (
          <>
            <h3 className="font-bold text-lg mb-2">주문 세부정보</h3>
            <p>
              <strong>주문 번호:</strong> {selectedOrder.orderNumber}
            </p>

            {/* 주문한 항목 배열을 쉼표로 구분하여 문자열로 변환 */}
            <p>
              <strong>주문한 항목:</strong> {selectedOrder.items.join(", ")}
            </p>

            <p>
              <strong>배송 정보:</strong> {selectedOrder.deliveryInfo}
            </p>
            <p>
              <strong>고객 연락처:</strong> 010-1234-5678
            </p>
            <p>
              <strong>주문 상태:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>총 금액:</strong> {selectedOrder.totalAmount}
            </p>

            {/* 추적 번호가 없을 경우 '정보 없음'으로 대체하여 표시 */}
            <p>
              <strong>추적 번호:</strong>{" "}
              {selectedOrder.trackingNumber || "정보 없음"}
            </p>

            <p>
              <strong>배송 상태:</strong> {selectedOrder.shippingStatus}
            </p>

            {/* 버튼 클릭 시 downloadOrderDetails 함수를 호출하여 주문 세부정보를 PDF로 다운로드 */}
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={downloadOrderDetails}
            >
              PDF로 다운로드
            </button>
          </>
        ) : (
          <p>주문 세부 정보가 없습니다.</p>
        )}
      </div>

      {/* 그래프 영역 */}
      <div className={`flex-1 space-y-6 ${graphColnVis}`}>
        <div className="p-4 bg-white shadow-md rounded-lg mt-4">
          <h3 className="font-bold text-lg mb-2">주문 현황</h3>
          <Graph />
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="font-bold text-lg mb-2">주문 추세</h3>
          <Graph />
        </div>
      </div>
    </div>
  );
}

export default AdminOrderComponents;
