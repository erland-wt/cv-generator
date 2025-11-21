"use client";

import { useCVStore } from "@/store/cvStore";
import { useRouter } from "next/navigation";
import React from "react";

export default function TemplatePage() {
  const { template, setTemplate } = useCVStore();
  const router = useRouter();

  const handleCardKey = (e: React.KeyboardEvent, value: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setTemplate(value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Pilih Template CV</h1>

      <div className="grid grid-cols-2 gap-6">
        {[1, 2].map((n) => (
          <div
            key={n}
            role="button"
            tabIndex={0}
            aria-pressed={template === n}
            onClick={() => setTemplate(n)}
            onKeyDown={(e) => handleCardKey(e, n)}
            className={`border rounded-lg p-4 cursor-pointer transition focus:outline-none ${
              template === n
                ? "ring-2 ring-blue-600 border-blue-600"
                : "hover:border-gray-400"
            }`}
          >
            <p className="font-bold">Template {n}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => router.push("/download")}
        disabled={!template}
        className={`mt-6 px-4 py-2 text-white rounded focus:outline-none transition ${
          template
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Download PDF
      </button>
    </div>
  );
}
