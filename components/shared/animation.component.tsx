import { IAnimationProps } from '@/@types/animation.types';
import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

interface IProps {
  children: React.ReactNode;
  animationProps: IAnimationProps;
}

const Animation = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  return (
    <motion.div ref={ref} {...props.animationProps}>
      {props.children}
    </motion.div>
  );
});

Animation.displayName = 'Animation';

export default Animation;
