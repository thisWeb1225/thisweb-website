'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NumberTextPropsType {
  value: number;
  isInView: boolean;
}

const NumberText: React.FC<NumberTextPropsType> = ({ value, isInView }) => {
  const translatePercent =
    value === 0 ? '0%' : `-${((100 / (value + 1)) * value).toFixed(2)}%`;

  return (
    <span>
      <motion.span
        className={`flex flex-col-reverse`}
        animate={{ y: `${isInView ? '0%' : translatePercent}` }}
        initial={{ y: translatePercent }}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 100,
          restDelta: 0.01,
        }}
      >
        {Array.from({ length: value + 1 }).map((_, index) => (
          <span>{index}</span>
        ))}
      </motion.span>
    </span>
  );
};

export default function NumberCounter({
  value,
  direction = 'up',
  className = '',
}: {
  value: number;
  direction?: 'up' | 'down';
  className?: React.HTMLAttributes<HTMLElement>['className'];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const valueArr = value
    .toString()
    .split('')
    .map((v) => Number(v));

  return (
    <p
      ref={ref}
      className={cn('flex overflow-hidden h-[1em] leading-[1]', className)}
    >
      {valueArr.map((v) => (
        <NumberText value={v} isInView={isInView} />
      ))}
    </p>
  );
}
