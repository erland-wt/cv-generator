export default function CVTemplate1({ text }: { text: string }) {
  return (
    <div className="p-8 border border-gray-300 rounded-lg">
      <pre className="whitespace-pre-wrap">{text}</pre>
    </div>
  );
}
