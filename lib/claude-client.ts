/**
 * Calls the same-origin streaming proxy (see app/api/messages/route.ts).
 * Full stack (Clerk, Stripe, Supabase): docs/production-build.html
 */

function messageFromAnthropicJson(raw: string): string | null {
  try {
    const j = JSON.parse(raw) as {
      error?: { message?: string };
      type?: string;
    };
    if (j.type === "error" && j.error?.message) return j.error.message;
    if (j.error?.message) return j.error.message;
  } catch {
    /* not JSON */
  }
  return null;
}

export async function callClaude(
  system: string,
  user: string,
  onChunk: (chunk: string) => void,
): Promise<void> {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      stream: true,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    const parsed = messageFromAnthropicJson(errText);
    throw new Error((parsed ?? errText) || `API ${res.status}`);
  }
  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");
  const dec = new TextDecoder();
  let buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const d = line.slice(6).trim();
      if (d === "[DONE]") continue;
      let p: {
        type?: string;
        delta?: { text?: string };
        error?: { message?: string };
      };
      try {
        p = JSON.parse(d) as typeof p;
      } catch {
        continue;
      }
      if (p.type === "error" && p.error?.message) {
        throw new Error(p.error.message);
      }
      if (p.delta?.text) onChunk(p.delta.text);
    }
  }
}
