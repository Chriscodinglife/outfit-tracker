import React from "react";
import dummyClothes from "../data/dummyClothes";

interface OutfitSelectorProps {
  selected: { id: string; name: string }[];
  onChange: (selected: { id: string; name: string }[]) => void;
}

const OutfitSelector = ({ selected, onChange }: OutfitSelectorProps) => {
  const toggleItem = (id: string, name: string) => {
    onChange(
      selected.some((s) => s.id === id)
        ? selected.filter((item) => item.id !== id)
        : [...selected, { id, name }]
    );
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {dummyClothes.map((item) => (
        <button
          key={item.id}
          onClick={() => toggleItem(item.id, item.name)}
          className={`border p-2 rounded-lg text-sm ${
            selected.some((s) => s.id === item.id)
              ? "bg-blue-100 border-blue-500"
              : "bg-white"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default OutfitSelector;
