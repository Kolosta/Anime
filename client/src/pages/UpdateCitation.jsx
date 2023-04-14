import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateCitation = () => {
  const [citation, setCitation] = useState({
    text:"",
    image:"",
  });

  const navigate = useNavigate()
  const location = useLocation()

  const citationId = location.pathname.split("/")[2]

  const handleChange=(e)=>{
    setCitation(prev=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault()
    try {
      await axios.put("http://localhost:8800/citation/"+ citationId, citation)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  // console.log(citation);

  return (
    <div className='form'>
      <h1>Modifier la citation</h1>
      <input type="text" placeholder="texte" onChange={handleChange} name="text"/>
      <input type="text" placeholder="image" onChange={handleChange} name="image"/>
      <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default UpdateCitation;