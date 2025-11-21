"use client";

import React from "react";
import { useCVStore } from "@/store/cvStore";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const router = useRouter();
  // selector to get only needed fields (avoids unused fields warning)
  const optimizedCV = useCVStore((s) => s.optimizedCV);
  const fullName = useCVStore((s) => s.fullName);
  const birthDate = useCVStore((s) => s.birthDate);
  const education = useCVStore((s) => s.education);
  const experience = useCVStore((s) => s.experience);
  const summary = useCVStore((s) => s.summary);
  const title = useCVStore((s) => s.title);
  const skills = useCVStore((s) => s.skills);

  const cleanedOptimized = (optimizedCV ?? "").replace(/^\s*Optimized\s*\(.*?\)\s*:\s*/i, "").trim();

  function parseCV(text: string) {
    const headings = [
      "profile",
      "profil",
      "summary",
      "ringkasan",
      "experience",
      "pengalaman",
      "education",
      "pendidikan",
      "skills",
      "keahlian",
      "projects",
      "proyek",
      "certifications",
      "sertifikasi",
      "achievements",
      "prestasi",
    ];

    const sections: Record<string, string> = {};
    let current = "profile";
    sections[current] = "";

    const lines = (text || "").replace(/\r/g, "").split("\n");

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        sections[current] += "\n";
        continue;
      }

      const lower = line.toLowerCase().replace(/[:\s]+$/g, "");
      if (headings.includes(lower)) {
        current = lower;
        if (!sections[current]) sections[current] = "";
        continue;
      }

      const firstWord = line.split(/\s+/)[0].toLowerCase().replace(/[:\s]+$/g, "");
      if (headings.includes(firstWord)) {
        current = firstWord;
        sections[current] += line.replace(new RegExp(`^${firstWord}[:\\-\\s]*`, "i"), "") + "\n";
        continue;
      }

      sections[current] += (sections[current] ? "\n" : "") + line;
    }

    return sections;
  }

  const baseText = cleanedOptimized || `${summary ?? ""}\n\n${education ?? ""}\n\n${experience ?? ""}`;
  const sections = parseCV(baseText);

  const profileText = sections.profile?.trim() || (summary ?? "");
  const experienceText = sections.experience?.trim() || (experience ?? "");
  const educationText = sections.education?.trim() || (education ?? "");
  const skillsText =
    sections.skills?.trim() || (Array.isArray(skills) ? skills.join(", ") : (skills ?? ""));

  function renderListFromLines(text: string) {
    if (!text) return null;
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    return (
      <div className="space-y-3">
        {lines.map((l: string, i: number) => (
          <div key={i} className="p-3 border rounded bg-white">
            <div className="text-sm text-gray-700 whitespace-pre-wrap">{l}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 print:p-0 print:shadow-none">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">{fullName || "Nama Lengkap"}</h1>
          <div className="text-lg text-gray-700 mt-1">{title || (profileText.split("\n")[0] || "")}</div>
        </div>

        <div className="text-right mt-4 md:mt-0 text-sm text-gray-600">
          {birthDate ? <div>Lahir: {birthDate}</div> : null}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="md:col-span-1 bg-gray-50 p-5 rounded">
          <h2 className="text-lg font-semibold mb-3">Informasi</h2>

          <div className="text-sm text-gray-700 space-y-3">
            <div>
              <div className="text-xs text-gray-500">Nama</div>
              <div className="font-medium">{fullName || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Jabatan</div>
              <div className="font-medium">{title || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Tanggal Lahir</div>
              <div>{birthDate || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Pendidikan</div>
              <div className="text-sm text-gray-600 whitespace-pre-wrap">{educationText || "-"}</div>
            </div>

            {skillsText ? (
              <div>
                <div className="text-xs text-gray-500">Keahlian</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skillsText
                    .split(/[,;\n]/)
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                    .slice(0, 20)
                    .map((sk: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {sk}
                      </span>
                    ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 space-y-2">
            <button onClick={() => router.push("/form")} className="w-full px-3 py-2 bg-yellow-500 text-white rounded">
              Edit CV
            </button>
            <button onClick={() => router.push("/edit")} className="w-full px-3 py-2 bg-gray-800 text-white rounded">
              Edit Hasil Optimalisasi
            </button>
          </div>
        </aside>

        <main className="md:col-span-2">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Profil / Ringkasan</h2>
            <div className="text-gray-800 whitespace-pre-wrap">
              {profileText ? profileText.split("\n").map((p: string, i: number) => <p key={i} className="mb-2">{p}</p>) : <p className="text-gray-500">Belum ada profil.</p>}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Pengalaman Kerja</h2>
            <div className="text-gray-800">
              {experienceText ? renderListFromLines(experienceText) : <p className="text-gray-500">Belum ada pengalaman.</p>}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Pendidikan</h2>
            <div className="text-gray-800">
              {educationText ? renderListFromLines(educationText) : <p className="text-gray-500">Belum ada riwayat pendidikan.</p>}
            </div>
          </section>

          {cleanedOptimized && !(profileText || experienceText || educationText) ? (
            <section>
              <h2 className="text-xl font-semibold mb-2">Hasil Optimalisasi</h2>
              <div className="text-gray-800 whitespace-pre-wrap">{cleanedOptimized}</div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}