"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCVStore } from "@/store/cvStore";

// ...existing code...
export default function FormPage() {
  const router = useRouter();
  const { setField, setOptimizedCV } = useCVStore();

  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState(""); // new
  const [birthDate, setBirthDate] = useState("");
  const [summary, setSummary] = useState(""); // new
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState(""); // new (comma separated)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const s = useCVStore.getState();
    setFullName(s.fullName ?? "");
    setTitle(s.title ?? "");
    setBirthDate(s.birthDate ?? "");
    setSummary(s.summary ?? "");
    setEducation(s.education ?? "");
    setExperience(s.experience ?? "");
    setSkills(Array.isArray(s.skills) ? s.skills.join(", ") : (s.skills ?? ""));
  }, []);

  async function optimizeCV() {
    if (!fullName || !education || !experience) {
      alert("Isi Nama, Pendidikan, dan Pengalaman terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          title,
          birthDate,
          summary,
          education,
          experience,
          skills,
        }),
      });

      const text = await res.text();
      let payload: any = null;
      try {
        payload = text ? JSON.parse(text) : null;
      } catch {
        payload = null;
      }

      if (!res.ok) {
        const msg = payload?.error || payload?.details || text || `HTTP ${res.status}`;
        alert("Server error: " + res.status + " — " + msg);
        setLoading(false);
        return;
      }

      const data = payload ?? {};
      if (!data.optimized) {
        alert("Gagal mendapatkan respon dari AI");
        setLoading(false);
        return;
      }

      // store raw optimized text and also keep structured fields
      setOptimizedCV(data.optimized);
      setField("fullName", fullName);
      setField("title", title);
      setField("birthDate", birthDate);
      setField("summary", summary);
      setField("education", education);
      setField("experience", experience);
      setField("skills", skills.split(",").map((s) => s.trim()).filter(Boolean));

      router.push("/preview");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Form Data Diri</h1>

      <input
        placeholder="Nama Lengkap"
        className="input"
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
          setField("fullName", e.target.value);
        }}
      />

      <input
        placeholder="Posisi / Jabatan (contoh: Frontend Developer)"
        className="input"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setField("title", e.target.value);
        }}
      />

      <input
        type="date"
        className="input"
        value={birthDate}
        onChange={(e) => {
          setBirthDate(e.target.value);
          setField("birthDate", e.target.value);
        }}
      />

      <textarea
        placeholder="Ringkasan singkat / Profil (1-3 kalimat)"
        className="input h-24"
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
          setField("summary", e.target.value);
        }}
      />

      <textarea
        placeholder="Riwayat Pendidikan (pisah baris untuk setiap entry)"
        className="input h-28"
        value={education}
        onChange={(e) => {
          setEducation(e.target.value);
          setField("education", e.target.value);
        }}
      />

      <textarea
        placeholder="Pengalaman Kerja (pisah baris, disarankan: Perusahaan — Jabatan — Periode — Pencapaian singkat)"
        className="input h-36"
        value={experience}
        onChange={(e) => {
          setExperience(e.target.value);
          setField("experience", e.target.value);
        }}
      />

      <input
        placeholder="Keahlian (pisahkan dengan koma, contoh: React, TypeScript, CSS)"
        className="input"
        value={skills}
        onChange={(e) => {
          setSkills(e.target.value);
          setField("skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean));
        }}
      />

      <button
        onClick={optimizeCV}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Memproses..." : "Optimalkan dengan AI"}
      </button>
    </div>
  );
}
// ...existing code...