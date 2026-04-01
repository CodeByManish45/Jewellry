import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.5,
        ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
        duration: 0.4,
        ease: "easeIn",
    },
  }
};

export const AnimatedLayout = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full will-change-transform"
    >
      {children}
    </motion.div>
  );
};
