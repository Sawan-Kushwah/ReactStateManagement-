
import { Suspense, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import { getUserData, setCurrentUser } from './redux/authSlice';
function App() {

  const loginStatus = useSelector(getUserData)
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus.userData) {
      dispatch(setCurrentUser())
    }
  }, [])

  return (
    <div >
      <Header />
      <Suspense fallback={<h1 className='text-green-600'>Page Loading......</h1>}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
