# React URL Shortener Frontend

A React TypeScript frontend that works with both Laravel and NestJS backends.

## Features

- Modern React with TypeScript
- Backend switching (Laravel/NestJS)
- URL shortening interface
- Click statistics and analytics
- Responsive design with Tailwind CSS
- Copy to clipboard functionality
- Real-time backend switching

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Backend Configuration

The app can connect to either backend:
- **Laravel Backend**: `http://localhost:8000/api/v1`
- **NestJS Backend**: `http://localhost:3001/api/v1`

Use the backend selector in the UI to switch between them.

## Components

- **App**: Main application component
- **UrlForm**: Form for creating new short URLs
- **UrlList**: Display list of created URLs
- **UrlStats**: Modal for viewing detailed statistics
- **BackendSelector**: Switch between Laravel and NestJS backends

## API Integration

The `apiService` handles all backend communication:
- Configurable backend endpoints
- Error handling
- TypeScript interfaces for type safety

## Styling

- Tailwind CSS for utility-first styling
- Responsive design
- Clean, modern interface
- Consistent color scheme

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge