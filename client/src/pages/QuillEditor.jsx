import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const QuillEditor = () => {
    const [version, setVersion] = useState({
        content:"",
        date: new Date().toISOString().slice(0, 10),
    });

    const navigate = useNavigate();

    const handleChangeEditor=(e)=>{
        setVersion({content: e, date: version.date});
        // console.log("Value : " + e)
        // console.log("Version : " + version.content)
    };

    const handleChangeInput=(e)=>{
        setVersion(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        try {
            console.log(version)
            await axios.post("http://localhost:8800/version", version);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div>
        <ReactQuill theme="snow" value={version.content} onChange={handleChangeEditor}/>
        <div>Version : {version.content}</div><br/>
        <input type="date" defaultValue={version.date} onChange={handleChangeInput} name="date"/><br/><br/>
        <button onClick={handleClick}>Valider</button>
    </div>
  )
}

export default QuillEditor