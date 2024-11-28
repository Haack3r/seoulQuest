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
      icon: <UserOutlined />,
      path: ["/mypage/myprofile"],
      customStyle: "mt-3", // Add a slight adjustment for this icon only
    },
    {
      id: "editProfile",
      title: "Edit Profile",
      description: "Update your personal information",
      icon: <EditOutlined />,
      path: ["/mypage/editprofile"],
      customStyle: "", // No adjustment for other icons
    },
    {
      id: "orders",
      title: "Orders",
      description: "View your recent orders",
      icon: <ShoppingCartOutlined />,
      path: ["/mypage/orders"],
      customStyle: "",
    },
    {
      id: "bookings",
      title: "Bookings",
      description: "Manage your bookings",
      icon: <CalendarOutlined />,
      path: ["/mypage/bookings"],
      customStyle: "",
    },
    {
      id: "reviews",
      title: "My Reviews",
      description: "Share your experience with others",
      icon: <MessageOutlined />,
      path: ["/mypage/review"],
      customStyle: "",
    },
  ];

  return (
    <div className="lg:flex lg:flex-col">
      <ul className="flex lg:flex-col justify-around lg:items-start items-center space-y-4 lg:space-y-0 lg:space-x-0 px-4 lg:px-8 lg:py-9 lg:bg-white rounded-lg lg:mt-6">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => navigate(item.path[0])}
            className="flex items-center justify-center lg:justify-start gap-4 cursor-pointer h-16 p-4 rounded-md transition-all"
          >
            {/* Icon Container */}
            <div
              className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors ${item.customStyle} ${
                location.pathname.includes(item.path[0])
                  ? "bg-stone-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              style={{
                fontSize: "24px", // Normalize font size for all icons
                lineHeight: "1", // Remove baseline alignment issues
                verticalAlign: "middle",
              }}
            >
              {item.icon}
            </div>
            {/* Text Content */}
            <div className="hidden lg:block">
              <p className="text-l font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPageLayout;
