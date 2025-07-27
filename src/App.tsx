import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setCaption('');
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const generateCaption = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/generate-caption', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setCaption(data.caption || 'No caption generated');
    } catch (err) {
      console.error('Caption generation error:', err);
      setCaption('Failed to generate caption');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f4f8',
      padding: '2rem'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '480px'
      }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>🖼️ Image Caption Generator</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '1rem' }}
        />

        {previewURL && (
          <div style={{ marginBottom: '1rem' }}>
            <img
              src={previewURL}
              alt="Preview"
              style={{
                width: '100%',
                maxHeight: '250px',
                objectFit: 'contain',
                borderRadius: '10px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        )}

        <button
          onClick={generateCaption}
          disabled={loading}
          style={{
            backgroundColor: loading ? '#ccc' : '#4f46e5',
            color: '#fff',
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1rem'
          }}
        >
          {loading ? 'Generating...' : 'Generate Caption'}
        </button>

        {loading && <div style={{ margin: '1rem' }}>⏳ Please wait...</div>}

        {caption && (
          <p style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '10px',
            fontSize: '1rem',
            color: '#111827',
            border: '1px solid #e5e7eb'
          }}>
            <strong>Caption:</strong> {caption}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
