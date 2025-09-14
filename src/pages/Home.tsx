import { useState } from 'react'
import profilePhoto from '../assets/profile-photo.jpg'
import './Home.css'

export default function Home() {
  const [imgError, setImgError] = useState(false)
  return (
    <>
      <section className="home">
        <div className="hero">
          <div className="photo" aria-label="Profile photo">
            {imgError ? (
              <div className="photo-placeholder" aria-label="Your photo placeholder">DS</div>
            ) : (
              <img
                src={profilePhoto}
                alt="Photo of Doug Sellers"
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div className="hero-text">
            <h1>Hi, I'm Doug Sellers</h1>
            <p>Software Engineer • Builder • Learner • NYC 🍎</p>
          </div>
        </div>
      </section>

      <section>
        <h2>What I'm focused on</h2>
        <p>
          Software Engineer II at USAA, working from NYC. I build reliable systems and UI, steward CI/CD, and lead SRE
          practices like SLO monitoring, canary deploys, and feature flags. Recently, I’ve been creating React 18
          experiences and internal C#/.NET libraries that speed up delivery across teams.
        </p>
      </section>

      <section>
        <h2>Highlights</h2>
        <ul>
          <li>Delivered a high‑performance .NET batch to ingest 80k+ Workday records in minutes, streamlining HR data flow.</li>
          <li>Shipped a React 18 UI for Email Distribution Lists using TanStack + Mantine; accelerated delivery by two sprints.</li>
          <li>Primary owner for an internal email comms platform plus 3 supporting batch jobs; reduced incidents and MTTR.</li>
          <li>Maintenance lead across 14 apps (Java Spring, .NET Core MVC/APIs, React, .NET 8 batches); cut tech debt and vulns.</li>
          <li>Migrated a React 16 app to React 18 and refactored hundreds of unit tests for S3‑based hosting (off Kubernetes).</li>
          <li>Built and owned a Go API on AWS (API Gateway, Lambda, VPC, CloudWatch, X‑Ray, Secrets Manager) via Terraform.</li>
          <li>Implemented a new internal email platform solo in ~6 months (Okta SSO, 3 OpenShift C# batch jobs, vendor integration).</li>
          <li>Launched a 6‑page internal event site for ~6,000 employees; integrated vendor registration and management.</li>
          <li>Identified and retired unused apps, saving ~$4,000/month.</li>
        </ul>
      </section>

      <section>
        <h2>Tech I use</h2>
        <div className="tech-grid">
          <div>
            <h3>Front‑End</h3>
            <ul>
              <li>React 18</li>
              <li>TypeScript</li>
              <li>TanStack</li>
              <li>Mantine</li>
            </ul>
          </div>
          <div>
            <h3>Back‑End</h3>
            <ul>
              <li>C#, .NET (Core/8)</li>
              <li>Java Spring</li>
              <li>Go</li>
            </ul>
          </div>
          <div>
            <h3>Cloud & Infrastructure</h3>
            <ul>
              <li>AWS: API Gateway, Lambda, VPC</li>
              <li>Observability: CloudWatch, X‑Ray</li>
              <li>Terraform (IaC)</li>
              <li>Docker, OpenShift/Kubernetes</li>
            </ul>
          </div>
          <div>
            <h3>SRE & DevOps</h3>
            <ul>
              <li>CI/CD pipelines</li>
              <li>SLO monitoring</li>
              <li>Canary deploys</li>
              <li>Feature flags</li>
            </ul>
          </div>
          <div>
            <h3>Data & Integrations</h3>
            <ul>
              <li>Workday integrations</li>
              <li>Batch processing</li>
            </ul>
          </div>
          <div>
            <h3>Identity & Access</h3>
            <ul>
              <li>Okta SSO</li>
              <li>Salesforce APEX</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
