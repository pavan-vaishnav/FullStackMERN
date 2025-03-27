import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
function Forgotpass() {
    const [email,setEmail]=useState("")
    const [answer,setAnswer]=useState("")
    const [newPassword,setNewPassword]=useState("")
    let navigate=useNavigate()
    function changepass(e)
    {
        e.preventDefault()
        let newpass={email,answer,newPassword}
        axios.post("https://mernbackend-ja52.onrender.com/api/auth/forgotpass",newpass).then((res)=>{
            console.log(res)
            alert("Password reset successfully")
            navigate('/Signin')
        })
    }
    return (
        <div>
            <Container>
                <Form className='text-center mt-4' onSubmit={changepass}>
                    <Form.Group className="mb-3 w-50 mx-auto d-block" controlId="formGroupEmail">
                        <Form.Control type="email" placeholder="Enter email" value={email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 w-50 mx-auto d-block" controlId="formGroupAnswer">
                        <Form.Control type="text" placeholder="Which is your favourate sports?"  value={answer}
                        onChange={(e)=>setAnswer(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 w-50 mx-auto d-block" controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Password"  value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}/>
                    </Form.Group>
                    <Button type="submit" className='my-4'>Change Password</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Forgotpass