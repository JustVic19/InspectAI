"use client";

import { useState } from "react";
import type { Inspector } from "@/lib/types";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL",
  "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
  "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export function Onboarding({ onDone }: { onDone: (d: Inspector) => void }) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Inspector>({
    name: "",
    company: "",
    license: "",
    state: "",
    phone: "",
    email: "",
    reportStyle: "detailed",
  });
  const set = <K extends keyof Inspector>(k: K, v: Inspector[K]) =>
    setD((p) => ({ ...p, [k]: v }));
  const canNext = [d.name && d.company, d.license && d.state, true][step];

  const steps = [
    {
      eye: "Step 1 of 3",
      title: "Your Details",
      desc: "This goes on every report you generate — set it once.",
      body: (
        <div className="field-grid">
          <div className="field-grid cols2">
            <div className="field">
              <label>Your Full Name *</label>
              <input
                value={d.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="James R. Miller"
              />
            </div>
            <div className="field">
              <label>Company Name *</label>
              <input
                value={d.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Miller Home Inspections"
              />
            </div>
          </div>
          <div className="field">
            <label>Phone</label>
            <input
              value={d.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="(312) 555-0199"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              value={d.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="james@millerhomeinspections.com"
            />
          </div>
        </div>
      ),
    },
    {
      eye: "Step 2 of 3",
      title: "Your License",
      desc: "Required for report compliance in most states.",
      body: (
        <div className="field-grid cols2">
          <div className="field">
            <label>License Number *</label>
            <input
              value={d.license}
              onChange={(e) => set("license", e.target.value)}
              placeholder="HI-12345"
            />
          </div>
          <div className="field">
            <label>State *</label>
            <select
              value={d.state}
              onChange={(e) => set("state", e.target.value)}
            >
              <option value="">— Select —</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      ),
    },
    {
      eye: "Step 3 of 3",
      title: "Report Style",
      desc: "Choose how your AI-generated reports should be written.",
      body: (
        <div className="field-grid">
          {(
            [
              {
                val: "detailed",
                title: "Detailed Narrative",
                desc: "Full paragraphs per section. Best for complex or older homes.",
              },
              {
                val: "concise",
                title: "Concise Summary",
                desc: "Short bullets + summary per section. Fast reads for buyers.",
              },
              {
                val: "technical",
                title: "Technical / Commercial",
                desc: "Precise, specification-style language. Great for commercial jobs.",
              },
            ] as const
          ).map((opt) => (
            <div
              key={opt.val}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  set("reportStyle", opt.val);
                }
              }}
              onClick={() => set("reportStyle", opt.val)}
              style={{
                background:
                  d.reportStyle === opt.val
                    ? "rgba(26,74,107,0.06)"
                    : "white",
                border: `1.5px solid ${
                  d.reportStyle === opt.val ? "var(--accent)" : "var(--rule)"
                }`,
                borderRadius: "8px",
                padding: "16px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{opt.title}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{opt.desc}</div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="ob-wrap">
      <div className="ob-prog">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`ob-prog-dot ${i <= step ? "on" : ""}`}
          />
        ))}
      </div>
      <div className="ob-eyebrow">{steps[step].eye}</div>
      <div className="ob-title">{steps[step].title}</div>
      <div className="ob-desc">{steps[step].desc}</div>
      {steps[step].body}
      <div className="ob-nav">
        {step > 0 ? (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setStep((s) => s - 1)}
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canNext}
          onClick={() =>
            step < 2 ? setStep((s) => s + 1) : onDone(d)
          }
        >
          {step < 2 ? "Continue →" : "Open ReportAI →"}
        </button>
      </div>
    </div>
  );
}
