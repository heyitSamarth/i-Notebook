import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = (props) => {

    let nav = useNavigate();

    const [cred, setcred] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.sucess) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);

            props.showAlert("Logged in Sucessfully", "success")
            nav("/")
        }
        else {
            props.showAlert("Invalid Credentials ", "danger")
        }
    }
    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value });

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"
                        value={cred.email} id="email" onChange={onChange}
                        name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"
                    autoComplete='no'
                        value={cred.password}
                        name="password" onChange={onChange} id="password" />
                </div>

                <button type="submit" className="btn btn-primary"   >Submit</button>

                <p className='my-3'>
                    Not a User ?
                    No Problem  <Link to="/signup">Signup !</Link>
                </p>
            </form>
        </>
    )
}

export default Login