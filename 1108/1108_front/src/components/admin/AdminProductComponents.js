import React, { useState, useEffect } from 'react';

const AdminProductComponents = () => {

    // 제품 목록 상태를 관리하기 위한 useState 훅
    const [products, setProducts] = useState([]);

    // 필터링된 제품 목록 상태를 관리하기 위한 useState 훅
    const [filteredProducts, setFilteredProducts] = useState([]);

    // 검색어 상태를 관리하기 위한 useState 훅
    const [searchTerm, setSearchTerm] = useState('');

    // 편집 모드 상태를 관리하기 위한 useState 훅
    const [isEditing, setIsEditing] = useState(false);

    // 현재 편집 중인 제품 상태를 관리하기 위한 useState 훅
    const [currentProduct, setCurrentProduct] = useState(null);

    // 판매 통계 상태를 관리하기 위한 useState 훅
    const [saleStats, setSaleStats] = useState([]);

    useEffect(() => {

        // 초기 제품 목록을 정의하는 배열 함수
        const initialProducts = [
            {
                id: 1,
                name: '기념품 A',
                category: '기념품',
                description: '설명 A',
                price: 10000, stock: 50,
                shippingCost: 3000,
                active: true,   // 제품 활성화 상태 (판매 중인지 여부)
                sales: 20
            },
            {
                id: 2,
                name: '기념품 B',
                category: '기념품',
                description: '설명 B',
                price: 20000,
                stock: 20,
                shippingCost: 4000,
                active: true,
                sales: 15
            },
        ];
        setProducts(initialProducts);           // 제품 목록이 초기화
        setFilteredProducts(initialProducts);   // 필터링 된 제품 목록을 초기 제품 목록으로 설정
    }, []);

    useEffect(() => {   // searchTerm 또는 products 상태가 변경될 때마다 실행

        // products 배열을 필터링하여 검색어와 일치하는 제품을 찾음
        const filtered = products.filter(product =>

            // 제품의 이름이 대소문자 구분 없이 검색어(searchTerm)를 포함하는지 확인
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

            //  각 제품의 카테고리도 대소문자 구분 없이 검색어를 포함하는지 확인
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);  // 필터링 된 제품 목록을 상태에 설정
    }, [searchTerm, products]);

    const handleEdit = (product) => {
        setCurrentProduct(product);     // 현재 편집할 제품을 상태에 저장
        setIsEditing(true);             // 함수를 호출하여 편집 모드를 활성화
    };

    const handleDelete = (id) => {

        // filter 메서드를 사용하여 주어진 ID와 일치하지 않는 제품만 포함된 새로운 배열(updatedProducts)을 생성
        const updatedProducts = products.filter(product => product.id !== id);

        setProducts(updatedProducts);           // 함수를 호출하여 전체 제품 목록을 업데이트
        setFilteredProducts(updatedProducts);   // 필터링 된 제품 목록을 업데이트
    };

    const handleSave = (newProduct) => {
        if (isEditing) {    // 현재 편집 모드인지 확인

            // 기존 제품 목록을 매핑하여 업데이트된 제품 목록을 생성
            const updatedProducts = products.map(product =>

                // 제품 ID가 새 제품의 ID와 일치하는 경우 새 제품으로 교체하고, 그렇지 않으면 기존 제품을 유지
                product.id === newProduct.id ? newProduct : product
            );
            setProducts(updatedProducts);           // 업데이트 된 제품 목록으로 상태를 설정
            setFilteredProducts(updatedProducts);   // 필터링 된 제품 목록도 업데이트
        } else {

            // 기존 제품 목록에 새로운 제품을 추가
            // 현재 시간(Date.now())을 ID로 부여하고 초기 판매 수량을 0으로 설정
            setProducts([...products, { ...newProduct, id: Date.now(), sales: 0 }]);

            setFilteredProducts([...products, { ...newProduct, id: Date.now(), sales: 0 }]);
        }
        setIsEditing(false);        // 편집 모드를 비활성화
        setCurrentProduct(null);    // 현재 편집 중인 제품 정보를 초기화
    };

    const toggleAvailability = (id) => {    // 특정 제품의 가용성(active 상태)을 전환하는 함수

        // 기존 제품 목록을 매핑하여 업데이트된 제품 목록을 생성
        const updatedProducts = products.map(product =>

            // 제품 ID가 주어진 ID와 일치하는 경우, 해당 제품의 active 속성을 반전
            product.id === id ? { ...product, active: !product.active } : product
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
    };

    const generateSalesStats = () => {  // 각 제품의 판매 통계 정보를 생성하는 함수

        const stats = products.map(product => ({    // 제품에 대해 이름과 판매 수량을 포함하는 객체 배열을 생성
            name: product.name,
            sales: product.sales
        }));
        setSaleStats(stats);
    };

    // product prop을 받아 제품 정보를 표시
    const ProductItem = ({ product }) => (

        <div className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
            <div>
                <h3 className="font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p>가격: {product.price}원</p>
                <p>재고: {product.stock}</p>

                {/* active 속성이 true일 경우 '판매 가능'으로 표시하고, false일 경우 '판매 불가능'으로 표시 */}
                <p>상태: {product.active ? '판매 가능' : '판매 불가능'}</p>

                <p>판매량: {product.sales}</p>
            </div>

            <div className="flex space-x-2">
                <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-4 py-2 rounded w-24">편집</button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded w-24">삭제</button>

                {/* 제품의 활성화 상태에 따라 '비활성화' 또는 '활성화'로 변경 */}
                <button onClick={() => toggleAvailability(product.id)} className="bg-yellow-500 text-white px-4 py-2 rounded w-24">
                    {product.active ? '비활성화' : '활성화'}

                </button>
            </div>

        </div>
    );

    const ProductForm = ({ product, onSave }) => {  // product prop은 수정할 제품 정보를 담고, onSave prop은 제품 정보를 저장하는 함수

        // 초기 상태는 모든 필드가 빈 값으로 설정 (사용자 입력이 없을 때 폼을 초기화하기 위해)
        const [formData, setFormData] = useState({
            name: '',
            category: '',
            description: '',
            price: '',
            stock: '',
            shippingCost: '',
            images: [],
        });

        useEffect(() => {
            if (product) {
                setFormData({
                    name: product.name,
                    category: product.category,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    shippingCost: product.shippingCost,
                    images: product.images || [],
                });
            }
        }, [product]);


        const handleChange = (e) => {   // 이벤트 객체를 통해 사용자가 입력한 값을 상태에 반영하는 함수

            const { name, value } = e.target;   // 입력 필드의 이름과 값을 가져옴
            setFormData({
                ...formData,
                [name]: value,                  // 입력 필드 이름에 해당하는 값을 업데이트
            });
        };

        const handleSubmit = (e) => {

            // 기본 동작을 방지하여 페이지가 새로고침되는 것을 막음
            e.preventDefault();

            // product가 null이나 undefined인 경우에는 Date.now()를 호출하여 현재 시간을 초 단위로 가져옴
            onSave({ ...formData, id: product?.id || Date.now() });
        };

        // 제품 편집 영역
        return (

            // 사용자 입력을 받기 위한 HTML 폼을 나타내며, 폼이 제출될 때 handleSubmit 함수를 호출
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="name"
                    placeholder="제품 이름"
                    value={formData.name}   // formData 객체의 name 속성에 연결
                    onChange={handleChange} // 사용자가 입력 필드의 내용을 변경할 때 호출되는 함수
                    required className="border p-2 w-full"  // 설정된 입력 필드는 반드시 입력해야 함
                />

                <input
                    type="text"
                    name="category"
                    placeholder="카테고리"
                    value={formData.category}
                    onChange={handleChange}
                    required className="border p-2 w-full"
                />
                <textarea
                    name="description"
                    placeholder="설명"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="가격"
                    value={formData.price}
                    onChange={handleChange}
                    required className="border p-2 w-full"
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="재고 수량"
                    value={formData.stock}
                    onChange={handleChange}
                    required className="border p-2 w-full"
                />
                <input
                    type="number"
                    name="shippingCost"
                    placeholder="배송 비용"
                    value={formData.shippingCost}
                    onChange={handleChange}
                    required className="border p-2 w-full"
                />

                {/* 이 버튼이 클릭될 때, 폼이 제출되도록 설정 */}
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">저장</button>

            </form>
        );
    };

    return (
        <div className='p-8 bg-gray-100'>
            <h2 className='font-bold text-xl mb-4'>제품 관리</h2>

            <input
                type="text"
                placeholder="제품 이름 또는 카테고리 검색"

                // 입력 필드에 현재 검색어를 표시
                value={searchTerm}

                // 사용자가 업데이트 하여 입력된 필드의 내용을 변경할 때 호출
                onChange={(e) => setSearchTerm(e.target.value)}

                className='border p-2 mb-4 w-full'
            />

            {/* 그리드의 열을 1개로 설정하여 각 제품 항목이 세로로 쌓이도록 함 */}
            <div className='grid grid-cols-1 gap-4 mb-8'>

                {/* filteredProducts 배열을 순회하여 각 제품에 대해 <ProductItem> 컴포넌트를 생성 */}
                {filteredProducts.map(product => (

                    <ProductItem
                        key={product.id}    // ProductItem 컴포넌트에 고유한 키를 부여
                        product={product}   // 현재 제품 데이터를 ProductItem 컴포넌트에 전달
                    />
                ))}
            </div>

            <h3 className='font-bold text-lg mb-2'>{isEditing ? '제품 편집' : '제품 추가'}</h3>

            {/* 폼에서 저장 버튼이 클릭될 때 호출될 핸들러 함수인 handleSave를 전달 */}
            <ProductForm product={currentProduct} onSave={handleSave} />

            <div className='mt-8'>
                <h3 className='font-bold text-lg mb-2'>판매 통계</h3>
                <button onClick={generateSalesStats} className='bg-blue-500 text-white px-4 py-2 rounded'>통계 생성</button>


                {/* saleStats 배열의 길이가 0보다 클 경우에만 다음의 내용을 렌더링 */}
                {saleStats.length > 0 && (
                    <div>

                        {/* saleStats 배열을 순회하여 각 통계 항목을 <p> 요소로 렌더링 */}
                        {saleStats.map(stat => (

                            // key={stat.name}로 각 항목에 고유한 키를 부여
                            <p key={stat.name}>{stat.name}: {stat.sales}개 판매</p>

                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProductComponents;
