import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { formatCurrency } from '../utils/formatters';

interface AnimatedCounterProps {
  value: number;
  currency?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  currency,
  className = '',
  prefix = '',
  suffix = ''
}) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      const num = typeof latest === 'number' ? latest : parseFloat(latest);
      if (!isNaN(num)) setDisplayValue(Math.round(num));
    });
    return () => unsubscribe();
  }, [spring]);

  const formatted = currency
    ? formatCurrency(displayValue, currency)
    : displayValue.toLocaleString('id-ID');

  return (
    <motion.span
      className={`inline-block font-mono tracking-tight transition-transform ${className}`}
      key={value}
      initial={{ scale: 1.05, opacity: 0.9 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{formatted}{suffix}
    </motion.span>
  );
};
