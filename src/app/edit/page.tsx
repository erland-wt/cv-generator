"use client";

import { useCVStore } from "@/store/cvStore";
import { useRouter } from "next/navigation";

export default function EditPage() {
  const { optimizedCV, setOptimizedCV } = useCVStore();
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Edit CV</h1>

      <textarea
        value={optimizedCV}
        onChange={(e) => setOptimizedCV(e.target.value)}
        className="w-full h-96 border border-gray-300 rounded-lg p-4"
      />

      <button
        onClick={() => router.push("/templates")}
        className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
      >
        Simpan & Pilih Template
      </button>
    </div>
  );
}
