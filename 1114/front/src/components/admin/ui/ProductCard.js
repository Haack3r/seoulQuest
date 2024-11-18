// import React from 'react';
// import { Package, DollarSign, BadgeCheck } from "lucide-react";
// import { cardStyles, Button, layoutStyles } from './Styles';

// export const ProductCard = ({ product, onEdit, onDelete }) => {
//     return (
//         <div style={cardStyles.container}>
//             <div style={cardStyles.header}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <h3 style={cardStyles.title}>{product.pname}</h3>
//                     <div style={layoutStyles.buttonGroup}>
//                         <Button size="small" onClick={onEdit}>편집</Button>
//                         <Button size="small" variant="destructive" onClick={onDelete}>삭제</Button>
//                     </div>
//                 </div>
//             </div>
//             <div style={cardStyles.content}>
//                 <div style={layoutStyles.iconText}>
//                     <Package size={16} />
//                     <span>설명: {product.pdesc}</span>
//                 </div>
//                 <div style={layoutStyles.iconText}>
//                     <DollarSign size={16} />
//                     <span>가격: {product.pprice.toLocaleString()}원</span>
//                 </div>
//                 <div style={layoutStyles.iconText}>
//                     <BadgeCheck size={16} />
//                     <span>재고: {product.pqty}개</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

import React from 'react';
import { Package, DollarSign, BadgeCheck, Edit, Trash2 } from "lucide-react";
import { cardStyles, Button, layoutStyles } from './Styles';

export const ProductCard = ({ product, onEdit, onDelete }) => {
    const { pno, pname, categoryName, pdesc, pprice, pqty, uploadFileNames } = product;

    return (
        <div style={{
            display: 'flex',
            padding: '15px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            gap: '20px'
        }}>
            {/* 제품 정보 */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{pname}</h3>
                    <div>
                        <Button onClick={onEdit} style={{ marginRight: '5px' }}>
                            <Edit size={16} />
                            편집
                        </Button>
                        <Button onClick={onDelete} color="danger">
                            <Trash2 size={16} />
                            삭제
                        </Button>
                    </div>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                    <p style={{ margin: '5px 0' }}>카테고리: {categoryName}</p>
                    <p style={{ margin: '5px 0' }}>설명: {pdesc}</p>
                    <p style={{ margin: '5px 0' }}>가격: {pprice.toLocaleString()}원</p>
                    <p style={{ margin: '5px 0' }}>재고: {pqty}개</p>
                    <p style={{ margin: '5px 0' }}>제품번호: {pno}</p>
                </div>
            </div>

            {/* 이미지 미리보기 */}
            {uploadFileNames && uploadFileNames.length > 0 && (
                <div style={{
                    width: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <img
                        src={`/api/products/view/${uploadFileNames[0]}`}
                        alt={pname}
                        style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                        }}
                    />
                    {uploadFileNames.length > 1 && (
                        <div style={{
                            display: 'flex',
                            gap: '4px',
                            overflowX: 'auto'
                        }}>
                            {uploadFileNames.slice(1).map((filename, index) => (
                                <img
                                    key={index}
                                    src={`/api/products/view/${filename}`}
                                    alt={`${pname} ${index + 2}`}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        objectFit: 'cover',
                                        borderRadius: '2px'
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};