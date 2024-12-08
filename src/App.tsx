import React, { useState, useEffect } from 'react';
import './App.css';
import { apiService } from './services/api';
import { Url } from './types';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import BackendSelector from './components/BackendSelector';
import UrlStats from './components/UrlStats';

function App() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBackend, setCurrentBackend] = useState<'laravel' | 'nestjs'>('laravel');
  const [selectedUrlStats, setSelectedUrlStats] = useState<string | null>(null);

  const fetchUrls = async () => {
    try {
      const urlList = await apiService.getUrls();
      setUrls(urlList);
    } catch (error) {
      console.error('Failed to fetch URLs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [currentBackend]);

  const handleBackendChange = (backend: 'laravel' | 'nestjs') => {
    setCurrentBackend(backend);
    apiService.setBackend(backend);
    setLoading(true);
  };

  const handleUrlCreated = (newUrl: Url) => {
    setUrls([newUrl, ...urls]);
  };

  const handleStatsClick = (shortCode: string) => {
    setSelectedUrlStats(shortCode);
  };

  const handleStatsClose = () => {
    setSelectedUrlStats(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">URL Shortener</h1>
          <p className="text-blue-100">React Frontend with Laravel & NestJS Backends</p>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4 max-w-4xl">
        <BackendSelector
          currentBackend={currentBackend}
          onBackendChange={handleBackendChange}
        />

        <UrlForm onUrlCreated={handleUrlCreated} />

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p>Loading URLs...</p>
          </div>
        ) : (
          <UrlList urls={urls} onStatsClick={handleStatsClick} />
        )}

        {selectedUrlStats && (
          <UrlStats
            shortCode={selectedUrlStats}
            onClose={handleStatsClose}
          />
        )}
      </main>
    </div>
  );
}

export default App;
