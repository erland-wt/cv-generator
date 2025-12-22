"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Printer, Mail, Phone, MapPin } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white pb-10 font-sans text-slate-900 antialiased">
      {/* TOOLBAR RESPONSIF */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4 mb-6 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all text-sm font-medium">
            <ArrowLeft size={16} /> Kembali
          </button>
          <div className="flex items-center gap-4 w-full sm:w-auto">
             <button 
              onClick={() => window.print()} 
              className="flex-1 sm:flex-none justify-center bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Printer size={16} /> Cetak / Simpan PDF
            </button>
          </div>
        </div>
      </div>

      {/* WRAPPER CV DENGAN AUTO-SCALING UNTUK MOBILE */}
      <div className="flex justify-center px-4 overflow-hidden md:overflow-visible">
        <div className="cv-scaler origin-top mb-10">
          {(templateId === "1" || templateId === "template1") && <StandardReadable data={data} />}
          {(templateId === "2" || templateId === "template2") && <ModernClean data={data} />}
          {(templateId === "3" || templateId === "template3") && <ProfessionalExecutive data={data} />}
        </div>
      </div>

      {/* CSS KHUSUS RESPONSIF & PRINT */}
      <style jsx global>{`
        /* Container scaling logic */
        .cv-scaler {
          width: 210mm;
          min-width: 210mm;
        }

        @media (max-width: 850px) {
          .cv-scaler {
            transform: scale(${typeof window !== 'undefined' ? (window.innerWidth - 32) / 794 : 1});
            margin-bottom: -400px; /* Mencegah whitespace berlebih akibat scaling */
          }
        }

        @media (max-width: 480px) {
           .cv-scaler {
            margin-bottom: -600px;
          }
        }

        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; background: white !important; }
          .print-hidden { display: none !important; }
          .cv-scaler { 
            transform: scale(1) !important; 
            margin-bottom: 0 !important;
            box-shadow: none !important;
          }
          .bg-gray-100 { background-color: white !important; }
        }
      `}</style>
    </div>
  );
}

// --- TEMPLATE COMPONENTS (Sama seperti sebelumnya, dibungkus div A4) ---

const StandardReadable = ({ data }: any) => (
  <div className="bg-white w-[210mm] min-h-[297mm] p-[1.5cm] shadow-2xl print:shadow-none mx-auto overflow-hidden">
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
        <div className="text-[10pt] leading-[1.7] text-slate-700 whitespace-pre-line">{data.experience}</div>
      </section>
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4 border-b border-slate-100 pb-1">Pendidikan</h2>
        <div className="text-[10pt] leading-[1.7] text-slate-700 whitespace-pre-line">{data.education}</div>
      </section>
    </div>
  </div>
);

const ModernClean = ({ data }: any) => (
  <div className="bg-white w-[210mm] min-h-[297mm] p-[1.5cm] shadow-2xl print:shadow-none grid grid-cols-12 gap-10 mx-auto overflow-hidden">
    <div className="col-span-12 mb-6">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-1">{data.fullName}</h1>
      <p className="text-lg font-bold text-blue-600 mb-6 uppercase tracking-wider">{data.title}</p>
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 text-sm font-medium text-slate-500">
        <p>{data.email}</p><p>{data.phone}</p><p>{data.location}</p>
      </div>
    </div>
    <div className="col-span-8 space-y-10">
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Pengalaman Kerja</h2>
        <div className="text-[10pt] leading-[1.6] text-slate-700 whitespace-pre-line pl-4 border-l-2 border-slate-50">{data.experience}</div>
      </section>
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Pendidikan</h2>
        <div className="text-[10pt] leading-[1.6] text-slate-700 whitespace-pre-line pl-4 border-l-2 border-slate-50">{data.education}</div>
      </section>
    </div>
    <div className="col-span-4 space-y-10">
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Ringkasan</h2>
        <p className="text-[9.5pt] leading-relaxed text-slate-600">{data.optimized || data.summary}</p>
      </section>
    </div>
  </div>
);

const ProfessionalExecutive = ({ data }: any) => (
  <div className="bg-white w-[210mm] min-h-[297mm] p-[1.5cm] shadow-2xl print:shadow-none mx-auto overflow-hidden text-black">
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
      <section><p className="text-[11pt] leading-[1.8] text-slate-600 italic font-light italic">"{data.optimized || data.summary}"</p></section>
      <section>
        <h2 className="text-[11pt] font-black uppercase border-l-4 border-slate-900 pl-4 mb-6">Riwayat Profesional</h2>
        <div className="text-[10.5pt] leading-[1.7] text-slate-700 whitespace-pre-line pl-5">{data.experience}</div>
      </section>
    </div>
  </div>
);