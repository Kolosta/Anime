import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import hljs from 'highlight.js'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
// import 'highlight.js/styles/mononokai.css'
import '../../node_modules/highlight.js/styles/mononokai.css'
  

const ListeVersions = () => {
  const [version, setVersion] = useState([]);

  const [readOnly, setReadOnly] = useState({
    readOnlyStatus: true,
    icon: <FontAwesomeIcon icon={faEyeSlash} />,
  });

  hljs.configure({
    languages: ["javascript", "ruby", "python", "rust"]
  });

  const modules = {
    syntax: {
        highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["code-block"],
        ["clean"],
        ["blockquote"],
      ],
      clipboard: {
        matchVisual: false,
      },
    }
  };

  const modulesFalse = {
    toolbar: false,
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
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "code-block",
  ];
  
  

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

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/version/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReadOnly = () => {
    if (readOnly.readOnlyStatus) {
      setReadOnly({
        readOnlyStatus: false,
        icon: <FontAwesomeIcon icon={faEye} />,
      });
    } else {
      setReadOnly({
        readOnlyStatus: true,
        icon: <FontAwesomeIcon icon={faEyeSlash} />,
      });
    }
  };

  const Editor = ({ value, modules, formats, readOnly, history }) => (
    <ReactQuill
      value={value}
      modules={modules}
      formats={formats}
      readOnly={readOnly}
      history={history}
    />
  );

  return (
    <div>
      <h1>Versions</h1>
      <div>
        {version.map((version) => (
          <div className="version" key={version.id}>
            {/* <p>{version.content}</p> */}
            {/* <ReactQuill theme="snow" readOnly value={version.content}/> */}

            <button onClick={handleReadOnly}>{readOnly.icon}</button>
            {console.log(readOnly.readOnlyStatus)}
            {/* <ReactQuill
              value={version.content}
              modules={readOnly.readOnlyStatus ? modules : modulesFalse}
              formats={formats}
              readOnly={readOnly.readOnlyStatus}
              history={true}
            /> */}
            <Editor
                key={readOnly.readOnlyStatus ? "readonly" : "edit"}
                value={version.content}
                theme="bubble"
                modules={readOnly.readOnlyStatus ? modulesFalse : modules}
                formats={formats}
                readOnly={readOnly.readOnlyStatus}
                history={true}
            />

            <p>{new Date(version.date).toLocaleDateString("fr-FR")}</p>
            <button className="delete" onClick={() => handleDelete(version.id)}>
              Supprimer
            </button>
            <button className="update">
              {" "}
              <Link to={`/editor/${version.id}`}>Modifier</Link>{" "}
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add_version">Ajouter une version</Link>
      </button>
    </div>
  );
};

export default ListeVersions;
