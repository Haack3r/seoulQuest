import React, { useState, useEffect } from 'react';
import { Search, Plus } from "lucide-react";
import { addProduct, adminProductList, adminProductOne, deleteProduct, modifyProduct } from '../../api/AdminApi';
import { layoutStyles, inputStyles, Button } from './ui/Styles';
import useCustomLogin from '../../hooks/useCustomLogin';
import { ProductForm } from './ui/ProductForm';
import { ProductCard } from './ui/ProductCard';
import FetchingModal from '../common/FetchingModal';

const initState = {
    dtoList: [],
    pno: 0,
    pname: '',
    categoryName: '',
    pdesc: '',
    pprice: 0,
    pqty: 0,
    uploadFileNames: []
}

const AdminProductComponents = () => {
    const [serverData, setServerData] = useState(initState);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedPno, setSelectedPno] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("t");
    const [fetching, setFetching] = useState(false);

    const { exceptionHandle } = useCustomLogin();

    // 제품 목록 조회
    const fetchProductList = () => {
        setFetching(true);
        adminProductList({ keyword, type })
            .then(data => setServerData(data || initState))
            .catch(exceptionHandle)
            .finally(() => setFetching(false));
    };

    // 제품 추가
    const handleAddProduct = (formData) => {
        setFetching(true);
        addProduct(formData)
            .then((response) => {
                console.log("Add product response", response)
                fetchProductList();
                setShowAddForm(false);
            })
            .catch((error) => {
                console.error(`Add product or fetch error`, error)
            })
            .finally(() => setFetching(false));
    };

    // 제품 수정
    const handleModifyProduct = (formData) => {
        if (!selectedPno) return;
        setFetching(true);
        modifyProduct(selectedPno, formData)
            .then(() => {
                fetchProductList();
                setShowAddForm(false);
                setIsEditing(false);
                setSelectedPno(null);
            })
            .catch(error => {
                console.error("Modify or fetch error:", error);
                exceptionHandle(error);
            })
            .finally(() => setFetching(false));
    };

    // 제품 삭제
    const handleDelete = (pno) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        setFetching(true);
        deleteProduct(pno)
            .then((response) => {
                console.log("삭제 성공", response)
                return adminProductList({ keyword, type })
            })
            .then(data => {
                console.log("삭제 후 리스트 조회", data)
                setServerData(data || initState)
            })
            .catch(error => {
                console.error("Delete or fetch error:", error);
                exceptionHandle(error);
            })
            .finally(() => setFetching(false));
    };

    // 폼 제출 처리
    const handleFormSubmit = (formData) => {
        if (isEditing) {
            handleModifyProduct(formData);
        } else {
            handleAddProduct(formData);
        }
    };

    // 편집 모드 시작
    const handleEdit = (product) => {
        setSelectedPno(product.pno);
        setIsEditing(true);
        setShowAddForm(true);
    };

    // 초기 로딩 및 검색
    useEffect(() => {
        fetchProductList();
    }, [keyword, type]);

    return (
        <div style={layoutStyles.container}>
            {/* 검색바와 추가 버튼 */}
            <div style={layoutStyles.flexRow}>
                <div style={{ flex: 1, ...layoutStyles.flexRow }}>
                    <input
                        style={inputStyles.input}
                        placeholder="제품 이름 또는 카테고리 검색"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Button onClick={fetchProductList} style={{ width: '100px' }}>
                        <Search size={16} />
                        검색
                    </Button>
                </div>
                <Button onClick={() => setShowAddForm(true)}>
                    <Plus size={16} />
                    새 제품
                </Button>
            </div>

            {/* 여백 */}
            <div style={{ height: '24px' }} />

            {/* 제품 목록 */}
            {serverData.dtoList && serverData.dtoList.map((product) => (
                <ProductCard
                    key={product.pno}
                    product={product}
                    onEdit={() => handleEdit(product)}
                    onDelete={() => handleDelete(product.pno)}
                />
            ))}

            {/* 제품 추가/편집 폼 */}
            {showAddForm && (
                <ProductForm
                    isEditing={isEditing}
                    initialData={serverData}
                    onSubmit={handleFormSubmit}
                    onClose={() => {
                        setShowAddForm(false);
                        setIsEditing(false);
                        setSelectedPno(null);
                    }}
                />
            )}

            {/* 로딩 표시
            {fetching && <FetchingModal />} */}
        </div>
    );
};

export default AdminProductComponents;