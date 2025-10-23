import { Search } from "lucide-react";

export default function SearchBar({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} flex justify-start bg-white w-full h-full px-4 py-3 border border-black shadow-md rounded-md`}
    >
      <Search className="stroke-black"/>

      <input
        className="font-mono h-tight placeholder-[#6E6E6E] outline-0 ml-4"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
