import React, { useState, useEffect, useRef } from 'react';
import { modalStyles, Button, inputStyles, cardStyles, layoutStyles } from './Styles';

export const ProductForm = ({ isEditing, initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(initialData);
    const [previewUrls, setPreviewUrls] = useState([]);
    const fileInputRef = useRef();

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const files = Array.from(e.target.files);
            const validFiles = files.filter(file => file.type.startsWith('image/'));

            if (validFiles.length !== files.length) {
                alert('이미지 파일만 업로드 가능합니다.');
                e.target.value = '';
                return;
            }

            const urls = validFiles.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => {
                prev.forEach(url => URL.revokeObjectURL(url));
                return urls;
            });

            setFormData(prev => ({
                ...prev,
                files: validFiles
            }));
        } else {
            const newValue = (name === 'pprice' || name === 'pqty')
                ? parseInt(value) || 0
                : value;

            setFormData(prev => ({
                ...prev,
                [name]: newValue
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = new FormData();

        if (formData.files) {
            formData.files.forEach(file => {
                submitData.append("files", file);
            });
        }

        submitData.append("pname", formData.pname);
        submitData.append("pdesc", formData.pdesc);
        submitData.append("pprice", formData.pprice);
        submitData.append("pqty", formData.pqty);
        submitData.append("categoryName", formData.categoryName);

        if (isEditing && formData.uploadFileNames) {
            formData.uploadFileNames.forEach(fileName => {
                submitData.append("uploadFileNames", fileName);
            });
        }

        onSubmit(submitData);
    };

    // 초기 이미지 로드를 위한 useEffect
    useEffect(() => {
        if (isEditing && initialData.uploadFileNames) {
            const urls = initialData.uploadFileNames.map(
                fileName => `/api/user/products/view/${fileName}`
            );
            setPreviewUrls(urls);
        }
    }, [isEditing, initialData]);

    // URL 정리를 위한 별도의 useEffect
    useEffect(() => {
        return () => {
            // cleanup 에서 이전 URL 들을 정리
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
                                value={formData.pname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={inputStyles.container}>
                            <label style={inputStyles.label}>카테고리</label>
                            <input
                                style={inputStyles.input}
                                name="categoryName"
                                value={formData.categoryName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={inputStyles.container}>
                            <label style={inputStyles.label}>설명</label>
                            <textarea
                                style={inputStyles.textarea}
                                name="pdesc"
                                value={formData.pdesc}
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
                                    value={formData.pprice}
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
                                    value={formData.pqty}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div style={inputStyles.container}>
                            <label style={inputStyles.label}>이미지</label>
                            <input
                                ref={fileInputRef}
                                style={inputStyles.input}
                                type="file"
                                onChange={handleChange}
                                multiple
                                accept="image/*"
                            />
                            {previewUrls.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginTop: '8px',
                                    flexWrap: 'wrap'
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