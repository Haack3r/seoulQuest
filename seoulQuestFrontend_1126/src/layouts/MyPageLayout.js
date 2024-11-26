import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const MyPageLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
        title: "My Page",
        description: "your personal information and preferences",
        icon: <UserOutlined className="text-2xl text-gray-600" />,
        action: () => navigate("/mypage"),
      },
    {
      title: "Edit Profile",
      description: "Update your personal information and preferences",
      icon: <UserOutlined className="text-2xl text-gray-600" />,
      action: () => navigate("/mypage/editProfile"),
    },
    {
      title: "Orders",
      description: "View your recent orders",
      icon: <ShoppingCartOutlined className="text-2xl text-gray-600" />,
      action: () => navigate("/orders"),
    },
    {
      title: "Reservations",
      description: "Manage your bookings",
      icon: <CalendarOutlined className="text-2xl text-gray-600" />,
      action: () => navigate("/reservations"),
    },
    {
      title: "My Reviews",
      description: "Share your experience with others",
      icon: <MessageOutlined className="text-2xl text-gray-600" />,
      action: () => navigate("/mypage/review/products"),
    },
    {
      title: "Q&A",
      description: "Find answers to your questions",
      icon: <QuestionCircleOutlined className="text-2xl text-gray-600" />,
      action: () => navigate("/qa"),
    },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
      </header>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={item.action}
            className="flex items-center gap-4 cursor-pointer p-4 rounded-md hover:bg-gray-100 transition-all"
          >
            {item.icon}
            <div>
              <p className="text-lg font-medium text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MyPageLayout;
