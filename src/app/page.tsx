"use client";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="border-2 rounded-lg mx-auto p-10 max-w-5xl shadow-lg flex flex-col md:flex-row items-center md:items-start">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6">
            Selamat datang di CV Generator
          </h1>
          <p className="text-medium mb-6">
            Buat dan optimalkan CV profesionalmu dengan bantuan AI
          </p>

          <button
            onClick={() => router.push("/form")}
            className="mt-20 px-6 py-3 bg-blue-400 text-white rounded-lg"
          >
            Mulai Sekarang
          </button>
        </div>

        <div className="img-home flex justify-end mr-3">
          <img
            className="w-3/5 max-w-sm object-contain"
            src="/assets/Work from home.png"
            alt="Work from home"
          />
        </div>
      </div>
    </div>
  );
}
