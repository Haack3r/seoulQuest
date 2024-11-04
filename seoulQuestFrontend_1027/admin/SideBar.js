import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import VisbToggleButton from "./VisbToggleButton";

export default function SideBar() {
    const [isSelect, setIsSelect] = React.useState(false)
    const [menuMode, setMenuMode] = React.useState('vertical')
    const [collapsed, setCollapsed] = React.useState(false)
    // const [showButton, setShowButton] = React.useState(false)
    // const [changeCol, setChangeCol] = React.useState(false)

    // React.useEffect(() => {
    //     if (isSelect) setChangeCol(true)
    // }, [isSelect])

    const MenuCollasped = () => {
        setCollapsed(!collapsed)
    }

    const collapseClick = (e) => {
        console.log('click', e);
        setIsSelect(!isSelect); // 클릭 시 상태 변경
    };

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 750) {
                setCollapsed('true')
            } else if (window.innerWidth <= 1024) {
                setMenuMode('inline')
                setCollapsed('false')
            } else {
                setMenuMode('vertical')
                setCollapsed('false')
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const SideBarList = [
        {
            key: 'sub1',
            // icon: (<SettingOutlined style={{ color: isSelect ? '#f97316' : '' }} />),
            icon: <SettingOutlined />,
            label: 'Order Management',
            children: [
                {
                    key: '1',
                    label: '주문 조회 및 관리',
                }

            ]
        },
        {
            key: 'sub2',
            icon: <SettingOutlined />,
            label: 'Product Management',
            children: [
                {
                    key: '2',
                    label: '상품 목록 및 관리',
                },
                {
                    key: '3',
                    label: '재고 통계'
                }

            ]
        },
        {
            key: 'sub3',
            label: 'Delivery Management',
            icon: <SettingOutlined />,
            children: [
                {
                    key: '4',
                    label: '배송 관리',
                },
                {
                    key: '5',
                    label: '반품 및 교환',
                },
                {
                    key: '6',
                    label: '배송 비용 관리'
                }
            ]
        },
        {
            key: 'sub4',
            icon: <SettingOutlined />,
            label: 'Customer Management',
            children: [
                {
                    key: '7',
                    label: '고객 정보 및 관리',
                }
            ]
        },
        {
            key: 'sub5',
            icon: <SettingOutlined />,
            label: 'Tour Management',
            children: [
                {
                    key: '8',
                    label: '투어 목록 및 관리',
                },
                {
                    key: '9',
                    label: '고객 예약 관리',
                }
            ]
        },
    ]

    return (
        <div>
            {(
                <VisbToggleButton
                    className={`${visMenuButton}`}
                    isVisible={!collapsed}
                    onToggle={MenuCollasped}
                />
            )}
            {!collapsed && (
                <Menu
                    className="min-h-screen"
                    onClick={collapseClick}
                    style={{ width: 256 }}
                    mode={menuMode}
                    items={SideBarList}
                />
            )}
        </div>
    )
}