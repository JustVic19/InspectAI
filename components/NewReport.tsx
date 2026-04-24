"use client";

import { useState } from "react";
import { SECTIONS, STATUS_OPTIONS, type SectionKey } from "@/lib/sections";
import { callClaude } from "@/lib/claude-client";
import type { Inspector } from "@/lib/types";

export function NewReport({ inspector }: { inspector: Inspector }) {
  const [tab, setTab] = useState<SectionKey>("exterior");
  const [meta, setMeta] = useState({
    address: "",
    clientName: "",
    clientEmail: "",
    date: new Date().toISOString().slice(0, 10),
    propertyType: "Single Family",
    yearBuilt: "",
    sqft: "",
    weather: "Clear",
    notes: "",
  });
  const [statuses, setStatuses] = useState<Record<string, string | null>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const setMeta_ = (k: keyof typeof meta, v: string) =>
    setMeta((p) => ({ ...p, [k]: v }));
  const setStatus = (item: string, s: string | null) =>
    setStatuses((p) => ({ ...p, [item]: s }));
  const setComment = (item: string, v: string) =>
    setComments((p) => ({ ...p, [item]: v }));

  const counts = { pass: 0, warn: 0, fail: 0 };
  Object.values(statuses).forEach((s) => {
    if (s === "pass" || s === "warn" || s === "fail") counts[s]++;
  });

  const buildChecklist = () =>
    Object.entries(SECTIONS)
      .map(([, sec]) =>
        sec.items
          .map((item) => {
            const st = statuses[item] || "not checked";
            const cm = comments[item] || "";
            return `${item}: ${String(st).toUpperCase()}${cm ? ` — ${cm}` : ""}`;
          })
          .join("\n"),
      )
      .join("\n");

  const generate = async () => {
    if (!meta.address) {
      setError("Please add a property address first.");
      return;
    }
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const system = `You are an expert home inspection report writer. Generate professional, clear inspection reports based on inspector findings. Write in a ${inspector.reportStyle} style. Always be objective, specific, and actionable. Use proper inspection terminology.`;

      const user = `Generate a complete home inspection report for:

INSPECTOR: ${inspector.name}, ${inspector.company}
LICENSE: ${inspector.license} (${inspector.state})
DATE: ${meta.date}
CLIENT: ${meta.clientName || "Client"}
PROPERTY: ${meta.address}
TYPE: ${meta.propertyType} | YEAR BUILT: ${meta.yearBuilt || "Unknown"} | SQ FT: ${meta.sqft || "Unknown"}
CONDITIONS: ${meta.weather}

FINDINGS SUMMARY: ${counts.pass} items satisfactory · ${counts.warn} items need monitoring · ${counts.fail} items need repair

DETAILED FINDINGS:
${buildChecklist()}

INSPECTOR NOTES: ${meta.notes || "None"}

Write a complete inspection report with:
1. Executive Summary (3-4 sentences covering overall condition)
2. Priority Items (list items marked FAIL — immediate action needed)
3. Monitor Items (list items marked WARN — watch and maintain)
4. Section-by-Section Findings (cover each area inspected)
5. Recommendations & Next Steps
6. Inspector Certification statement

Be specific, professional, and helpful to the home buyer. Format clearly with section headers.`;

      let result = "";
      await callClaude(system, user, (chunk) => {
        result += chunk;
        setOutput(result);
      });
    } catch (e) {
      const msg =
        e instanceof Error && e.message
          ? e.message
          : "Generation failed. Please check your connection and try again.";
      setError(msg.slice(0, 500));
    }
    setLoading(false);
  };

  const copy = () => {
    void navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetMeta = () => ({
    address: "",
    clientName: "",
    clientEmail: "",
    date: new Date().toISOString().slice(0, 10),
    propertyType: "Single Family",
    yearBuilt: "",
    sqft: "",
    weather: "Clear",
    notes: "",
  });

  return (
    <div style={{ maxWidth: 860 }}>
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-head-title">🏠 Property Information</div>
        </div>
        <div className="card-body">
          <div className="field-grid">
            <div className="field">
              <label>Property Address *</label>
              <input
                value={meta.address}
                onChange={(e) => setMeta_("address", e.target.value)}
                placeholder="123 Maple Street, Chicago, IL 60601"
              />
            </div>
            <div className="field-grid cols3">
              <div className="field">
                <label>Client Name</label>
                <input
                  value={meta.clientName}
                  onChange={(e) => setMeta_("clientName", e.target.value)}
                  placeholder="Sarah Johnson"
                />
              </div>
              <div className="field">
                <label>Inspection Date</label>
                <input
                  type="date"
                  value={meta.date}
                  onChange={(e) => setMeta_("date", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Weather</label>
                <select
                  value={meta.weather}
                  onChange={(e) => setMeta_("weather", e.target.value)}
                >
                  {["Clear", "Overcast", "Rain", "Snow", "Windy"].map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field-grid cols3">
              <div className="field">
                <label>Property Type</label>
                <select
                  value={meta.propertyType}
                  onChange={(e) => setMeta_("propertyType", e.target.value)}
                >
                  {[
                    "Single Family",
                    "Condo / Townhome",
                    "Multi-Family",
                    "Commercial",
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Year Built</label>
                <input
                  value={meta.yearBuilt}
                  onChange={(e) => setMeta_("yearBuilt", e.target.value)}
                  placeholder="1998"
                />
              </div>
              <div className="field">
                <label>Sq Ft</label>
                <input
                  value={meta.sqft}
                  onChange={(e) => setMeta_("sqft", e.target.value)}
                  placeholder="2,400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {(
          [
            ["✓ Satisfactory", counts.pass, "var(--pass)"],
            ["△ Monitor", counts.warn, "var(--warn)"],
            ["✗ Needs Repair", counts.fail, "var(--fail)"],
          ] as const
        ).map(([l, c, col]) => (
          <div
            key={l}
            style={{
              flex: 1,
              background: "var(--card)",
              border: "1px solid var(--rule)",
              borderRadius: 8,
              padding: "12px 16px",
              borderLeft: `4px solid ${col}`,
            }}
          >
            <div
              style={{
                fontFamily: "Fraunces, serif",
                fontWeight: 700,
                fontSize: 22,
                color: col,
              }}
            >
              {c}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-head-title">📋 Inspection Checklist</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>
            Mark each item · add notes as needed
          </div>
        </div>
        <div className="card-body">
          <div className="report-section-tabs">
            {Object.entries(SECTIONS).map(([k, s]) => (
              <div
                key={k}
                role="tab"
                tabIndex={0}
                className={`rtab ${tab === k ? "active" : ""}`}
                onClick={() => setTab(k as SectionKey)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setTab(k as SectionKey);
                }}
              >
                {s.label}
              </div>
            ))}
          </div>
          {SECTIONS[tab].items.map((item) => (
            <div key={item}>
              <div className="status-row">
                <div className="status-label">{item}</div>
                <div className="status-toggle">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      className={`tog ${opt.key} ${statuses[item] === opt.key ? "active" : ""}`}
                      onClick={() =>
                        setStatus(
                          item,
                          statuses[item] === opt.key ? null : opt.key,
                        )
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              {(statuses[item] === "warn" || statuses[item] === "fail") && (
                <div style={{ paddingBottom: 10, paddingLeft: 8 }}>
                  <input
                    style={{
                      width: "100%",
                      background: "white",
                      border: "1px solid var(--rule)",
                      borderRadius: 5,
                      padding: "6px 10px",
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: 11,
                      color: "var(--ink)",
                      outline: "none",
                    }}
                    value={comments[item] || ""}
                    onChange={(e) => setComment(item, e.target.value)}
                    placeholder={`Add note for "${item}"…`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-head-title">📝 Additional Notes</div>
        </div>
        <div className="card-body">
          <div className="field">
            <textarea
              value={meta.notes}
              onChange={(e) => setMeta_("notes", e.target.value)}
              placeholder="Any general observations, access limitations, or areas not inspected…"
              style={{ minHeight: 80 }}
            />
          </div>
        </div>
      </div>

      <div className="btn-row" style={{ marginBottom: 20 }}>
        <button
          type="button"
          className="btn btn-accent"
          onClick={() => void generate()}
          disabled={loading || !meta.address}
        >
          {loading ? (
            <>
              <div className="spin" />
              Generating Report…
            </>
          ) : (
            "⚡ Generate Full Report"
          )}
        </button>
        {output && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setOutput("");
              setStatuses({});
              setComments({});
              setMeta(resetMeta());
            }}
          >
            Start New
          </button>
        )}
      </div>
      {error && <div className="error-box">{error}</div>}

      {output && (
        <div className="report-output">
          <div className="report-header">
            <div className="report-header-title">
              📄 Inspection Report — {meta.address || "Property"}
            </div>
            <div className="report-actions">
              <button
                type="button"
                className={`act-btn ${copied ? "ok" : ""}`}
                onClick={copy}
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
              <button
                type="button"
                className="act-btn"
                onClick={() => {
                  const blob = new Blob([output], { type: "text/plain" });
                  const a = document.createElement("a");
                  a.href = URL.createObjectURL(blob);
                  a.download = `Inspection_${meta.address?.replace(/[^a-z0-9]/gi, "_")}_${meta.date}.txt`;
                  a.click();
                  URL.revokeObjectURL(a.href);
                }}
              >
                Download .txt
              </button>
            </div>
          </div>
          <div className="report-body">{output}</div>
        </div>
      )}
    </div>
  );
}
