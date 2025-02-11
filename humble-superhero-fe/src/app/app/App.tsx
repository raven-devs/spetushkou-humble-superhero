import { ExceptionHandler } from '../../common/exception/ExceptionHandler';
import { QueryProvider } from '../../common/query/QueryProvider';
import { Layout } from '../layout/Layout';

export function App() {
  return (
    <ExceptionHandler>
      <QueryProvider>
        <Layout />
      </QueryProvider>
    </ExceptionHandler>
  );
}
