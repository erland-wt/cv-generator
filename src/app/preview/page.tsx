"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Edit2, Printer, ArrowLeft, User, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Calendar, X } from "lucide-react";

interface CVData {
  fullName: string;
  email: string;    
  phone: string;    
  location: string; 
  title: string;
  birthDate: string;
  summary: string;
  education: string;
  experience: string;
  skills: string | string[];
  optimized?: string;
}

function PreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleSelectTemplate = (id: number) => {
    router.push(`/templates/${id}`);
  };

  useEffect(() => {
    const loadData = () => {
      const savedData = localStorage.getItem('cvData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setCvData(parsedData);
          setLoading(false);
          return;
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      }

      const dataParam = searchParams.get('data');
      if (dataParam) {
        try {
          const decoded = decodeURIComponent(dataParam.replace(/\+/g, " "));
          const parsedData = JSON.parse(decoded);
          setCvData(parsedData);
        } catch (error) {
          console.error("Error decoding or parsing query params:", error);
        }
      }
      
      setLoading(false);
    };

    loadData();
  }, [searchParams]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getSkillsArray = () => {
    if (!cvData?.skills) return [];
    if (Array.isArray(cvData.skills)) return cvData.skills;
    return cvData.skills.split(/[,;\n]/).map(skill => skill.trim()).filter(Boolean);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm md:text-base text-gray-600">Memuat data CV...</p>
        </div>
      </div>
    );
  }

  if (!cvData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-4 md:py-8 px-3 md:px-4 print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Actions: Sticky on mobile for better accessibility */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <div className="text-center sm:text-left">
            <button
              onClick={() => router.push("/form")}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Pengisian
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Preview CV Anda</h1>
          </div>
          
          <div className="flex gap-2 sm:gap-3 justify-center sm:justify-end">
            <button
              onClick={() => router.push("/form")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium transition-all shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-bold transition-all shadow-lg shadow-blue-200"
            >
              <Printer className="w-4 h-4" />
              Pilih Desain
            </button>
          </div>
        </div>

        {/* CV Card Container */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
          
          {/* Top Banner (Header) */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6 md:p-10 print:p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                    {cvData.fullName || "Nama Lengkap"}
                  </h2>
                  <p className="text-blue-100 text-base md:text-xl font-medium">
                    {cvData.title || "Posisi / Bidang Pekerjaan"}
                  </p>
                </div>
              </div>
              
              {/* Info Contact Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 w-full md:w-auto self-stretch md:self-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 text-sm md:text-[13px] lg:text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-200 flex-shrink-0" />
                    <span className="truncate">{cvData.email || "-"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-200 flex-shrink-0" />
                    <span>{cvData.phone || "-"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-blue-200 flex-shrink-0" />
                    <span>{cvData.location || "-"}</span>
                  </div>
                  {cvData.birthDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-blue-200 flex-shrink-0" />
                      <span>{formatDate(cvData.birthDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="p-6 md:p-10 lg:p-12 print:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Summary & Experience */}
              <div className="lg:col-span-8 space-y-10">
                
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Profil Profesional</h3>
                  </div>
                  <div className="bg-gray-50/50 rounded-2xl p-5 md:p-6 border border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {cvData.optimized || cvData.summary}
                    </p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Pengalaman Kerja</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {cvData.experience}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Skills & Education */}
              <div className="lg:col-span-4 space-y-10">
                
                <section>
                  <div className="flex items-center gap-3 mb-4 text-gray-900">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Award className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-wider">Keahlian</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getSkillsArray().map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs md:text-sm font-semibold border border-blue-100/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4 text-gray-900">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-wider">Pendidikan</h3>
                  </div>
                  <div className="space-y-4">
                    {cvData.education?.split("\n").filter(l => l.trim()).map((edu, i) => (
                      <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <p className="text-sm md:text-base text-gray-700 font-medium">{edu}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-xs md:text-sm text-gray-400 print:hidden italic">
          Gunakan tombol cetak untuk memilih template desain ATS-Friendly lainnya.
        </p>

        {/* MODAL PILIHAN TEMPLATE: Improved for mobile touch */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 print:hidden">
            <div className="bg-white rounded-t-3xl sm:rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pilih Desain CV</h2>
                  <p className="text-xs text-gray-500">Sesuaikan dengan karakter profesional Anda</p>
                </div>
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <div className="grid gap-4">
                {[
                  { id: 1, name: "Klasik Standar", desc: "Sangat direkomendasikan untuk ATS", icon: "📄" },
                  { id: 2, name: "Modern Minimalis", desc: "Bersih dengan sentuhan aksen biru", icon: "✨" },
                  { id: 3, name: "Profesional Bold", desc: "Tampilan berani untuk kesan kuat", icon: "👔" }
                ].map((temp) => (
                  <button
                    key={temp.id}
                    onClick={() => handleSelectTemplate(temp.id)}
                    className="flex items-center gap-4 p-4 border-2 border-gray-50 hover:border-blue-500 rounded-2xl text-left transition-all hover:bg-blue-50 group"
                  >
                    <div className="text-2xl bg-gray-50 group-hover:bg-white w-12 h-12 flex items-center justify-center rounded-xl transition-colors">
                      {temp.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Template {temp.id}: {temp.name}</p>
                      <p className="text-xs text-gray-500">{temp.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              {/* Mobile Close Indicator */}
              <button 
                onClick={() => setShowTemplateModal(false)}
                className="mt-6 w-full py-3 text-sm font-medium text-gray-400 sm:hidden"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}