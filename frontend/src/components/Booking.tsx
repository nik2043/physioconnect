import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { api } from '../lib/api';
import { useAppStore } from '../store/useAppStore';

const bookingSchema = z.object({
  physio: z.string().min(8, 'Physiotherapist ID is required'),
  date: z.string().min(1, 'Date is required'),
  sessionType: z.enum(['home', 'online', 'clinic']),
  symptoms: z.string().min(2, 'Enter symptoms'),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export const Booking = () => {
  const addBooking = useAppStore((state) => state.addBooking);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { sessionType: 'online' },
  });

  const onSubmit = async (values: BookingFormValues) => {
    const payload = {
      physio: values.physio,
      date: values.date,
      sessionType: values.sessionType,
      symptoms: values.symptoms.split(',').map((part) => part.trim()).filter(Boolean),
      notes: values.notes,
    } as const;

    try {
      await api.createBooking(payload);
      addBooking(payload);
      toast.success('Booking created successfully');
      reset({ physio: '', date: '', sessionType: 'online', symptoms: '', notes: '' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Booking failed');
    }
  };

  return (
    <section id="booking" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Book a Session</h2>
      <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Physio ID" {...register('physio')} />
        {errors.physio && <p className="text-sm text-red-600">{errors.physio.message}</p>}

        <input className="rounded-lg border border-slate-300 px-3 py-2" type="datetime-local" {...register('date')} />
        {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}

        <select className="rounded-lg border border-slate-300 px-3 py-2" {...register('sessionType')}>
          <option value="online">Online</option>
          <option value="home">Home Visit</option>
          <option value="clinic">Clinic</option>
        </select>

        <input
          className="rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Symptoms (comma separated)"
          {...register('symptoms')}
        />
        {errors.symptoms && <p className="text-sm text-red-600">{errors.symptoms.message}</p>}

        <textarea className="rounded-lg border border-slate-300 px-3 py-2" rows={3} placeholder="Notes" {...register('notes')} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-brand-700 px-4 py-2 font-semibold text-white transition hover:bg-brand-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </section>
  );
};
