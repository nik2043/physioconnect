import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export const Dashboard = () => {
  const bookings = useAppStore((state) => state.bookings);
  const notifications = useAppStore((state) => state.notifications);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const upcoming = useMemo(
    () => bookings.filter((booking) => new Date(booking.date).getTime() > now).length,
    [bookings, now],
  );

  return (
    <section id="dashboard" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total Bookings</p>
          <p className="text-2xl font-bold text-brand-700">{bookings.length}</p>
        </article>
        <article className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Upcoming Sessions</p>
          <p className="text-2xl font-bold text-brand-700">{upcoming}</p>
        </article>
        <article className="rounded-lg border border-slate-200 p-4 sm:col-span-2 lg:col-span-1">
          <p className="text-sm text-slate-500">Real-time Notifications</p>
          <p className="text-2xl font-bold text-brand-700">{notifications.length}</p>
        </article>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-slate-900">Latest Notifications</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {notifications.slice(0, 5).map((notification) => (
            <li key={notification.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <p>{notification.message}</p>
              <p className="text-xs text-slate-500">{new Date(notification.timestamp).toLocaleString()}</p>
            </li>
          ))}
          {notifications.length === 0 && <li className="text-slate-500">No notifications yet.</li>}
        </ul>
      </div>
    </section>
  );
};
