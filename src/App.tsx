import './App.css';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query'
import AppRouter from './application/pages/app.router'

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <AppRouter />
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
}

export default App;
