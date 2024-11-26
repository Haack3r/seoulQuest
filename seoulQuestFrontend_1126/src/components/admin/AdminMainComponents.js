import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Settings, Search, Calendar, Users, Bell } from "lucide-react";

const weeklyData = [
  { name: "월", tours: 80, products: 60, revenue: 320 },
  { name: "화", tours: 75, products: 55, revenue: 290 },
  { name: "수", tours: 90, products: 65, revenue: 380 },
  { name: "목", tours: 70, products: 50, revenue: 275 },
  { name: "금", tours: 85, products: 60, revenue: 340 },
  { name: "토", tours: 95, products: 70, revenue: 420 },
  { name: "일", tours: 80, products: 55, revenue: 310 },
];

const timeData = Array.from({ length: 13 }, (_, i) => ({
  time: `${(i + 8) % 12 || 12}${i + 8 < 12 ? "AM" : "PM"}`,
  visitors: 25 + Math.random() * 50,
}));

const CircularProgress = ({ value, total, color, size = 64 }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / total) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="rotate-[-90deg]" width={size} height={size}>
        <circle
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={circumference}
            to={offset}
            dur="1s"
            fill="freeze"
          />
        </circle>
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-700">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

const AdminMainComponents = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth >= 1280);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold flex">대시보드</h1>
          <div className="items-center gap-4">
            {/* <div className="relative">
                            <input
                                type="text"
                                placeholder="검색"
                                className="pl-10 pr-4 py-2 bg-blue-50 rounded-lg w-64"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Settings size={20} />
                        </button> */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-center">
              {" "}
              {/* items-start를 items-center로 변경 */}
              <div>
                <h3 className="text-gray-500 mb-2">총 매출액</h3>
                <p className="text-3xl font-bold">5,672만원</p>
                <p className="text-green-500 text-sm">+24% 증가</p>
              </div>
              <div className="ml-4">
                {" "}
                {/* 여백 추가 */}
                <CircularProgress value={24} total={100} color="#3B82F6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500 mb-2">투어 예약</h3>
                <p className="text-3xl font-bold">3,045건</p>
                <p className="text-yellow-500 text-sm">+40% 증가</p>
              </div>
              <div className="ml-4">
                <CircularProgress value={40} total={100} color="#F59E0B" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500 mb-2">상품 판매</h3>
                <p className="text-3xl font-bold">1,055개</p>
                <p className="text-green-500 text-sm">+16% 증가</p>
              </div>
              <div className="ml-4">
                <CircularProgress value={16} total={100} color="#10B981" />
              </div>
            </div>
          </div>
        </div>
        {/* Charts */}
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">주간 판매 현황</h3>
              <select className="bg-blue-50 px-4 py-2 rounded-lg">
                <option>이번 주</option>
                <option>지난 주</option>
                <option>이번 달</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="tours" fill="#3B82F6" name="투어" />
                <Bar dataKey="products" fill="#10B981" name="상품" />
                <Bar dataKey="revenue" fill="#F59E0B" name="매출(만원)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">시간대별 방문자 수</h3>
              <select className="bg-blue-50 px-4 py-2 rounded-lg">
                <option>오늘</option>
                <option>어제</option>
                <option>이번 주</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="방문자 수"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* {windowWidth && ( */}
      {/* Right Sidebar */}
      <div className="hidden lg:block w-80 bg-white p-6 border-l">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">인기 상품/투어</h3>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
              + 추가
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-orange-100 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">95건</span>
                <div className="w-12 h-6 bg-white rounded-full flex items-center justify-center">
                  <Calendar size={16} className="text-orange-500" />
                </div>
              </div>
              <p className="font-medium">한강 야경 투어</p>
              <p className="text-sm text-gray-500">이번 주 예약</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">80개</span>
                <div className="w-12 h-6 bg-white rounded-full flex items-center justify-center">
                  <Users size={16} className="text-blue-500" />
                </div>
              </div>
              <p className="font-medium">명동 기념품 세트</p>
              <p className="text-sm text-gray-500">이번 주 판매</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">알림</h3>
            <Bell size={20} className="text-gray-500" />
          </div>

          <div className="space-y-4">
            {[
              {
                color: "bg-blue-100",
                time: "18:30",
                text: "한강 야경 투어 예약 10건 대기 중",
              },
              {
                color: "bg-yellow-100",
                time: "17:30",
                text: '인기 상품 "명동 기념품 세트" 재고 부족 (5개 남음)',
              },
              {
                color: "bg-red-100",
                time: "17:00",
                text: "고객 문의 3건이 답변 대기 중입니다.",
              },
              {
                color: "bg-green-100",
                time: "16:45",
                text: "새로운 상품 등록이 완료되었습니다.",
              },
            ].map((item, i) => (
              <div key={i} className={`${item.color} p-4 rounded-xl`}>
                <p className="text-sm">{item.text}</p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default AdminMainComponents;
