import type { ButtonHTMLAttributes } from 'react';
import { customTwMerge } from 'tailwind.config';

export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'destructive';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}

const Button = ({
  children,
  size = 'large',
  variant = 'primary',
  className,
  ...rest
}: Props) => {
  return (
    <button
      className={customTwMerge(
        DEFAULT_STYLE,
        SIZE_STYLE[size],
        VARIANT_STYLE[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

const DEFAULT_STYLE =
  'flex items-center justify-center whitespace-nowrap break-keep rounded-6';

const SIZE_STYLE = {
  large: 'w-full h-[50px] text-16 font-600 grow',
  medium: 'w-[87px] h-[50px] text-16 font-600 shrink-0',
  small: 'w-[57px] h-[31px] text-12 font-600 shrink-0',
};

const VARIANT_STYLE = {
  primary:
    'bg-primary-500 text-white active:bg-primary-500 disabled:bg-primary-100',
  secondary:
    'bg-primary-50 text-primary-500 active:bg-primary-100 disabled:text-primary-200',
  tertiary:
    'bg-grey-100 text-grey-700 active:bg-grey-200 disabled:bg-grey-50 disabled:text-grey-300',
  destructive: 'bg-red-400 text-white active:bg-red-500 disabled:bg-red-200',
};
