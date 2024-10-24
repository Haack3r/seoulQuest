import { motion } from "framer-motion";

const MyImageComponent = () => (
  <motion.img
    src="https://i.pinimg.com/564x/af/28/7f/af287f99f3ee6e15fa3f3c027bf210cb.jpg" // Replace this with the actual image URL or local path
    alt="sample"
    animate={{ x: 200 }} // Moves 200px along the x-axis
    transition={{ duration: 2 }} // Movement lasts for 2 seconds
    style={{ width: "150px", height: "150px" }} // Adjust the image size
  />
);

export default MyImageComponent;
