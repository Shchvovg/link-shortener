import React, { useState } from "react";

interface UrlFormProps {
  onShorten: (url: string) => void;
  loading: boolean;
  statusMessage: string;
}

function UrlForm ({ onShorten, loading, statusMessage }: UrlFormProps) {


    const [originalUrl, setOriginalUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onShorten(originalUrl);
  };

    return(
        <div className="main-container">
            <form onSubmit={handleSubmit} className="url-form">
                <label>Link shortener</label>
                <input 
                    type="url" 
                    placeholder="Enter your URL here..." 
                    name='originalUrl' 
                    value={originalUrl} 
                    onChange={(e) => setOriginalUrl(e.target.value)}>
                </input>
                <button disabled={loading || originalUrl === ''}>
                    {loading ? 'Shortening...' : 'Shorten!'}
                </button>
                <label className={`status-label ${loading ? 'loading' : ''} ${!loading && statusMessage ? 'completed' : ''}`}>{statusMessage}</label>
            </form>
        </div>
    );
}

export default UrlForm