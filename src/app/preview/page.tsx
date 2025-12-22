"use client";

import React, { useEffect, useState } from "react";
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

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false); // State untuk modal

  // Fungsi untuk mengarahkan ke halaman template yang dipilih
  const handleSelectTemplate = (id: number) => {
    router.push(`/templates/${id}`);
  };

  useEffect(() => {
    const loadData = () => {
      // 1. Coba ambil dari localStorage terlebih dahulu (Metode Paling Aman & Stabil)
      const savedData = localStorage.getItem('cvData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setCvData(parsedData);
          setLoading(false);
          return; // Keluar jika berhasil mengambil dari storage
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      }

      // 2. Jika localStorage kosong, baru coba ambil dari query params (Fallback)
      const dataParam = searchParams.get('data');
      if (dataParam) {
        try {
          // Melindungi dari karakter malformed dengan replace dan try-catch yang ketat
          const decoded = decodeURIComponent(dataParam.replace(/\+/g, " "));
          const parsedData = JSON.parse(decoded);
          setCvData(parsedData);
        } catch (error) {
          console.error("Error decoding or parsing query params:", error);
          // Jika malformed, biarkan cvData null agar tidak crash
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

  const handleEdit = () => {
    router.push("/form");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data CV...</p>
        </div>
      </div>
    );
  }

  if (!cvData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 print:py-0 print:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Header Actions */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <div>
            <button
              onClick={() => router.push("/form")}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Form
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Preview CV Anda</h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Data
            </button>
            {/* Tombol Cetak memicu Modal */}
            <button
              onClick={() => setShowTemplateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Cetak / Download
            </button>
          </div>
        </div>

        {/* CV Container (Tetap sesuai aslinya) */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 print:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center print:w-16 print:h-16">
                    <User className="w-10 h-10 print:w-8 print:h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold print:text-3xl">
                      {cvData.fullName || "Nama Lengkap"}
                    </h1>
                    <p className="text-blue-100 text-lg mt-1 print:text-base">
                      {cvData.title || "Profesi"}
                    </p>
                    {cvData.summary && (
                      <p className="mt-3 text-blue-100/90 max-w-2xl print:text-sm print:mt-2">
                        {cvData.summary.split("\n")[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[200px] print:p-3">
                <div className="space-y-2 print:space-y-1">
                  {cvData.birthDate && (
                    <div className="flex items-center gap-2 print:gap-1">
                      <Calendar className="w-4 h-4 print:w-3 print:h-3" />
                      <span className="print:text-sm">{formatDate(cvData.birthDate)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 print:gap-1">
                    <Mail className="w-4 h-4 print:w-3 print:h-3" />
                    <span className="print:text-sm">{cvData.email || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2 print:gap-1">
                    <Phone className="w-4 h-4 print:w-3 print:h-3" />
                    <span className="print:text-sm">{cvData.phone || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2 print:gap-1">
                    <MapPin className="w-4 h-4 print:w-3 print:h-3" />
                    <span className="print:text-sm">{cvData.location || "-"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 print:p-6 print:gap-6">
            <div className="lg:col-span-1 space-y-8 print:space-y-6">
              <section>
                <div className="flex items-center gap-3 mb-4 print:mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg print:p-1">
                    <Award className="w-5 h-5 text-blue-600 print:w-4 print:h-4" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 print:text-lg">Keahlian</h2>
                </div>
                <div className="flex flex-wrap gap-2 print:gap-1">
                  {getSkillsArray().map((skill: string, i: number) => (
                    <span key={i} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium print:px-2 print:py-1 print:text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4 print:mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg print:p-1">
                    <GraduationCap className="w-5 h-5 text-blue-600 print:w-4 print:h-4" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 print:text-lg">Pendidikan</h2>
                </div>
                <div className="space-y-4 print:space-y-3">
                  {cvData.education?.split("\n").filter(l => l.trim()).map((edu, i) => (
                    <div key={i} className="pl-4 border-l-2 border-blue-200 print:pl-3">
                      <p className="text-gray-700 print:text-sm">{edu}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-2 space-y-8 print:space-y-6">
              <section>
                <div className="flex items-center gap-3 mb-4 print:mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg print:p-1">
                    <User className="w-5 h-5 text-blue-600 print:w-4 print:h-4" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 print:text-lg">Profil Profesional</h2>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 print:p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line print:text-sm">
                    {cvData.optimized || cvData.summary}
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4 print:mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg print:p-1">
                    <Briefcase className="w-5 h-5 text-blue-600 print:w-4 print:h-4" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 print:text-lg">Pengalaman Kerja</h2>
                </div>
                <div className="space-y-6 print:space-y-4">
                  <div className="p-5 border border-gray-200 rounded-xl print:p-3">
                    <p className="text-gray-700 whitespace-pre-line print:text-sm">{cvData.experience}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* MODAL PILIHAN TEMPLATE */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:hidden">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Pilih Desain CV</h2>
                <button onClick={() => setShowTemplateModal(false)}><X className="w-6 h-6 text-gray-400 hover:text-gray-600" /></button>
              </div>
              <div className="grid gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleSelectTemplate(num)}
                    className="p-4 border-2 border-gray-100 hover:border-blue-500 rounded-lg text-left transition-all hover:bg-blue-50"
                  >
                    <p className="font-semibold text-gray-800">Template ATS {num}</p>
                    <p className="text-xs text-gray-500">
                      {num === 1 ? "Klasik Standar" : num === 2 ? "Modern Minimalis" : "Profesional Bold"}
                    </p>
                  </button>
                ))}
              </div>
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