import jsPDF from "jspdf";

export function generatePDF(text: string) {
  const doc = new jsPDF();
  doc.setFont("Helvetica", "normal");

  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, 15, 20);

  return doc;
}
