import { motion } from 'framer-motion';

const curtainVariants = {
  initial: {
    x: "-100%",
  },
  animate: {
    x: ["-100%", "0%", "100%"],
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const CurtainEffect = () => {
  return (
    <motion.div
      variants={curtainVariants}
      initial="initial"
      animate="animate"
      className="fixed inset-0 bg-slate-900 z-100 pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
};
