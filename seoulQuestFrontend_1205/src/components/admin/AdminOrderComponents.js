import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { layoutStyles, inputStyles } from "./ui/Styles";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 1,
};

const AdminOrderComponents = () => {
  // 상태 관리
  const [serverData, setServerData] = useState(initState);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 페이지네이션 & 검색
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { exceptionHandle } = useCustomLogin();

  // 주문 목록 가져오기
  const fetchOrderList = async () => {
    try {
      // API 호출 로직
      const response = await fetch(`/api/admin/orders?page=${page}&size=${size}&keyword=${keyword}&status=${statusFilter}`);
      const data = await response.json();
      setServerData(data);
    } catch (error) {
      console.error("주문 목록 조회 실패:", error);
      exceptionHandle(error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, [page, size, keyword, statusFilter]);

  // 주문 상세 정보 보기
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  // 주문 상태 변경
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
        headers: { 'Content-Type': 'application/json' },
      });
      fetchOrderList(); // 목록 새로고침
    } catch (error) {
      console.error("주문 상태 변경 실패:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* 검색 및 필터 영역 */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="주문 검색..."
          className="border p-2 rounded"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">전체 상태</option>
          <option value="pending">대기중</option>
          <option value="processing">처리중</option>
          <option value="completed">완료</option>
          <option value="cancelled">취소됨</option>
        </select>
      </div>

      {/* 주문 목록 테이블 */}
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">주문번호</th>
              <th className="p-4">고객명</th>
              <th className="p-4">주문일자</th>
              <th className="p-4">상태</th>
              <th className="p-4">총액</th>
              <th className="p-4">작업</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.map((order) => (
              <tr key={order.orderId} className="border-t">
                <td className="p-4">{order.orderNumber}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.orderDate}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="pending">대기중</option>
                    <option value="processing">처리중</option>
                    <option value="completed">완료</option>
                    <option value="cancelled">취소됨</option>
                  </select>
                </td>
                <td className="p-4">{order.totalAmount.toLocaleString()}원</td>
                <td className="p-4">
                  <button
                    onClick={() => handleOrderClick(order)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="mt-4 flex justify-center gap-2">
        {serverData.pageNumList.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-4 py-2 rounded ${page === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* 주문 상세 정보 모달 */}
      <Dialog
        open={showOrderDetail}
        onClose={() => setShowOrderDetail(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          주문 상세 정보
          <IconButton
            onClick={() => setShowOrderDetail(false)}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold">주문 정보</h3>
                  <p>주문번호: {selectedOrder.orderNumber}</p>
                  <p>주문일자: {selectedOrder.orderDate}</p>
                  <p>상태: {selectedOrder.status}</p>
                </div>
                <div>
                  <h3 className="font-bold">고객 정보</h3>
                  <p>이름: {selectedOrder.customerName}</p>
                  <p>연락처: {selectedOrder.contact}</p>
                  <p>배송주소: {selectedOrder.address}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold">주문 상품</h3>
                <table className="w-full mt-2">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2">상품명</th>
                      <th className="p-2">수량</th>
                      <th className="p-2">가격</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">{item.price.toLocaleString()}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  총 결제금액: {selectedOrder.totalAmount.toLocaleString()}원
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrderComponents;
