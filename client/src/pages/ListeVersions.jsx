import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'




const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{
          toggleReadOnly: function() {
            this.quill.root.contentEditable = !this.quill.root.contentEditable;
          },
          icon: <FontAwesomeIcon icon={faEyeSlash} />,
          title: 'Toggle Read-Only Mode'
      }],
      ["clean"]
    ],
    handlers: {
      toggleReadOnly: function() {
        this.quill.root.contentEditable = !this.quill.root.contentEditable;
      }
    }
  },
};
  
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];


const ListeVersions = () => {
  const [version, setVersion] = useState([]);

  useEffect(() => {
    const fetchAllVersions = async () => {
      try {
        const res = await axios.get("http://localhost:8800/versions");
        setVersion(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllVersions();
  }, []);

  const handleDelete = async (id)=>{
    try {
      await axios.delete("http://localhost:8800/version/"+id)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }




  return (
    <div>
      <h1>Versions</h1>
      <div>
        {version.map((version) => (
          <div className="version" key={version.id}>
            {/* <p>{version.content}</p> */}
            {/* <ReactQuill theme="snow" readOnly value={version.content}/> */}

            <ReactQuill
                // ref={reactQuillRef}
                value={version.content}
                // onChange={handleChange}
                modules={modules}
                formats={formats}
            />


            <p>{new Date(version.date).toLocaleDateString('fr-FR')}</p>
            <button className="delete" onClick={()=>handleDelete(version.id)}>Supprimer</button>
            <button className="update"> <Link to={`/editor/${version.id}`}>Modifier</Link> </button>

            <FontAwesomeIcon icon={faEyeSlash} />
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Ajouter une version</Link>
      </button>
    </div>
  );
};

export default ListeVersions;
