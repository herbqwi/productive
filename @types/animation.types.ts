import { Inertia, Keyframes, None, Orchestration, Repeat, Spring, Target, Tween } from "framer-motion";

type PermissiveTransitionDefinition = {
  [key: string]: any;
};

type TransitionDefinition = Tween | Spring | Keyframes | Inertia | None | PermissiveTransitionDefinition;
type TransitionMap = Orchestration & TransitionDefinition & {
  [key: string]: TransitionDefinition;
};

type IAnimation = Target;

type ITransition = (Orchestration & Repeat & TransitionDefinition) | (Orchestration & Repeat & TransitionMap);

export type IAnimationProps = {
  initial?: IAnimation;
  animate?: IAnimation;
  exit?: IAnimation;
  transition?: ITransition;
}