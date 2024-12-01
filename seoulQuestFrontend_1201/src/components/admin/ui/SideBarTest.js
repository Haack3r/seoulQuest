import * as React from 'react'
import { Button, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Code, ExpandLess, ExpandMore } from '@mui/icons-material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function CollapsibleSidebar() {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [showMenu, setShowMenu] = React.useState(false);

    const [openOrder, setOpenOrder] = React.useState(false);
    const [openProduct, setOpenProduct] = React.useState(false);
    const [openInventory, setOpenInventory] = React.useState(false);
    const [openShipping, setOpenShipping] = React.useState(false);
    const [openCustomer, setOpenCustomer] = React.useState(false);
    const [openPromotion, setOpenPromotion] = React.useState(false);

    React.useEffect = () => {
        if (!isCollapsed) {
            setShowMenu(true);
        }
    };

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const toggleOpenOrder = () => setOpenOrder(!openOrder);
    const toggleOpenProduct = () => setOpenProduct(!openProduct);
    const toggleOpenInventory = () => setOpenInventory(!openInventory);
    const toggleOpenShipping = () => setOpenShipping(!openShipping);
    const toggleOpenCustomer = () => setOpenCustomer(!openCustomer);
    const toggleOpenPromotion = () => setOpenPromotion(!openPromotion);

    return (
        <>
            <div
                className='fixed top-20 left-0 h-[calc(100%-5rem)] transition-all duration-700 ease-in-out'
                style={{
                    transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
                    zIndex: 100, // 사이드바가 다른 요소 위에 보이도록 설정
                    overflowY: 'auto',
                    minWidth: '260px',
                    backgroundColor: 'white',
                    borderRight: '1px solid #e0e0e0',
                }}
            >
                <List component="nav" sx={{ width: '100%', maxWidth: 360 }}>
                    <ListItemButton onClick={toggleOpenOrder}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Order" primaryTypographyProps={{ fontWeight: 'bold' }} />
                        {openOrder ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openOrder} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <ArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="주문 조회" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={toggleOpenProduct}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Product" primaryTypographyProps={{ fontWeight: 'bold' }} />
                        {openProduct ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openProduct} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <ArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="상품 추가" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={toggleOpenInventory}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inventory" primaryTypographyProps={{ fontWeight: 'bold' }} />
                        {openInventory ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openInventory} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <ArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="재고 상태" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={toggleOpenShipping}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Shipping" primaryTypographyProps={{ fontWeight: 'bold' }} />
                        {openShipping ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openShipping} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <ArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="배송 조회" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={toggleOpenCustomer}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Customer" primaryTypographyProps={{ fontWeight: 'bold' }} />
                        {openCustomer ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openCustomer} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <ArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="고객 목록 조회" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={toggleOpenPromotion}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Promotion" primaryTypographyProps={{ fontWeight: 'bold' }} />
                        {openPromotion ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openPromotion} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <ArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="이벤트 관리" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </div >
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className='transition-transform duration-700 ease-in-out'
                style={{
                    position: 'fixed',
                    top: '5rem',
                    left: isCollapsed ? '1rem' : '16rem',
                    zIndex: 110, // 버튼이 사이드바 위에 있도록 설정
                }}
            >
                <Code className="h-4 w-4" />
            </Button>

        </>
    );
}
