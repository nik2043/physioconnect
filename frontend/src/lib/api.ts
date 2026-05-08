const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

export type BookingPayload = {
  physio: string;
  date: string;
  sessionType: 'home' | 'online' | 'clinic';
  symptoms: string[];
  notes?: string;
};

export const api = {
  async analyzeSymptoms(payload: { symptoms: string[]; location?: string }) {
    const response = await fetch(`${API_URL}/symptoms/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Failed to analyze symptoms');
    return response.json();
  },

  async createBooking(payload: BookingPayload, token?: string) {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },
};
