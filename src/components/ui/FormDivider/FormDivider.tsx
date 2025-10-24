export function FormDivider({ text = "OR" }: { text?: string }) {
  return (
    <div className="w-full flex items-center gap-4">
      <div className="flex-1 h-px bg-gray-300"></div>
      <span className="text-sm text-gray-400">{text}</span>
      <div className="flex-1 h-px bg-gray-300"></div>
    </div>
  );
}
