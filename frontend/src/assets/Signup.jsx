import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [password,setPassword]=useState("")
  const [address,setAddress]=useState("")
  const [answer,setAnswer]=useState("")
  const navigate=useNavigate()
  function adduser(e)
  {
    let user={name,email,phone,password,address,answer}
    e.preventDefault()
    fetch("https://mernbackend-ja52.onrender.com/api/auth/register",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    }).then((res1)=>{
      res1.json().then((res2)=>{
        console.log(res2)
        navigate('/Signin')
      })
    })
  }
  return (
    <div>
      <Container>
        <Form className='mt-4 text-center' onSubmit={adduser}>
          <h1 className='mb-4'>Registration Form</h1>
          <Form.Group className="mb-3 w-25 mx-auto d-block" controlId="formGroupName">
            <Form.Control type="text" placeholder="Enter Name" value={name}
            onChange={(e)=>setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto d-block" controlId="formGroupPhone">
            <Form.Control type="text" placeholder="Enter Phone Number" value={phone}
            onChange={(e)=>setPhone(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto d-block" controlId="formGroupEmail">
            <Form.Control type="email" placeholder="Enter email" value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto d-block" controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto d-block" controlId="formGroupAddress">
            <Form.Control type="text" placeholder="Enter Address" value={address}
            onChange={(e)=>setAddress(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto d-block" controlId="formGroupAnswer">
            <Form.Control type="text" placeholder="Which is your favourate sports?" value={answer}
            onChange={(e)=>setAnswer(e.target.value)}/>
          </Form.Group>
          <Button type="submit" className='my-4'>SIGNUP</Button>
        </Form>
      </Container>
    </div>
  )
}

export default Signup