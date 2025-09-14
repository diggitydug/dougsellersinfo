import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    const interval = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    const timeout = window.setTimeout(() => navigate('/'), 5000)
    return () => { window.clearInterval(interval); window.clearTimeout(timeout) }
  }, [navigate])

  return (
    <section className="not-found">
      <h2>Page not found</h2>
      <p>We couldn’t find that page. Taking you back home in {seconds}s…</p>
      <p>
        Or <Link to="/">go home now</Link>.
      </p>
    </section>
  )
}
