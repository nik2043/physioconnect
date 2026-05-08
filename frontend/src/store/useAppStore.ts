import { create } from 'zustand';
import type { BookingPayload } from '../lib/api';

type Notification = {
  id: string;
  message: string;
  timestamp: number;
};

type SymptomResult = {
  summary: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
};

type AppState = {
  bookings: BookingPayload[];
  symptomResult: SymptomResult | null;
  notifications: Notification[];
  addBooking: (booking: BookingPayload) => void;
  setSymptomResult: (result: SymptomResult) => void;
  pushNotification: (message: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  bookings: [],
  symptomResult: null,
  notifications: [],
  addBooking: (booking) =>
    set((state) => ({
      bookings: [booking, ...state.bookings],
      notifications: [
        {
          id: crypto.randomUUID(),
          message: `Booking requested for ${new Date(booking.date).toLocaleString()}`,
          timestamp: Date.now(),
        },
        ...state.notifications,
      ],
    })),
  setSymptomResult: (symptomResult) =>
    set((state) => ({
      symptomResult,
      notifications: [
        {
          id: crypto.randomUUID(),
          message: `Symptom analysis updated (${symptomResult.urgency} urgency)`,
          timestamp: Date.now(),
        },
        ...state.notifications,
      ],
    })),
  pushNotification: (message) =>
    set((state) => ({
      notifications: [{ id: crypto.randomUUID(), message, timestamp: Date.now() }, ...state.notifications],
    })),
}));
