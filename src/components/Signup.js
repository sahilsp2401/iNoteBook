import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";

export const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(credentials.cpassword === credentials.password){
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credentials.name,email: credentials.email,password: credentials.password}),
          });
          const json = await response.json()
          if(json.success){
            // redirect
            localStorage.setItem('token',json.authToken)
            props.showAlert("Account created SuccessFully",'success')
            navigate("/login")
        }
        else{
          props.showAlert("Invalid credentials",'danger')
        }}
        else{
          props.showAlert("Password not match",'danger')
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
  return (
    <div className='container my-2'>
      <h2>Create a account to use iNotebook</h2>
        <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Username</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange}
            value={credentials.name} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="email" onChange={onChange}
            value={credentials.email} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input minLength={5} type="password" className="form-control" name='password' id="password" onChange={onChange}
            value={credentials.password} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange}
            value={credentials.cpassword} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
