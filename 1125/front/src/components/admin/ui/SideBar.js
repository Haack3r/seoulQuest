import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import ListIcon from '@mui/icons-material/List';
import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";

export default function SideBar() {
    const [isSelect, setIsSelect] = React.useState(false)
    const [menuMode, setMenuMode] = React.useState('vertical')
    const [menuSize, setMenuSize] = React.useState(256)
    const [collapsed, setCollapsed] = React.useState(false)
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    // const [showButton, setShowButton] = React.useState(false)
    // const [changeCol, setChangeCol] = React.useState(false)

    // React.useEffect(() => {
    //     if (isSelect) setChangeCol(true)
    // }, [isSelect])

    const MenuCollasped = () => {
        setCollapsed(!collapsed)
        // if (collapsed) {
        //     setMenuSize(80)
        // } else {
        //     setMenuSize(256)
        // }
    }

    const collapseClick = (e) => {
        setIsSelect(!isSelect); // 클릭 시 상태 변경
    };

    // const ListCollapsed = () => {
    //     setCollapsed(!collapsed)
    //     if (collapsed) {
    //         setMenuSize(80)
    //     } else {
    //         setMenuSize(256)
    //     }
    // }

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            if (window.innerWidth <= 750) {
                setMenuMode('inline')
                setCollapsed(true)
            } else if (window.innerWidth <= 1024) {
                setMenuMode('inline')
                setCollapsed(false)
            } else {
                setMenuMode('vertical')
                setCollapsed(false)
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const SideBarList = [
        {
            key: 'sub1',
            icon: <HomeOutlined />,
            label: <Link to="/admin/dashboard">홈</Link>,
        },
        {
            key: 'sub2',
            // icon: (<SettingOutlined style={{ color: isSelect ? '#f97316' : '' }} />),
            icon: <SettingOutlined />,
            label: 'Order Management',
            children: [
                {
                    key: '2',
                    label: <Link to="/admin/order">주문 조회 및 관리</Link>,
                }
            ]
        },
        {
            key: 'sub3',
            icon: <SettingOutlined />,
            label: 'Product Management',
            children: [
                {
                    key: '3',
                    label: <Link to="/admin/product">상품 목록 및 관리</Link>,
                },
                {
                    key: '4',
                    label: <Link to="/admin/inventory">재고 통계</Link>,
                }

            ]
        },
        {
            key: 'sub4',
            label: 'Delivery Management',
            icon: <SettingOutlined />,
            children: [
                {
                    key: '5',
                    label: <Link to="/admin/delivery">배송 관리</Link>,
                },
                {
                    key: '6',
                    label: <Link to="/admin/exchange">반품 및 교환</Link>,
                },
                {
                    key: '7',
                    label: <Link to="/admin/cost">배송 비용 관리</Link>,
                }
            ]
        },
        {
            key: 'sub5',
            icon: <SettingOutlined />,
            label: 'Customer Management',
            children: [
                {
                    key: '8',
                    label: <Link to="/admin/customer">고객 정보 및 관리</Link>,
                }
            ]
        },
        {
            key: 'sub6',
            icon: <SettingOutlined />,
            label: 'Tour Management',
            children: [
                {
                    key: '9',
                    label: <Link to="/admin/tour">투어 목록 및 관리</Link>,
                },
                {
                    key: '10',
                    label: <Link to="/admin/reservation">고객 예약 관리</Link>,
                }
            ]
        },
    ]

    return (
        // <div>
        //     {(
        //         <VisbToggleButton
        //             // className={`${visMenuButton}`}
        //             isVisible={!collapsed}
        //             onToggle={MenuCollasped}
        //         />
        //     )}
        //     {!collapsed && (
        //         <Menu
        //             className="min-h-screen"
        //             onClick={collapseClick}
        //             style={{ width: 256 }}
        //             mode={menuMode}
        //             items={SideBarList}
        //         />
        //     )}
        // </div>

        <Layout.Sider
            className="transition-all duration-300 ease-in-out"
            collapsed={collapsed}
            collapsible
            trigger={null}
            width={256}
            collapsedWidth={80}
        >
            {windowWidth <= 1024 && (
                <Button
                    type="primary"
                    onClick={MenuCollasped}
                    style={{ margin: '12px' }}
                >
                    {collapsed ? <ListIcon /> : <ListIcon />}
                </Button>

            )}
            <Menu
                // collapsed={ListCollapsed}
                // collapsedWidth={80}
                // defaultOpenKeys={['sub1']}
                // defaultSelectedKeys={['1']}
                // mode={menuMode}
                className="transition-all duration-300 ease-in-out !important"
                onClick={collapseClick}
                style={{ width: collapsed ? 80 : 256 }}
                items={SideBarList}
            />
        </Layout.Sider>
    )
}