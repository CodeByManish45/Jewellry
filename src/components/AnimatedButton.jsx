import { motion } from 'framer-motion';

export const AnimatedButton = ({ 
  children, 
  onClick, 
  type = "button", 
  className = "", 
  disabled = false,
  ...props 
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
