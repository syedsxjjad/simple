import { Routers } from '@/routes/index';
import { BrowserRouter } from 'react-router-dom';
import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ToastPositions } from './types/toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
    mutations: {
      retry: false,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routers />
        <Toaster
          position={ToastPositions.TOP_CENTER}
          toastOptions={{
            style: {
              background: 'var(--color-primary)',
              color: 'var(--color-placeholder)',
            },
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
