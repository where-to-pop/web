'use client';

import type { MouseEventHandler } from 'react';
import { customTwMerge } from 'tailwind.config';

interface Props<T> {
  items: TabItem<T>[];
  selected: T;
  onSelect?: (value: T) => void;
  disabled?: boolean;
  className?: string;
}

const Tabs = <T,>({
  items,
  selected,
  onSelect,
  disabled,
  className,
}: Props<T>) => {
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
          disabled={disabled}
        />
      ))}
      <div className='absolute bottom-0 h-[1px] w-full bg-grey-200' />
      <div
        className={customTwMerge(
          'absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out',
          disabled && 'bg-transparent',
        )}
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

interface TabProps {
  label: string;
  selected: boolean;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}

const Tab = ({ label, selected, onClick, disabled }: TabProps) => {
  return (
    <button
      className={customTwMerge(
        'flex-1 whitespace-nowrap p-8 text-14 font-500 text-grey-500 transition-all duration-100 ease-in-out',
        selected && 'font-600 text-black',
        disabled && 'text-grey-400',
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
