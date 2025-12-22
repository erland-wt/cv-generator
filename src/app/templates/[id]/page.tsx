"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Printer, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function TemplateHandler() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  
  const templateId = params.id;

  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing CV data", e);
      }
    }
  }, []);

  if (!mounted) return null;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-sans p-6">
        <div className="text-center">
          <p className="mb-4 text-gray-500">Data tidak ditemukan.</p>
          <button onClick={() => router.push("/form")} className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">Kembali ke Form</button>
        </div>
      </div>
    );
  }

  // Fungsi Helper untuk parsing skill (string ke array)
  const getSkillsArray = (skills: any) => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills;
    return skills.split(/[,;\n]/).map((s: string) => s.trim()).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white pb-10 font-sans text-slate-900 antialiased">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4 mb-6 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all text-sm font-medium">
            <ArrowLeft size={16} /> Kembali
          </button>
          <button 
            onClick={() => window.print()} 
            className="w-full sm:w-auto justify-center bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <Printer size={16} /> Cetak / Simpan PDF
          </button>
        </div>
      </div>

      <div className="flex justify-center px-4 overflow-hidden md:overflow-visible">
        <div className="cv-scaler origin-top mb-10 shadow-2xl print:shadow-none">
          {(templateId === "1" || templateId === "template1") && <StandardReadable data={data} skills={getSkillsArray(data.skills)} />}
          {(templateId === "2" || templateId === "template2") && <ModernMinimalist data={data} skills={getSkillsArray(data.skills)} />}
          {(templateId === "3" || templateId === "template3") && <ProfessionalBold data={data} skills={getSkillsArray(data.skills)} />}
        </div>
      </div>

      <style jsx global>{`
        .cv-scaler { width: 210mm; min-width: 210mm; background: white; }
        @media (max-width: 850px) {
          .cv-scaler { transform: scale(${typeof window !== 'undefined' ? (window.innerWidth - 32) / 794 : 1}); margin-bottom: -400px; }
        }
        @media (max-width: 480px) { .cv-scaler { margin-bottom: -600px; } }
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; }
          .cv-scaler { transform: scale(1) !important; margin-bottom: 0 !important; }
        }
      `}</style>
    </div>
  );
}

// --- TEMPLATE 1: KLASIK STANDAR (ATS FRIENDLY) ---
const StandardReadable = ({ data, skills }: any) => (
  <div className="p-[1.5cm] min-h-[297mm]">
    <header className="text-center mb-8 border-b-2 border-slate-900 pb-4">
      <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">{data.fullName}</h1>
      <div className="flex justify-center flex-wrap gap-4 text-[10pt] text-slate-600">
        <span className="flex items-center gap-1"><Mail size={12}/>{data.email}</span>
        <span className="flex items-center gap-1"><Phone size={12}/>{data.phone}</span>
        <span className="flex items-center gap-1"><MapPin size={12}/>{data.location}</span>
      </div>
    </header>

    <div className="space-y-6">
      <section>
        <h2 className="text-[11pt] font-bold uppercase border-b border-slate-300 mb-2 italic">Profil Profesional</h2>
        <p className="text-[10pt] leading-relaxed text-justify">{data.optimized || data.summary}</p>
      </section>

      <section>
        <h2 className="text-[11pt] font-bold uppercase border-b border-slate-300 mb-2 italic">Pengalaman Kerja</h2>
        <div className="text-[10pt] whitespace-pre-line leading-relaxed">{data.experience}</div>
      </section>

      <section>
        <h2 className="text-[11pt] font-bold uppercase border-b border-slate-300 mb-2 italic">Pendidikan</h2>
        <div className="text-[10pt] whitespace-pre-line leading-relaxed">{data.education}</div>
      </section>

      {skills.length > 0 && (
        <section>
          <h2 className="text-[11pt] font-bold uppercase border-b border-slate-300 mb-2 italic">Keahlian</h2>
          <div className="flex flex-wrap gap-y-1 gap-x-4 text-[10pt]">
            {skills.map((skill: string, i: number) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-900 rounded-full"></span>{skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);

// --- TEMPLATE 2: MODERN MINIMALIST (CLEAN & TIDY) ---
const ModernMinimalist = ({ data, skills }: any) => (
  <div className="min-h-[297mm] flex flex-col">
    <div className="bg-slate-50 p-10 flex justify-between items-end border-b border-slate-200">
      <div>
        <h1 className="text-4xl font-light text-slate-900 tracking-tighter uppercase">{data.fullName}</h1>
        <p className="text-blue-600 font-bold tracking-[0.2em] text-sm mt-1">{data.title || "PROFESIONAL"}</p>
      </div>
      <div className="text-right text-[9pt] text-slate-500 space-y-1">
        <p>{data.email}</p>
        <p>{data.phone}</p>
        <p>{data.location}</p>
      </div>
    </div>

    <div className="p-10 grid grid-cols-12 gap-10 flex-grow">
      <div className="col-span-8 space-y-8">
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Ringkasan Eksekutif</h2>
          <p className="text-[10pt] leading-relaxed text-slate-700">{data.optimized || data.summary}</p>
        </section>
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Riwayat Kerja</h2>
          <div className="text-[10pt] whitespace-pre-line leading-relaxed border-l-2 border-slate-100 pl-4 italic">{data.experience}</div>
        </section>
      </div>

      <div className="col-span-4 space-y-8">
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Pendidikan</h2>
          <div className="text-[9pt] whitespace-pre-line leading-relaxed text-slate-600 font-medium">{data.education}</div>
        </section>
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Keahlian Teknis</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string, i: number) => (
              <span key={i} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[8pt] rounded font-semibold uppercase">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

// --- TEMPLATE 3: PROFESSIONAL BOLD (TEGAS & BERKARAKTER) ---
const ProfessionalBold = ({ data, skills }: any) => (
  <div className="min-h-[297mm] flex shadow-inner">
    {/* Sidebar Kiri */}
    <div className="w-[70mm] bg-slate-900 text-white p-8 flex flex-col">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-2xl font-black uppercase leading-tight mb-2 tracking-tighter">{data.fullName}</h1>
        <div className="h-1 w-12 bg-blue-500 mb-6"></div>
        <div className="space-y-4 text-[8.5pt] opacity-80 font-light">
          <p className="flex items-center gap-3"><Mail size={14} className="text-blue-400"/> {data.email}</p>
          <p className="flex items-center gap-3"><Phone size={14} className="text-blue-400"/> {data.phone}</p>
          <p className="flex items-center gap-3"><MapPin size={14} className="text-blue-400"/> {data.location}</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-[10pt] font-bold uppercase tracking-widest text-blue-400 mb-4 border-b border-slate-700 pb-1">Pendidikan</h2>
          <div className="text-[8.5pt] whitespace-pre-line leading-relaxed opacity-90">{data.education}</div>
        </section>

        <section>
          <h2 className="text-[10pt] font-bold uppercase tracking-widest text-blue-400 mb-4 border-b border-slate-700 pb-1">Keahlian Utama</h2>
          <div className="space-y-2">
            {skills.map((skill: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-[8.5pt]">
                <div className="w-1.5 h-1.5 bg-blue-500 rotate-45"></div>
                {skill}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>

    {/* Konten Kanan */}
    <div className="flex-1 p-10 bg-white">
      <section className="mb-10">
        <h2 className="text-[14pt] font-black uppercase text-slate-900 mb-4 flex items-center gap-3">
           <span className="w-8 h-1 bg-slate-900"></span> Profil Profesional
        </h2>
        <p className="text-[10.5pt] leading-relaxed text-slate-700 font-medium">
          {data.optimized || data.summary}
        </p>
      </section>

      <section>
        <h2 className="text-[14pt] font-black uppercase text-slate-900 mb-4 flex items-center gap-3">
          <span className="w-8 h-1 bg-slate-900"></span> Pengalaman Kerja
        </h2>
        <div className="text-[10.5pt] whitespace-pre-line leading-loose text-slate-800 font-bold border-l-4 border-slate-100 pl-6">
          {data.experience}
        </div>
      </section>
    </div>
  </div>
);