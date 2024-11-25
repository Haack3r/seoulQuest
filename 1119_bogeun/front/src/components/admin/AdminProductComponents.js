import React, { useState, useEffect } from 'react';
import { Search, Plus } from "lucide-react";
import { addProduct, adminProductList, deleteProduct, getImage, getProduct, modifyProduct } from '../../api/AdminApi';
import { layoutStyles, inputStyles, Button } from './ui/Styles';
import useCustomLogin from '../../hooks/useCustomLogin';
<<<<<<< HEAD
import ProductForm from './ui/ProductForm';
=======
import { ProductForm } from './ui/ProductForm';
>>>>>>> 123e949 (1)
import { initState } from './ui/ProducInitState';

const host = `http://localhost:8080/api`

const AdminProductComponents = () => {
    const [serverData, setServerData] = useState(initState);
<<<<<<< HEAD
=======
    // const [uploadFileNames, setUploadFileNames] = useState([]);
>>>>>>> 123e949 (1)
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedPno, setSelectedPno] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [showProductDetail, setShowProductDetail] = useState(false);

    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("t");

    const [fetching, setFetching] = useState(false);

    const { exceptionHandle } = useCustomLogin();

    const [page, setPage] = useState(1);
    const [size] = useState(9);

    const fetchProductList = () => {
        console.log("상품 목록 요청:", {
            페이지: page,
            사이즈: size,
            검색어: keyword,
            타입: type
        });

        setFetching(true);
        adminProductList({ page, size, keyword, type })
            .then(data => {
<<<<<<< HEAD
                setServerData(data);
=======
                setServerData({
                    ...data,
                    dtoList: data.dtoList.map(product => ({
                        ...product,
                        uploadFileNames: product.uploadFileNames || []
                    }))
                });
>>>>>>> 123e949 (1)
            })
            .catch(err => {
                console.error("데이터 조회 실패:", err);
                exceptionHandle(err);
            })
            .finally(() => {
                setFetching(false);
            });
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        console.log("페이지 변경 시도:", {
            현재페이지: page,
            새페이지: newPage,
            전체페이지: serverData.totalPage
        });

        try {
            setPage(newPage);
        } catch (error) {
            console.error("페이지 변경 중 오류 발생:", error);
        }
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
            })
            .catch(error => {
                console.error("Modify or fetch error:", error);
                exceptionHandle(error);
            })
            .finally(() => setFetching(false));
    };

    // 제품 수정 버튼 핸들러
    const handleEdit = (pno) => {
        getProduct(pno)
            .then(data => {
                setShowAddForm(true);
                setIsEditing(true);
                setSelectedPno(pno);
                setSelectedProduct(data);
            })
            .catch(error => {
                console.error("Get product error:", error);
                exceptionHandle(error);
            });
    };

    // 제품 삭제
    const handleDelete = (pno) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            setFetching(true);
            deleteProduct(pno)
            alert("삭제되었습니다")
            handleClose();
            window.location.reload();
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
<<<<<<< HEAD
                setSelectedProduct(data);
=======
                setSelectedProduct({
                    ...data,
                    uploadFileNames: data.uploadFileNames || []
                });
>>>>>>> 123e949 (1)
                setShowProductDetail(true);
                console.log("Product data:", data);
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
        console.log("useEffect 실행:", {
            페이지: page,
            사이즈: size,
            검색어: keyword,
            타입: type
        });
        fetchProductList();
    }, [page, size, keyword, type]);

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
                    {serverData.dtoList && serverData.dtoList.map((product) => (
                        <div key={product.pno} className="bg-white rounded-lg shadow-md p-4">
                            <div className="relative">
                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                                    {(product.uploadFileNames && Array.isArray(product.uploadFileNames) && product.uploadFileNames.length > 0) ? (
                                        <img
<<<<<<< HEAD
                                            src={`${host}/product/image/${product.uploadFileNames[0]}`}
                                            alt={product.pname}
                                            className="h-48 w-full object-cover"
                                            onClick={() => handleGetProduct(product.pno)}
                                            onError={(e) => {
                                                e.target.onerror = null; // 무한 루프 방지    
                                                console.log('이미지 로드 실패:', product.uploadFileNames[0]);
                                            }}
=======
                                            src={getImageUrl(product.uploadFileNames[0])?.url}
                                            alt={product.pname}
                                            className="h-48 w-full object-cover"
                                            onClick={() => handleGetProduct(product.pno)}
>>>>>>> 123e949 (1)
                                        />
                                    ) : (
                                        <div
                                            className="h-48 w-full bg-gray-200 flex items-center justify-center"
                                            onClick={() => handleGetProduct(product.pno)}
                                        >
                                            <span className="text-gray-500">이미지 없음</span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">{product.pname}</h3>
                                    <p className="text-gray-600">{product.pprice?.toLocaleString()}원</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center gap-2">
                    {serverData.prev && (
                        <Button
                            onClick={() => {
                                console.log("이전 페이지 클릭:", serverData.prevPage);
                                handlePageChange(serverData.prevPage);
                            }}
                        >
                            이전
                        </Button>
                    )}

                    {serverData.pageNumList?.map(pageNum => (
                        <Button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={pageNum === serverData.current ? 'bg-rose-500' : ''}
                        >
                            {pageNum}
                        </Button>
                    ))}

                    {serverData.next && (
                        <Button onClick={() => handlePageChange(serverData.nextPage)}>
                            다음
                        </Button>
                    )}
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
                                    {(selectedProduct?.uploadFileNames?.length > 0) ? (
                                        <img
<<<<<<< HEAD
                                            src={`${host}/product/image/${selectedProduct.uploadFileNames[0]}`}
=======
                                            id={`product-image-${selectedProduct.pno}`}
                                            src={getImageUrl(selectedProduct.uploadFileNames[0])?.url}
>>>>>>> 123e949 (1)
                                            alt={selectedProduct.pname}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <span className="text-gray-500">이미지 없음</span>
                                        </div>
                                    )}
                                </div>
                                {/* 추가 이미지들 - 이미지가 있을 때만 표시 */}
                                {selectedProduct.uploadFileNames && selectedProduct.uploadFileNames.length > 1 && (
                                    <div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {selectedProduct.uploadFileNames.slice(1).map((fileName, index) => (
                                                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                                                    <img
<<<<<<< HEAD
                                                        src={`${host}/product/image/${fileName}`}
=======
                                                        src={getImageUrl(fileName).url}
>>>>>>> 123e949 (1)
                                                        alt={`${selectedProduct.pname} ${index + 2}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

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


                                    <div className="flex gap-2 pt-4">
                                        <Button
                                            onClick={() => {
                                                handleEdit(selectedProduct.pno);
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
                            initialData={isEditing ? selectedProduct : serverData}
                            onSubmit={handleFormSubmit}
                            onClose={handleClose}
                            selectedPno={selectedPno}
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