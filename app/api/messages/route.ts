/**
 * MVP: streaming Anthropic Messages API proxy (API key server-side only).
 * Full implementation (Clerk, Stripe, subscription gate, Supabase):
 * docs/production-build.html
 */

import { NextResponse } from "next/server";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set" },
      { status: 500 },
    );
  }

  const system = typeof b.system === "string" ? b.system : "";
  const messages = b.messages;
  const stream = b.stream === true;
  const model =
    typeof b.model === "string" && b.model.length > 0
      ? b.model
      : "claude-sonnet-4-5";
  const max_tokens =
    typeof b.max_tokens === "number" && b.max_tokens > 0
      ? Math.min(b.max_tokens, 8192)
      : 1000;

  if (!system || !Array.isArray(messages) || !stream) {
    return NextResponse.json(
      { error: "Expected system (string), messages (array), stream: true" },
      { status: 400 },
    );
  }

  const anthropicRes = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens,
      stream: true,
      system,
      messages,
    }),
  });

  if (!anthropicRes.ok) {
    const text = await anthropicRes.text();
    return new NextResponse(text, {
      status: anthropicRes.status,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  if (!anthropicRes.body) {
    return NextResponse.json(
      { error: "No response body from Anthropic" },
      { status: 502 },
    );
  }

  return new NextResponse(anthropicRes.body, {
    status: 200,
    headers: {
      "Content-Type":
        anthropicRes.headers.get("content-type") ?? "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
