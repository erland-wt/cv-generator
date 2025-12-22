"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function Landing() {
  const router = useRouter();

  // Fungsi navigasi yang lebih stabil
  const handleStart = () => {
    router.push("/form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 py-10 md:py-20 overflow-x-hidden">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-10 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-600 animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold text-blue-700 tracking-widest uppercase">
              AI Resume Builder
            </span>
          </div>
          <h2 className="text-xs md:text-sm text-gray-400 font-semibold tracking-[0.2em] uppercase mt-1">
            Tingkatkan Karier dengan Kecerdasan Buatan
          </h2>
        </header>

        {/* Main Content Grid */}
        <main className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="order-2 lg:order-1 space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight">
                Bangun <span className="font-extrabold text-blue-600 drop-shadow-sm">Representasi</span> Karier yang{' '}
                <span className="font-extrabold text-blue-600 block sm:inline italic">Prestesius</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                Optimalkan rekam jejak profesional Anda melalui bantuan kecerdasan buatan. 
                Wujudkan resume yang strategis, elegan, dan dirancang khusus untuk memenuhi standar ketat sistem <span className="text-slate-900 font-bold underline decoration-blue-500 decoration-2">ATS-Friendly</span>.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-3 inline-block lg:block text-left bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 shadow-sm lg:bg-transparent lg:border-none lg:shadow-none lg:p-0">
              {[
                "Template Eksekutif & Minimalis",
                "Optimasi Narasi Berbasis AI Llama 3.3",
                "Format PDF Standar Industri (A4)",
                "Privasi Data Terjamin & Tanpa Registrasi"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="bg-blue-600 rounded-full p-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-sm md:text-base text-slate-700 font-bold">{text}</p>
                </div>
              ))}
            </div>

            <div className="pt-0 flex flex-col items-center lg:items-start gap-5">
              <button
                onClick={handleStart}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-2xl shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1 active:scale-95 border-b-4 border-blue-800"
              >
                <span className="font-bold text-lg md:text-xl tracking-tight">Mulai Buat CV Gratis</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <p className="text-[10px] md:text-xs text-slate-400 font-medium italic">
                  *Tidak perlu kartu kredit atau registrasi akun.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Illustration */}
          <div className="order-1 lg:order-2 relative animate-in fade-in slide-in-from-right-8 duration-1000 px-2 sm:px-10 lg:px-0">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-8 border-white">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center p-6 md:p-12">
                
                {/* Mock CV Visual */}
                <div className="relative w-full max-w-[280px] sm:max-w-md bg-white rounded-2xl shadow-2xl p-5 md:p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-700 ease-out cursor-pointer group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xl md:text-2xl group-hover:bg-blue-600 transition-colors">
                        CV
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 md:w-40 bg-slate-900 rounded-full"></div>
                        <div className="h-3 w-20 md:w-28 bg-blue-100 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                      <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                      <div className="h-2 w-4/5 bg-slate-100 rounded-full"></div>
                    </div>
                    <div className="pt-4 flex gap-3">
                      <div className="h-14 w-full bg-slate-50 rounded-xl border border-slate-100"></div>
                      <div className="h-14 w-full bg-slate-50 rounded-xl border border-slate-100"></div>
                    </div>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-tighter transform rotate-12">
                    ATS Approved
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Decorations */}
            <div className="hidden md:block absolute -z-10 -top-10 -right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px]"></div>
            <div className="hidden md:block absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-indigo-400/10 rounded-full blur-[100px]"></div>
          </div>
          
        </main>
      </div>
    </div>
  );
}