import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variants?: any;
}

const Card = ({ title, children, className = '', variants }: CardProps) => {
  return (
    <motion.div
      variants={variants}
      className={`bg-gradient-to-br from-[#1f1a2e] to-[#131218] border border-gray-700 shadow-xl rounded-2xl p-8 ${className}`}
    >
      {title && <h3 className="text-xl font-bold mb-2 text-center uppercase">{title}</h3>}
      <div className="text-gray-300 text-sm space-y-2">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;