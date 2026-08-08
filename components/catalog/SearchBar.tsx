"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative mb-10">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />

      <input
        type="text"
        placeholder="Buscar productos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-lg outline-none transition focus:border-[#C6922F]"
      />
    </div>
  );
}