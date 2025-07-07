import UrlForm from "./components/UrlForm";


function App() {

  const API_URL: string = import.meta.env.VITE_API_URL;
  return (
   <div className="page-layout-grid">
    <UrlForm url={API_URL}/>
   </div>
  );
}

export default App