import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Adminmenu from '../Adminmenu'

function Users() {
  const [emps,setEmps]=useState([])
  function getallemps()
  {
    fetch("https://mernbackend-ja52.onrender.com/api/auth/userlist").then((res1)=>{
      res1.json().then((res2)=>{
        console.log(res2)
        setEmps(res2.users)
      })
    })
  }
  useEffect(()=>{
    getallemps()
  },[])
  return (
    <div>
      <Row>
        <Col md={3}>
        <Adminmenu/>
        </Col>
        <Col md={9}>
        <h3 className='text-center my-4'>All users</h3>
        <table className='table p-4'>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th></tr>
          </thead>
          <tbody>
            {
              emps.map((e,i)=>{
                return (
                  <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>{e.address}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </Col>
      </Row>
    </div>
  )
}

export default Users