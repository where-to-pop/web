'use client';

import type { MouseEventHandler } from 'react';
import { customTwMerge } from 'tailwind.config';

interface Props<T> {
  items: TabItem<T>[];
  selected: T;
  onSelect?: (value: T) => void;
  className?: string;
}

const Tabs = <T,>({ items, selected, onSelect, className }: Props<T>) => {
  return (
    <div
      className={customTwMerge(
        'scrollbar-hidden relative flex w-full flex-row overflow-x-auto bg-transparent',
        className,
      )}
    >
      {items.flatMap((v) => (
        <Tab
          key={v.label}
          label={v.label}
          selected={v.value === selected}
          onClick={() => onSelect?.(v.value)}
        />
      ))}
      <div className='absolute bottom-0 h-[1px] w-full bg-grey-200' />
      <div
        className='absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out'
        style={{
          left: `${items.findIndex((item) => item.value === selected) * (100 / items.length)}%`,
          width: `${100 / items.length}%`,
        }}
      />
    </div>
  );
};

export default Tabs;

interface TabItem<T> {
  label: string;
  value: T;
}

const Tab = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button
      className={customTwMerge(
        'flex-1 whitespace-nowrap p-8 text-14 font-500 text-grey-500 transition-all duration-100 ease-in-out',
        selected && 'font-600 text-black',
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
