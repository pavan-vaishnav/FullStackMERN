import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/auth';
function Signin() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [auth,setAuth]=useAuth()
  let navigate=useNavigate()
  function login(e)
  {
    let u={email,password}
    e.preventDefault()
    axios.post("https://mernbackend-ja52.onrender.com/api/auth/login",u).then((res)=>{
      console.log(res)
      alert("Login Successful")
      setAuth({
        ...auth,
        user:res.data.user,
        token:res.data.token
    })
      navigate('/')
      localStorage.setItem("auth",JSON.stringify(res.data))
    })
  }
  return (
    <div>
      <Container>
        <Form className='text-center mt-4' onSubmit={login}>
          <h2 className='mb-4'>Login</h2>
          <Form.Group className="mb-3 w-25 mx-auto d-block" controlId="formGroupEmail">
            <Form.Control type="email" placeholder="Enter email" value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto d-block" controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          <Button type="submit" className='my-4'>SIGNIN</Button>
          <Link to='/forgotpass' className='text-decoration-none ms-3'>Forgot Password?</Link>
        </Form>
      </Container>
    </div>
  )
}

export default Signin