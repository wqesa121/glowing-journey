'use client';

import { useEffect } from 'react';

export default function ApiDocsPage() {
  useEffect(() => {
    // Dynamically load Swagger UI
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui.js';
    script.onload = () => {
      // Build Swagger UI
      (window as any).SwaggerUIBundle({
        url: '/api/swagger',
        dom_id: '#swagger-ui',
        presets: [
          (window as any).SwaggerUIBundle.presets.apis,
          (window as any).SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: 'StandaloneLayout',
        deepLinking: true,
        defaultModelsExpandDepth: 1,
        docExpansion: 'list'
      });
    };
    document.body.appendChild(script);

    // Add Swagger UI CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui.css';
    document.head.appendChild(link);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div id="swagger-ui" className="swagger-ui" style={{ padding: '20px' }} />
    </main>
  );
}
