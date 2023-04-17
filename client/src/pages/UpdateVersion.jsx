import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateVersion = () => {
  const [version, setVersion] = useState({
    content: "",
    date: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const versionId = location.pathname.split("/")[2];

  useEffect(() => {
    // Effectue une requête GET à l'API pour récupérer les données
    axios
      .get(`http://localhost:8800/version/${versionId}`)
      .then((response) => {
        // Utilise les données pour initialiser le state
        setVersion({
          content: response.data[0].content,
          date: new Date(response.data[0].date).toISOString().slice(0, 10),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [, versionId]);

  const handleChangeEditor = (e) => {
    setVersion({ content: e, date: version.date });
    // console.log("Value : " + e)
    // console.log("Version : " + version.content)
  };

  const handleChangeInput = (e) => {
    setVersion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(version);
      await axios.put("http://localhost:8800/version/" + versionId, version);
      navigate("/liste_versions");
    } catch (err) {
      console.log(err);
    }
  };

  const handleReturnHome = () => {
    navigate("/liste_versions");
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={version.content}
        onChange={handleChangeEditor}
      />
      <div>Version : {version.content}</div>
      <br />
      <input
        type="date"
        defaultValue={version.date}
        onChange={handleChangeInput}
        name="date"
      />
      <br />
      <br />
      <button onClick={handleReturnHome}>Annuler</button>
      <button onClick={handleClick}>Valider la modif</button>
    </div>
  );
};

export default UpdateVersion;
