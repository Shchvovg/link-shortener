
function ShortUrlComponent ({shortUrl = ''}) {
    const BASE_URL: string = import.meta.env.VITE_BASE_URL;

    async function handleButtonClick() {
        await navigator.clipboard.writeText(BASE_URL+'/'+shortUrl);
    }

    return(
        shortUrl && (<div className="short-url">
            <label>Your URL: {BASE_URL+'/'+shortUrl}</label>
            <button onClick={() => handleButtonClick()}>Copy</button>
        </div>)
    );
}

export default ShortUrlComponent;