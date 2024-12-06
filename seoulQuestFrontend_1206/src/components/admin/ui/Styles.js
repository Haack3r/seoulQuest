import React from "react"

// export const modalStyles = {
//     overlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         zIndex: 1000,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     content: {
//         position: 'relative',
//         width: '500px',
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         padding: 0,
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//     }
// };

// export const modalStyles = {
//     overlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         zIndex: 1000,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'flex-start', // center에서 flex-start로 변경
//         paddingTop: '50px', // 상단 여백 추가
//         overflow: 'auto' // 스크롤 가능하도록
//     },
//     content: {
//         position: 'relative',
//         backgroundColor: 'white',
//         padding: '20px',
//         borderRadius: '8px',
//         maxWidth: '600px',
//         width: '90%',
//         maxHeight: '80vh', // 최대 높이 제한
//         overflow: 'auto', // 내용이 많을 경우 스크롤
//         marginBottom: '50px' // 하단 여백 추가
//     }
// };

export const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '50px',
        overflow: 'auto'
    },
    content: {
        position: 'relative',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        margin: '90px 0 0 0',
        zIndex: 1001,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }
};

export const inputStyles = {
    container: {
        marginBottom: '12px',
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '4px',
    },
    input: {
        width: '100%',
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
        fontSize: '14px',
    },
    textarea: {
        width: '100%',
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
        fontSize: '14px',
        minHeight: '80px',
        resize: 'vertical',
    }
};

export const cardStyles = {
    container: {
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '16px',
    },
    header: {
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
    },
    content: {
        padding: '16px',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0,
    }
};

export const layoutStyles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '16px',
    },
    buttonGroup: {
        display: 'flex',
        gap: '8px',
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
    },
    iconText: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
    }
};

export const buttonStyles = {
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.2s',
        gap: '8px',
    },
    primary: {
        backgroundColor: '#2563eb',
        color: 'white',
    },
    destructive: {
        backgroundColor: '#dc2626',
        color: 'white',
    },
    secondary: {
        backgroundColor: '#e5e7eb',
        color: '#1f2937',
    },
    ghost: {
        backgroundColor: 'transparent',
        color: '#1f2937',
    },
    small: {
        padding: '4px 8px',
        fontSize: '12px',
    }
};

export const Button = ({ children, variant = 'primary', size = 'default', ...props }) => (
    <button
        {...props}
        style={{
            ...buttonStyles.base,
            ...buttonStyles[variant],
            ...(size === 'small' && buttonStyles.small),
            ...props.style,
        }}
    >
        {children}
    </button>
);