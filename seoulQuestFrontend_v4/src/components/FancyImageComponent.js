import { motion } from "framer-motion";

const FancyImageComponent = () => (
  <motion.img
    src="https://i.pinimg.com/564x/af/28/7f/af287f99f3ee6e15fa3f3c027bf210cb.jpg" // 사용할 이미지 경로로 변경
    alt="Fancy Image"
    animate={{
      scale: [1, 1.5, 1], // 크기 변화
      rotate: [0, 360, 0], // 회전
      opacity: [1, 0.5, 1], // 투명도 변화
    }}
    transition={{
      duration: 3, // 전체 애니메이션 지속 시간 (초)
      ease: "easeInOut", // 애니메이션 스타일
      repeat: Infinity, // 애니메이션 무한 반복
    }}
    style={{ width: "150px", height: "150px", borderRadius: "20px" }} // 이미지 스타일
  />
);

export default FancyImageComponent;
