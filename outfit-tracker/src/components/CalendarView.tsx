import { useState } from "react";
import type { User } from "firebase/auth";
import Calendar from "./Calendar";
import EditOutfitModal from "./EditOutfitModal";
import { saveOutfitEntry, updateOutfitEntry } from "../services/outfitService";
import type { OutfitEntry } from "../models/OutfitEntry";
const CalendarView = ({ user }: { user: User }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<OutfitEntry | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = async (entry: Omit<OutfitEntry, "id" | "userId">) => {
    if (selectedEntry) {
      await updateOutfitEntry(selectedEntry.id, entry);
    } else {
      await saveOutfitEntry({
        ...entry,
        userId: user.uid,
      });
    }
    setRefreshKey((prev) => prev + 1);
    setSelectedDate(null);
    setSelectedEntry(undefined);
  };

  return (
    <div>
      <p className="text-lg mb-2 text-black">Welcome, {user.displayName}</p>
      <Calendar
        onDateClick={(date, entry) => {
          setSelectedDate(date);
          setSelectedEntry(entry);
        }}
        refreshTrigger={refreshKey}
      />
      {selectedDate && (
        <EditOutfitModal
          date={selectedDate}
          outfitEntry={selectedEntry}
          onSave={handleSave}
          onClose={() => {
            setSelectedDate(null);
            setSelectedEntry(undefined);
          }}
        />
      )}
    </div>
  );
};

export default CalendarView;
