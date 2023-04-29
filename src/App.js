import './App.css';
import './style.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import { AuthContextProvider } from './AuthContext';
import Dashboard from './Pages/Dashboard';
import Personal from './Pages/Personal';
import Stock from './Pages/Stock';
import ProtectedRoute from './Components/ProtectedRoute';
import WatchList from './Pages/WatchList';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Routes>
          <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path='/watchlist' element={<ProtectedRoute element={<WatchList />} />} />
          <Route path='/personal' element={<ProtectedRoute element={<Personal />} />} />
          <Route path='/stock-price/:symbol' element={<ProtectedRoute element={<Stock />} />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
