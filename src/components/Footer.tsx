export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="socials">
          <a href="https://github.com/diggitydug" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/doug-sellers" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="/resume.pdf" download="Doug Sellers Resume.pdf">Resume</a>
        </div>
        <small>© {new Date().getFullYear()} Doug Sellers</small>
      </div>
    </footer>
  )
}
