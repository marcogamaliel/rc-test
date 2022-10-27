import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import AppRouter from './pages/app.router'

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
       <QueryClientProvider client={queryClient}>
        <AppRouter />
    </QueryClientProvider>
    </div>
  );
}

export default App;
