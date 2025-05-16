export interface OutfitEntry {
  id: string;
  userId: string;
  date: string;
  clothes: { id: string; name: string }[];
  mood: {
    feeling: "Happy" | "So-So" | "Sad";
    emoji: "😃" | "😬" | "😢";
  };
}
