import { useState } from "react";
import ShortUrlComponent from "./components/ShortUrlComponent";
import UrlForm from "./components/UrlForm";



function App() {
  const API_URL: string = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [latestShortUrl, setLatestShortUrl] = useState('');

  const updateSidebar = async () => {
    const LinkArray = localStorage.getItem('linkArray');

    const response = await fetch(`${API_URL}/api/getLinks`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: LinkArray,
    });

    const data = await response.json();
    const linkItemArray = JSON.parse(data);
    console.log(linkItemArray);

  }

   const handleShorten = async (originalUrl: string) => {

        setLoading(true);
        setLatestShortUrl('');

        console.log(originalUrl);
        const response = await fetch(`${API_URL}/api/shorten`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ originalUrl: originalUrl}),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        setLatestShortUrl(`${data.originalUrl}/${data.shortCode}`);

        console.log(data.shortCode);
        setLoading(false);

        const existingLinkArrayString = localStorage.getItem('linkArray');
        let existingLinkArray = [];
        if (existingLinkArrayString) {
          existingLinkArray = JSON.parse(existingLinkArrayString);
        }
        existingLinkArray.push(data.shortCode);

        localStorage.setItem('linkArray', JSON.stringify(existingLinkArray));

        updateSidebar();

        return;
    }

    const getStatusMessage = () => {
      if (loading) return 'Shortening...';
      if (latestShortUrl) return 'Shortened!';
      return '';
      };


  return (
   <div>
    <main className="page-layout">
    <UrlForm onShorten={handleShorten} loading={loading} statusMessage={getStatusMessage()}/>
    <ShortUrlComponent shortUrl={latestShortUrl}/>
    </main>
   </div>
  );
}

export default App