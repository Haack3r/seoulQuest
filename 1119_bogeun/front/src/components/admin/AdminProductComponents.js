import React, { useState, useEffect } from 'react';
import { Search, Plus } from "lucide-react";
import { addProduct, adminProductList, deleteProduct, getImageUrl, getProduct, modifyProduct } from '../../api/AdminApi';
import { layoutStyles, inputStyles, Button } from './ui/Styles';
import useCustomLogin from '../../hooks/useCustomLogin';
import { ProductForm } from './ui/ProductForm';
import { ProductCard } from './ui/ProductCard';
import { getCookie } from '../../util/cookieUtil';

const host = `http://localhost:8080/api`

const initState = {
    pno: 0,
    pname: '',
    categoryName: '',
    pdesc: '',
    pprice: 0,
    pqty: 0,
    uploadFileNames: []
}

const AdminProductComponents = () => {
    const [product, setProduct] = useState(initState);
    // const [uploadFileNames, setUploadFileNames] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedPno, setSelectedPno] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [showProductDetail, setShowProductDetail] = useState(false);

    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("t");

    const [fetching, setFetching] = useState(false);

    const { exceptionHandle } = useCustomLogin();

    const fetchProductList = () => {
        setFetching(true);
        adminProductList({ keyword, type })
            .then((data) => {
                console.log("Fetched data:", data); // Log the data to inspect its structure
                if (data && Array.isArray(data.dtoList)) {
                    setProduct(data);
                } else {
                    console.error("Unexpected data structure:", data);
                    setProduct(initState); // Fallback to initial state if data is incorrect
                }
                setFetching(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                exceptionHandle(err);
                setFetching(false); // Reset fetching state on error
            });
    };

    

    // 제품 목록 조회
    // const fetchProductList = () => {
    //     setFetching(true);
    //     adminProductList({ keyword, type })
    //         .then(data => {
    //             console.log("상품 목록 조회 성공:", data);
    //             setServerData(data || initState);
    //         })
    //         .catch(error => {
    //             console.error("상품 목록 조회 실패:", error);
    //             if (error.status === 401 || error.status === 403) {
    //                 exceptionHandle(error.originalError);
    //             } else {
    //                 alert(error.message || '상품 목록을 불러오는데 실패했습니다');
    //             }
    //             setServerData(initState);
    //         })
    //         .finally(() => setFetching(false));
    // };

    // 제품 추가
    const handleAddProduct = async (formData) => {
        try {
            setFetching(true);

            // modify와 유사한 방식으로 처리
            const response = await addProduct(formData);
            console.log("상품 등록 결과:", response);

            await fetchProductList();  // 목록 새로고침
            setShowAddForm(false);
            setIsEditing(false);
            setSelectedProduct(null);
            setSelectedPno(null);
        } catch (error) {
            console.error("상품 등록 실패:", error);
            if (error.response?.status === 401) {
                alert("인증이 만료되었습니다. 다시 로그인해주세요.");
                window.location.href = '/login';
                return;
            }
            alert(error.message || "상품 등록에 실패했습니다.");
        } finally {
            setFetching(false);
        }
    };

    // 제품 추가 버튼 핸들러
    const handleAddClick = () => {
        setShowAddForm(true);
        setIsEditing(false);
        setSelectedProduct(null);
    }

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
                setSelectedProduct(null);
            })
            .catch(error => {
                console.error("Modify or fetch error:", error);
                exceptionHandle(error);
            })
            .finally(() => setFetching(false));
    };

    // 제품 수정 버튼 핸들러
    const handleEdit = (product) => {
        setShowAddForm(true);
        setIsEditing(true);
        setSelectedPno(product.pno);
        setSelectedProduct(product);
    }

    // 제품 삭제
    const handleDelete = async (pno) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            setFetching(true);
            await deleteProduct(pno)
            alert("삭제되었습니다")
            fetchProductList();
        } catch (error) {
            console.error("Delete error:", error);
            if (error.response?.status === 401) {
                alert("삭제 권한이 없습니다.");
            } else {
                alert("삭제 중 오류가 발생했습니다.");
            }
        } finally {
            setFetching(false);
        }
    }

    const handleGetProduct = (pno) => {
        getProduct(pno)
            .then(data => {
                setSelectedProduct(data)
                setShowProductDetail(true)
            })
            .catch(error => {
                console.error("Get product error:", error);
                exceptionHandle(error);
            });
    }

    const handleClose = () => {
        setShowAddForm(false);
        setIsEditing(false);
        setSelectedPno(null);
        setSelectedProduct(null);
        fetchProductList();
    }

    // setFetching(true);
    // deleteProduct(pno)
    //         .then((response) => {
    //         console.log("삭제 성공", response)
    //         return adminProductList({ keyword, type })
    //     })
    // .then(data => {
    //     console.log("삭제 후 리스트 조회", data)
    //     setServerData(data || initState)
    // })
    // .catch(error => {
    //     console.error("Delete or fetch error:", error);
    //     exceptionHandle(error);
    // })
    // .finally(() => setFetching(false));
    // };

    // 폼 제출 처리
    const handleFormSubmit = (formData) => {
        if (isEditing) {
            handleModifyProduct(formData);
        } else {
            handleAddProduct(formData);
        }
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
                <Button onClick={() => {
                    handleAddClick();
                    setShowProductDetail(false);
                }}>
                    <Plus size={16} />
                    새 제품
                </Button>
            </div>

            {/* 여백 */}
            <div style={{ height: '24px' }} />

            {/* 제품 목록 */}
            {/* {serverData.dtoList && serverData.dtoList
                // .filter(product => !product.delFlag)
                .map((data) => {
                    // AdminProductList 의 경우 [0]으로 Product 객체를 받아옴
                    const product = Array.isArray(data) ? data[0] : data;
                    return (
                        <ProductCard
                            key={product.pno}
                            product={product}
                            onEdit={() => handleEdit(product)}
                            onDelete={() => handleDelete(product.pno)}
                        />
                    );
                })} */}

            {/* 제품 카드 */}
            <div
                style={{ position: 'relative', zIndex: 1 }}>
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {product.dtoList && product.dtoList.map((product) => {
                        // const product = Array.isArray(data) ? data[0] : data;
                        return (
                            <div key={product.pno}
                                onClick={() => handleGetProduct(product.pno)}
                                className="overflow-hidden transition-all duration-300 hover:shadow-xl border bg-white rounded-lg group">
                                <div
                                    className="relative overflow-hidden aspect-square group">
                                    {product.uploadFileNames?.[0] ? (
                                        <img
                                            src={`${host}/admin/product/image/${product.uploadFileNames[0]}`}
                                            alt={product.pname}
                                            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110 cursor-pointer"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <p className="text-gray-400">이미지 없음</p>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity
                                duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
                                        <div className="text-center p-4">
                                            <h3 className="text-lg font-semibold text-white mb-2">{product.pname}</h3>
                                            <p className="text-rose-500 mb-4">₩{product.pprice.toLocaleString()}</p>
                                            {/* <div className="flex gap-2 justify-center">
                                                <Button onClick={() => handleEdit(product, product.uploadFileNames, product.pno)}
                                                    className="bg-white text-gray-900 hover:bg-gray-100">
                                                    수정
                                                </Button>
                                                <Button onClick={() => handleDelete(product.pno)}
                                                    className="bg-red-500 text-white hover:bg-red-600">
                                                    삭제
                                                </Button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold">{product.pname}</h3>
                                    <p className="text-gray-600">{product.categoryName}</p>
                                    <p className="text-rose-500 font-medium">₩{product.pprice.toLocaleString()}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {showProductDetail && selectedProduct && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]"
                        onClick={() => setShowProductDetail(false)}
                    >
                        <div
                            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold">{selectedProduct.pname}</h2>
                                <button
                                    onClick={() => setShowProductDetail(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 이미지 섹션 */}
                                <div className="aspect-square rounded-lg overflow-hidden">
                                    {selectedProduct.uploadFileNames?.[0] ? (
                                        <img
                                            src={`${host}/random/view/${selectedProduct.uploadFileNames[0]}`}
                                            alt={selectedProduct.pname}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <p className="text-gray-400">이미지 없음</p>
                                        </div>
                                    )}
                                </div>

                                {/* 상세 정보 섹션 */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">카테고리</h3>
                                        <p className="text-gray-600">{selectedProduct.categoryName}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">가격</h3>
                                        <p className="text-rose-500 text-xl font-medium">
                                            ₩{selectedProduct.pprice.toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">재고</h3>
                                        <p className="text-gray-600">{selectedProduct.pqty}개</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">상품 설명</h3>
                                        <p className="text-gray-600 whitespace-pre-wrap">{selectedProduct.pdesc}</p>
                                    </div>

                                    {/* 추가 이미지들 - 이미지가 있을 때만 표시 */}
                                    {selectedProduct.uploadFileNames && selectedProduct.uploadFileNames.length > 1 && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">추가 이미지</h3>
                                            <div className="grid grid-cols-4 gap-2">
                                                {selectedProduct.uploadFileNames.slice(1).map((fileName, index) => (
                                                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                                                        <img
                                                            src={`${host}/admin/product/image/${fileName}`}
                                                            alt={`${selectedProduct.pname} ${index + 2}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-4">
                                        <Button
                                            onClick={() => {
                                                handleEdit(selectedProduct);
                                                setShowProductDetail(false);
                                            }}
                                            className="flex-1"
                                        >
                                            수정
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                handleDelete(selectedProduct.pno);
                                                setShowProductDetail(false);
                                            }}
                                            className="flex-1 bg-red-500 hover:bg-red-600"
                                        >
                                            삭제
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 제품 추가/편집 폼 */}
                {showAddForm && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
                        <ProductForm
                            isEditing={isEditing}
                            initialData={isEditing ? selectedProduct : product}
                            onSubmit={handleFormSubmit}
                            onClose={handleClose}
                        />
                    </div>
                )}
                {/* 로딩 표시
            {fetching && <FetchingModal />} */}
            </div>
        </div>
    );
};

export default AdminProductComponents;