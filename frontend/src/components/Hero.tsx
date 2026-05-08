export const Hero = () => (
  <section className="bg-gradient-to-br from-brand-50 to-white px-4 py-16 md:px-6">
    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
      <div>
        <p className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
          AI-powered physiotherapy care
        </p>
        <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          Find the right physiotherapist and recover faster.
        </h1>
        <p className="mt-4 text-slate-600">
          Book trusted experts, run symptom analysis with Claude, and track appointments in one dashboard.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-slate-500">Available Physios</dt>
            <dd className="text-2xl font-bold text-brand-700">500+</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Avg Response</dt>
            <dd className="text-2xl font-bold text-brand-700">2 min</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Patient Rating</dt>
            <dd className="text-2xl font-bold text-brand-700">4.8/5</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
);
