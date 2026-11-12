import { useState, useEffect } from 'react';
import InternshipPlatform from './components/InternshipPlatform';
import ResumeBuilder from './components/ResumeBuilder.jsx';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header с навигацией */}
      <header className="bg-tusur-blue text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a 
              href="https://tusur.ru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img src="/logo.svg" alt="ТУСУР" className="h-12 w-auto" />
            </a>

            <nav className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-1">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeSection === 'dashboard'
                    ? 'bg-white text-tusur-blue shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Дашборд практик
              </button>
              <button
                onClick={() => setActiveSection('resume')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeSection === 'resume'
                    ? 'bg-white text-tusur-blue shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Создание резюме
              </button>
            </nav>

            <div className="flex-shrink-0 w-12" />
          </div>
        </div>
      </header>

      {/* Контент */}
      <main className="flex-grow">
        {activeSection === 'dashboard' ? (
          <InternshipPlatform />
        ) : (
          <ResumeBuilder />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-tusur-blue text-white py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="ТУСУР" className="h-10 w-auto" />
              <span className="text-sm font-sans opacity-90">© 2026 Томский государственный университет систем управления и радиоэлектроники</span>
            </div>
            <div className="flex gap-8 text-sm font-sans">
              <a href="https://tusur.ru" className="hover:text-tusur-lightBlue transition-colors flex items-center gap-2">
                <span>Сайт университета</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              </a>
              <a href="https://engineers.tusur.ru" className="hover:text-tusur-lightBlue transition-colors flex items-center gap-2">
                <span>ПИШ ТУСУР</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;