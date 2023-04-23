import './App.css';
import './style.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import { AuthContextProvider } from './AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
