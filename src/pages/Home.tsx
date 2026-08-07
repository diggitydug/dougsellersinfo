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
            <p>Software Engineer • Builder • Learner • Phoenix, AZ 🌵</p>
          </div>
        </div>
      </section>

      <section>
        <h2>What I'm focused on</h2>
        <p>
          Software Engineer II at USAA, based in Phoenix, AZ. I'm the lead developer and de facto technical owner of
          a new internal employee photo delivery system, and I mentor peer engineers building the components around
          it. I've designed and architected event‑driven extensions on top of it — services that use Microsoft Graph
          subscription webhooks to keep employee photos in sync live from Entra ID, and a sibling application that
          keeps private Microsoft Teams channels private by automatically managing membership against Active
          Directory and Exchange distribution groups. I also build collaborative internal tooling, like a
          synchronous/asynchronous planning poker app that pulls work items from Jira Cloud so agile teams can
          estimate together. I work on .NET 10 day to day and help manage and standardize .NET usage across the
          enterprise. Beyond that, I build reliable systems and UI, steward CI/CD, and lead SRE practices like SLO
          monitoring, canary deploys, and feature flags.
        </p>
      </section>

      <section>
        <h2>Highlights</h2>
        <ul>
          <li>Lead developer and technical owner of a new employee photo delivery system: designed the data model, batch ingestion jobs, and .NET Core REST API; coordinate component ownership across peer engineers.</li>
          <li>Mentor peer engineers on adjacent components through design and code review, unblocking decisions and aligning interfaces across the project.</li>
          <li>Shipped a React 18 UI for Email Distribution Lists using TanStack Query + Mantine; pulled delivery forward by two sprints.</li>
          <li>Hackathon: built an AI‑powered tool that turns screen recordings into written documentation with embedded images and step‑by‑step instructions — React UI plus an orchestration layer coordinating a Python LLM service, generating PDF and Markdown output.</li>
          <li>Department subject‑matter expert for SRE practices: SLO definition and monitoring, canary deploys, and feature‑flag rollouts.</li>
          <li>Work day to day on .NET 10 and help manage and standardize .NET usage across the enterprise, including internal NuGet libraries and shared tooling.</li>
          <li>Delivered a high‑performance .NET batch job in 3 weeks to ingest 80k+ Workday records, cutting processing from hours to minutes.</li>
          <li>Maintenance lead across 14 apps (Java Spring, .NET Core MVC/APIs, React, .NET 8 batches); cut tech debt and managed vulnerability remediation.</li>
          <li>Built and owned a Go API on AWS (API Gateway, Lambda, VPC, CloudWatch, X‑Ray, Secrets Manager) via Terraform.</li>
          <li>Implemented a new internal email platform solo in ~6 months (Okta SSO, 3 OpenShift C# batch jobs, vendor integration).</li>
          <li>Identified and retired unused apps, saving ~$4,000/month.</li>
        </ul>
      </section>

      <section>
        <h2>Featured Projects</h2>
        <div className="project-grid">
          <article className="project-card">
            <h3>Employee Photo Delivery System</h3>
            <p className="project-role">Lead developer &amp; technical owner</p>
            <p>
              Designed the data model, batch ingestion jobs, and .NET Core REST API that pull vendor photo data into
              a managed database and serve it to downstream enterprise applications. Coordinate component ownership
              and review design with peer engineers building adjacent pieces.
            </p>
            <div className="project-tags">
              <span>.NET Core</span>
              <span>REST API</span>
              <span>Batch Processing</span>
              <span>SQL</span>
            </div>
          </article>

          <article className="project-card">
            <h3>Live Photo Sync (Event‑Driven)</h3>
            <p className="project-role">Designer &amp; architect</p>
            <p>
              Extended the photo delivery system with an event‑driven service that subscribes to Microsoft Graph
              webhooks, so employee photos update in near real time as they change in Entra ID — no polling
              required.
            </p>
            <div className="project-tags">
              <span>Microsoft Graph</span>
              <span>Entra ID</span>
              <span>Webhooks</span>
              <span>Event‑Driven</span>
            </div>
          </article>

          <article className="project-card">
            <h3>Private Teams Channel Governance</h3>
            <p className="project-role">Designer &amp; architect</p>
            <p>
              Built a separate event‑driven application on the same Microsoft Graph subscription‑webhook pattern
              that keeps private Microsoft Teams channels private, automatically managing membership by syncing
              against Active Directory and Exchange distribution groups.
            </p>
            <div className="project-tags">
              <span>Microsoft Graph</span>
              <span>Microsoft Teams</span>
              <span>Active Directory</span>
              <span>Exchange Distribution Groups</span>
              <span>Webhooks</span>
            </div>
          </article>

          <article className="project-card">
            <h3>Planning Poker</h3>
            <p className="project-role">Developer, on an existing foundation</p>
            <p>
              An internal synchronous/asynchronous{' '}
              <a href="https://www.mountaingoatsoftware.com/agile/planning-poker" target="_blank" rel="noreferrer">
                planning poker
              </a>{' '}
              tool, built out on top of a foundation other engineers started, that syncs to Jira Cloud to pull in
              work items, letting agile team members collaboratively vote on level of effort.
            </p>
            <div className="project-tags">
              <span>Jira Cloud API</span>
              <span>Real‑time collaboration</span>
              <span>React</span>
            </div>
          </article>
        </div>
      </section>

      <section>
        <h2>Tech I use</h2>
        <div className="tech-grid">
          <div>
            <h3>Front‑End</h3>
            <ul>
              <li>React 16/18</li>
              <li>TypeScript</li>
              <li>Next.js</li>
              <li>TanStack Query</li>
              <li>Mantine</li>
              <li>Jest</li>
            </ul>
          </div>
          <div>
            <h3>Back‑End</h3>
            <ul>
              <li>C#, .NET (Core/8/10)</li>
              <li>Java, Spring Boot</li>
              <li>Node.js</li>
              <li>Go</li>
              <li>Python</li>
            </ul>
          </div>
          <div>
            <h3>Cloud & Infrastructure</h3>
            <ul>
              <li>AWS: API Gateway, Lambda, S3, VPC</li>
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
              <li>REST & GraphQL APIs</li>
              <li>Microsoft Graph webhooks</li>
              <li>Jira Cloud API</li>
              <li>Workday integrations</li>
              <li>Batch processing</li>
            </ul>
          </div>
          <div>
            <h3>Identity & Access</h3>
            <ul>
              <li>Okta SSO</li>
              <li>Microsoft Entra ID</li>
              <li>Active Directory</li>
              <li>Exchange distribution groups</li>
              <li>Salesforce APEX</li>
            </ul>
          </div>
          <div>
            <h3>AI & Automation</h3>
            <ul>
              <li>LLM / GenAI integration</li>
              <li>Event‑driven architecture</li>
              <li>Vendor integration</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
