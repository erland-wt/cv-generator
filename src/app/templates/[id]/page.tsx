"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-white font-sans">
        <button onClick={() => router.push("/form")} className="text-sm border-b border-black pb-1">Data tidak ditemukan. Kembali ke Form.</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white pb-20 font-sans text-slate-900 antialiased">
      {/* TOOLBAR */}
      <div className="max-w-[210mm] mx-auto py-6 flex justify-between items-center px-8 print:hidden">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all text-sm font-medium">
          <ArrowLeft size={16} /> Kembali
        </button>
        <button 
          onClick={() => window.print()} 
          className="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <Printer size={16} /> Simpan / Cetak CV
        </button>
      </div>

      {/* AREA RENDER TEMPLATE */}
      <div className="flex justify-center print:mt-0">
        {(templateId === "1" || templateId === "template1") && <StandardReadable data={data} />}
        {(templateId === "2" || templateId === "template2") && <ModernClean data={data} />}
        {(templateId === "3" || templateId === "template3") && <ProfessionalExecutive data={data} />}
      </div>

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; background: white !important; }
          .print-hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// --- TEMPLATE 1: STANDARD READABLE (Layout Linear Paling Disukai ATS) ---
const StandardReadable = ({ data }: any) => (
  <div className="bg-white w-[210mm] min-h-[297mm] p-[1.5cm] shadow-sm print:shadow-none">
    <header className="mb-10 text-center">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 uppercase">{data.fullName}</h1>
      <div className="flex justify-center gap-3 text-sm text-slate-500 font-medium">
        <span>{data.email}</span>
        <span className="text-slate-300">•</span>
        <span>{data.phone}</span>
        <span className="text-slate-300">•</span>
        <span>{data.location}</span>
      </div>
    </header>

    <div className="space-y-8">
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-3 border-b border-slate-100 pb-1">Profil Profesional</h2>
        <p className="text-[10.5pt] leading-[1.6] text-slate-700">{data.optimized || data.summary}</p>
      </section>

      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4 border-b border-slate-100 pb-1">Pengalaman Kerja</h2>
        <div className="text-[10pt] leading-[1.7] text-slate-700 whitespace-pre-line">
          {data.experience}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4 border-b border-slate-100 pb-1">Pendidikan</h2>
        <div className="text-[10pt] leading-[1.7] text-slate-700 whitespace-pre-line">
          {data.education}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-3 border-b border-slate-100 pb-1">Keahlian</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10pt] text-slate-700 font-medium">
          {(Array.isArray(data.skills) ? data.skills : data.skills.split(',')).map((s: string, i: number) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              {s.trim()}
            </span>
          ))}
        </div>
      </section>
    </div>
  </div>
);

// --- TEMPLATE 2: MODERN CLEAN (Pembagian Kolom yang Rapi) ---
const ModernClean = ({ data }: any) => (
  <div className="bg-white w-[210mm] min-h-[297mm] p-[1.5cm] shadow-sm print:shadow-none grid grid-cols-12 gap-10">
    {/* Kolom Kiri - Header & Deskripsi */}
    <div className="col-span-12 mb-6">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-1">{data.fullName}</h1>
      <p className="text-lg font-bold text-blue-600 mb-6 uppercase tracking-wider">{data.title}</p>
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 text-sm font-medium text-slate-500">
        <p>Email: {data.email}</p>
        <p>Telp: {data.phone}</p>
        <p>Lokasi: {data.location}</p>
      </div>
    </div>

    {/* Main Content */}
    <div className="col-span-8 space-y-10">
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Pengalaman Kerja</h2>
        <div className="text-[10pt] leading-[1.6] text-slate-700 whitespace-pre-line pl-4 border-l-2 border-slate-50">
          {data.experience}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Pendidikan</h2>
        <div className="text-[10pt] leading-[1.6] text-slate-700 whitespace-pre-line pl-4 border-l-2 border-slate-50">
          {data.education}
        </div>
      </section>
    </div>

    {/* Sidebar Content */}
    <div className="col-span-4 space-y-10">
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Ringkasan</h2>
        <p className="text-[9.5pt] leading-relaxed text-slate-600">{data.optimized || data.summary}</p>
      </section>

      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Keahlian Utama</h2>
        <div className="flex flex-col gap-2">
          {(Array.isArray(data.skills) ? data.skills : data.skills.split(',')).map((s: string, i: number) => (
            <div key={i} className="text-[9.5pt] font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded border border-slate-100 uppercase tracking-tighter">
              {s.trim()}
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

// --- TEMPLATE 3: PROFESSIONAL EXECUTIVE (Kuat & Elegan) ---
const ProfessionalExecutive = ({ data }: any) => (
  <div className="bg-white w-[210mm] min-h-[297mm] p-[1.5cm] shadow-sm print:shadow-none">
    <div className="flex justify-between items-start mb-12">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">{data.fullName}</h1>
        <p className="text-lg text-slate-400 font-medium uppercase tracking-[0.3em]">{data.title}</p>
      </div>
      <div className="text-right text-sm font-semibold text-slate-500 space-y-1 pt-2">
        <p className="border-b border-slate-100 pb-1">{data.email}</p>
        <p className="border-b border-slate-100 pb-1">{data.phone}</p>
        <p>{data.location}</p>
      </div>
    </div>

    <div className="space-y-12">
      <section>
        <p className="text-[11pt] leading-[1.8] text-slate-600 italic font-light">
          "{data.optimized || data.summary}"
        </p>
      </section>

      <section>
        <h2 className="text-[11pt] font-black uppercase border-l-4 border-slate-900 pl-4 mb-6">Riwayat Profesional</h2>
        <div className="text-[10.5pt] leading-[1.7] text-slate-700 whitespace-pre-line pl-5">
          {data.experience}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-12">
        <section>
          <h2 className="text-[11pt] font-black uppercase border-l-4 border-slate-900 pl-4 mb-6">Pendidikan</h2>
          <div className="text-[10pt] leading-[1.7] text-slate-700 whitespace-pre-line pl-5">
            {data.education}
          </div>
        </section>
        <section>
          <h2 className="text-[11pt] font-black uppercase border-l-4 border-slate-900 pl-4 mb-6">Kompetensi</h2>
          <div className="text-[10pt] leading-[1.7] text-slate-700 pl-5 space-y-1">
             {(Array.isArray(data.skills) ? data.skills : data.skills.split(',')).map((s: string, i: number) => (
              <p key={i}>• {s.trim()}</p>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);