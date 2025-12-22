"use client";

import { useState, useCallback, memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, User, Briefcase, GraduationCap, Calendar, FileText, Award, ChevronRight, Loader2, Mail, Phone, MapPin } from "lucide-react";

// Komponen InputField yang dipisah dan di-memo
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
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon className="w-4 h-4" />
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          rows={4}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

const SelectField = memo(({ icon: Icon, label, field, options, value, onChange, required }: any) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <Icon className="w-4 h-4 text-blue-500" />
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white transition-all appearance-none cursor-pointer"
    >
      <option value="">Pilih Provinsi</option>
      {options.map((prov: string) => (
        <option key={prov} value={prov}>{prov}</option>
      ))}
    </select>
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

  useEffect(() => {
  const savedData = localStorage.getItem('cvData');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      // Update formData dengan data yang tersimpan
      setFormData(prev => ({
        ...prev,
        ...parsed,
        // Pastikan skills dikonversi kembali ke string jika tipenya array
        skills: Array.isArray(parsed.skills) ? parsed.skills.join(", ") : parsed.skills
      }));
    } catch (e) {
      console.error("Gagal memuat data lama", e);
    }
  }
}, []);
  
  // Local state untuk input values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",   
    phone: "",   
    location: "",
    title: "",
    birthDate: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Gunakan useCallback untuk handler yang stabil
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

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
        body: JSON.stringify({
          fullName: formData.fullName,
          title: formData.title,         // Pastikan ini dikirim
          birthDate: formData.birthDate,
          summary: formData.summary,     // Pastikan ini dikirim
          education: formData.education,
          experience: formData.experience,
          skills: formData.skills,       // Pastikan ini dikirim (dalam bentuk string atau array)
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

      // Simpan data ke localStorage atau langsung ke URL
      const cvData = {
        ...formData,
        optimized: data.optimized,
        skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      };
      
      // Simpan ke localStorage
      localStorage.setItem('cvData', JSON.stringify(cvData));
      
      // Redirect ke preview dengan data di query params
      router.push(`/preview?data=${encodeURIComponent(JSON.stringify(cvData))}`);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Buat CV Profesional</h1>
          </div>
          <p className="text-gray-600">Isi data diri Anda untuk membuat CV yang dioptimalkan AI</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2
                  ${currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-400'}
                  ${currentStep === step ? 'ring-4 ring-blue-100' : ''}
                  transition-all duration-300
                `}>
                  {step}
                </div>
                <span className={`text-sm font-medium ${currentStep >= step ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step === 1 ? 'Data Pribadi' : step === 2 ? 'Pendidikan & Pengalaman' : 'Keahlian'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative max-w-2xl mx-auto -mt-6">
            <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-200 -z-10">
              <div 
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Personal Info & Contact */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Data Pribadi & Kontak
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    icon={User}
                    label="Nama Lengkap"
                    field="fullName"
                    placeholder="Contoh: John Doe"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    icon={Briefcase}
                    label="Posisi / Jabatan"
                    field="title"
                    placeholder="Contoh: Frontend Developer"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                  
                  {/* Email Input */}
                  <InputField
                    icon={Mail}
                    label="Email"
                    field="email"
                    type="email"
                    placeholder="john.doe@email.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                  {/* Phone Input */}
                  <InputField
                    icon={Phone}
                    label="Nomor Handphone"
                    field="phone"
                    type="tel"
                    placeholder="08123456789"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />

                  {/* Location Dropdown */}
                  <SelectField
                    icon={MapPin}
                    label="Domisili (Provinsi)"
                    field="location"
                    options={INDONESIA_PROVINCES}
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                  />

                  <InputField
                    icon={Calendar}
                    label="Tanggal Lahir"
                    field="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                  />

                  <div className="md:col-span-2">
                    <InputField
                      icon={FileText}
                      label="Ringkasan Profil"
                      field="summary"
                      placeholder="Deskripsi singkat tentang diri Anda"
                      textarea
                      value={formData.summary}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

          {/* Step 2: Education & Experience */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Pendidikan & Pengalaman
              </h2>
              <div className="space-y-6">
                <InputField
                  icon={GraduationCap}
                  label="Riwayat Pendidikan"
                  field="education"
                  placeholder="• S1 Teknik Informatika - Universitas Contoh (2018-2022)\n• SMA Negeri 1 Contoh (2015-2018)"
                  textarea
                  required
                  value={formData.education}
                  onChange={handleInputChange}
                />
                <InputField
                  icon={Briefcase}
                  label="Pengalaman Kerja"
                  field="experience"
                  placeholder="• Frontend Developer - Perusahaan Tech (2022-Sekarang)\n  - Mengembangkan aplikasi web dengan React\n  - Meningkatkan performa website sebesar 40%\n• Web Developer - Startup Digital (2020-2022)"
                  textarea
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {/* Step 3: Skills */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Keahlian & Kompetensi
              </h2>
              <div className="space-y-6">
                <InputField
                  icon={Award}
                  label="Keahlian Teknis"
                  field="skills"
                  placeholder="React, TypeScript, Next.js, Tailwind CSS, Figma"
                  textarea
                  value={formData.skills}
                  onChange={handleInputChange}
                />
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Tips dari AI</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Pisahkan keahlian dengan koma. Gunakan kata kunci yang relevan dengan industri Anda.
                        Contoh: React, TypeScript, UI/UX Design, Project Management
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-10 border-t mt-10">
            <button
              onClick={prevStep}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              disabled={currentStep === 1}
            >
              Kembali
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
              >
                Lanjut <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={optimizeCV}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Optimalkan dengan AI
                  </>
                )}
              </button>
            )}
          </div>

          {/* Step Indicator */}
          <div className="text-center mt-8 text-sm text-gray-500">
            Langkah {currentStep} dari {totalSteps}
          </div>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Data Anda akan diproses dengan aman. Tidak ada data yang disimpan secara permanen.
          </p>
        </div>
      </div>
    </div>
  );
}