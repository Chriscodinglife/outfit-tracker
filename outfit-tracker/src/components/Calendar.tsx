import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuth } from "../hooks/useAuth";
import { getOutfitEntries } from "../services/outfitService";
import type { OutfitEntry } from "../models/OutfitEntry";
import { type EventClickArg } from "@fullcalendar/core";

interface CalendarEvent {
  title: string;
  date: string;
  classNames: string[];
  extendedProps: {
    outfitId: string;
    clothes: { id: string; name: string }[];
    mood: {
      feeling: string;
      emoji: string;
    };
  };
}

const Calendar = ({
  onDateClick,
  refreshTrigger,
}: {
  onDateClick: (date: string, entry?: OutfitEntry) => void;
  refreshTrigger: number;
}) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const loadOutfits = async () => {
      if (!user) return;

      try {
        const entries = await getOutfitEntries(user.uid);
        setEvents(
          entries.map((entry) => ({
            title: `${entry.clothes.map((c) => c.name).join(", ")} ${
              entry.mood.emoji
            }`,
            date: entry.date,
            classNames: ["outfit-event"],
            extendedProps: {
              outfitId: entry.id,
              clothes: entry.clothes,
              mood: entry.mood,
            },
          }))
        );
      } catch (error) {
        console.error("Error loading outfits:", error);
      }
    };

    loadOutfits();
  }, [user, refreshTrigger]);

  const handleEventClick = (info: EventClickArg) => {
    const { outfitId, clothes, mood } = info.event.extendedProps;
    onDateClick(info.event.startStr, {
      id: outfitId,
      clothes,
      mood,
      date: info.event.startStr,
      userId: user!.uid,
    });
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={(info) => onDateClick(info.dateStr)}
      eventClick={handleEventClick}
      events={events}
      height="auto"
    />
  );
};

export default Calendar;
