import './App.css';
import './style.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import { AuthContextProvider } from './AuthContext';
import Dashboard from './Pages/Dashboard';
import Personal from './Pages/Personal';
import Stock from './Pages/Stock';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/personal' element={<Personal />} />
          <Route path='/stock-price/:symbol' element={<Stock />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
