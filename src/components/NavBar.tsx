import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from './ThemeProvider'
import { useEffect, useState, useRef } from 'react'
import GitHubIcon from '../assets/github.svg'
import LinkedInIcon from '../assets/linkedin.svg'
import { IconFileTypePdf } from '@tabler/icons-react'
import profilePhoto from '../assets/profile-photo.svg'
import './NavBar.css'

export default function NavBar() {
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const navRef = useRef<HTMLDivElement | null>(null)
  const actionsRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState<{ left: number; width: number }>({ left: 0, width: 0 })
  const [bump, setBump] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node
      if (!actionsRef.current) return
      if (!actionsRef.current.contains(target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="navbar">
      <div className="container nav-content">
        <Link to="/" className="brand">{location.pathname !== '/' && (
            <div className="avatar" aria-label="Profile avatar">
              {avatarError ? (
                <div className="avatar-fallback" aria-hidden>DS</div>
              ) : (
                <img
                  src={profilePhoto}
                  alt="Doug Sellers"
                  onError={() => setAvatarError(true)}
                />
              )}
            </div>
          )}Doug Sellers</Link>
        <nav className="nav-links" ref={navRef}>
          <NavLink to="/" end className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined}>Contact</NavLink>
          <span className="nav-indicator" style={{ transform: `translateX(${pos.left}px)` }}>
            <span className={`nav-indicator-inner${bump ? ' bump' : ''}`} style={{ width: pos.width }} />
          </span>
        </nav>
  <div className="nav-actions" ref={actionsRef}>
          <button
            aria-label="Toggle theme"
            className={`theme-toggle ${theme}`}
            onClick={toggle}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span className="icon sun" aria-hidden="true">☀️</span>
            <span className="icon moon" aria-hidden="true">🌙</span>
          </button>
          <button
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          {menuOpen && !isMobile && (
            <div className="hamburger-menu" role="menu">
              <a
                href="https://github.com/diggitydug"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                role="menuitem"
                className="icon-link github"
              >
                <img src={GitHubIcon} alt="GitHub" />
              </a>
              <a
                href="https://www.linkedin.com/in/doug-sellers"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                role="menuitem"
                className="icon-link"
              >
                <img src={LinkedInIcon} alt="LinkedIn" />
              </a>
              <a
                href="/resume.pdf"
                download="Doug Sellers Resume.pdf"
                aria-label="Download Resume (PDF)"
                role="menuitem"
                className="icon-link"
                title="Download Resume"
              >
                <IconFileTypePdf size={24} />
              </a>
            </div>
          )}
          {menuOpen && isMobile && (
            <>
              <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)} />
              <aside className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation">
                <div className="drawer-panel">
                  <div className="drawer-header">
                    <span className="drawer-title">Menu</span>
                    <button className="drawer-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
                  </div>
                  <nav className="drawer-links">
                    <NavLink to="/" end className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined} onClick={() => setMenuOpen(false)}>About</NavLink>
                    <NavLink to="/contact" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined} onClick={() => setMenuOpen(false)}>Contact</NavLink>
                  </nav>
                  <div className="drawer-icons">
                    <a href="https://github.com/diggitydug" target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-link github">
                      <img src={GitHubIcon} alt="GitHub" />
                    </a>
                    <a href="https://www.linkedin.com/in/doug-sellers" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-link">
                      <img src={LinkedInIcon} alt="LinkedIn" />
                    </a>
                    <a href="/resume.pdf" download="Doug Sellers Resume.pdf" aria-label="Download Resume (PDF)" className="icon-link" title="Download Resume">
                      <IconFileTypePdf size={24} />
                    </a>
                  </div>
                </div>
              </aside>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
