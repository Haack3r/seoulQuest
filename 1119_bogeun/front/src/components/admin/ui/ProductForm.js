<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { addProduct, modifyProduct } from '../../../api/AdminApi';
=======
import React, { useState, useEffect, useRef } from 'react';
import { modalStyles, Button, inputStyles, cardStyles, layoutStyles } from './Styles';
import { addProduct, delImgUrl, getImageUrl, modifyProduct } from '../../../api/AdminApi';
import jwtAxios from '../../../util/jwtUtil';
>>>>>>> 123e949 (1)

const host = `http://localhost:8080/api`;
const MAX_IMAGES = 10;

const initState = {
    pname: '',
    pdesc: '',
    pprice: 0,
    pqty: 0,
    categoryName: '',
<<<<<<< HEAD
    files: []
};

const ProductForm = ({ isEditing, initialData, onClose, selectedPno }) => {
    const [product, setProduct] = useState(isEditing ? initialData : { ...initState });
    const [uploadQueue, setUploadQueue] = useState([]);
    // const uploadRef = useRef();
=======
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
    const [delImage, setDelImage] = useState([])
    const uploadRef = useRef();
>>>>>>> 123e949 (1)

    // 기본 입력 필드 핸들러
    const handleChangeProduct = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? parseInt(value) || 0 : value;

<<<<<<< HEAD
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

=======
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
            // 수정 버튼을 눌렀을 때만 삭제 처리
            if (isEditing && delImage.length > 0) {
                for (const fileName of delImage) {
                    await delImgUrl(fileName);
                }
            }

            const formData = new FormData();

            // 수정 시 이미지 처리
            if (isEditing) {
                // 삭제되지 않은 기존 이미지만 추가
                if (serverData.uploadFileNames) {
                    serverData.uploadFileNames.forEach((fileName) => {
                        if (!delImage.includes(fileName)) {
                            formData.append("uploadFileNames", fileName);
                        }
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
>>>>>>> 123e949 (1)
        if (totalFiles > MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}개까지만 선택 가능합니다.`);
            return;
        }

<<<<<<< HEAD
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
=======
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

    // 이미지 삭제 버튼 클릭 핸들러
    const handleImageRemove = async (e, url, index) => {
        e.preventDefault();
        const isExistingImage = url.includes(host);

        if (isExistingImage) {
            try {
                // 기존 이미지인 경우
                // const urls = url.split('/');
                // const fileName = urls[urls.length - 1];
                const fileName = url.split('/').pop();

                // 실제 삭제하지 않고 삭제할 목록에만 추가
                setDelImage(prev => [...prev, fileName]);

                // UI에서 제거
                const newUrls = previewUrls.filter((_, i) => i !== index);
                setPreviewUrls(newUrls);

                // serverData에서 해당 이미지 제거
                setServerData(prev => ({
                    ...prev,
                    uploadFileNames: prev.uploadFileNames.filter(name => name !== fileName)
                }));

            } catch (error) {
                console.error('이미지 삭제 실패:', error);
                alert('이미지 삭제에 실패했습니다.');
            }
        } else {
            // 새로 추가된 이미지 처리
            const newUrls = previewUrls.filter((_, i) => i !== index);
            setPreviewUrls(newUrls);

            setServerData(prev => ({
                ...prev,
                files: prev.files.filter((_, i) => i !== index)
            }));
        }
    };

    useEffect(() => {
        console.log('initialData 확인:', initialData);

        if (isEditing && initialData) {
            setServerData(initialData);

            if (initialData.uploadFileNames) {
                // getImageUrl 함수를 사용하여 URL 생성
                const urls = initialData.uploadFileNames
                    .map(fileName => {
                        const imageData = getImageUrl(fileName);
                        return imageData ? imageData.url : null;
                    })
                    .filter(url => url !== null); // null 값 필터링
                setPreviewUrls(urls);
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
>>>>>>> 123e949 (1)
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
<<<<<<< HEAD
                                className="border rounded p-2"
                                type="number"
                                name="pprice"
                                value={product.pprice}
                                onChange={handleChangeProduct}
=======
                                style={inputStyles.input}
                                name="pname"
                                value={serverData.pname}
                                onChange={handleChange}
>>>>>>> 123e949 (1)
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-bold mb-1">재고</label>
                            <input
<<<<<<< HEAD
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
=======
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
                                                    onClick={(e) => handleImageRemove(e, url, index)}
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
            </div >
        </div >
    );
}
>>>>>>> 123e949 (1)
