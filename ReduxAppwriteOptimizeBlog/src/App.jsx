
import { Suspense, useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import authservice from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
function App() {

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice.getCurrentUser().
      then((userData) => (userData === undefined ? console.log("no user found") : dispatch(login(userData))))
      .catch(err => console.log("App jsx :: error ", err))
      .finally(() => setloading(false));
  }, [])

  return !loading ? (
    <div >
      <Header />
      <Suspense fallback={<h1 className='text-green-600'>Page Loading......</h1>}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  ) : null
}

export default App
