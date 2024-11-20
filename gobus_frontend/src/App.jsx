import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import { Login } from './pages/Login';
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from './pages/Dashboard';
import store from './store/store.js'; 

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
  <Provider store={store}>  {/* Aquí se envuelve toda la app */}
    <BrowserRouter future={{
    v7_startTransition: true,
    }}>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route
      path='/dashboard'
      element={<ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>}>
      </Route>
      <Route path='*' element={<Login />} />
    </Routes>
    </BrowserRouter>
    <ToastContainer />
    </Provider>
  )
}

export default App
