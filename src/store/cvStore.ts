import { create } from "zustand";

type EditableField =
  | "fullName"
  | "birthDate"
  | "education"
  | "experience"
  | "title"
  | "summary"
  | "optimizedCV"
  | "skills";

interface CVState {
  fullName: string;
  birthDate: string;
  education: string;
  experience: string;
  optimizedCV: string;
  template: number | null;
  title: string;
  summary: string;
  skills: string[]; // stored as array

  // value can be string or string[] for skills
  setField: (key: EditableField, value: string | string[]) => void;
  setOptimizedCV: (value: string) => void;
  setTemplate: (value: number) => void;
}

export const useCVStore = create<CVState>((set) => ({
  fullName: "",
  birthDate: "",
  education: "",
  experience: "",
  optimizedCV: "",
  template: null,
  title: "",
  summary: "",
  skills: [],

  setField: (key, value) =>
    set(() => {
      // coerce into correct shape for skills
      if (key === "skills") {
        return { [key]: Array.isArray(value) ? value : String(value).split(",").map((s) => s.trim()).filter(Boolean) } as unknown as CVState;
      }
      return { [key]: value } as unknown as CVState;
    }),
  setOptimizedCV: (value) => set({ optimizedCV: value }),
  setTemplate: (value) => set({ template: value }),
}));