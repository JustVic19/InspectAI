import type { Inspector, PageId } from "./types";

const PREFIX = "inspectai:v1:";
export const STORAGE_INSPECTOR = `${PREFIX}inspector`;
export const STORAGE_PAGE = `${PREFIX}page`;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function parseInspector(raw: string | null): Inspector | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as unknown;
    if (!isRecord(v)) return null;
    const str = (x: unknown) => (typeof x === "string" ? x : "");
    const out: Inspector = {
      name: str(v.name),
      company: str(v.company),
      license: str(v.license),
      state: str(v.state),
      phone: str(v.phone),
      email: str(v.email),
      reportStyle: str(v.reportStyle) || "detailed",
    };
    if (!out.name || !out.company || !out.license || !out.state) return null;
    return out;
  } catch {
    return null;
  }
}

export function parsePage(raw: string | null): PageId | null {
  if (raw === "report" || raw === "concept" || raw === "plan") return raw;
  return null;
}
