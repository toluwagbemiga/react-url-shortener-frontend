import React from 'react';
import { Url } from '../types';

interface UrlListProps {
  urls: Url[];
  onStatsClick: (shortCode: string) => void;
}

const UrlList: React.FC<UrlListProps> = ({ urls, onStatsClick }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Short URL copied to clipboard!');
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (urls.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">No URLs have been shortened yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Recent URLs</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Original URL</th>
              <th className="px-4 py-2 text-left">Short Code</th>
              <th className="px-4 py-2 text-left">Clicks</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.id} className="border-b">
                <td className="px-4 py-2">
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.originalUrl.length > 50
                      ? `${url.originalUrl.substring(0, 50)}...`
                      : url.originalUrl}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <code className="bg-gray-100 px-2 py-1 rounded">{url.shortCode}</code>
                </td>
                <td className="px-4 py-2">{url.clicks}</td>
                <td className="px-4 py-2">{formatDate(url.createdAt)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onStatsClick(url.shortCode)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Stats
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    onClick={() => copyToClipboard(url.shortUrl)}
                    className="text-green-600 hover:underline"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;