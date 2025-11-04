import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { WebRouter } from './router';
import { AuthProvider } from './contexts';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <WebRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
