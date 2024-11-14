import React, { useState, useEffect, useRef } from 'react';
import { Search, Package, DollarSign, BadgeCheck, Truck, Plus } from "lucide-react";
import { addProduct, adminProductList, adminProductOne, checkRole, deleteProduct, modifyProduct } from '../../api/AdminApi';
import jwtAxios from '../../util/jwtUtil';
import { useNavigate } from 'react-router-dom';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal';
import useCustomLogin from '../../hooks/useCustomLogin';

// 스타일 정의
const buttonStyles = {
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.2s',
        gap: '8px',
    },
    primary: {
        backgroundColor: '#2563eb',
        color: 'white',
    },
    destructive: {
        backgroundColor: '#dc2626',
        color: 'white',
    },
    secondary: {
        backgroundColor: '#e5e7eb',
        color: '#1f2937',
    },
    ghost: {
        backgroundColor: 'transparent',
        color: '#1f2937',
    },
    small: {
        padding: '4px 8px',
        fontSize: '12px',
    }
};

const cardStyles = {
    container: {
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '16px',
    },
    header: {
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
    },
    content: {
        padding: '16px',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0,
    }
};

const inputStyles = {
    container: {
        marginBottom: '12px',
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '4px',
    },
    input: {
        width: '100%',
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
        fontSize: '14px',
    },
    textarea: {
        width: '100%',
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
        fontSize: '14px',
        minHeight: '80px',
        resize: 'vertical',
    }
};

const layoutStyles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '16px',
    },
    buttonGroup: {
        display: 'flex',
        gap: '8px',
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
    },
    iconText: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
    }
};

// Button 컴포넌트
const Button = ({ children, variant = 'primary', size = 'default', ...props }) => (
    <button
        {...props}
        style={{
            ...buttonStyles.base,
            ...buttonStyles[variant],
            ...(size === 'small' && buttonStyles.small),
            ...props.style,
        }}
    >
        {children}
    </button>
);

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
    // const [product, setProduct] = useState([]);
    const [serverData, setServerData] = useState(initState)
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedPno, setSelectedPno] = useState(null)
    const [keyword, setKeyword] = useState("")
    const [type, setType] = useState("t")
    const [fetching, setFetching] = useState(false);

    const fileInputRef = useRef()
    const { exceptionHandle } = useCustomLogin()

    // 목록 조회
    const fetchProductList = () => {
        setFetching(true);
        adminProductList({ keyword, type })
            .then(data => {
                setServerData(data || initState);
            })
            .catch(exceptionHandle)
            .finally(() => {
                setFetching(false);
            });
    };

    // 초기 로딩 및 검색어 변경시 목록 조회
    useEffect(() => {
        fetchProductList();
    }, [keyword, type]);

    // 단일 상품 조회
    useEffect(() => {
        if (selectedPno) {
            setFetching(true);
            adminProductOne(selectedPno)
                .then(data => {
                    setServerData(prev => ({
                        ...prev,
                        ...data
                    }));
                })
                .catch(exceptionHandle)
                .finally(() => setFetching(false));
        }
    }, [selectedPno]);

    const createProductFormData = () => {
        const formData = new FormData();
        const files = fileInputRef.current.files;

        // 파일 추가
        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                formData.append("files", file);
            });
        }

        // 상품 정보 추가
        formData.append("pname", serverData.pname);
        formData.append("pdesc", serverData.pdesc);
        formData.append("pprice", serverData.pprice);
        formData.append("pqty", serverData.pqty);
        formData.append("categoryName", serverData.categoryName);

        // 수정 시에만 기존 파일 정보 추가
        if (isEditing && serverData.uploadFileNames) {
            serverData.uploadFileNames.forEach(fileName => {
                formData.append("uploadFileNames", fileName);
            });
        }

        return formData;
    };

    // 입력값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        // number 타입의 입력값 처리
        const newValue = (name === 'pprice' || name === 'pqty')
            ? parseInt(value) || 0
            : value;

        setServerData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleSearch = () => {
        fetchProductList();
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = createProductFormData();

        setFetching(true);
        addProduct(formData)
            .then(() => {
                fetchProductList();
                resetForm();
            })
            .catch(exceptionHandle)
            .finally(() => {
                setFetching(false);
            });
    };

    const handleModifyProduct = (e) => {
        e.preventDefault();
        if (!selectedPno) return;

        const formData = createProductFormData();

        setFetching(true);
        modifyProduct(selectedPno, formData)
            .then(() => {
                fetchProductList();
                resetForm();
            })
            .catch(exceptionHandle)
            .finally(() => {
                setFetching(false);
            });
    };

    const handleEdit = (product) => {
        setSelectedPno(product.pno);
        setIsEditing(true);

        adminProductOne(product.pno)
            .then(data => {
                setServerData(prev => ({
                    ...prev,
                    ...data
                }));
                setShowAddForm(true);
            })
            .catch(exceptionHandle);
    };

    const handleDelete = (pno) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        setFetching(true);
        deleteProduct(pno)
            .then(() => {
                fetchProductList();
            })
            .catch(exceptionHandle)
            .finally(() => {
                setFetching(false);
            });
    };

    const resetForm = () => {
        setSelectedPno(null);
        setIsEditing(false);
        setShowAddForm(false);
        setServerData(initState);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // useEffect(() => {
    //     if (selectedPno) {
    //         setFetching(true)
    //         adminProductOne(selectedPno)
    //             .then((data) => {
    //                 console.log("데이터 확인", data)
    //                 setProduct(data || initState)
    //                 setFetching(false)
    //             }).catch((error) => {
    //                 console.error("데이터 발수신 오류", error)
    //                 exceptionHandle(error)
    //                 setFetching(false)
    //             })
    //     }
    // }, [keyword, type])

    // useEffect(() => {
    //     setFetching(true)
    //     adminProductOne(selectedPno)
    //         .then(data => {
    //             setProduct(initState)
    //             setFetching(false)
    //         })
    // }, [selectedPno])

    // const handleSearch = () => {
    //     setFetching(true)
    //     adminProductList({ keyword, type })
    //         .then((data) => {
    //             if (data && Array.isArray(data.dtoList)) {
    //                 serverData(data)
    //             } else {
    //                 setServerData(initState)
    //             }
    //             setFetching(false)
    //         })
    //         .catch((error) => {
    //             exceptionHandle(error)
    //             setFetching(false)
    //         })
    // }

    // const handleAddProduct = (e) => {

    //     const files = fileInputRef.current.files

    //     const formData = new FormData()

    //     for (let i = 0; i < files.length; i++) {
    //         formData.append("files", files[i]);
    //     }

    //     // other data
    //     formData.append("pname", product.pname)
    //     formData.append("pdesc", product.pdesc)
    //     formData.append("price", product.pprice)

    //     console.log(formData)

    //     // ADD 버튼 클릭 시 모달창 띄움
    //     setFetching(true)

    //     // ADD 버튼 클릭 시 productsApi 의 addProduct() 호출
    //     addProduct(formData).then(data => {
    //         setFetching(false)
    //     })
    // }

    // const changeProduct = (e) => {
    //     product[e.target.name] = e.target.value
    //     setProduct[{ ...product }]
    // }

    // const deleteImage = (imageName) => {
    //     const result = product.uploadFileNames.filter(
    //         fileName => fileName !== imageName
    //     )
    //     product.uploadFileNames = result

    //     setProduct({ ...product })
    // }

    // const handleModifyProduct = () => {
    //     const files = fileInputRef.current.files
    //     const formData = new FormData()

    //     for (let i = 0; i < files.length; i++) {
    //         formData.append("files", files[i])
    //     }

    //     formData.append("pname", product.pname)
    //     formData.append("pdesc", product.pdesc)
    //     formData.append("price", product.pprice)
    //     formData.append("pqty", product.pqty);
    //     formData.append("categoryName", product.categoryName);
    //     formData.append("delFlag", product.delFlag)

    //     for (let i = 0; i < product.uploadFileNames.length; i++) {
    //         formData.append("uploadFileNames", product.uploadFileNames[i]);
    //     }

    //     if (product.uploadFileNames) {
    //         product.uploadFileNames.forEach(fileName => {
    //             formData.append("uploadFileNames", fileName);
    //         });
    //     }

    //     if (isEditing) {
    //         // 수정 처리
    //         modifyProduct(selectedPno, formData)
    //             .then(() => {
    //                 // 목록 새로고침
    //                 return adminProductList({ keyword, type });
    //             })
    //             .then(data => {
    //                 setServerData(data);
    //                 resetForm();
    //             })
    //             .catch(error => {
    //                 console.error('수정 실패:', error);
    //                 exceptionHandle(error);
    //             })
    //             .finally(() => {
    //                 setFetching(false);
    //             });
    //     }
    // }

    // const handleEdit = (productItem) => {
    //     setSeletedPno(productItem.pno);
    //     setIsEditing(true);
    //     setShowAddForm(true);
    // };

    // const handleDelete = async (pno) => {
    //     if (!window.confirm('정말 삭제하시겠습니까?')) return
    //     try {
    //         setFetching(true)
    //         await deleteProduct(pno)
    //         const updatedList = await adminProductList({ keyword, type });
    //         setServerData(updatedList)
    //         setFetching(false)
    //     } catch (error) {
    //         console.error("삭제 실패", error)
    //         exceptionHandle(error)
    //     }
    // }

    // const resetForm = () => {
    //     setSeletedPno(null)
    //     setIsEditing(false)
    //     setShowAddForm(false)
    //     setProduct(initState)
    //     if (fileInputRef.current) {
    //         fileInputRef.current.value = '';
    //     }
    // }

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
                    <Button onClick={handleSearch}>
                        <Search size={16} />
                        검색
                    </Button>
                    {/* <Search size={20} color="#6b7280" /> */}
                </div>
                <Button onClick={() => setShowAddForm(true)}>
                    <Plus size={16} />
                    새 제품
                </Button>
            </div>

            {/* 여백 추가 */}
            <div style={{ height: '24px' }}></div>

            {/* 제품 목록 */}
            {serverData.dtoList && serverData.dtoList.map((product) => (
                <div key={product.pno} style={cardStyles.container}>
                    <div style={cardStyles.header}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={cardStyles.title}>{product.pname}</h3>
                            <div style={layoutStyles.buttonGroup}>
                                <Button size="small" onClick={() => handleEdit(product)}>편집</Button>
                                <Button size="small" variant="destructive" onClick={() => handleDelete(product.pno)}>삭제</Button>
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
                        {/* <div style={layoutStyles.iconText}>
                            <Truck size={16} />
                            <span>판매량: {product.sales}개</span>
                        </div> */}
                    </div>
                </div>
            ))}

            {/* 제품 추가/편집 폼 */}
            {showAddForm && (
                <div style={cardStyles.container}>
                    <div style={cardStyles.header}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={cardStyles.title}>{isEditing ? '제품 편집' : '새 제품 추가'}</h3>
                            <Button variant="ghost" size="small" onClick={resetForm}>취소</Button>
                        </div>
                    </div>
                    <div style={cardStyles.content}>
                        <form onSubmit={isEditing ? handleModifyProduct : handleAddProduct}>
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
                                <label style={inputStyles.label}>이미지</label>
                                <input
                                    ref={fileInputRef}
                                    style={inputStyles.input}
                                    type="file"
                                    // name="uploadFileNames"
                                    // value={serverData.uploadFileNames}
                                    // onChange={handleChange}
                                    multiple
                                />
                            </div>
                            <div style={layoutStyles.buttonGroup}>
                                <Button style={{ flex: 1 }} type="submit">
                                    {isEditing ? '수정하기' : '추가하기'}
                                </Button>
                                <Button type="button" variant="secondary" onClick={resetForm}>
                                    취소
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }

            {/* 판매 통계 */}
            {/* <div style={cardStyles.container}>
                <div style={cardStyles.header}>
                    <h3 style={cardStyles.title}>판매 통계</h3>
                </div>
                <div style={cardStyles.content}>
                    <Button onClick={generateSaleStats} style={{ width: '100%' }}>
                        통계 생성
                    </Button>
                    {saleStats.length > 0 && (
                        <div style={{ marginTop: '16px' }}>
                            {saleStats.map(stat => (
                                <div key={stat.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>{stat.name}</span>
                                    <span>{stat.sales}개 판매</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div> */}
        </div >
    );
};

export default AdminProductComponents;