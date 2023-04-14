import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Citation = () => {
  const [citation, setCitation] = useState([]);

  useEffect(() => {
    const fetchAllCitations = async () => {
      try {
        const res = await axios.get("http://localhost:8800/citations");
        setCitation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCitations();
  }, []);

  const handleDelete = async (id)=>{
    try {
      await axios.delete("http://localhost:8800/citation/"+id)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Citations</h1>
      <div>
        {citation.map((citation) => (
          <div className="citation" key={citation.id}>
            {citation.image && <img src={citation.image} alt="Screenshoot de la citation"/>}
            <p>{citation.text}</p>
            <button className="delete" onClick={()=>handleDelete(citation.id)}>Supprimer</button>
            <button className="update"> <Link to={`/update_citation/${citation.id}`}>Modifier</Link> </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Ajouter une citation</Link>
      </button>
    </div>
  );
};

export default Citation;
