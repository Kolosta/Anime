import axios from 'axios';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Editor from './Editor';

const AddVersion = () => {
    const [version, setVersion] = useState({
        content:"",
        date: new Date().toISOString().slice(0, 10),
    });

    const navigate = useNavigate();

    const handleChangeEditor=(e)=>{
        setVersion({content: e, date: version.date});
        console.log("Value : " + e)
        console.log("Version : " + version.content)
    };

    const handleChangeInput=(e)=>{
        setVersion(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        try {
            console.log(version)
            await axios.post("http://localhost:8800/version", version);
            navigate("/liste_versions")
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div>
        {/* <ReactQuill theme="snow" value={version.content} onChange={handleChangeEditor}/>
        <div>Version : {version.content}</div><br/> */}

        <Editor 
            content={version.content}
            date={version.date}
            readOnly={false}
            isNew={true}
            // onChange={handleChangeEditor}
        />

        {/* <p>{new Date(version.date).toLocaleDateString("fr-FR")}</p> */}


        <input type="date" defaultValue={version.date} onChange={handleChangeInput} name="date"/><br/><br/>
        <button onClick={handleClick}>Valider</button>
    </div>
  )
}

export default AddVersion;