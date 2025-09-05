import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from './ThemeProvider'
import { useEffect, useState, useRef } from 'react'

export default function NavBar() {
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const navRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState<{ left: number; width: number }>({ left: 0, width: 0 })
  const [bump, setBump] = useState(false)

  useEffect(() => {
    function measure() {
      const nav = navRef.current
      if (!nav) return
      const active = nav.querySelector('a.active') as HTMLElement | null
      if (!active) return
  const navRect = nav.getBoundingClientRect()
  const linkRect = active.getBoundingClientRect()
  const left = linkRect.left - navRect.left
  const width = linkRect.width
  setPos({ left, width })
      setBump(false)
      // trigger small jiggle
      requestAnimationFrame(() => setBump(true))
      window.setTimeout(() => setBump(false), 300)
    }
    measure()
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [location])
  return (
    <header className="navbar">
      <div className="container nav-content">
        <Link to="/" className="brand">Doug Sellers</Link>
        <nav className="nav-links" ref={navRef}>
          <NavLink to="/" end className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined}>Contact</NavLink>
          <span className="nav-indicator" style={{ transform: `translateX(${pos.left}px)` }}>
            <span className={`nav-indicator-inner${bump ? ' bump' : ''}`} style={{ width: pos.width }} />
          </span>
        </nav>
        <button
          aria-label="Toggle theme"
          className={`theme-toggle ${theme}`}
          onClick={toggle}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <span className="icon sun" aria-hidden="true">☀️</span>
          <span className="icon moon" aria-hidden="true">🌙</span>
        </button>
      </div>
    </header>
  )
}
