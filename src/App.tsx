import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import { ThemeProvider } from './components/ThemeProvider'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
