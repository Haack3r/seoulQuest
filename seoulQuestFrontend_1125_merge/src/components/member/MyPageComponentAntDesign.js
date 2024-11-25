import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  EditOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  CalendarOutlined,
  MessageOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { getUserInfo } from "../../api/myPageApi";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Button, Form, Input } from "antd";

const { Header, Sider, Content } = Layout;

const initState = {
  email: "",
  firstname: "",
  lastname: "",
  nickName: "",
  location: "",
  phoneNumber: "",
  postalCode: "",
};

const MyPageComponent = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ ...initState });

  useEffect(() => {
    getUserInfo().then((data) => {
      console.log(data);
      setUserInfo(data);
    });
  }, []);

  const menuItems = [
    { key: "1", icon: <UserOutlined />, label: "Profile" },
    { key: "2", icon: <EditOutlined />, label: "Edit Profile", onClick: () => navigate("/mypage/editProfile") },
    { key: "3", icon: <HeartOutlined />, label: "Favorites" },
    { key: "4", icon: <ShoppingCartOutlined />, label: "Orders" },
    { key: "5", icon: <CalendarOutlined />, label: "Reservations" },
    { key: "6", icon: <MessageOutlined />, label: "Customer Reviews", onClick: () => navigate("/review/") },
    { key: "7", icon: <TagsOutlined />, label: "Coupons" },
  ];

  return (
    <Layout className="min-h-screen mt-20">
      {/* 사이드바 */}
      <Sider theme="light" width={240}>
        <div className="logo p-4">
          <h2 className="text-lg font-bold">My Page</h2>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>

      {/* 메인 레이아웃 */}
      <Layout>
        <Header className="bg-white shadow-md flex items-center justify-between px-8 mt-20 mb-10">
          <div className="flex items-center gap-4">
            <Avatar size={64} icon={<UserOutlined />} />
            <div>
              <h1 className="text-xl font-bold">{userInfo.firstname} {userInfo.lastname}</h1>
              <p className="text-gray-500">{userInfo.location || "New York, USA"}</p>
            </div>
          </div>
          <Button type="primary" onClick={() => navigate("/logout")}>Log Out</Button>
        </Header>

        {/* 컨텐츠 */}
        <Content className="p-8 bg-gray-50">
          <div className="bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Profile</h2>
            <Form
              layout="vertical"
              initialValues={userInfo}
              onFinish={(values) => console.log("Updated Profile:", values)}
            >
              <Form.Item label="First Name" name="firstname">
                <Input placeholder="Enter your first name" />
              </Form.Item>
              <Form.Item label="Last Name" name="lastname">
                <Input placeholder="Enter your last name" />
              </Form.Item>
              <Form.Item label="Email Address" name="email">
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input placeholder="Enter your phone number" />
              </Form.Item>
              <Form.Item label="Location" name="location">
                <Input placeholder="e.g. New York, USA" />
              </Form.Item>
              <Form.Item label="Postal Code" name="postalCode">
                <Input placeholder="Enter your postal code" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyPageComponent;
