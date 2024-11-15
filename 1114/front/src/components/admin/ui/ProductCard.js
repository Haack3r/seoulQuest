import React from 'react';
import { Package, DollarSign, BadgeCheck } from "lucide-react";
import { cardStyles, Button, layoutStyles } from './Styles';

export const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div style={cardStyles.container}>
            <div style={cardStyles.header}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={cardStyles.title}>{product.pname}</h3>
                    <div style={layoutStyles.buttonGroup}>
                        <Button size="small" onClick={onEdit}>편집</Button>
                        <Button size="small" variant="destructive" onClick={onDelete}>삭제</Button>
                    </div>
                </div>
            </div>
            <div style={cardStyles.content}>
                <div style={layoutStyles.iconText}>
                    <Package size={16} />
                    <span>설명: {product.pdesc}</span>
                </div>
                <div style={layoutStyles.iconText}>
                    <DollarSign size={16} />
                    <span>가격: {product.pprice.toLocaleString()}원</span>
                </div>
                <div style={layoutStyles.iconText}>
                    <BadgeCheck size={16} />
                    <span>재고: {product.pqty}개</span>
                </div>
            </div>
        </div>
    );
};