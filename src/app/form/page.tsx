"use client";

import { useState, useCallback, memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, User, Briefcase, GraduationCap, Calendar, FileText, Award, ChevronRight, Loader2, Mail, Phone, MapPin, ChevronLeft } from "lucide-react";

// Komponen InputField yang sudah responsif
const InputField = memo(({ 
  icon: Icon, 
  label, 
  field, 
  type = "text", 
  placeholder, 
  required = false,
  textarea = false,
  value,
  onChange
}: {
  icon: any;
  label: string;
  field: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  value: string;
  onChange: (field: string, value: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className="space-y-1.5 md:space-y-2">
      <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
          rows={textarea && field === "summary" ? 3 : 5}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

const SelectField = memo(({ icon: Icon, label, field, options, value, onChange, required }: any) => (
  <div className="space-y-1.5 md:space-y-2">
    <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white transition-all appearance-none cursor-pointer outline-none"
      >
        <option value="">Pilih Provinsi</option>
        {options.map((prov: string) => (
          <option key={prov} value={prov}>{prov}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronRight className="w-4 h-4 rotate-90" />
      </div>
    </div>
  </div>
));
SelectField.displayName = 'SelectField';

const INDONESIA_PROVINCES = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi", 
  "Sumatera Selatan", "Kepulauan Bangka Belitung", "Bengkulu", "Lampung", 
  "DKI Jakarta", "Jawa Barat", "Banten", "Jawa Tengah", "DI Yogyakarta", 
  "Jawa Timur", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", 
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", 
  "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Gorontalo", 
  "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara", 
  "Maluku", "Maluku Utara", "Papua Barat", "Papua", "Papua Tengah", 
  "Papua Pegunungan", "Papua Selatan", "Papua Barat Daya"
].sort();

export default function FormPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
    title: "", birthDate: "", summary: "", education: "",
    experience: "", skills: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev, ...parsed,
          skills: Array.isArray(parsed.skills) ? parsed.skills.join(", ") : parsed.skills
        }));
      } catch (e) { console.error(e); }
    }
  }, []);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = () => currentStep < totalSteps && setCurrentStep(prev => prev + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  async function optimizeCV() {
    const { fullName, email, phone, education, experience } = formData;
    if (!fullName || !email || !phone || !education || !experience) {
      alert("Mohon lengkapi Nama, Email, No. HP, Pendidikan, dan Pengalaman.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal optimalisasi");

      const cvData = {
        ...formData,
        optimized: data.optimized,
        skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
      };
      
      localStorage.setItem('cvData', JSON.stringify(cvData));
      router.push(`/preview`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 md:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Responsif */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">Buat CV AI</h1>
          </div>
          <p className="text-xs md:text-base text-gray-500 max-w-sm mx-auto">Optimalkan profil profesional Anda dengan teknologi AI terbaru.</p>
        </div>

        {/* Progress Steps: Diperkecil untuk mobile */}
        <div className="mb-8 md:mb-12 px-2">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3].map((step) => (
              <div key={step} className="z-10 flex flex-col items-center">
                <div className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-500
                  ${currentStep >= step ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-2 border-gray-100 text-gray-400'}
                  ${currentStep === step ? 'scale-110 ring-4 ring-blue-50' : ''}
                `}>
                  {step}
                </div>
                <span className={`mt-2 text-[10px] md:text-xs font-bold uppercase tracking-wider ${currentStep >= step ? 'text-blue-600' : 'text-gray-300 hidden md:block'}`}>
                  {step === 1 ? 'Data' : step === 2 ? 'Riwayat' : 'Skill'}
                </span>
              </div>
            ))}
            {/* Progress Line */}
            <div className="absolute top-4 md:top-5 left-0 right-0 h-0.5 bg-gray-100 -z-0">
              <div 
                className="h-full bg-blue-600 transition-all duration-700 ease-in-out"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 md:p-10">
            
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base md:text-lg font-bold text-gray-800">Informasi Pribadi</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <InputField icon={User} label="Nama Lengkap" field="fullName" placeholder="John Doe" required value={formData.fullName} onChange={handleInputChange} />
                  <InputField icon={Briefcase} label="Target Posisi" field="title" placeholder="Software Engineer" value={formData.title} onChange={handleInputChange} />
                  <InputField icon={Mail} label="Email" field="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={handleInputChange} />
                  <InputField icon={Phone} label="No. Handphone" field="phone" type="tel" placeholder="0812..." required value={formData.phone} onChange={handleInputChange} />
                  <SelectField icon={MapPin} label="Domisili" field="location" options={INDONESIA_PROVINCES} required value={formData.location} onChange={handleInputChange} />
                  <InputField icon={Calendar} label="Tgl Lahir" field="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} />
                  <div className="md:col-span-2">
                    <InputField icon={FileText} label="Tentang Saya (Singkat)" field="summary" placeholder="Ceritakan sedikit tentang keahlian Anda..." textarea value={formData.summary} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base md:text-lg font-bold text-gray-800">Latar Belakang</h2>
                </div>
                <InputField icon={GraduationCap} label="Pendidikan" field="education" placeholder="Tuliskan nama kampus, jurusan, dan tahun lulus..." textarea required value={formData.education} onChange={handleInputChange} />
                <InputField icon={Briefcase} label="Pengalaman Kerja" field="experience" placeholder="Tuliskan posisi, nama perusahaan, dan deskripsi tugas..." textarea required value={formData.experience} onChange={handleInputChange} />
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                  <Award className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base md:text-lg font-bold text-gray-800">Keahlian</h2>
                </div>
                <InputField icon={Award} label="Skill Teknis" field="skills" placeholder="Contoh: React, Project Management, Microsoft Office..." textarea value={formData.skills} onChange={handleInputChange} />
                <div className="flex gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
                    <strong>Tips AI:</strong> Pisahkan antar keahlian dengan tanda koma agar sistem kami bisa mengidentifikasi keyword Anda dengan lebih akurat.
                  </p>
                </div>
              </div>
            )}

            {/* Navigasi Responsif */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-8 mt-8 border-t border-gray-50">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Kembali
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200"
                >
                  Lanjut <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={optimizeCV}
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {loading ? 'Sedang Memproses...' : 'Optimalkan Sekarang'}
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-[10px] md:text-xs text-gray-400 italic">
          Langkah {currentStep} dari {totalSteps} • Data hanya disimpan di perangkat Anda.
        </p>
      </div>
    </div>
  );
}