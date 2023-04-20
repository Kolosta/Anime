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
// import '../../node_modules/highlight.js/styles/mononokai.css'8
  

const Editor = (props) => {
  const [version, setVersion] = useState({
    content: props.content,
    date: props.date,
  });

  const [readOnly, setReadOnly] = useState({
    readOnlyStatus: props.readOnly,
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

  const Editor = ({ value, theme, modules, formats, readOnly, history }) => (
    <ReactQuill
      value={value}
      theme={theme}
      modules={modules}
      formats={formats}
      readOnly={readOnly}
      history={history}
    />
  );

    const handleChangeEditor=(e)=>{
        setVersion({content: e, date: version.date});
        console.log("Value : " + e)
        console.log("Version : " + version.content)
    };

  

  return (
    <div>
      <div>

            {props.isNew ? null : <button onClick={handleReadOnly} >{readOnly.icon}</button>}
            {/* <button onClick={handleReadOnly} >{readOnly.icon}</button> */}
            {console.log(readOnly.readOnlyStatus)}

            <Editor
                value={version.content}
                theme="snow"
                modules={readOnly.readOnlyStatus ? modulesFalse : modules}
                formats={formats}
                readOnly={readOnly.readOnlyStatus}
                history={true}
                onChange={handleChangeEditor}
            />

            {/* <p>{new Date(version.date).toLocaleDateString("fr-FR")}</p> */}
            {/* <button className="update">
              {" "}
              <Link to={`/editor/${version.id}`}>Modifier</Link>{" "}
            </button> */}
      </div>
      {/* <button>
        <Link to="/add_version">Ajouter une version</Link>
      </button> */}
    </div>
  );
};

export default Editor;
