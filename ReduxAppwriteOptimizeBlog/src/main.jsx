import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home } from './pages'
import { AuthLayout } from './components'

const Post = lazy(() => import('./pages/Post.jsx'))
const AddPost = lazy(() => import('./pages/AddPost.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Signup = lazy(() => import('./pages/Signup.jsx'))
const EditPost = lazy(() => import('./pages/EditPost.jsx'))
const Allpost = lazy(() => import('./pages/Allpost.jsx'))

// const wait = (ms) => new Promise(res => setTimeout(res, ms));

// const Allpost = lazy(() =>
//   wait(5000).then(() => import('./pages/Allpost.jsx'))
// );


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path='' element={
        <AuthLayout authentication={false}>
          <Home />
        </AuthLayout>
      } />

      <Route path='/login' element={
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      } />

      <Route path='/signup' element={
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      } />

      <Route path='/add-post' element={
        <AuthLayout authentication={true}>
          <AddPost />
        </AuthLayout>
      } />

      <Route path='/all-posts' element={
        <AuthLayout authentication={true}>
          <Allpost />
        </AuthLayout>
      } />

      <Route path='/edit-post/:slug/:id' element={
        <AuthLayout authentication={true}>
          <EditPost />
        </AuthLayout>
      } />

      <Route path='/post/:slug/:id' element={
        <AuthLayout authentication={true}>
          <Post />
        </AuthLayout>
      } />

      <Route path='*' element={<div>404 Not Found</div>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
