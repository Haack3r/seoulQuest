import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  CalendarOutlined,
  EditOutlined,
} from "@ant-design/icons";

const MyPageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "mypage",
      title: "My Profile",
      description: "Your personal information",
      icon: <UserOutlined className="text-2xl" />,
      path: ["/mypage/myprofile"],
    },
    {
      id: "editProfile",
      title: "Edit Profile",
      description: "Update your personal information",
      icon: <EditOutlined className="text-2xl" />,
      path: ["/mypage/editprofile"],
    },
    {
      id: "orders",
      title: "Orders",
      description: "View your recent orders",
      icon: <ShoppingCartOutlined className="text-2xl" />,
      path: ["/mypage/orders"],
    },
    {
      id: "bookings",
      title: "Bookings",
      description: "Manage your bookings",
      icon: <CalendarOutlined className="text-2xl" />,
      path: ["/mypage/bookings"],
    },
    {
      id: "reviews",
      title: "My Reviews",
      description: "Share your experience with others",
      icon: <MessageOutlined className="text-2xl" />,
      path: ["/mypage/review"],
    },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Menu</h1>
      </header>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => navigate(item.path[0])}
            className={`flex items-center gap-4 cursor-pointer p-4 rounded-md transition-all transform ${
              item.path.some((p) => location.pathname.includes(p))
                ? "bg-gray-200 scale-105 shadow-md"
                : "hover:bg-gray-100 hover:scale-105 hover:shadow"
            }`}
          >
            <div
              className={`p-2 rounded-full transition-colors ${
                item.path.some((p) => location.pathname.includes(p))
                  ? "bg-stone-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.icon}
            </div>
            <div>
              <p
                className={`text-l font-medium transition-colors ${
                  item.path.some((p) => location.pathname.includes(p))
                    ? "text-stone-600"
                    : "text-gray-800"
                }`}
              >
                {item.title}
              </p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MyPageLayout;
