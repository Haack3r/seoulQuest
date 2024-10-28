import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import GIF from 'gif.js';  // 'gif.js.optimized' 대신 'gif.js' 사용
import 'chart.js/auto';  // 필요 시 유지

export default function App() {
  const [functionType, setFunctionType] = useState("sin"); // sin, cos, x^2, or x^3
  const [frequency, setFrequency] = useState(1); // 주파수
  const [gifData, setGifData] = useState(null); // GIF 데이터를 저장
  const chartRef = useRef(null);

  const generateData = (freq) => {
    const dataPoints = [];
    for (let i = -360; i <= 360; i += 10) { // x 값 범위를 -360에서 360까지로 변경
      const radians = (i * Math.PI) / 180;
      let y;

      // 함수 유형에 따라 y 값을 계산
      switch (functionType) {
        case "sin":
          y = Math.sin(radians * freq);
          break;
        case "cos":
          y = Math.cos(radians * freq);
          break;
        case "x^2":
          y = Math.pow(i, 2) / 36000; // 정규화하여 그래프에 맞춤
          break;
        case "x^3":
          y = Math.pow(i, 3) / 21600000; // 정규화하여 그래프에 맞춤
          break;
        default:
          y = 0;
      }
      
      dataPoints.push({ x: i, y });
    }
    return dataPoints;
  };

  const generateDerivativeData = (freq) => {
    const dataPoints = [];
    for (let i = -360; i <= 360; i += 10) { // x 값 범위를 -360에서 360까지로 변경
      let y;

      // 도함수 유형에 따라 y 값을 계산
      switch (functionType) {
        case "sin":
          y = Math.cos((i * Math.PI) / 180 * freq); // sin의 도함수는 cos
          break;
        case "cos":
          y = -Math.sin((i * Math.PI) / 180 * freq); // cos의 도함수는 -sin
          break;
        case "x^2":
          y = 2 * i / 180; // x^2의 도함수는 2x
          break;
        case "x^3":
          y = 3 * Math.pow(i, 2) / 180; // x^3의 도함수는 3x^2
          break;
        default:
          y = 0;
      }
      
      dataPoints.push({ x: i, y });
    }
    return dataPoints;
  };

  const chartData = {
    datasets: [
      {
        label: `${functionType} wave`,
        data: generateData(frequency),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const derivativeChartData = {
    datasets: [
      {
        label: `Derivative of ${functionType}`,
        data: generateDerivativeData(frequency),
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: { type: 'linear', min: -360, max: 360, ticks: { stepSize: 60 } }, // x 축 범위를 -360에서 360으로 조정
      y: { min: -1, max: 1 },
    },
  };

  const derivativeChartOptions = {
    scales: {
      x: { type: 'linear', min: -360, max: 360, ticks: { stepSize: 60 } }, // x 축 범위를 -360에서 360으로 조정
      y: { min: -2, max: 2 }, // Adjusted limits for the derivative chart
    },
  };

  // GIF 생성 함수
  const createGif = () => {
    const gif = new GIF({
      workers: 2,
      quality: 10,
    });

    const canvas = chartRef.current.canvas;

    for (let f = 1; f <= 5; f++) {
      setFrequency(f); // 주파수 변경
      gif.addFrame(canvas, { delay: 200 });
    }

    gif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      setGifData(url);  // 생성된 GIF를 URL로 저장
    });

    gif.render();
  };

  return (
    <div style={{ display: "flex", gap: "40px" }}>
      <div>
        <h2>Choose Function and Frequency</h2>

        {/* 함수 선택 드롭다운 */}
        <label>
          Function:
          <select value={functionType} onChange={(e) => setFunctionType(e.target.value)}>
            <option value="sin">Sin</option>
            <option value="cos">Cos</option>
            <option value="x^2">x²</option>
            <option value="x^3">x³</option> {/* New option for x³ */}
          </select>
        </label>

        {/* 주파수 설정 슬라이더 */}
        <label>
          Frequency: {frequency}
          <input
            type="range"
            min="1"
            max="5"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
          />
        </label>

        {/* 차트 */}
        <div style={{ width: 600, height: 400 }}>
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>

        {/* GIF 생성 버튼 */}
        <button onClick={createGif}>Create GIF</button>

        {/* GIF 출력 */}
        {gifData && <img src={gifData} alt="Generated GIF" />}
      </div>

      {/* 도함수 차트 */}
      <div>
        <h2>Derivative Function</h2>
        <div style={{ width: 600, height: 400 }}>
          <Line data={derivativeChartData} options={derivativeChartOptions} />
        </div>
      </div>
    </div>
  );
}
