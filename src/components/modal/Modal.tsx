'use client';

import { ReactNode } from 'react';
import ModalPortal from './ModalPortal';
import { customTwMerge } from 'tailwind.config';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  title: ReactNode;
  description?: ReactNode;
}

const Modal = ({ children, isOpen, title, description, closeModal }: Props) => {
  return (
    <ModalPortal>
      <div
        onClick={closeModal}
        className={customTwMerge(
          'fixed bottom-0 left-0 right-0 top-0 z-[101] bg-black/50',
          !isOpen && 'hidden',
        )}
      >
        <section
          onClick={(e) => e.stopPropagation()}
          className='absolute left-1/2 top-1/2 w-full min-w-300 max-w-800 -translate-x-1/2 -translate-y-1/2 rounded-8 bg-white px-24 pb-16'
        >
          {title && <h2 className='pt-16 text-20 font-600'>{title}</h2>}
          {description && (
            <p className='text-14 text-grey-700'>{description}</p>
          )}
          <div className='max-h-[80dvh] overflow-y-auto pt-16'>{children}</div>
        </section>
      </div>
    </ModalPortal>
  );
};

export default Modal;
