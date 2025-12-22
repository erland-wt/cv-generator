import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, birthDate, education, experience, title, summary, skills } = body ?? {};

    if (!fullName || !education || !experience) {
      return NextResponse.json(
        { error: "Mohon isi Nama, Pendidikan, dan Pengalaman." }, // Pesan teks biasa
        { status: 400 }
      );
    }

    // Perbaikan Prompt: Fokus pada pembuatan 'Professional Summary' yang manusiawi
    const prompt = `
Buatkan profil profesional CV yang ringkas, padat, dan informatif dalam sudut pandang ORANG PERTAMA (Saya).

Data User:
- Nama: ${fullName}
- Jabatan/Target: ${title}
- Pendidikan: ${education}
- Pengalaman Utama: ${experience}
- Keahlian: ${Array.isArray(skills) ? skills.join(", ") : skills}

Ketentuan Penulisan (Wajib):
1. Panjang teks maksimal 2-3 kalimat saja (Singkat namun berbobot).
2. Kalimat 1: Sebutkan profesi, total tahun pengalaman, dan spesialisasi utama.
3. Kalimat 2: Soroti 1-2 pencapaian konkret atau dampak yang dihasilkan dari keahlian teknis saya.
4. Kalimat 3 (Opsional): Hubungkan dengan tujuan profesional atau nilai tambah yang saya bawa.
5. Gunakan kata kerja aktif (Contoh: "Saya mengelola", "Saya mengembangkan", "Saya mengoptimalkan").
6. Hindari kata-kata mubazir dan deskripsi yang terlalu umum.
7. Pastikan ATS-Friendly dengan menyisipkan kata kunci keahlian yang relevan secara natural.

Hanya berikan hasil profilnya saja tanpa tanda petik atau kalimat pembuka.
`;

    if (!process.env.GROQ_API_KEY) {
      const fallback = `${fullName} adalah seorang ${title} dengan latar belakang pendidikan ${education}. Memiliki pengalaman signifikan dalam: ${experience}. Berkomitmen untuk memberikan kontribusi terbaik bagi perusahaan melalui keahlian yang dimiliki.`;
      return NextResponse.json({ optimized: fallback, warning: "no_api_key" });
    }

    // Default model Groq yang stabil (Llama 3 70B atau 8B biasanya bagus untuk teks Indonesia)
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const url = "https://api.groq.com/openai/v1/chat/completions";

    const groqRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: "Anda adalah pakar penulisan CV eksekutif. Tugas Anda adalah menulis profil profesional yang sangat padat, to-the-point, dan bebas dari kata-kata yang tidak perlu (fluff-free)." 
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 250, // Dibatasi agar AI tidak menulis terlalu panjang
        temperature: 0.6, // Fokus pada konsistensi dan ketepatan
      }),
    });

    const text = await groqRes.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = null;
    }

    if (!groqRes.ok) {
      // Ambil pesan error dari data.error jika ada, jika tidak gunakan teks status
      const errMsg = data?.error?.message || data?.error || text || `Error status: ${groqRes.status}`;
      return NextResponse.json({ error: errMsg }, { status: groqRes.status });
    }

    const content = data?.choices?.[0]?.message?.content?.trim() ?? text;

    if (!content) {
      return NextResponse.json({ error: "Unexpected response from GROQ" }, { status: 500 });
    }

    return NextResponse.json({ optimized: content });
  } catch (err: any) {
    console.error("API route error:", err);
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}