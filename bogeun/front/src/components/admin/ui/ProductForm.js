import React, { useState, useRef, useEffect } from 'react';
import { addProduct, modifyProduct } from '../../../api/AdminApi';

const host = `http://localhost:8080/api`;
const MAX_IMAGES = 10;

const initState = {
    pname: '',
    pdesc: '',
    pprice: 0,
    pqty: 0,
    categoryName: '',
    files: []
};

const ProductForm = ({ isEditing, initialData, onClose, selectedPno }) => {
    const [product, setProduct] = useState(isEditing ? initialData : { ...initState });
    const [uploadQueue, setUploadQueue] = useState([]);
    // const uploadRef = useRef();

    // 기본 입력 필드 핸들러
    const handleChangeProduct = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? parseInt(value) || 0 : value;

        setProduct(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    // 파일 변경 핸들러
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files || []);
        if (!newFiles.length) return;

        // 현재 파일 수 + 새로운 파일 수 체크
        const currentFiles = product.files || [];
        const totalFiles = currentFiles.length + newFiles.length;

        if (totalFiles > MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}개까지만 선택 가능합니다.`);
            return;
        }

        // 이미지 타입 체크
        if (!newFiles.every(file => file.type.startsWith('image/'))) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }

        setProduct(prev => ({
            ...prev,
            files: [...currentFiles, ...newFiles]
        }));
    };

    // 이미지 제거
    const removeFile = (index) => {
        setProduct(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }));
    };

    // cleanup effect
    useEffect(() => {
        return () => {
            // 컴포넌트 언마운트 시 URL.createObjectURL 정리
            uploadQueue.forEach(item => {
                URL.revokeObjectURL(item.preview);
            });
            if (product.files) {
                product.files.forEach(file => {
                    if (file instanceof File) {
                        URL.revokeObjectURL(URL.createObjectURL(file));
                    }
                });
            }
        };
    }, [uploadQueue, product.files]);

    // 제품 추가/수정 처리
    const handleClickSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // 기본 정보 추가
        formData.append("pname", product.pname);
        formData.append("pdesc", product.pdesc);
        formData.append("pprice", product.pprice);
        formData.append("pqty", product.pqty);
        formData.append("categoryName", product.categoryName);

        // 파일 추가
        if (product.files?.length > 0) {
            product.files.forEach(file => {
                formData.append("files", file);
            });
        }

        try {
            if (isEditing) {
                await modifyProduct(selectedPno, formData);
                alert('제품이 수정되었습니다.');
            } else {
                await addProduct(formData);
                alert('제품이 등록되었습니다.');
            }
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('제품 처리 중 오류:', error);
            alert('처리 중 오류가 발생했습니다.');
        }
    };

    // 수정 시 초기 데이터 로드
    useEffect(() => {
        if (isEditing && initialData) {
            const loadInitialImages = async () => {
                if (initialData.uploadFileNames?.length > 0) {
                    try {
                        const filePromises = initialData.uploadFileNames.map(async fileName => {
                            const response = await fetch(`${host}/product/image/${fileName}`);
                            const blob = await response.blob();
                            return new File([blob], fileName, { type: blob.type });
                        });
                        const files = await Promise.all(filePromises);
                        setProduct(prev => ({
                            ...initialData,
                            files: files
                        }));
                    } catch (error) {
                        console.error('이미지 로드 실패:', error);
                    }
                }
            };
            loadInitialImages();
        }
    }, [isEditing, initialData]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{isEditing ? '제품 수정' : '새 제품 등록'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                <form onSubmit={handleClickSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="font-bold mb-1">제품명</label>
                        <input
                            className="border rounded p-2"
                            name="pname"
                            value={product.pname}
                            onChange={handleChangeProduct}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold mb-1">카테고리</label>
                        <input
                            className="border rounded p-2"
                            name="categoryName"
                            value={product.categoryName}
                            onChange={handleChangeProduct}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold mb-1">설명</label>
                        <textarea
                            className="border rounded p-2 h-24"
                            name="pdesc"
                            value={product.pdesc}
                            onChange={handleChangeProduct}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="font-bold mb-1">가격</label>
                            <input
                                className="border rounded p-2"
                                type="number"
                                name="pprice"
                                value={product.pprice}
                                onChange={handleChangeProduct}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-bold mb-1">재고</label>
                            <input
                                className="border rounded p-2"
                                type="number"
                                name="pqty"
                                value={product.pqty}
                                onChange={handleChangeProduct}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold mb-1">이미지 (최대 {MAX_IMAGES}개)</label>
                        <input
                            // ref={uploadRef}
                            className="border rounded p-2"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {/* 이미지 미리보기 */}
                        {product.files?.length > 0 && (
                            <div className="mt-4">
                                <div className="flex gap-2 overflow-x-auto">
                                    {product.files.map((file, index) => (
                                        <div key={index} className="relative w-24 h-24 flex-shrink-0">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 justify-end mt-6">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {isEditing ? '수정하기' : '등록하기'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;