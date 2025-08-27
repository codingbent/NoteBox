import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    let navigate=useNavigate();
    const [details, setDetails] = useState({
            email:"",
            password:""
        });
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const host="http://"
        const response = await fetch(`${host}localhost:5001/api/auth/login`,{
            method :"POST" ,
            headers:{
                 "Content-Type": "application/json"
            },
            body:JSON.stringify({email:details.email,password:details.password}),
        });
            const json=await response.json();
            console.log(json);
            if(json.success){
                localStorage.setItem('token',json.authtoken);
                navigate("/");
            }
            else{
                alert("Enter correct credentials");
            }
    }
     const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };
  return (
    <>
        <div className='container my-5 px-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={details.email} name="email" aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={details.password} id="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Log In</button>
            </form>
        </div>
    </>
    
  )
}

export default Login
