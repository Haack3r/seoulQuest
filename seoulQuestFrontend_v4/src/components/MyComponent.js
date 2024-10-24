import { motion } from 'framer-motion';

const MyComponent = () => (
  <motion.div
    animate={{ x: 100 }}
    transition={{ duration: 1 }}
  >
    Animate me
  </motion.div>
);

export default MyComponent;
