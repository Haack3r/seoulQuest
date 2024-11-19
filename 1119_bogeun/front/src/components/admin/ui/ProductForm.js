import React, { useState, useEffect, useRef } from 'react';
import { modalStyles, Button, inputStyles, cardStyles, layoutStyles } from './Styles';

const host = `http://localhost:8080/api`

const initState = {
    pname: '',
    categoryName: '',
    pdesc: '',
    pprice: 0,
    pqty: 0,
    uploadFileNames: []
}

export const ProductForm = ({ isEditing, initialData, onSubmit, onClose }) => {
    // const [formData, setFormData] = useState(initialData);
    // const [previewUrls, setPreviewUrls] = useState([]);
    const [product, setProduct] = useState(isEditing ? initialData : { ...initState });
    const uploadRef = useRef();

    const handleChange = (e) => {
        // const { name, value, type } = e.target;

        // if (type === 'file') {
        //     const files = Array.from(e.target.files);
        //     const validFiles = files.filter(file => file.type.startsWith('image/'));

        //     if (validFiles.length !== files.length) {
        //         alert('이미지 파일만 업로드 가능합니다.');
        //         e.target.value = '';
        //         return;
        //     }

        //     const urls = validFiles.map(file => URL.createObjectURL(file));
        //     setPreviewUrls(prev => {
        //         prev.forEach(url => URL.revokeObjectURL(url));
        //         return urls;
        //     });

        //     setFormData(prev => ({
        //         ...prev,
        //         files: validFiles
        //     }));
        // } else {
        //     const newValue = (name === 'pprice' || name === 'pqty')
        //         ? parseInt(value) || 0
        //         : value;

        //     setFormData(prev => ({
        //         ...prev,
        //         [name]: newValue
        //     }));
        // }

        product[e.target.name] = e.target.value;
        setProduct({ ...product });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const files = uploadRef.current.files;
        const formData = new FormData();

        // 파일 처리
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        // 기존 이미지 파일 첨부 ( 수정 시 )
        if (isEditing && product.uploadFileNames) {
            product.uploadFileNames.forEach(fileName => {
                formData.append("uploadFileNames", fileName);
            });
        }

        // 기본 데이터

        formData.append("pname", product.pname);
        formData.append("pdesc", product.pdesc);
        formData.append("pprice", product.pprice);
        formData.append("pqty", product.pqty);
        formData.append("categoryName", product.categoryName);

        try {
            onSubmit(formData);
            alert(isEditing ? '제품이 수정되었습니다.' : '제품이 등록되었습니다.');
            onClose();
        } catch (error) {
            alert('처리 중 오류가 발생했습니다.');
        }
    };

    // // 초기 이미지 로드를 위한 useEffect
    // useEffect(() => {
    //     if (isEditing && initialData.uploadFileNames) {
    //         const urls = initialData.uploadFileNames.map(
    //             fileName => `/api/admin/product/${fileName}`
    //         );
    //         setPreviewUrls(urls);
    //     }
    // }, [isEditing, initialData]);

    // // URL 정리를 위한 별도의 useEffect
    // useEffect(() => {
    //     return () => {
    //         // cleanup 에서 이전 URL 들을 정리
    //         previewUrls.forEach(url => URL.revokeObjectURL(url));
    //     };
    // }, [previewUrls]);

    // return (
    //     <div style={modalStyles.overlay} onClick={onClose}>
    //         <div style={modalStyles.content} onClick={e => e.stopPropagation()}>
    //             <div style={cardStyles.header}>
    //                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                     <h3 style={cardStyles.title}>{isEditing ? '제품 편집' : '새 제품 추가'}</h3>
    //                     <Button variant="ghost" size="small" onClick={onClose}>닫기</Button>
    //                 </div>
    //             </div>
    //             <div style={cardStyles.content}>
    //                 <form onSubmit={handleSubmit}>
    //                     <div style={inputStyles.container}>
    //                         <label style={inputStyles.label}>제품 이름</label>
    //                         <input
    //                             style={inputStyles.input}
    //                             name="pname"
    //                             value={formData.pname}
    //                             onChange={handleChange}
    //                             required
    //                         />
    //                     </div>
    //                     <div style={inputStyles.container}>
    //                         <label style={inputStyles.label}>카테고리</label>
    //                         <input
    //                             style={inputStyles.input}
    //                             name="categoryName"
    //                             value={formData.categoryName}
    //                             onChange={handleChange}
    //                             required
    //                         />
    //                     </div>
    //                     <div style={inputStyles.container}>
    //                         <label style={inputStyles.label}>설명</label>
    //                         <textarea
    //                             style={inputStyles.textarea}
    //                             name="pdesc"
    //                             value={formData.pdesc}
    //                             onChange={handleChange}
    //                         />
    //                     </div>
    //                     <div style={layoutStyles.grid}>
    //                         <div style={inputStyles.container}>
    //                             <label style={inputStyles.label}>가격</label>
    //                             <input
    //                                 style={inputStyles.input}
    //                                 type="number"
    //                                 name="pprice"
    //                                 value={formData.pprice}
    //                                 onChange={handleChange}
    //                                 required
    //                             />
    //                         </div>
    //                         <div style={inputStyles.container}>
    //                             <label style={inputStyles.label}>재고</label>
    //                             <input
    //                                 style={inputStyles.input}
    //                                 type="number"
    //                                 name="pqty"
    //                                 value={formData.pqty}
    //                                 onChange={handleChange}
    //                                 required
    //                             />
    //                         </div>
    //                     </div>
    //                     <div style={inputStyles.container}>
    //                         <label style={inputStyles.label}>이미지</label>
    //                         <input
    //                             ref={fileInputRef}
    //                             style={inputStyles.input}
    //                             type="file"
    //                             onChange={handleChange}
    //                             multiple
    //                             accept="image/*"
    //                         />
    //                         {previewUrls.length > 0 && (
    //                             <div style={{
    //                                 display: 'flex',
    //                                 gap: '8px',
    //                                 marginTop: '8px',
    //                                 flexWrap: 'wrap'
    //                             }}>
    //                                 {previewUrls.map((index) => (
    //                                     <img
    //                                         key={index}
    //                                         src={`/api/admin/product/${formData.uploadFileNames[0]}`}
    //                                         alt={formData.pname}
    //                                         style={{
    //                                             width: '100px',
    //                                             height: '100px',
    //                                             objectFit: 'cover',
    //                                             borderRadius: '4px'
    //                                         }}
    //                                     />
    //                                 ))}
    //                             </div>
    //                         )}
    //                     </div>
    //                     <div style={layoutStyles.buttonGroup}>
    //                         <Button style={{ flex: 1 }} type="submit">
    //                             {isEditing ? '수정하기' : '추가하기'}
    //                         </Button>
    //                         <Button type="button" variant="secondary" onClick={onClose}>
    //                             취소
    //                         </Button>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );

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
                            <label style={inputStyles.label}>이미지</label>
                            <input
                                ref={uploadRef}
                                style={inputStyles.input}
                                type="file"
                                multiple
                                accept="image/*"
                            />
                            {isEditing && product.uploadFileNames && (
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginTop: '8px',
                                    flexWrap: 'wrap'
                                }}>
                                    {product.uploadFileNames.map((fileName, index) => (
                                        <img
                                            key={index}
                                            src={`${host}/random/view/${fileName}`}
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