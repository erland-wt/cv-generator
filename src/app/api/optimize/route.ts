import { NextResponse } from "next/server";
// ...existing code...
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, birthDate, education, experience } = body ?? {};

    if (!fullName || !education || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = `
Optimalisasikan data CV berikut agar sesuai dengan sistem pelacakan pelamar (ATS) dan menarik bagi perekrut. Gunakan bahasa yang jelas, ringkas, dan profesional. Soroti keterampilan utama, pengalaman, dan pencapaian yang relevan.

Berikut data CV:
Name: ${fullName}
Birth date: ${birthDate}
Education: ${education}
Experience: ${experience}
`;

    // If API key is missing, return deterministic fallback so UI can be tested
    if (!process.env.GROQ_API_KEY) {
      const fallback = `Optimized (fallback): ${fullName} — ${education} — ${experience}`;
      console.warn("GROQ_API_KEY not set. Returning fallback optimized text.");
      return NextResponse.json({ optimized: fallback, warning: "no_api_key" });
    }

    // allow overriding model via .env.local (GROQ_MODEL). Provide sensible default.
    const model = process.env.GROQ_MODEL || "gpt-4o-mini";

    const url = "https://api.groq.com/openai/v1/chat/completions";

    const groqRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are an ATS CV optimizer." },
          { role: "user", content: prompt },
        ],
        max_tokens: 800,
        temperature: 0.2,
      }),
    });

    // read body once and parse
    const text = await groqRes.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = null;
    }
    console.log("GROQ raw response:", text);

    // handle model_not_found specifically and return a safe fallback so the UI continues working
    const modelNotFound =
      data?.error?.code === "model_not_found" ||
      data?.error?.message?.toLowerCase?.().includes("model") && data?.error?.message?.toLowerCase?.().includes("not");

    if (modelNotFound) {
      console.warn(`GROQ model not found (${model}). Returning deterministic fallback. Set GROQ_MODEL in .env.local to a valid model to use GROQ.`);
      const fallback = `Optimized (model fallback): ${fullName} — ${education} — ${experience}`;
      return NextResponse.json({ optimized: fallback, warning: "model_not_found" });
    }

    if (!groqRes.ok) {
      const errMsg = data?.error || text || `GROQ returned ${groqRes.status}`;
      return NextResponse.json({ error: errMsg }, { status: groqRes.status });
    }

    const content =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      data?.output?.[0]?.content ??
      (typeof data === "string" ? data : null) ??
      text ??
      null;

    if (!content) {
      console.error("Unexpected GROQ response shape:", data);
      return NextResponse.json({ error: "Unexpected response from GROQ" }, { status: 500 });
    }

    return NextResponse.json({ optimized: content });
  } catch (err: any) {
    console.error("API route error:", err);
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}
// ...existing code...