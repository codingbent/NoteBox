import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    const response = await fetch(`/api/auth/createuser`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Successfully signed up", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange=(e)=>{
    setcredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div className='container mt-5'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="name" className="form-label">Enter Your Name</label>
          <input className="form-control" name="name" id="name" type="text" placeholder="Name Surname" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Enter Your Email</label>
          <input type="email" className="form-control" name="email" id="exampleFormControlInput1" placeholder="name@example.com" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" id="exampleInputPassword2" onChange={onChange} required/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
