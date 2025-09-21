import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import DetailPage from './pages/DetailPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/detail/:type/:id' element={<DetailPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
