import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { api } from '../lib/api';
import { useAppStore } from '../store/useAppStore';

const symptomSchema = z.object({
  symptoms: z.string().min(2, 'Please describe symptoms'),
  location: z.string().optional(),
});

type SymptomFormValues = z.infer<typeof symptomSchema>;

export const SymptomChecker = () => {
  const setSymptomResult = useAppStore((state) => state.setSymptomResult);
  const symptomResult = useAppStore((state) => state.symptomResult);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SymptomFormValues>({ resolver: zodResolver(symptomSchema) });

  const onSubmit = async (values: SymptomFormValues) => {
    try {
      const response = await api.analyzeSymptoms({
        symptoms: values.symptoms.split(',').map((part) => part.trim()).filter(Boolean),
        location: values.location,
      });
      setSymptomResult(response.analysis);
      toast.success('Analysis complete');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Analysis failed');
    }
  };

  return (
    <section id="symptom-checker" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Symptom Checker</h2>
      <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="rounded-lg border border-slate-300 px-3 py-2"
          rows={4}
          placeholder="Describe symptoms"
          {...register('symptoms')}
        />
        {errors.symptoms && <p className="text-sm text-red-600">{errors.symptoms.message}</p>}

        <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Location (optional)" {...register('location')} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
      </form>

      {symptomResult && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="font-semibold">Urgency: {symptomResult.urgency.toUpperCase()}</p>
          <p className="mt-2 text-slate-700">{symptomResult.summary}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
            {symptomResult.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
