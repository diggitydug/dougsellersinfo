import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
  <small>© {new Date().getFullYear()} Doug Sellers</small>
      </div>
    </footer>
  )
}
