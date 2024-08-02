import React from 'react'
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
// import Index from './routes'
// import Favorites from './routes/favorites'

const IndexPage = lazy(() => import("./routes"))
const FavoritesPage = lazy(() => import("./routes/favorites"))

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback="Cargando...">
          <IndexPage />
        </Suspense>
      },
      {
        path: "/favorites",
        element: <Suspense fallback="Cargando...">
          <FavoritesPage />
        </Suspense>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
