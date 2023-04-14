import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCitation = () => {
  const [citation, setCitation] = useState({
    text:"",
    image:"",
  });

  const navigate = useNavigate();

  const handleChange=(e)=>{
    setCitation(prev=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/citation", citation)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  // console.log(citation);

  return (
    <div className='form'>
      <h1>Ajouter une citation</h1>
      <input type="text" placeholder="texte" onChange={handleChange} name="text"/>
      <input type="text" placeholder="image" onChange={handleChange} name="image"/>
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default AddCitation