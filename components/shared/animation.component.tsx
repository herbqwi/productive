import { IAnimationProps } from '@/@types/animation.types';
import { motion, MotionProps } from 'framer-motion';
import React, { forwardRef } from 'react';

interface IProps extends MotionProps {
  children: React.ReactNode;
  animationProps: IAnimationProps;
}

export default function Animation({ children, animationProps, ...divProps }: IProps) {
  return (
    <motion.div {...divProps} {...animationProps}>
      {children}
    </motion.div>
  );
};