import {BrowserRouter, Routes, Route} from "react-router-dom";
import Citation from "./pages/Citation";
import UpdateCitation from "./pages/UpdateCitation";
import AddCitation from "./pages/AddCitation";
import AddVersion from "./pages/AddVersion";
import ListeVersions from "./pages/ListeVersions";
import UpdateVersion from "./pages/UpdateVersion";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Citation/>}/>
          <Route path="/add_citation" element={<AddCitation/>}/>
          <Route path="/update_citation/:id" element={<UpdateCitation/>}/>
          <Route path="/add_version" element={<AddVersion/>}/>
          <Route path="/editor/:id" element={<UpdateVersion/>}/>
          <Route path="/liste_versions" element={<ListeVersions/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
