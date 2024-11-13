import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './pages/Login';
import { Provider } from 'react-redux';
import { Dashboard } from './pages/Dashboard';
import store from './store/store.js'; 
function App() {


  return (
  <Provider store={store}>  {/* Aquí se envuelve toda la app */}
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='*' element={<Login />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
