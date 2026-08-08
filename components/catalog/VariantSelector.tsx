"use client";

type Option = {
  id: string;
  name: string;
};

type Props = {
  title: string;
  options: Option[];
  selected: string;
  onSelect: (id: string) => void;
};

export default function VariantSelector({
  title,
  options,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="mt-4">

      <p className="mb-2 text-sm font-semibold text-gray-700">
        {title}
      </p>

      <div className="flex flex-wrap gap-2">

        {options.map((option) => (

          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              selected === option.id
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-black"
            }`}
          >
            {option.name}
          </button>

        ))}

      </div>

    </div>
  );
}