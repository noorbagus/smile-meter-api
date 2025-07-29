// smile-meter-api/app/page.tsx
import React from 'react';

export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Smile Meter API</h1>
      <p style={{ marginBottom: '2rem' }}>Backend API untuk aplikasi AR Smile Meter</p>
      
      <div style={{ width: '500px', maxWidth: '90%' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Available Endpoints:</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <strong>GET /api/health</strong>
            <p>Health check endpoint</p>
          </li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <strong>GET /api/units/{'{unitId}'}/daily-images</strong>
            <p>Mendapatkan gambar daily untuk unit tertentu</p>
          </li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <strong>POST /api/videos/upload</strong>
            <p>Upload video senyuman</p>
          </li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <strong>GET /api/videos/{'{id}'}</strong>
            <p>Download video berdasarkan ID</p>
          </li>
        </ul>
      </div>
    </div>
  );
}