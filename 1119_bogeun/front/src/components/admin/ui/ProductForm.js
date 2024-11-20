import React, { useState, useEffect, useRef } from 'react';
import { modalStyles, Button, inputStyles, cardStyles, layoutStyles } from './Styles';

const host = `http://localhost:8080/api`

const initState = {
    pname: '',
    pdesc: '',
    pprice: 0,
    pqty: 0,
    categoryName: '',
    categoryType: 'product',
    shippingCost: 0,
    uploadFileNames: []
}

const MAX_IMAGES = 10;

export const ProductForm = ({ isEditing, initialData, onSubmit, onClose }) => {
    // const [formData, setFormData] = useState(initialData);
    // const [previewUrls, setPreviewUrls] = useState([]);
    const [product, setProduct] = useState(isEditing ? initialData : { ...initState });
    const [previewUrls, setPreviewUrls] = useState([]);
    const uploadRef = useRef();

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // 숫자 타입 필드 처리
        if (name === 'pprice' || name === 'pqty' || name === 'shippingCost') {
            product[name] = parseInt(value) || 0;
        } else {
            product[name] = value;
        }

        setProduct({ ...product });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            const files = uploadRef.current.files;

            // 파일 처리
            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    formData.append("files", files[i]);
                }
            }

            // 기본 정보 추가
            formData.append("pname", product.pname);
            formData.append("pdesc", product.pdesc);
            formData.append("pprice", product.pprice.toString());
            formData.append("pqty", product.pqty.toString());
            formData.append("categoryName", product.categoryName);
            formData.append("categoryType", product.categoryType);
            formData.append("shippingCost", (product.shippingCost || 0).toString());

            // 전송 전 FormData 내용 확인
            console.log('FormData contents before submission:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value instanceof File ? value.name : value}`);
            }

            await onSubmit(formData);
            alert(isEditing ? '제품이 수정되었습니다.' : '제품이 등록되었습니다.');
            onClose();
        } catch (error) {
            console.error("상품 처리 중 오류:", error);
            alert(error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.');
        }
    };

    // 파일 변경 핸들러 추가
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files) return;

        // 파일 개수 체크
        if (files.length > MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}개까지만 선택 가능합니다.`);
            e.target.value = ''; // 파일 선택 초기화
            return;
        }

        // 기존 미리보기 URL들 정리
        previewUrls.forEach(url => URL.revokeObjectURL(url));

        // 새로운 미리보기 URL 생성
        const newPreviewUrls = Array.from(files).map(file => URL.createObjectURL(file));
        setPreviewUrls(newPreviewUrls);
    };

    // 컴포넌트 언마운트 시 URL 정리
    // 메모리 누수 방지
    useEffect(() => {
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    return (
        <div style={modalStyles.overlay} onClick={onClose}>
            <div style={modalStyles.content} onClick={e => e.stopPropagation()}>
                <div style={cardStyles.header}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={cardStyles.title}>{isEditing ? '제품 편집' : '새 제품 추가'}</h3>
                        <Button variant="ghost" size="small" onClick={onClose}>닫기</Button>
                    </div>
                </div>

                <div style={cardStyles.content}>
                    <form onSubmit={handleSubmit}>
                        <div style={inputStyles.container}>
                            <label style={inputStyles.label}>제품 이름</label>
                            <input
                                style={inputStyles.input}
                                name="pname"
                                value={product.pname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={inputStyles.container}>
                            <label style={inputStyles.label}>카테고리</label>
                            <input
                                style={inputStyles.input}
                                name="categoryName"
                                value={product.categoryName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={inputStyles.container}>
                            <label style={inputStyles.label}>설명</label>
                            <textarea
                                style={inputStyles.textarea}
                                name="pdesc"
                                value={product.pdesc}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={layoutStyles.grid}>
                            <div style={inputStyles.container}>
                                <label style={inputStyles.label}>가격</label>
                                <input
                                    style={inputStyles.input}
                                    type="number"
                                    name="pprice"
                                    value={product.pprice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={inputStyles.container}>
                                <label style={inputStyles.label}>재고</label>
                                <input
                                    style={inputStyles.input}
                                    type="number"
                                    name="pqty"
                                    value={product.pqty}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div style={inputStyles.container}>
                            <label style={inputStyles.label}>이미지 ( 최대 10 개 )</label>
                            <input
                                ref={uploadRef}
                                style={inputStyles.input}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                max={MAX_IMAGES}
                            />
                            {/* 새로 선택한 이미지 미리보기 */}
                            {previewUrls.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginTop: '8px',
                                    overflowX: 'auto',
                                    padding: '10px 0',
                                    WebkitOverflowScrolling: 'touch', // iOS 스크롤 부드럽게
                                    msOverflowStyle: 'none',  // IE/Edge 스크롤바 숨기기
                                    scrollbarWidth: 'none',   // Firefox 스크롤바 숨기기
                                    '::-webkit-scrollbar': {  // Chrome 스크롤바 숨기기
                                        display: 'none'
                                    }
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px',
                                        flexShrink: 0
                                    }}>
                                        {previewUrls.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px',
                                                    flexShrink: 0
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* 기존 이미지 미리보기 */}
                            {isEditing && product.uploadFileNames && product.uploadFileNames.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginTop: '8px',
                                    overflowX: 'auto',
                                    padding: '10px 0',
                                    WebkitOverflowScrolling: 'touch',
                                    msOverflowStyle: 'none',
                                    scrollbarWidth: 'none',
                                    '::-webkit-scrollbar': {
                                        display: 'none'
                                    }
                                }}>
                                    {product.uploadFileNames.map((fileName, index) => (
                                        <img
                                            key={index}
                                            src={`${host}/admin/product/image/${fileName}`}
                                            alt={`Preview ${index + 1}`}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div style={layoutStyles.buttonGroup}>
                            <Button style={{ flex: 1 }} type="submit">
                                {isEditing ? '수정하기' : '추가하기'}
                            </Button>
                            <Button type="button" variant="secondary" onClick={onClose}>
                                취소
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};