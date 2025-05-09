'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { customTwMerge } from 'tailwind.config';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children?: ReactNode;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
}

const TextInput = <T extends FieldValues>({
  children,
  placeholder,
  type = 'text',
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController({
    ...controls,
  });

  return (
    <div className='relative flex w-full flex-col gap-8'>
      {children && (
        <label htmlFor={field.name} className='block h-20 text-14 font-400'>
          {children}
        </label>
      )}
      <input
        id={field.name}
        placeholder={placeholder}
        type={type}
        {...field}
        className={customTwMerge(
          'h-48 w-full border-b border-grey-200 bg-transparent p-12 pr-44 text-16 font-400 outline-none placeholder:text-grey-400',
          fieldState?.error ? 'border-red' : 'focus:border-primary-500',
        )}
      />
      {fieldState?.error?.message && (
        <p className='h-[20px] text-12 font-400 text-red'>
          {fieldState?.error?.message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
