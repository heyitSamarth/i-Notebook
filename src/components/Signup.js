import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'

function Signup(props) {
    let nav = useNavigate();

    const [cred, setcred] = useState({name:"",email:"",password:"",cpassword :""})
    const handleSubmit= async(e)=>
    {
        e.preventDefault();
        if(cred.password===cred.cpassword)
        {
          // console.log(cred.cpassword);
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:cred.name,email:cred.email,password:cred.password}) 
          });
          const json = await response.json();
          //  console.log(json);
           if(json.sucess)
           {
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            nav("/")
            props.showAlert("Account Created Successfully ","success")
           }
           else{
            props.showAlert("Invalid Details ","danger")
           }}
           else{
            props.showAlert("Please reenter password ","danger")
           }
    }
    const onChange=(e)=>{
        setcred({...cred, [e.target.name] : e.target.value});

    }
    return (
        <>
        <div  className=''>
  <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3 ">
          <label>Full Name</label>
          <input
            type="text" onChange={onChange}
            className="form-control"
            name='name'
            value={cred.name}
            placeholder="First name"
            required 
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email" name='email' onChange={onChange}
            className="form-control"
            value={cred.email}
            placeholder="Enter email"
            required 
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password" onChange={onChange}
            className="form-control"
            autoComplete="on"
            value={cred.password}
            name='password'
            placeholder="Enter password"
            id='password'
            required minLength={5}
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password" onChange={onChange}
            className="form-control"
            autoComplete="on"
            value={cred.cpassword}
            name='cpassword'
            placeholder="Enter password"
            id='cpassword'
            required minLength={5}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right my-3">
          Already registered <Link to="/login">Login ?</Link>
        </p>
      </form>
      </div>
        </>
            
            )
}

            export default Signup;
