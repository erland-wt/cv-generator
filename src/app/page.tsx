"use client";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Landing() {
  const router = useRouter();

  return (
    // Penyesuaian py-10 dan md:py-20 agar konten tidak terpotong di device pendek
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 py-10 md:py-20">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm font-semibold text-blue-600 tracking-widest uppercase">
              AI Resume Builder
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-500 font-medium tracking-tight">
            Tingkatkan Karier dengan Kecerdasan Buatan
          </p>
        </div>

        {/* Main Content Grid: Stacked on Mobile, 2 Columns on Desktop */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-4">
              {/* Ukuran font responsif: text-3xl di mobile, text-6xl di desktop */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-[1.1]">
                CV yang <span className="font-bold text-blue-600">Membuat</span> Anda{' '}
                <span className="font-bold text-blue-600 block sm:inline">Dilirik</span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Buat resume profesional yang dioptimalkan AI dalam hitungan menit. 
                Dapatkan pekerjaan impian dengan konten yang persuasif dan ATS-Friendly.
              </p>
            </div>

            {/* Feature List: Center on mobile, Left on desktop */}
            <div className="space-y-3 md:space-y-4 inline-block lg:block text-left">
              {[
                "Template Modern & Minimalis",
                "Optimasi AI Llama 3.3",
                "Format Siap Cetak (A4)",
                "Gratis Tanpa Registrasi"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
                  <p className="text-sm md:text-base text-gray-700 font-medium">{text}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col items-center lg:items-start gap-4">
              <button
                onClick={() => router.push("/form")}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-200 hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
              >
                <span className="font-bold text-base md:text-lg">Mulai Buat CV</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] md:text-xs text-gray-400 italic">
                *Data Anda aman dan disimpan secara lokal di browser.
              </p>
            </div>
          </div>

          {/* Right Side: Illustration */}
          {/* order-1 on mobile so image stays on top, order-2 on desktop */}
          <div className="order-1 lg:order-2 relative animate-in fade-in slide-in-from-right-8 duration-1000 px-4 sm:px-10 lg:px-0">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-blue-50">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 md:p-8">
                {/* Mock CV: Scaled down on mobile */}
                <div className="relative w-full max-w-[280px] sm:max-w-md bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3 md:gap-4 border-b border-gray-100 pb-3 md:pb-4">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg md:text-xl">
                        JD
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <div className="h-3 md:h-4 w-24 md:w-32 bg-gray-900 rounded"></div>
                        <div className="h-2 md:h-3 w-16 md:w-24 bg-blue-500/20 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 md:h-2 w-full bg-gray-100 rounded"></div>
                      <div className="h-1.5 md:h-2 w-full bg-gray-100 rounded"></div>
                      <div className="h-1.5 md:h-2 w-2/3 bg-gray-100 rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:gap-3 pt-2">
                      <div className="h-12 md:h-16 bg-blue-50 rounded-lg border border-blue-100"></div>
                      <div className="h-12 md:h-16 bg-gray-50 rounded-xl border border-gray-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Decorations: Hidden on small screens to avoid clutter */}
            <div className="hidden md:block absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/5 rounded-full blur-3xl"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
}