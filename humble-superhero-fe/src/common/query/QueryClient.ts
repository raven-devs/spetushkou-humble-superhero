import { QueryClient as ReactQueryCient } from '@tanstack/react-query';
import { Config } from '../config/Config';

export const QueryClient = new ReactQueryCient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: Config.get('VITE_NODE_ENV') !== 'development', // true for prod and false for dev
      refetchOnReconnect: true,
    },
  },
});
