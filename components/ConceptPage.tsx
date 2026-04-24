"use client";

export function ConceptPage() {
  return (
    <div className="concept-page">
      <div className="concept-hero">
        <div className="concept-hero-title">
          Inspect<em>AI</em>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Product Concept · v1.0
        </div>
        <div className="concept-hero-sub">
          AI-powered report generation for home inspectors. Turn a completed
          checklist into a full professional report in under 2 minutes — not 3
          hours.
        </div>
        <div>
          {[
            "🏠 Home Inspectors",
            "📋 Structured Reports",
            "⚡ 2-Min Generation",
            "🔒 Self-Serve SaaS",
          ].map((p) => (
            <span key={p} className="concept-pill">
              {p}
            </span>
          ))}
          <span className="concept-pill hot">🚀 Zero Competition</span>
        </div>
      </div>

      <div className="two-col">
        <div className="info-card">
          <div className="info-card-title">😤 The Problem</div>
          <ul className="info-list">
            <li>
              <strong>3–4 hrs of writing</strong> after every inspection on top
              of the inspection itself
            </li>
            <li>
              <strong>$150–400/hr effective rate</strong> wasted on report
              writing vs. doing more inspections
            </li>
            <li>Reports are inconsistent — quality varies job to job</li>
            <li>
              Hard to scale: every additional inspection = more writing time
            </li>
            <li>
              Inspectors regularly work evenings finishing reports from daytime
              jobs
            </li>
          </ul>
        </div>
        <div className="info-card">
          <div className="info-card-title">✅ The Solution</div>
          <ul className="info-list">
            <li>
              Inspector fills out a <strong>digital checklist</strong> during the
              walkthrough
            </li>
            <li>
              Marks each item Pass / Monitor / Fail, adds voice or text notes
            </li>
            <li>
              <strong>AI generates the full report</strong> — executive
              summary, priority items, section writeups, recommendations
            </li>
            <li>
              Inspector reviews, tweaks, and sends — total time:{" "}
              <strong>under 10 minutes</strong>
            </li>
            <li>Every report is consistent, professional, and branded</li>
          </ul>
        </div>
      </div>

      <div className="two-col">
        <div className="info-card">
          <div className="info-card-title">🎯 Who&apos;s the Customer</div>
          <ul className="info-list">
            <li>
              <strong>Independent inspectors</strong> doing 10–25
              inspections/month
            </li>
            <li>
              Earn $300–600 per inspection — strong willingness to pay
            </li>
            <li>
              <strong>~30,000 licensed inspectors</strong> in the US
            </li>
            <li>
              Reachable via ASHI, InterNACHI forums, Facebook groups (50k+
              members)
            </li>
            <li>
              Highly vocal about report writing pain — easy to find and convert
            </li>
          </ul>
        </div>
        <div className="info-card">
          <div className="info-card-title">🏰 The Moat</div>
          <ul className="info-list">
            <li>
              Deep <strong>inspection-specific templates</strong> and terminology
              baked in
            </li>
            <li>Report style matches state-specific compliance norms over time</li>
            <li>
              Inspectors customize their voice — outputs become uniquely theirs
            </li>
            <li>
              <strong>Switching cost grows</strong> with each saved report and
              template
            </li>
            <li>Near-zero direct AI competition in this niche today</li>
          </ul>
        </div>
      </div>

      <div className="info-card" style={{ marginBottom: 16 }}>
        <div className="info-card-title">💰 Pricing</div>
        <div className="pricing-row">
          {(
            [
              {
                tier: "Starter",
                price: "$49",
                period: "/mo",
                lines: [
                  "25 reports/month",
                  "3 report styles",
                  "PDF export",
                  "Email delivery",
                ],
                feat: false,
              },
              {
                tier: "Professional",
                price: "$99",
                period: "/mo",
                lines: [
                  "Unlimited reports",
                  "All report styles",
                  "Custom branding",
                  "Client portal",
                  "Priority support",
                ],
                feat: true,
              },
              {
                tier: "Team",
                price: "$199",
                period: "/mo",
                lines: [
                  "Up to 5 inspectors",
                  "Everything in Pro",
                  "Shared templates",
                  "Analytics dashboard",
                ],
                feat: false,
              },
            ] as const
          ).map((p) => (
            <div
              key={p.tier}
              className={`price-card ${p.feat ? "featured" : ""}`}
            >
              {p.feat && <div className="feat-badge">Most Popular</div>}
              <div className="price-tier">{p.tier}</div>
              <div className="price-amount">{p.price}</div>
              <div className="price-period">{p.period} per inspector</div>
              {p.lines.map((l) => (
                <div key={l} className="price-line">
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 12,
            color: "var(--muted)",
            background: "var(--cream)",
            borderRadius: 6,
            padding: "10px 14px",
          }}
        >
          💡 <strong>Revenue math:</strong> 200 Professional users = $19,800/mo.
          At 500 users = $49,500/mo. The market has 30,000 potential customers.
        </div>
      </div>

      <div className="info-card">
        <div className="info-card-title">🗺️ Roadmap</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {(
            [
              {
                phase: "MVP (Now)",
                items: [
                  "Checklist input",
                  "AI report generation",
                  "Copy & download",
                  "3 report styles",
                ],
              },
              {
                phase: "V2 (Month 3)",
                items: [
                  "PDF branded reports",
                  "Client email delivery",
                  "Photo upload & captions",
                  "Voice note transcription",
                ],
              },
              {
                phase: "V3 (Month 6)",
                items: [
                  "Mobile app (field use)",
                  "State compliance templates",
                  "CRM & scheduling",
                  "Team accounts",
                ],
              },
            ] as const
          ).map((r) => (
            <div
              key={r.phase}
              style={{
                background: "var(--cream)",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "Fraunces, serif",
                  fontWeight: 700,
                  fontSize: 13,
                  marginBottom: 10,
                }}
              >
                {r.phase}
              </div>
              {r.items.map((i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    padding: "4px 0",
                    borderBottom: "1px solid var(--rule)",
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
