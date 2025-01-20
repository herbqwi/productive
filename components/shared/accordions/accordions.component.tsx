import React, { useEffect, useState } from 'react';
import classes from './accordions.module.sass';
import Button from '../button/button.component';
import { CaretUp } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';

export interface IAccordionGroup {
  id: string;
  summary: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

interface IProps {
  groups: IAccordionGroup[];
  showArrow?: boolean;
}

export default function Accordions(props: IProps) {
  const [closedIds, setClosedIds] = useState<string[]>([]);

  const toggleClosed = (groupId: string) => {
    if (closedIds.includes(groupId)) {
      setClosedIds(prev => prev.filter(item => item !== groupId))
    } else {
      setClosedIds(prev => [...prev, groupId])
    }
  }

  return (
    <div className={classes.wrapper}>
      {props.groups.map(group => (
        <div
          key={group.id}
          className={clsx(classes.group, { [classes.expanded]: !closedIds.includes(group.id) })}
        >
          <Button
            className={classes.summary}
            onClick={() => toggleClosed(group.id)}
            variant='transparent'
          >
            <CaretUp size={14} weight='bold' />
            <>{group.summary}</>
          </Button>
          <div className={classes.children}>
            {group.children}
          </div>
        </div>
      ))}
    </div>
  )
}