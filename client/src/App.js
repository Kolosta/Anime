import {BrowserRouter, Routes, Route} from "react-router-dom";
import Citation from "./pages/Citation";
import UpdateCitation from "./pages/UpdateCitation";
import AddCitation from "./pages/AddCitation";
import QuillEditor from "./pages/QuillEditor";
import ListeVersions from "./pages/ListeVersions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Citation/>}/>
          <Route path="/add_citation" element={<AddCitation/>}/>
          <Route path="/update_citation/:id" element={<UpdateCitation/>}/>
          <Route path="/editor/:id" element={<QuillEditor/>}/>
          <Route path="/liste_versions" element={<ListeVersions/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
