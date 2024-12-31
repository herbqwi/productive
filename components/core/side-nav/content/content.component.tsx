import classes from './content.module.sass';
import { clsx } from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useSideNav } from '@/hooks/core';

import { Barbell, Calendar, FishSimple, Money, PersonSimpleBike, SunHorizon, Person, DotsThree, GearSix } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/shared';
import NewTask from './next-task-info/next-task-info.component';

const ROUTES = [
  {
    label: 'Dashboard',
    route: '/',
    icon: <SunHorizon size={18} weight='bold' />,
    suffix: 32
  },
  {
    label: 'Calendar',
    route: '/calendar',
    icon: <Calendar size={18} weight='bold' />
  },
  {
    label: 'Habit Tracker',
    route: '/habit-tracker',
    icon: <PersonSimpleBike size={18} weight='bold' />
  },
  {
    label: 'Food Tracker',
    route: '/food-tracker',
    icon: <FishSimple size={18} weight='bold' />
  },
  {
    label: 'Finance Tracker',
    route: '/finance-tracker',
    icon: <Money size={18} weight='bold' />
  },
  {
    label: 'Workout Tracker',
    route: '/workout-tracker',
    icon: <Barbell size={18} weight='bold' />
  }
]

const ACTIONS = [
  {
    label: 'Settings',
    route: '/settings',
    icon: <GearSix size={18} weight='bold' />
  },
  {
    label: 'John Doe',
    route: '/profile',
    icon: <Person size={18} weight='bold' />,
    suffix: <DotsThree size={18} weight='bold' />
  }
]

interface IProps {
  open: ReturnType<typeof useSideNav>['open'];
}

export default function Content(props: IProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={clsx(classes.wrapper, { [classes.closed]: !props.open.value })}>
      <div>
        {ROUTES.map(route => (
          <Button
            key={route.label}
            selected={route.route === pathname}
            onClick={() => router.push(route.route)}
            data-title={route.label}
            variant='outstanding'
            prefixIcon={route.icon}
            suffix={
              <div className={clsx(typeof route.suffix === 'number' && classes['number-suffix'])}>
                {route.suffix}
              </div>
            }
          >
            {route.label}
          </Button>
        ))}
      </div>
      <div>
        <NewTask {...props} />
        {ACTIONS.map(route => (
          <Button
            key={route.label}
            selected={route.route === pathname}
            onClick={() => router.push(route.route)}
            data-title={route.label}
            variant='outstanding'
            prefixIcon={route.icon}
            suffix={
              <div className={clsx(typeof route.suffix === 'number' && classes['number-suffix'])}>
                {route.suffix}
              </div>
            }
          >
            {route.label}
          </Button>
        ))}
      </div>
    </div>
  )
}