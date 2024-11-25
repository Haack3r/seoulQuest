import React, { useState, useEffect, useRef } from 'react';
import { modalStyles, Button, inputStyles, cardStyles, layoutStyles } from './Styles';
import { addProduct, getImageUrl, modifyProduct } from '../../../api/AdminApi';

const host = `http://localhost:8080/api`

const initState = {
    pname: '',
    pdesc: '',
    pprice: 0,
    pqty: 0,
    categoryName: '',
    // categoryType: 'product',
    // shippingCost: 0,
    files: [],
    uploadFileNames: []
}

const MAX_IMAGES = 10;

export const ProductForm = ({ isEditing, initialData, onSubmit, onClose, selectedPno }) => {
    // const [formData, setFormData] = useState(initialData);
    // const [previewUrls, setPreviewUrls] = useState([]);
    const [serverData, setServerData] = useState(isEditing ? initialData : { ...initState });
    const [previewUrls, setPreviewUrls] = useState([]);
    const uploadRef = useRef();

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // 숫자 타입 필드 처리
        if (name === 'pprice' || name === 'pqty' || name === 'shippingCost') {
            serverData[name] = parseInt(value) || 0;
        } else {
            serverData[name] = value;
        }

        setServerData({ ...serverData });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // 수정 시 이미지 처리
            if (isEditing) {
                // 기존 이미지 처리 - 항상 기존 이미지를 먼저 추가
                if (serverData.uploadFileNames) {
                    serverData.uploadFileNames.forEach((fileName) => {
                        formData.append("uploadFileNames", fileName);
                    });
                }

                // 새로운 이미지 처리
                if (serverData.files && serverData.files.length > 0) {
                    serverData.files.forEach((file) => {
                        formData.append("files", file);
                    });
                }
            } else {
                // 새 제품 등록 시
                if (serverData.files && serverData.files.length > 0) {
                    serverData.files.forEach((file) => {
                        formData.append("files", file);
                    });
                }
            }

            // 기본 정보 추가
            formData.append("pname", serverData.pname);
            formData.append("pdesc", serverData.pdesc);
            formData.append("pprice", serverData.pprice);
            formData.append("pqty", serverData.pqty);
            formData.append("categoryName", serverData.categoryName);

            if (isEditing) {
                await modifyProduct(selectedPno, formData);
            } else {
                await addProduct(formData);
            }

            alert(isEditing ? '제품이 수정되었습니다.' : '제품이 등록되었습니다.');
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("상품 처리 중 오류:", error);
            alert(error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.');
        }
    };

    // 파일 변경 핸들러 추가
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files || []);
        if (!newFiles) return;

        // 현재 파일 개수 + 새로운 파일 개수 체크
        const currentFiles = serverData.files || [];
        const totalFiles = currentFiles.length + newFiles.length;
        if (totalFiles > MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}개까지만 선택 가능합니다.`);
            e.target.value = ''; // 파일 선택 초기화
            return;
        }

        // 이미지 타입 검증
        const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
        if (validFiles.length !== newFiles.length) {
            alert('이미지 파일만 업로드 가능합니다.');
            e.target.value = '';
            return;
        }

        // 새로운 미리보기 URL 생성
        const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));

        // 기존 파일 배열에 새 파일 추가
        const updatedFiles = [...currentFiles, ...validFiles];

        // 기존 미리보기 URL에 새 URL 추가
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

        // 서버 데이터 업데이트
        setServerData(prev => ({
            ...prev,
            files: updatedFiles
        }));

        // 파일 선택 input 초기화
        e.target.value = '';
    };

    useEffect(() => {
        console.log('initialData 확인:', initialData);

        if (isEditing && initialData) {
            setServerData(initialData);

            if (initialData.uploadFileNames) {
                // 기존 이미지 URL 설정
                const urls = initialData.uploadFileNames.map(
                    fileName => `${host}/product/image/${fileName}`
                );
                setPreviewUrls(urls); // 기존 이미지만 설정
            }
        }
    }, [isEditing, initialData]);

    // 컴포넌트 언마운트 시 URL 정리
    // 메모리 누수 방지
    useEffect(() => {
        return () => {
            previewUrls.forEach((url) => {
                if (!url.startsWith('http')) URL.revokeObjectURL(url);
            });
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
                                value={serverData.pname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={inputStyles.container}>
                            <label style={inputStyles.label}>카테고리</label>
                            <input
                                style={inputStyles.input}
                                name="categoryName"
                                value={serverData.categoryName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={inputStyles.container}>
                            <label style={inputStyles.label}>설명</label>
                            <textarea
                                style={inputStyles.textarea}
                                name="pdesc"
                                value={serverData.pdesc}
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
                                    value={serverData.pprice}
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
                                    value={serverData.pqty}
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
                            {/* 이미지 미리보기 - 기존 이미지와 새로 선택한 이미지 통합 */}
                            {previewUrls.length > 0 && (
                                <div style={{
                                    width: '100%',
                                    overflowX: 'auto',
                                    marginTop: '8px',
                                    padding: '10px 0',
                                    WebkitOverflowScrolling: 'touch', // iOS 스크롤 부드럽게
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px',
                                        minWidth: 'min-content' // 이미지들이 줄어들지 않도록
                                    }}>
                                        {previewUrls.map((url, index) => (
                                            <div key={index} style={{
                                                position: 'relative',
                                                flexShrink: 0,
                                                width: '100px',
                                                height: '100px'
                                            }}>
                                                <img
                                                    src={url}
                                                    alt={`Preview ${index + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // 이미지 삭제 로직 추가
                                                        const newUrls = previewUrls.filter((_, i) => i !== index);
                                                        setPreviewUrls(newUrls);

                                                        // 기존 이미지인지 새로 추가된 이미지인지 확인
                                                        const isExistingImage = url.includes(host);

                                                        setServerData(prev => {
                                                            if (isExistingImage) {
                                                                // 기존 이미지인 경우 uploadFileNames에서 제거
                                                                const fileName = prev.uploadFileNames[index];
                                                                return {
                                                                    ...prev,
                                                                    uploadFileNames: prev.uploadFileNames.filter(name => name !== fileName)
                                                                };
                                                            } else {
                                                                // 새로 추가된 이미지인 경우 files에서 제거
                                                                return {
                                                                    ...prev,
                                                                    files: prev.files.filter((_, i) => i !== index)
                                                                };
                                                            }
                                                        });
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: -8,
                                                        right: -8,
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#ff4444',
                                                        color: 'white',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '14px',
                                                        padding: 0
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
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