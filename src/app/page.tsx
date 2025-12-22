"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"; // Install lucide-react: npm install lucide-react

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full mx-auto">
        {/* Modern header with subtle branding */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-semibold text-blue-600 tracking-wide">
              CV GENERATOR
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Powered by AI Technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                CV yang <span className="font-bold text-blue-600">Membuat</span> Anda{' '}
                <span className="font-bold text-blue-600">Dilirik</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Buat CV profesional yang dioptimalkan AI dalam hitungan menit. 
                Tingkatkan peluang karir Anda dengan desain yang elegan dan konten yang persuasif.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <p className="text-gray-700">Template yang modern dan mudah disesuaikan</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <p className="text-gray-700">Optimasi konten dengan teknologi AI terbaru</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <p className="text-gray-700">Ekspor dalam berbagai format dengan satu klik</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/form")}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="font-medium text-lg">Mulai Sekarang</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-sm text-gray-500 pt-2">
              Gratis untuk digunakan • Tidak perlu registrasi
            </p>
          </div>

          {/* Right illustration */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
                <div className="relative w-full max-w-md">
                  {/* Abstract CV preview design */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100"></div>
                        <div className="space-y-2">
                          <div className="h-3 w-32 bg-blue-200 rounded"></div>
                          <div className="h-2 w-24 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                        <div className="h-2 w-4/5 bg-gray-100 rounded"></div>
                        <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="h-20 bg-blue-50 rounded-lg"></div>
                        <div className="h-20 bg-indigo-50 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-indigo-500/10 blur-xl"></div>
                </div>
              </div>
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-blue-200 rounded-full"></div>
            <div className="absolute -top-6 -right-6 w-8 h-8 border-2 border-indigo-200 rounded-full"></div>
          </div>
        </div>

        {/* Bottom subtle indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <div className="w-1 h-1 rounded-full bg-current"></div>
            <div className="w-1 h-1 rounded-full bg-current"></div>
            <div className="w-1 h-1 rounded-full bg-current"></div>
          </div>
        </div>
      </div>
    </div>
  );
}