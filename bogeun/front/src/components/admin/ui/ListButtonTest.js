import * as React from 'react'
import { Button, Collapse } from '@mui/material'
import { Code } from '@mui/icons-material'

export default function ListButton() {
    const [isCollapsed, setIsCollapsed] = React.useState(true)
    const [showMenu, setShowMenu] = React.useState(false);
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    React.useEffect = () => {
        if (!isCollapsed) setShowMenu(true);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{
                position: 'fixed',
                top: '5rem',
                left: isCollapsed ? '1rem' : '16rem',
                zIndex: 110, // 버튼이 사이드바 위에 있도록 설정
            }}
        >
            <Code className="h-4 w-4" />
        </Button>
    )
}