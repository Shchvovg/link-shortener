import React, { useState } from "react";
import ShortUrlComponent from "./ShortUrlComponent.tsx";

interface UrlFormProps {
  url: string;
  port: number;
}

function UrlForm ({ url, port }: UrlFormProps) {


    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        console.log(originalUrl);

        const response = await fetch(url+'/api/shorten', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ originalUrl: originalUrl}),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        setShortUrl(data.shortCode);
        console.log(data.shortCode);
        setLoading(false);

        return;
    }

    return(
        <div className="main-container">
            <form onSubmit={handleSubmit} className="url-form">
                <label>Link shortener</label>
                <input 
                    type="url" 
                    placeholder="Enter your URL here..." 
                    name='originalUrl' value={originalUrl} 
                    onChange={(e) => setOriginalUrl(e.target.value)}>
                </input>
                <button disabled={loading || originalUrl === ''}>
                    Shorten!
                </button>
                <label className={`status-label ${loading ? 'loading' : ''} ${!loading && shortUrl ? 'completed' : ''}`}>{loading ? 'Shortening...' : 'Shortened!'}</label>
            </form>
            {shortUrl && <ShortUrlComponent shortUrl={shortUrl} />}
        </div>
    );
}

export default UrlForm