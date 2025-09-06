import { useState } from 'react'

export default function About() {
  const [funFact, setFunFact] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [inputId, setInputId] = useState('')

  const handleGetFunFact = async (specificId?: string) => {
    setLoading(true)
    try {
      const endpoint = 'https://api.dougsellers.dev/facts'
      const url = specificId ? `${endpoint}?id=${specificId}` : endpoint
      const response = await fetch(url)
  const data = await response.json()
  setFunFact(data)
      
    } catch (error) {
      setFunFact("Error loading fun fact. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="about">
      <h2>About This Site</h2>
      <p>
        This portfolio site showcases modern web development practices and technologies. 
        It's built as a Single Page Application (SPA) with a focus on performance, accessibility, and user experience.
      </p>

      <div className="tech-grid">
        <div>
          <h3>Frontend Framework</h3>
          <ul>
            <li>React 18 - Component-based UI library</li>
            <li>TypeScript - Type-safe JavaScript</li>
            <li>React Router DOM - Client-side routing</li>
          </ul>
        </div>
        
        <div>
          <h3>Build Tools & Development</h3>
          <ul>
            <li>Vite - Fast build tool and dev server</li>
            <li>@vitejs/plugin-react - React integration</li>
            <li>ESNext/ES2020 - Modern JavaScript features</li>
          </ul>
        </div>

        <div>
          <h3>UI & Styling</h3>
          <ul>
            <li>CSS Custom Properties - Theme system</li>
            <li>@tabler/icons-react - Icon library</li>
            <li>Responsive Grid & Flexbox - Layout</li>
            <li>CSS Animations - Smooth interactions</li>
          </ul>
        </div>

        <div>
          <h3>Deployment & Hosting</h3>
          <ul>
            <li>GitHub Pages - Static site hosting</li>
            <li>GitHub Actions - CI/CD pipeline</li>
            <li>Custom Domain - dougsellers.info</li>
          </ul>
        </div>

        <div>
          <h3>Backend</h3>
          <ul>
            <li>AWS API Gateway - REST API endpoints</li>
            <li>AWS Lambda - Serverless functions</li>
            <li>DynamoDB - NoSQL database</li>
            <li>CloudWatch - Monitoring & logging</li>
            <li>Route 53 - DNS management</li>
            <li>Golang - Programming Language used for Lambda functions</li>
          </ul>
        </div>

        <div>
          <h3>Development Tools</h3>
          <ul>
            <li>VS Code - Code editor</li>
            <li>Git - Version control</li>
            <li>npm - Package management</li>
            <li>TypeScript Compiler - Type checking</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card)' }}>
        <h3>Fun Fact API Demo</h3>
        <p>
          This will connect to a serverless API built with AWS API Gateway, Lambda, and DynamoDB 
          to serve random fun facts about me. You can also request specific facts by ID.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button 
            className="btn-primary" 
            onClick={() => handleGetFunFact()}
            disabled={loading}
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Loading...' : 'Get Random Fun Fact'}
          </button>
          <input
            type="text"
            placeholder="Enter specific ID"
            value={inputId}
            onChange={e => setInputId(e.target.value)}
            style={{ padding: '0.6rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', minWidth: '140px' }}
            disabled={loading}
          />
          <button 
            className="btn-primary" 
            onClick={() => handleGetFunFact(inputId)}
            disabled={loading || !inputId}
            style={{ opacity: loading ? 0.6 : 1, background: 'var(--muted)' }}
          >
            Get Specific Fact
          </button>
  </div>

        {funFact && (
          <div style={{ 
            padding: '1rem', 
            background: 'var(--bg)', 
            border: '1px solid var(--border)', 
            borderRadius: '8px',
            marginTop: '1rem',
            fontSize: '1rem',
            fontFamily: 'monospace',
            color: 'var(--text)',
            overflowX: 'auto'
          }}>
            <strong>API Response:</strong>
            <pre style={{ margin: '0.5rem 0 0', background: 'var(--card)', padding: '1rem', borderRadius: '8px', color: 'var(--text)', fontSize: '0.95rem' }}>
              <code>
                {JSON.stringify(funFact, null, 2)}
              </code>
            </pre>
          </div>
        )}

        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', color: 'var(--accent)' }}>Technical Implementation Details</summary>
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
            <p><strong>API Architecture:</strong></p>
            <ul>
              <li>Endpoint: <code>GET /fun-facts</code> (random) or <code>GET /fun-facts?id=&lt;id&gt;</code> (specific)</li>
              <li>AWS API Gateway handles HTTP requests and CORS</li>
              <li>Lambda function processes requests and queries DynamoDB</li>
              <li>DynamoDB stores fun facts with specific IDs</li>
              <li>CloudWatch provides monitoring and error tracking</li>
            </ul>
            <p><strong>Frontend Integration:</strong></p>
            <ul>
              <li>Fetch API for HTTP requests</li>
              <li>React hooks for state management</li>
              <li>Error handling and loading states</li>
              <li>TypeScript interfaces for API responses</li>
            </ul>
          </div>
        </details>
      </div>
    </section>
  )
}
