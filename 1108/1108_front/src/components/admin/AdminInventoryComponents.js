import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';  // // Chart.js에서 사용할 요소와 기능들을 import
import {
  Chart as ChartJS,
  BarElement,        // Bar 차트의 막대 
  CategoryScale,
  LinearScale,       // 선형 스케일을 위한 요소
  Title,
  Tooltip,           // 차트에 툴팁을 추가
  Legend             // 차트 범례를 추가
} from 'chart.js';
import { CSVLink } from 'react-csv';  // CSV 파일 파싱을 위한 papaparse 라이브러리 import
import Papa from 'papaparse';         // papaparse 라이브러리를 import하여 CSV 파일을 파싱하는 데 사용

// 이 등록 과정이 없다면, 차트를 그릴 때 해당 요소들이 무엇인지 알지 못하기 때문에 오류가 발생하거나 차트가 제대로 표시되지 않음
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminInventoryComponent = () => {

  // inventoryData라는 상태 변수를 정의하여 이를 업데이트할 수 있는 setInventoryData 함수를 생성
  // 제품의 재고 데이터를 저장하며, 초기값은 빈 배열 (처음에는 재고 데이터가 없음)
  const [inventoryData, setInventoryData] = useState([]);

  // lowStockItems라는 상태 변수를 정의하여 재고가 부족한 제품 목록을 저장
  // 재고가 부족한 제품 목록을 저장하며, 초기값은 빈 배열 (처음에는 부족한 재고 데이터가 없음)
  const [lowStockItems, setLowStockItems] = useState([]);

  // file이라는 상태 변수를 정의하여 파일(예: 제품 이미지)을 저장
  // 초기값은 null로 설정되어 있어, 처음에는 파일이 업로드되지 않음
  const [file, setFile] = useState(null);

  // 각 필드는 빈 문자열로 초기화되어 있어, 새 제품이 추가되기 전까지는 정보가 없는 상태
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    shippingCost: '',
    images: []
  });

  // products라는 상태 변수를 정의하여 전체 제품 목록을 저장
  // 초기값은 빈 배열로 설정되어 있어, 처음에는 제품이 없음
  const [products, setProducts] = useState([]);


  // 재고 변동 추세 차트
  const mockStockTrends = { // 재고 트렌드를 시각화하기 위한 데이터 구조
    labels: ['1주차', '2주차', '3주차', '4주차', '5주차', '6주차'], // X축의 레이블
    datasets: [ // 제품의 재고 변화
      {
        label: '상품1',
        data: [20, 18, 25, 15, 30, 22],  // 각 주차별 상품의 재고 수치
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: '상품2',
        data: [15, 10, 20, 18, 12, 25],
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
      {
        label: '상품3',
        data: [10, 20, 15, 30, 22, 10],
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  // 재고 데이터를 가져오는 비동기 함수
  // fetch API나 다른 데이터 요청 라이브러리를 사용해 백엔드에서 데이터를 받아올 수 있음
  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {   // 재고 데이터를 비동기로 가져오기 위한 함수


    const data = [  // 임시 데이터
      { id: 1, name: '상품1', stock: 20 },
      { id: 2, name: '상품2', stock: 8 },
      { id: 3, name: '상품3', stock: 15 },
      { id: 4, name: '상품4', stock: 30 },
      { id: 5, name: '상품5', stock: 5 },
      { id: 6, name: '상품6', stock: 25 },
      { id: 7, name: '상품7', stock: 12 },
      { id: 8, name: '상품8', stock: 18 },
      { id: 9, name: '상품9', stock: 14 },
    ];

    // data라는 배열을 inventoryData 상태에 저장
    setInventoryData(data);

    // data 배열을 순회하면서 stock 값이 10 미만인 항목만 필터링해 상태에 저장
    setLowStockItems(data.filter(item => item.stock < 10));
  };

  const updateStock = (id, newStock) => { // 특정 상품의 id와 newStock (새로운 재고 수량)을 매개변수로 받아 재고를 업데이트하는 함수

    // inventoryData 상태를 업데이트하는 함수로, 상태 업데이트를 위한 콜백 함수가 전달
    setInventoryData(prevData =>

      // map 함수는 prevData 배열을 순회하여 각 item에 대해 업데이트된 배열을 생성
      prevData.map(item =>

        // item.id === id가 참(true)이면 { ...item, stock: newStock }를 반환
        item.id === id ? { ...item, stock: newStock } : item
      )
    );

    // 함수의 인자로 전달된 콜백 함수는 현재의 저재고 품목 상태를 나타내는 prevLowStockItems를 받아옴
    setLowStockItems(prevLowStockItems =>

      // 현재 item의 id가 주어진 id와 다를 경우에만 true를 반환
      prevLowStockItems.filter(item => item.id !== id)
    );

    // 새 재고 값이 10 미만이면 저재고 목록에 추가
    if (newStock < 10) {

      // id와 일치하는 아이템을 찾기 위해 find 메서드를 사용
      // 조건을 만족하는 첫 번째 요소를 반환
      const updatedItem = inventoryData.find(item => item.id === id);

      // 이전의 저재고 품목을 모두 포함하고, 그 뒤에 새로운 아이템을 추가
      if (updatedItem) {
        setLowStockItems(prev => [...prev, { ...updatedItem, stock: newStock }]);
      }
    }
  };

  // handleFileUpload는 파일 업로드 시 호출되는 함수
  // event는 파일 업로드 이벤트 객체로, 사용자가 파일을 선택했을 때 발생
  const handleFileUpload = (event) => {


    // files 배열의 첫 번째 파일(즉, [0])을 선택해 setFile 함수에 전달
    setFile(event.target.files[0]);
  };

  const importData = () => {  // importData는 CSV 파일 데이터를 가져와서 컴포넌트 상태로 저장하는 함수

    // file이 없을 경우(null 또는 undefined), 함수를 종료하여 이후 코드가 실행되지 않도록 함
    if (!file) return;

    // CSV 파일을 JavaScript 객체 형식으로 변환
    Papa.parse(file, {

      // CSV 파일의 첫 번째 행을 헤더로 간주하여 각 열 이름을 자동으로 설정
      header: true,

      // 파싱이 완료되면 데이터가 자동으로 업데이트되어 사용 가능
      complete: (result) => setInventoryData(result.data),
    });
  };


  const headers = [  // CSV 파일의 열 정보를 저장하는 배열

    // label: CSV 파일의 열 이름으로 표시될 텍스트
    // key: 내보낼 데이터에서 특정 속성을 지정하기 위한 키
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Stock", key: "stock" },
  ];

  const handleInputChange = (e) => {  // 입력 값이 변경될 때 호출되는 함수

    // 이벤트 객체에서 name과 value를 구조 분해 할당으로 추출
    // name: 현재 입력 필드의 이름 속성
    // value: 사용자가 입력한 값
    const { name, value } = e.target;

    // ...prev: 기존 상태를 펼쳐서 복사
    // [name]: value: 현재 입력 필드의 name에 해당하는 값을 value로 동적으로 설정
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {  // 새로운 제품을 products 목록에 추가하는 함수

    // products 배열의 길이에 1을 더하여 새 제품이 추가될 때마다 고유한 ID 증가
    const id = products.length + 1;

    // 이전 products 배열에 새로운 제품 객체를 추가한 새로운 배열을 생성
    setProducts((prev) => [...prev, { id, ...newProduct }]);

    // 초기화는 폼을 리셋하거나 새로운 입력을 받을 준비를 할 때 유용하게 사용
    setNewProduct({
      name: '',
      category: '',
      description: '',
      price: '',
      stock: '',
      shippingCost: '',
      images: []
    });
  };

  const toggleProductAvailability = (id, isActive) => { // 제품의 고유 id와 새로운 활성 상태인 isActive를 인수로 받는 함수

    setInventoryData(prevData =>   // setInventoryData 함수를 호출하여 inventoryData 상태를 업데이트

      prevData.map(item =>  // map 메서드를 사용하여 prevData 배열의 각 항목에 대해 반복

        // id가 일치하면, item의 나머지 속성을 유지하면서 isActive 속성을 새로운 값으로 업데이트
        item.id === id ? { ...item, isActive } : item
      )
    );
  };

  return (
    <div className="space-y-6 p-8 bg-gray-100">
      <h1 className="text-xl font;-bold">재고 통계</h1>

      {lowStockItems.length > 0 && ( // lowStockItems 배열의 길이가 0보다 큰 경우에만 아래의 내용을 렌더링

        <div className=" p-3 bg-red-100 text-red-600 rounded-md">
          저재고 경고! 아래 상품들의 재고가 부족합니다:
          <ul>
            {lowStockItems.map(item => (  // lowStockItems 배열을 순회하여 각 아이템에 대해 li 요소 생성

              // 각 아이템의 이름과 재고 수량을 표시하는 li 요소
              <li key={item.id}>{item.name} - 재고: {item.stock}</li>

            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">재고 관리</h2>
        <div className='grid grid-cols-3 gap-4'>
          {inventoryData.map(item => (  // inventoryData 배열의 각 항목을 반복하며 UI 요소를 생성

            <div key={item.id} className="flex items-center space-x-4">
              <span>{item.name}</span>

              <input
                type="number"
                value={item.stock}
                onChange={(e) => updateStock(item.id, Number(e.target.value))} // updateStock 함수를 호출하여 사용자가 입력한 값을 업데이트
                className="border rounded p-1"
              />

              <button
                onClick={() => toggleProductAvailability(item.id, !item.isActive)}

                //  'bg-red-500'은 비활성 상태일 때, 'bg-green-500'은 활성 상태일 때 사용
                className={`px-2 py-1 ${item.isActive ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
              >

                {item.isActive ? '재고 없음' : '재고 있음'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">제품 추가</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
          <input type="text" name="name" placeholder="상품명" value={newProduct.name} onChange={handleInputChange} required className="border rounded p-1 mr-2" />
          <input type="text" name="category" placeholder="카테고리" value={newProduct.category} onChange={handleInputChange} required className="border rounded p-1 mr-2" />
          <input type="text" name="description" placeholder="설명" value={newProduct.description} onChange={handleInputChange} required className="border rounded p-1 mr-2" />
          <input type="number" name="price" placeholder="가격" value={newProduct.price} onChange={handleInputChange} required className="border rounded p-1 mr-2" />
          <input type="number" name="stock" placeholder="재고 수량" value={newProduct.stock} onChange={handleInputChange} required className="border rounded p-1 mr-2" />
          <input type="number" name="shippingCost" placeholder="배송비" value={newProduct.shippingCost} onChange={handleInputChange} required className="border rounded p-1 mr-2" />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">상품 추가</button>
        </form>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">재고 변동 추세</h2>
        <Bar data={mockStockTrends} options={{
          responsive: true,     // 차트를 반응형으로 만들어 화면 크기에 맞게 조정
          plugins: {
            legend: {
              position: 'top',  // 범례의 위치를 상단
            },
            title: {
              display: true,    // 제목을 표시하도록 설정
              text: '상품별 재고 변동 추세',
            },
          },
        }} />
      </div>

      <div className="mt-4">

        {/* CSV 파일로 데이터를 내보내는 링크를 생성 */}
        <CSVLink data={inventoryData} headers={headers} filename="inventory_data.csv">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">CSV 내보내기</button>
        </CSVLink>
      </div>

      {/*  CSV 파일을 업로드하고 가져오는 기능 */}
      <div className="mt-4">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button onClick={importData} className="px-4 py-2 bg-green-500 text-white rounded ml-2">
          CSV 가져오기
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">재고 분석 통계</h2>
        <div>
          <p>인기 상품 및 저조한 상품의 분석을 위한 데이터 통계 기능이 추가될 예정입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminInventoryComponent;
