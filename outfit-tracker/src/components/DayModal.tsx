import React, { useState } from "react";
import OutfitSelector from "./OutfitSelector";
import { useAuth } from "../hooks/useAuth";
import { saveOutfitEntry } from "../services/outfitService";

const moods = [
  { feeling: "Happy", emoji: "😃" },
  { feeling: "So-So", emoji: "😬" },
  { feeling: "Sad", emoji: "😢" },
] as const;

const DayModal = ({ date, onClose }: { date: string; onClose: () => void }) => {
  const { user } = useAuth();
  const [selectedOutfits, setSelectedOutfits] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedMood, setSelectedMood] = useState<
    (typeof moods)[number] | null
  >(null);

  const handleSave = async () => {
    if (!user || !selectedMood) return;

    try {
      await saveOutfitEntry({
        userId: user.uid,
        date,
        clothes: selectedOutfits,
        mood: selectedMood,
      });
      onClose();
    } catch (error) {
      console.error("Error saving outfit:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-4 w-full max-w-md mx-2">
        <h2 className="text-xl font-semibold mb-2">
          Select Outfits for {date}
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
                  selectedMood?.feeling === mood.feeling
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
            disabled={!selectedMood || selectedOutfits.length === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayModal;
