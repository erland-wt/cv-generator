"use client";

import { useState } from "react";
import { useCVStore } from "@/store/cvStore";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Eye, Sparkles, FileText, Download } from "lucide-react";

export default function EditPage() {
  const { optimizedCV, setOptimizedCV } = useCVStore();
  const router = useRouter();
  const [charCount, setCharCount] = useState(optimizedCV?.length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setOptimizedCV(value);
    setCharCount(value.length);
  };

  const handleSaveAndContinue = () => {
    // Simpan ke localStorage untuk backup
    localStorage.setItem('editedCV', optimizedCV);
    router.push("/templates");
  };

  const handlePreview = () => {
    // Simpan sementara dan buka preview di tab baru
    localStorage.setItem('editedCV', optimizedCV);
    window.open('/preview?source=edit', '_blank');
  };

  const handleBack = () => {
    router.push("/preview");
  };

  const handleDownload = () => {
    const blob = new Blob([optimizedCV], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Kembali ke Preview</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {formatCount(charCount)} karakter
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Hasil AI</h1>
              </div>
              <p className="text-gray-600">Sesuaikan CV yang telah dioptimalkan AI sesuai kebutuhan Anda</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handlePreview}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Kata</p>
                <p className="text-xl font-semibold text-gray-800">
                  {optimizedCV.split(/\s+/).filter(word => word.length > 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Hasil AI</p>
                <p className="text-xl font-semibold text-gray-800">✓ Dioptimalkan</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-xl font-semibold text-gray-800">📝 Editable</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Editor Header */}
          <div className="border-b border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm font-medium text-gray-700">cv_editor.txt</span>
              </div>
              <div className="text-sm text-gray-500">
                Auto-save: <span className="text-green-600 font-medium">Aktif</span>
              </div>
            </div>
          </div>

          {/* Text Editor */}
          <div className="relative">
            <textarea
              value={optimizedCV}
              onChange={handleChange}
              className="w-full h-[500px] p-6 text-gray-800 font-mono text-sm border-0 focus:ring-0 focus:outline-none resize-none"
              placeholder="Edit hasil optimasi AI di sini..."
              spellCheck="true"
            />
            
            {/* Line Numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 border-r border-gray-200 overflow-hidden">
              <div className="py-6 text-right pr-3">
                {Array.from({ length: optimizedCV.split('\n').length }).map((_, i) => (
                  <div key={i} className="text-xs text-gray-400 leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Character Counter */}
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-600">
              {charCount.toLocaleString()} karakter
            </div>
          </div>

          {/* Editor Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Tips:</span> Gunakan kata kunci spesifik untuk hasil terbaik
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveAndContinue}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <Save className="w-5 h-5" />
                  Simpan & Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Tips Editing</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Fokus pada pencapaian dan hasil, bukan hanya tugas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Gunakan kata kerja aksi (mengembangkan, meningkatkan, memimpin)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Sertakan angka dan metrik untuk menunjukkan dampak</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Best Practices</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Jaga konsistensi tenses (gunakan past tense untuk pengalaman lampau)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Optimalkan untuk ATS (Applicant Tracking System)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Gunakan keyword yang relevan dengan industri Anda</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Perubahan Anda akan disimpan otomatis. Lanjutkan ke pemilihan template untuk melihat hasil akhir.</p>
        </div>
      </div>
    </div>
  );
}