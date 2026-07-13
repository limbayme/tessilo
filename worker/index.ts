/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  RESEND_API_KEY?: string;
  INQUIRY_FROM?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

const INQUIRY_TO = "leo@digitauro.com";

type InquiryPayload = {
  product?: unknown;
  quantity?: unknown;
  email?: unknown;
  message?: unknown;
  language?: unknown;
};

function text(value: unknown, maxLength = 1200) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function handleInquiry(request: Request, env: Env) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let payload: InquiryPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const product = text(payload.product, 200);
  const quantity = text(payload.quantity, 80);
  const email = text(payload.email, 320);
  const message = text(payload.message, 3000);
  const language = text(payload.language, 20);

  if (!product || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!env.RESEND_API_KEY) {
    return Response.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const subject = `Tessilo B2B Inquiry — ${product}`;
  const lines = [
    ["Product", product],
    ["Quantity", quantity || "Not specified"],
    ["Business email", email],
    ["Language", language || "Not specified"],
    ["Message", message || "Not specified"],
  ];
  const plainText = lines.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <h2>Tessilo B2B Inquiry</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif">
      ${lines.map(([label, value]) => `
        <tr>
          <th align="left" style="border:1px solid #e5e7eb;background:#f8f9fa">${escapeHtml(label)}</th>
          <td style="border:1px solid #e5e7eb">${escapeHtml(value)}</td>
        </tr>
      `).join("")}
    </table>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.INQUIRY_FROM || "Tessilo <onboarding@resend.dev>",
      to: [INQUIRY_TO],
      reply_to: email,
      subject,
      text: plainText,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend inquiry email failed", errorText);
    return Response.json({ error: "Email send failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/api/inquiry") {
      return handleInquiry(request, env);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
