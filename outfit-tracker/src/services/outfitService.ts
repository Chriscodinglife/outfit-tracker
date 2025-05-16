import { db } from "../firebase/firebaseConfig";
import type { OutfitEntry } from "../models/OutfitEntry";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

export const saveOutfitEntry = async (entry: Omit<OutfitEntry, "id">) => {
  try {
    await addDoc(collection(db, "outfits"), {
      ...entry,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error saving outfit entry:", error);
    throw error;
  }
};

export const getOutfitEntries = async (
  userId: string
): Promise<OutfitEntry[]> => {
  const q = query(collection(db, "outfits"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<OutfitEntry, "id">),
  }));
};

export const updateOutfitEntry = async (
  id: string,
  entry: Partial<OutfitEntry>
) => {
  try {
    const docRef = doc(db, "outfits", id);
    await updateDoc(docRef, {
      ...entry,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating outfit entry:", error);
    throw error;
  }
};
