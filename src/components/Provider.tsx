import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ToastContainer from './toast/ToastContainer';

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Provider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Provider;
