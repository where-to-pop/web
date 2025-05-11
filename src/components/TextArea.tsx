import { ReactNode } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { customTwMerge } from 'tailwind.config';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children?: ReactNode;
  placeholder?: string;
}

const TextArea = <T extends FieldValues>({
  children,
  placeholder,
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController({
    ...controls,
  });

  return (
    <div className='flex w-full flex-col gap-4'>
      {children && (
        <label htmlFor={field.name} className='block h-20 text-14 font-400'>
          {children}
        </label>
      )}
      <textarea
        {...field}
        placeholder={placeholder}
        className={customTwMerge(
          'h-160 rounded-12 border border-grey-200 p-12 text-16 font-500 outline-none placeholder:text-grey-400 disabled:text-grey-300',
          fieldState?.error
            ? 'border-red-500'
            : 'focus:border-brand-primary-100',
        )}
      />
      {fieldState?.error?.message && (
        <div className='h-[20px] pl-12 text-12 font-400 text-red'>
          {fieldState?.error?.message}
        </div>
      )}
    </div>
  );
};

export default TextArea;
