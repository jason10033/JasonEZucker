import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Research from './pages/Research.jsx'
import Clinical from './pages/Clinical.jsx'
import Administration from './pages/Administration.jsx'
import Publications from './pages/Publications.jsx'
import Informatics from './pages/Informatics.jsx'
import Education from './pages/Education.jsx'
import Press from './pages/Press.jsx'
import Leadership from './pages/Leadership.jsx'
import Private from './pages/Private.jsx'
import NotFound from './pages/NotFound.jsx'
import ComingSoon from './pages/ComingSoon.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<ComingSoon title="Research" />} />
          <Route path="/clinical" element={<ComingSoon title="Clinical Care" />} />
          <Route path="/administration" element={<ComingSoon title="Administration" />} />
          <Route path="/publications" element={<ComingSoon title="Publications" />} />
          <Route path="/informatics" element={<ComingSoon title="Informatics" />} />
          <Route path="/education" element={<ComingSoon title="Education" />} />
          <Route path="/press" element={<ComingSoon title="Press" />} />
          <Route path="/leadership" element={<ComingSoon title="Leadership" />} />
          <Route path="/private" element={<ComingSoon title="Private" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
