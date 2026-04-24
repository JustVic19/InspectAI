"use client";

export function ValidationPage() {
  return (
    <div className="plan-page">
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: -1,
            marginBottom: 6,
          }}
        >
          30-Day Validation Plan
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Self-serve from day one. No manual fulfilment, no done-for-you. The
          product does the work.
        </div>
        <div className="metric-row">
          {(
            [
              ["Goal 1", "5 paying users"],
              ["Goal 2", "$495 MRR"],
              ["Goal 3", "1 case study"],
            ] as const
          ).map(([l, v]) => (
            <div key={l} className="metric">
              <div className="metric-val">{v}</div>
              <div className="metric-lbl">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="phase">
        <div className="phase-head">
          <div className="phase-num">01</div>
          <div>
            <div className="phase-title">Build & Launch</div>
            <div className="phase-span">Days 1–7</div>
          </div>
        </div>
        <div className="task-list">
          {(
            [
              [
                "Day 1–2",
                "Set up landing page",
                "Simple page on Carrd or Framer. Headline: 'Write your inspection report in 2 minutes, not 3 hours.' Include a demo GIF of the product working. Add a waitlist/signup form.",
                false,
              ],
              [
                "Day 3",
                "Set up payments",
                "Stripe + a simple auth layer (Clerk or Supabase Auth). Charge from day one — $1 trial for 7 days then $99/mo. Free trials attract tyre-kickers.",
                false,
              ],
              [
                "Day 4–5",
                "Deploy MVP",
                "Vercel for hosting. The app is already built. Connect Claude API key, test 10 real reports end-to-end with different property types.",
                false,
              ],
              [
                "Day 6–7",
                "Seed content",
                "Write 2 posts for r/homeinspection and r/HomeInspectors. Don't pitch — answer questions about report writing pain. Build credibility first.",
                true,
              ],
            ] as const
          ).map(([day, title, desc, acc]) => (
            <div key={title} className={`task ${acc ? "accent-task" : ""}`}>
              <div className="task-day">{day}</div>
              <div className="task-content">
                <div className="task-title">{title}</div>
                <div className="task-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="phase">
        <div className="phase-head">
          <div className="phase-num">02</div>
          <div>
            <div className="phase-title">Get First 5 Customers</div>
            <div className="phase-span">Days 8–21</div>
          </div>
        </div>
        <div className="task-list">
          {(
            [
              [
                "Day 8–10",
                "InterNACHI & ASHI Forums",
                "These are the two biggest inspector communities in the world. Post in the software/tools section. Subject: 'I built a tool that writes inspection reports — free for first 10 testers.' Not a pitch. A genuine offer.",
                true,
              ],
              [
                "Day 11–13",
                "Facebook Group outreach",
                "Search 'home inspector' on Facebook. Join the top 5 groups (combined 50k+ members). Same approach — offer free access in exchange for feedback.",
                false,
              ],
              [
                "Day 14–16",
                "Cold email inspectors",
                "Use Google Maps to find inspection companies in 3 cities. Email the owner directly. 3 sentences: what it does, what it saves, link to try free. Keep it human.",
                false,
              ],
              [
                "Day 17–19",
                "Demo video",
                "Record a 90-second Loom: open the app, fill in a checklist, hit generate, show the full report. Post it everywhere. This is your most powerful marketing asset.",
                true,
              ],
              [
                "Day 20–21",
                "Convert free users to paid",
                "Follow up with every free trial user personally. Ask: 'What would make this worth $99/mo to you?' Then fix the top 2 answers. Convert the rest.",
                false,
              ],
            ] as const
          ).map(([day, title, desc, acc]) => (
            <div key={title} className={`task ${acc ? "accent-task" : ""}`}>
              <div className="task-day">{day}</div>
              <div className="task-content">
                <div className="task-title">{title}</div>
                <div className="task-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="phase">
        <div className="phase-head">
          <div className="phase-num">03</div>
          <div>
            <div className="phase-title">Build the Flywheel</div>
            <div className="phase-span">Days 22–30</div>
          </div>
        </div>
        <div className="task-list">
          {(
            [
              [
                "Day 22–24",
                "Get one killer testimonial",
                "Find your most enthusiastic early user. Ask them: 'How much time does this save you per report? Per week?' Record a 60-sec video with them or get a written quote. This becomes your entire marketing message.",
                true,
              ],
              [
                "Day 25–27",
                "Referral mechanic",
                "Add a referral link inside the app: 'Get 1 month free for every inspector you refer.' Inspectors talk to each other constantly. This is your cheapest growth channel.",
                false,
              ],
              [
                "Day 28–29",
                "AppSumo application",
                "Apply for a lifetime deal. It won't go live for weeks but starting the process now is smart. AppSumo can deliver 300–800 paying users in one burst.",
                false,
              ],
              [
                "Day 30",
                "Review & double down",
                "Look at your data: which acquisition channel sent paying users? Do more of that. Kill everything else. One focused channel beats five mediocre ones.",
                true,
              ],
            ] as const
          ).map(([day, title, desc, acc]) => (
            <div key={title} className={`task ${acc ? "accent-task" : ""}`}>
              <div className="task-day">{day}</div>
              <div className="task-content">
                <div className="task-title">{title}</div>
                <div className="task-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          borderRadius: 12,
          padding: 28,
        }}
      >
        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 16,
            color: "var(--accent2)",
          }}
        >
          The Self-Serve Principle
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8,
          }}
        >
          Every part of this business is designed so{" "}
          <strong style={{ color: "var(--paper)" }}>
            the product fulfils itself
          </strong>
          . An inspector signs up, enters their details, fills in a checklist,
          and gets a report — without you touching anything. Your job is to
          build the machine once, then focus entirely on acquisition. The only
          time you&apos;re manually involved is in the first 30 days to learn
          what&apos;s broken and fix it fast. After that:{" "}
          <strong style={{ color: "var(--accent2)" }}>
            automate, delegate, or eliminate everything except growth.
          </strong>
        </div>
      </div>
    </div>
  );
}
