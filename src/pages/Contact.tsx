import { useEffect, useRef, useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null)
  const [topic, setTopic] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!selectRef.current) return
      if (!selectRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
  const topic = String(data.get('topic') || '')
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    if (!topic || !name || !email || !message) {
      setStatus('Please fill out all fields.')
      return
    }
    // Map topic to subject line
    let subject = 'Portfolio contact'
    switch (topic) {
      case 'hire':
        subject = 'Hire Me inquiry'
        break
      case 'collab':
        subject = 'Collaboration / Work with Me'
        break
      default:
        subject = 'Portfolio contact'
    }
    // Open mail client with contextual subject
    window.location.href = `mailto:dougsellers01@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom:%20${encodeURIComponent(email)}`
  }

  return (
    <section className="contact">
      <h2>Contact Me</h2>
      <p>Have a question or want to work together? Send me a message.</p>
      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <label>
          Topic
          <div
            className="custom-select"
            ref={selectRef}
            data-open={open ? 'true' : 'false'}
          >
            <button
              type="button"
              className="select-toggle"
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpen((v) => !v)
                } else if (e.key === 'Escape') {
                  setOpen(false)
                }
              }}
            >
              <span>{topic === '' ? 'Select a topic…' : topic === 'hire' ? 'Hire Me' : topic === 'collab' ? 'Work with Me' : 'Something else'}</span>
              <span className="chevron" aria-hidden>▾</span>
            </button>
            <ul className="options" role="listbox">
              <li role="option" aria-selected={topic === 'hire'} onClick={() => { setTopic('hire'); setOpen(false); }}>Hire Me</li>
              <li role="option" aria-selected={topic === 'collab'} onClick={() => { setTopic('collab'); setOpen(false); }}>Work with Me</li>
              <li role="option" aria-selected={topic === 'other'} onClick={() => { setTopic('other'); setOpen(false); }}>Something else</li>
            </ul>
            <input type="hidden" name="topic" value={topic} />
          </div>
        </label>
        <label>
          Name
          <input name="name" type="text" placeholder="Your name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          Message
          <textarea name="message" rows={6} placeholder="How can I help?" required />
        </label>
        <button type="submit" className="btn-primary">Send</button>
      </form>
      {status && <p className="status">{status}</p>}
    </section>
  )
}
