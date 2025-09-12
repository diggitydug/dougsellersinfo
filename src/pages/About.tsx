import { useState, useEffect } from 'react'
import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } from '@aws-sdk/client-cognito-identity'
import { SignatureV4 } from '@aws-sdk/signature-v4'
import { Sha256 } from '@aws-crypto/sha256-browser'

export default function About() {
  const [funFact, setFunFact] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [inputId, setInputId] = useState('')
  const [authCredentials, setAuthCredentials] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  // AWS Cognito Identity Pool Configuration
  const AWS_CONFIG = {
    region: 'us-east-1',
    identityPoolId: 'us-east-1:2e47788f-4c4a-4133-b6eb-792d7acc5dd4',
  }

  // Initialize AWS Cognito Identity Pool authentication
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setAuthLoading(true)
        setAuthError(null)

        // Create Cognito Identity client
        const cognitoClient = new CognitoIdentityClient({
          region: AWS_CONFIG.region,
        })

        // Get identity ID for guest access
        const getIdCommand = new GetIdCommand({
          IdentityPoolId: AWS_CONFIG.identityPoolId,
        })
        
        const identityResponse = await cognitoClient.send(getIdCommand)
        const identityId = identityResponse.IdentityId

        if (!identityId) {
          throw new Error('Failed to get identity ID')
        }

        // Get credentials for the identity
        const getCredentialsCommand = new GetCredentialsForIdentityCommand({
          IdentityId: identityId,
        })
        
        const credentialsResponse = await cognitoClient.send(getCredentialsCommand)
        const credentials = credentialsResponse.Credentials

        if (!credentials || !credentials.SessionToken) {
          throw new Error('Failed to get credentials')
        }

        // Store full credentials for signing requests
        setAuthCredentials({
          accessKeyId: credentials.AccessKeyId,
          secretAccessKey: credentials.SecretKey,
          sessionToken: credentials.SessionToken,
          identityId: identityId
        })
        console.log('AWS Auth successful. Identity ID:', identityId)
        
      } catch (error) {
        console.error('AWS Auth failed:', error)
        setAuthError(error instanceof Error ? error.message : 'Authentication failed')
      } finally {
        setAuthLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const handleGetFunFact = async (specificId?: string) => {
    if (!authCredentials) {
      setFunFact("Authentication required. Please wait for auth to complete.")
      return
    }

    setLoading(true)
    try {
      const endpoint = 'https://api.dougsellers.dev/facts'
      const url = specificId ? `${endpoint}?id=${specificId}` : endpoint
      
      // Create a signed request using AWS Signature V4
      const signer = new SignatureV4({
        credentials: authCredentials,
        region: AWS_CONFIG.region,
        service: 'execute-api',
        sha256: Sha256,
      })

      const request = {
        method: 'GET',
        hostname: 'api.dougsellers.dev',
        path: specificId ? `/facts?id=${specificId}` : '/facts',
        protocol: 'https:',
        headers: {
          'Content-Type': 'application/json',
          'host': 'api.dougsellers.dev',
        },
      }

      const signedRequest = await signer.sign(request)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: signedRequest.headers,
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setFunFact(data)
      
    } catch (error) {
      console.error('API call failed:', error)
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
          This connects to a serverless API built with AWS API Gateway, Lambda, and DynamoDB 
          to serve random fun facts about me. Authentication is handled via AWS Cognito Identity Pool with guest access.
        </p>
        
        {/* Authentication Status */}
        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <strong>Auth Status:</strong> 
          {authLoading && <span style={{ color: 'var(--muted)' }}> Authenticating...</span>}
          {authError && <span style={{ color: '#ff4444' }}> Error: {authError}</span>}
          {authCredentials && !authLoading && <span style={{ color: 'var(--accent)' }}> ✓ Authenticated</span>}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button 
            className="btn-primary" 
            onClick={() => handleGetFunFact()}
            disabled={loading || authLoading || !authCredentials}
            style={{ opacity: (loading || authLoading || !authCredentials) ? 0.6 : 1 }}
          >
            {loading ? 'Loading...' : 'Get Random Fun Fact'}
          </button>
          {/* Temporarily hidden - specific fact functionality
          <input
            type="text"
            placeholder="Enter specific ID"
            value={inputId}
            onChange={e => setInputId(e.target.value)}
            style={{ padding: '0.6rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', minWidth: '140px' }}
            disabled={loading || authLoading || !authCredentials}
          />
          <button 
            className="btn-primary" 
            onClick={() => handleGetFunFact(inputId)}
            disabled={loading || !inputId || authLoading || !authCredentials}
            style={{ opacity: (loading || !inputId || authLoading || !authCredentials) ? 0.6 : 1, background: 'var(--muted)' }}
          >
            Get Specific Fact
          </button>
          */}
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
            <pre style={{ margin: '0.5rem 0 0', background: 'var(--card)', padding: '1rem', borderRadius: '8px', color: 'var(--text)', fontSize: '0.95rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
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
              <li>Endpoint: <code>GET /facts</code> (random) or <code>GET /facts?id=&lt;id&gt;</code> (specific)</li>
              <li>AWS API Gateway handles HTTP requests, CORS, and authorization</li>
              <li>AWS Cognito Identity Pool provides guest access tokens</li>
              <li>Lambda authorizer validates the token before allowing access</li>
              <li>Lambda function processes requests and queries DynamoDB</li>
              <li>DynamoDB stores fun facts with specific IDs</li>
              <li>CloudWatch provides monitoring and error tracking</li>
            </ul>
            <p><strong>Frontend Integration:</strong></p>
            <ul>
              <li>AWS SDK for Cognito Identity Pool authentication</li>
              <li>Bearer token authentication in API requests</li>
              <li>Fetch API for HTTP requests with auth headers</li>
              <li>React hooks for state management</li>
              <li>Error handling and loading states</li>
              <li>TypeScript interfaces for API responses</li>
            </ul>
            <p><strong>Required Configuration:</strong></p>
            <ul>
              <li>AWS Region (currently set to us-east-1)</li>
              <li>Cognito Identity Pool ID</li>
              <li>API Gateway authorizer configured for Cognito</li>
              <li>CORS configuration for browser requests</li>
            </ul>
          </div>
        </details>
      </div>
    </section>
  )
}
