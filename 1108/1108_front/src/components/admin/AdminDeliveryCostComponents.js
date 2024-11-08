import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,    // 선형 스케일을 가져옵니다. Y축을 위한 스케일
  PointElement,   // 차트의 포인트 (데이터 점)를 렌더링하는 요소
  LineElement,    // 선 차트를 그리는 요소
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// 필요할 때마다 각 요소를 등록할 필요 없이, 한 번에 필요한 모든 구성 요소를 설정
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

window.addEventListener('resize', function () {
  console.log("변경");
  window.location.reload();
});

const AdminDeliveryCostComponent = () => {

  // API 호출이나 기타 방법을 통해 받아온 배달 서비스의 정보를 저장
  const [deliveryServices, setDeliveryServices] = useState([]);

  // 검색어는 배달 서비스를 필터링하는 데 사용
  const [searchTerm, setSearchTerm] = useState('');

  // 새 서비스를 추가할 때 사용자 입력에 따라 이 값을 변경
  const [newService, setNewService] = useState({
    provider: '',
    cost: '',
    duration: '',
    description: '',
  });

  // 초기값으로 false가 설정되어 있어, 컴포넌트가 처음 렌더링될 때 모달 창이 닫혀 있는 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 초기값으로 null이 설정되어 있어, 편집할 서비스가 선택되지 않았음을 나타냄
  const [editingService, setEditingService] = useState(null);

  // 입력된 문자열에서 모든 쉼표가 제거된 새로운 문자열을 반환하는 함수
  const removeCommas = (str) => str.replace(/,/g, '');

  // 입력된 숫자에 대해 천 단위 쉼표가 추가된 새로운 문자열을 반환하는 함수
  const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  useEffect(() => {

    // 두 개의 배송 서비스 정보를 포함하는 객체 배열(mockData)을 정의
    const mockData = [
      { id: 1, provider: 'FedEx', cost: 15000, duration: '2-3일', description: '일반 배송' },
      { id: 2, provider: 'DHL', cost: 25000, duration: '1-2일', description: '특급 배송' },
      { id: 3, provider: 'UPS', cost: 35000, duration: '3일', description: '당일 배송' },
      { id: 3, provider: 'TNT Express', cost: 40000, duration: '7일', description: '특수 배송' },
    ];
    setDeliveryServices(mockData);
  }, []);

  // 새로운 배송 서비스를 추가하는 역할하는 함수
  const handleAddService = (e) => {

    e.preventDefault(); // 폼이 제출될 때 브라우저가 페이지를 새로고침하는 동작을 방지

    // deliveryServices 배열에 있는 글자 수에 1을 더하여 새로운 서비스의 고유 ID를 생성
    const newId = deliveryServices.length + 1;

    // newService 객체의 모든 속성을 복사하여 새로운 객체 serviceToAdd를 생성, 생성된 새로운 ID(newId)를 추가
    const serviceToAdd = { ...newService, id: newId };

    setDeliveryServices([...deliveryServices, serviceToAdd]);

    //  빈 문자열로 설정하여 사용자가 새로운 서비스를 추가할 때 이전 입력값이 남지 않도록함
    setNewService({ provider: '', cost: '', duration: '', description: '' });
  };

  //  특정 배송 서비스의 정보를 수정하기 위한 함수
  const handleEditService = (id) => {

    // deliveryServices라는 배열에서 find 메소드를 사용하여 주어진 id와 일치하는 서비스 객체를 검색
    const serviceToEdit = deliveryServices.find(service => service.id === id);

    setEditingService(serviceToEdit);
    setIsEditModalOpen(true);
  };

  // 편집된 배송 서비스의 정보를 제출하기 위해 호출되는 함수
  const handleUpdateService = (e) => {

    e.preventDefault(); //  폼이 제출될 때 발생하는 페이지 새로고침을 방지
    const updatedServices = deliveryServices.map(service =>

      // 현재 서비스의 ID가 editingService의 ID와 일치하는 경우, 해당 서비스 객체를 editingService로 교체
      // 그렇지 않은 경우, 원래의 서비스 객체를 그대로 반환
      service.id === editingService.id ? editingService : service
    );
    setDeliveryServices(updatedServices);
    setIsEditModalOpen(false);  // 서비스를 성공적으로 업데이트한 후 편집 모달을 닫기 위한 것
    setEditingService(null);  // 편집 중인 서비스 정보를 초기화하여, 다음 번 편집 시 이전의 편집 상태가 남지 않도록함
  };

  // 특정 배송 서비스를 삭제하는 함수
  const handleDeleteService = (id) => {

    // service 객체의 id가 삭제하려는 id와 일치하지 않는 항목만 남김
    // 즉, 조건이 true인 항목만 포함하므로, service.id가 id와 같은 항목은 제거
    setDeliveryServices(deliveryServices.filter(service => service.id !== id));
  };

  const handleCostChange = (e, setFunction, currentValue) => {

    // 입력한 값(e.target.value)에서 쉼표를 제거하여 value 변수에 저장
    const value = removeCommas(e.target.value);

    // 조건문에서 value가 빈 문자열('')이거나 숫자만으로 구성된 경우에만 실행
    // /^\d*$/는 숫자로만 구성된 문자열을 의미
    if (value === '' || /^\d*$/.test(value)) {

      // 현재 객체 속성을 모두 유지하되, cost 속성만 새 value로 덮어씀
      // 실시간으로 반영하면서 다른 속성 값은 그대로 유지
      setFunction({
        ...currentValue,
        cost: value
      });
    }
  };

  // deliveryServices 배열에 대해 filter 메서드를 사용하여 조건을 만족하는 항목만 걸러냄
  const filteredServices = deliveryServices.filter(service =>

    // service.provider 값을 소문자로 변환 (대소문자를 구분하지 않고 검색어와 비교하기 위해)
    service.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">배송 비용 관리</h1>

      <input
        type="text"
        placeholder="배송 서비스 검색"
        className="p-2 border rounded mb-6 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 이벤트가 발생하며 setSearchTerm 함수를 통해 searchTerm 상태를 업데이트
      />

      <form onSubmit={handleAddService} className="mb-8 p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-semibold mb-4">새로운 배송 서비스 추가</h2>

        {/* 두 개의 열을 설정해 각 입력 필드가 한 행의 절반을 차지 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="서비스 제공업체"
            className="p-2 border rounded"
            value={newService.provider}
            onChange={(e) => setNewService({ ...newService, provider: e.target.value })}
            required  // 이 필드는 필수 입력 필드
          />
          <input
            type="text"
            placeholder="배송비"
            className="p-2 border rounded"

            // newService.cost 값이 존재하면 addCommas 함수를 사용해 쉼표를 추가한 문자열을 입력
            // 값이 없으면 빈 문자열을 ''으로 설정하여 아무 값도 표시되지 않음
            value={newService.cost ? addCommas(newService.cost) : ''}

            onChange={(e) => handleCostChange(e, setNewService, newService)}
            required
          />
          <input
            type="text"
            placeholder="배송 기간"
            className="p-2 border rounded"
            value={newService.duration}
            onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="설명"
            className="p-2 border rounded"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          />

        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          추가하기
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-center">제공업체</th>
              <th className="px-6 py-3 text-center">배송비</th>
              <th className="px-6 py-3 text-center">배송 기간</th>
              <th className="px-6 py-3 text-center">설명</th>
              <th className="px-6 py-3 text-center">작업</th>
            </tr>
          </thead>
          <tbody>

            {/* 서비스 목록을 포함하는 배열에서 각 서비스 항목을 반복 */}
            {filteredServices.map((service) => (

              <tr key={service.id} className="border-b text-center">
                <td className="px-6 py-4">{service.provider}</td>
                <td className="px-6 py-4">{addCommas(service.cost)}원</td>
                <td className="px-6 py-4">{service.duration}</td>
                <td className="px-6 py-4">{service.description}</td>
                <td className="px-6 py-4">

                  <button
                    onClick={() => handleEditService(service.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2">
                    수정
                  </button>

                  <button onClick={() => handleDeleteService(service.id)}
                    className="text-red-500 hover:text-red-700">
                    삭제
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 w-full">
        <h2 className="text-xl font-semibold mb-4">월별 평균 배송 비용 추이</h2>

        {/* Grid Layout을 사용하여 두 열의 레이아웃을 만듦 */}
        <div className='grid grid-cols-2 gap-4'>

          <div className="bg-white p-4 rounded shadow">
            <Line
              data={{
                labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
                datasets: [{
                  label: '평균 배송 비용',
                  data: [15000, 16000, 15500, 16500, 17000, 18800],
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0,
                  fill: false,
                  pointBackgroundColor: 'rgb(75, 192, 192)',
                  pointRadius: 4  // 데이터 포인트(점)의 크기
                }]
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: false, //  y축의 시작점을 0이 아닌 다른 값으로 설정
                    min: 14000,
                    max: 22000,
                    ticks: {
                      stepSize: 1000,   // 눈금 간격
                      callback: function (value) {

                        // toLocaleString() 메서드를 사용하여 천 단위 구분 기호를 추가
                        return value.toLocaleString() + '원';
                      }
                    }
                  }
                },
                maintainAspectRatio: true,  // 차트가 화면 크기에 맞게 비율을 유지
                aspectRatio: 2,             // 차트의 가로와 세로 비율
                plugins: {
                  title: {
                    display: true,
                    text: '상반기 평균 배송비용',
                    font: { size: 16 }
                  }
                }
              }}
            />
          </div>

          <div className='bg-white p-4 rounded shadow'>
            <Line
              data={{
                labels: ['7월', '8월', '9월', '10월', '11월', '12월'],
                datasets: [{
                  label: '평균 배송 비용',
                  data: [18000, 15500, 19000, 20000, 20500, 21000],
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0,
                  fill: false,
                  pointBackgroundColor: 'rgb(75, 192, 192)',
                  pointRadius: 4
                }]
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 14000,
                    max: 22000,
                    ticks: {
                      stepSize: 1000,
                      callback: function (value) {
                        return value.toLocaleString() + '원';
                      }
                    }
                  }
                },
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                  title: {
                    display: true,
                    text: '하반기 평균 배송비용',
                    font: { size: 16 }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* isEditModalOpen이 true일 때만 모달이 화면에 표시 */}
      {isEditModalOpen && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">배송 서비스 수정</h2>
            <form onSubmit={handleUpdateService}>
              <div className="space-y-4">
                {['provider', 'cost', 'duration', 'description'].map((field) => (
                  <div key={field}>

                    <label className="block text-sm font-medium text-gray-700">
                      {field === 'provider' ? '서비스 제공업체' :
                        field === 'cost' ? '배송비' :
                          field === 'duration' ? '배송 기간' : '설명'}
                    </label>

                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border p-2"

                      // cost 필드인 경우 addCommas 함수로 숫자에 쉼표를 추가
                      // 그 외의 필드에서는 editingService[field] 값을 그대로 사용
                      value={field === 'cost' ? addCommas(editingService[field]) : editingService[field]}

                      onChange={(e) => field === 'cost'
                        ? handleCostChange(e, setEditingService, editingService)
                        : setEditingService({ ...editingService, [field]: e.target.value })
                      }
                      required={field !== 'description'}  // description 필드만 필수 입력이 아니고, 나머지 필드는 필수
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
                  취소
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  저장
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDeliveryCostComponent;