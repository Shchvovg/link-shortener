
function ShortUrlComponent ({shortUrl = 'ssasdasd'}) {
    return(
        <div className="short-url">
            <label>Your URL: {shortUrl}</label>
            <button>Copy</button>
        </div>
    );
}

export default ShortUrlComponent;