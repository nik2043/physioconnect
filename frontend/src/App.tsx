import { Toaster } from 'react-hot-toast';
import { Booking } from './components/Booking';
import { Dashboard } from './components/Dashboard';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { SymptomChecker } from './components/SymptomChecker';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-2 md:px-6">
        <Booking />
        <SymptomChecker />
        <div className="md:col-span-2">
          <Dashboard />
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
