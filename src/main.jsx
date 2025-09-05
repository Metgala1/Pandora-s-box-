import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes.jsx'
import { AuthProvider } from './authContext/AuthContext.jsx'
import { FileProvider } from './fileContext/FileContext.jsx'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FileProvider>
      <RouterProvider router={router}>
        
       <App />
       
      </RouterProvider>
      </FileProvider>
    </AuthProvider>
  </StrictMode>,
)
