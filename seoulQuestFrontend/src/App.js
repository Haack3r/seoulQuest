import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,  // 카테고리 스케일을 등록
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// 필요한 컴포넌트를 등록
ChartJS.register(
  CategoryScale,  // 여기서 카테고리 스케일을 등록
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    // flask API 에서 data 가져오기
    axios.get('http://localhost:5000/api/data')
      .then((res) => {
        const data = res.data
        const labels = data.map((item, index) => `Item${index}`)
        const values = data.map(item => item.text.length)
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'News HeadLine Length',
              data: values,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1
            }
          ]
        })
      }).catch(error => console.log(error))
  }, [])

  return (
    <div className="App">
      <h2>네이버 뉴스의 제목의 길이 그리기</h2>
      <Line data={chartData} />
    </div>
  );
}

export default App;