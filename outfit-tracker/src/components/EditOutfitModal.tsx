import React, { useState } from "react";
import OutfitSelector from "./OutfitSelector";
import type { OutfitEntry } from "../models/OutfitEntry";

const moods = [
  { feeling: "Happy", emoji: "😃" },
  { feeling: "So-So", emoji: "😬" },
  { feeling: "Sad", emoji: "😢" },
] as const;

interface EditOutfitModalProps {
  date: string;
  outfitEntry?: OutfitEntry;
  onSave: (entry: Omit<OutfitEntry, "id" | "userId">) => Promise<void>;
  onClose: () => void;
}

const EditOutfitModal = ({
  date,
  outfitEntry,
  onSave,
  onClose,
}: EditOutfitModalProps) => {
  const [selectedOutfits, setSelectedOutfits] = useState<
    { id: string; name: string }[]
  >(outfitEntry?.clothes || []);
  const [selectedMood, setSelectedMood] = useState(
    outfitEntry?.mood || moods[0]
  );

  const handleSave = async () => {
    await onSave({
      date,
      clothes: selectedOutfits,
      mood: selectedMood,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-4 w-full max-w-md mx-2">
        <h2 className="text-xl font-semibold mb-2">
          {outfitEntry ? "Edit Outfit for" : "Select Outfits for"} {date}
        </h2>
        <OutfitSelector
          selected={selectedOutfits}
          onChange={setSelectedOutfits}
        />

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">How did you feel?</h3>
          <div className="flex gap-4">
            {moods.map((mood) => (
              <button
                key={mood.feeling}
                onClick={() => setSelectedMood(mood)}
                className={`p-2 rounded-lg ${
                  selectedMood.feeling === mood.feeling
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-100"
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <p className="text-sm">{mood.feeling}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedOutfits.length === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            {outfitEntry ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOutfitModal;
