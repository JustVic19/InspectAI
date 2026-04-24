"use client";

import { useEffect, useState } from "react";
import { Onboarding } from "@/components/Onboarding";
import { NewReport } from "@/components/NewReport";
import { ConceptPage } from "@/components/ConceptPage";
import { ValidationPage } from "@/components/ValidationPage";
import type { Inspector, PageId } from "@/lib/types";
import {
  parseInspector,
  parsePage,
  STORAGE_INSPECTOR,
  STORAGE_PAGE,
} from "@/lib/storage";

const nav: { id: PageId; icon: string; label: string }[] = [
  { id: "report", icon: "⚡", label: "New Report" },
  { id: "concept", icon: "📐", label: "Product Concept" },
  { id: "plan", icon: "🗓", label: "Validation Plan" },
];

const titles: Record<PageId, [string, string]> = {
  report: [
    "New Report",
    "Fill in the checklist → generate the full report",
  ],
  concept: ["Product Concept", "What you're building and why it wins"],
  plan: ["30-Day Validation Plan", "First 5 paying customers, self-serve"],
};

export function InspectApp() {
  const [inspector, setInspector] = useState<Inspector | null>(null);
  const [page, setPage] = useState<PageId>("report");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const ins = parseInspector(
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_INSPECTOR)
          : null,
      );
      const pg = parsePage(
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_PAGE)
          : null,
      );
      if (ins) setInspector(ins);
      if (pg) setPage(pg);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    if (inspector) {
      localStorage.setItem(STORAGE_INSPECTOR, JSON.stringify(inspector));
      localStorage.setItem(STORAGE_PAGE, page);
    } else {
      localStorage.removeItem(STORAGE_INSPECTOR);
      localStorage.removeItem(STORAGE_PAGE);
    }
  }, [inspector, page, hydrated]);

  if (!hydrated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--paper)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--muted)",
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 12,
        }}
      >
        Loading…
      </div>
    );
  }

  if (!inspector) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div
          style={{
            background: "var(--ink)",
            padding: "0 32px",
            height: 54,
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid var(--accent2)",
          }}
        >
          <span
            style={{
              fontFamily: "Fraunces, serif",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--paper)",
            }}
          >
            Inspect<span style={{ color: "var(--accent2)" }}>AI</span>
          </span>
        </div>
        <Onboarding
          onDone={(d) => {
            setInspector(d);
            setPage("report");
          }}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">
          <div className="logo-mark">
            Inspect<em>AI</em>
          </div>
          <div className="logo-sub">Report Generator</div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-label">Tools</div>
          {nav.map((n) => (
            <div
              key={n.id}
              role="button"
              tabIndex={0}
              className={`nav-item ${page === n.id ? "active" : ""}`}
              onClick={() => setPage(n.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setPage(n.id);
              }}
            >
              <span className="nav-icon">{n.icon}</span>
              {n.label}
            </div>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="inspector-chip">
            <div className="inspector-name">{inspector.name}</div>
            <div className="inspector-lic">
              {inspector.company} · {inspector.license}
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 11,
                padding: "6px 12px",
                borderRadius: 5,
                cursor: "pointer",
                width: "100%",
                transition: "all 0.2s",
              }}
              onClick={() => setInspector(null)}
            >
              ↩ Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">{titles[page][0]}</div>
            <div className="page-sub">{titles[page][1]}</div>
          </div>
        </div>
        <div className="content">
          {page === "report" && <NewReport inspector={inspector} />}
          {page === "concept" && <ConceptPage />}
          {page === "plan" && <ValidationPage />}
        </div>
      </div>
    </div>
  );
}
