import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import {Row,Col} from 'react-bootstrap'
import Adminmenu from '../Adminmenu'
import Categoryform from '../Categoryform'
import { useAuth } from '../../context/auth'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Createcategory() {
  const [name,setName]=useState("")
  const [categories,setCategories]=useState([])
  const [updateName,setUpdatedName]=useState("")
  const [selected,setSelected]=useState(null)
  const [auth]=useAuth()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  function handleSubmit(e)
  {
    e.preventDefault()
    let n={name}
    fetch("https://mernbackend-ja52.onrender.com/api/category/create-category",{
      method:"post",
      headers:{
        "content-type":"application/json",
        "authorization":auth?.token
      },
      body:JSON.stringify(n)
    }).then((res1)=>{
      res1.json().then((res2)=>{
        console.log(res2)
        getAllCategories()
      })
    })
  }
  function handleUpdate(e)
  {
    e.preventDefault()
    console.log(updateName)
    let data={name:updateName}
    fetch(`https://mernbackend-ja52.onrender.com/api/category/update-category/${selected._id}`,{
      method:"put",
      headers:{
        "content-type":"application/json",
        "authorization":auth?.token
      },
      body:JSON.stringify(data)
    }).then((res1)=>{
      res1.json().then((res2)=>{
        console.log(res2)
        setSelected(null)
        setUpdatedName("")
        setShow(false)
        getAllCategories()
      })
    })

  }
  function handleDelete(id)
  {
    console.log(id)
    fetch(`https://mernbackend-ja52.onrender.com/api/category/delete-category/${id}`,{
      method:"delete",
      headers:{
        "content-type":"application/json",
        "authorization":auth?.token
      }
    }).then((res1)=>{
      res1.json().then((res2)=>{
        console.log(res2)
        getAllCategories()
      })
    })
  }
  function getAllCategories()
  {
    fetch("https://mernbackend-ja52.onrender.com/api/category/allCategories").then((res1)=>{
      res1.json().then((res2)=>{
        console.log(res2)
        setCategories(res2.categories)
      })
    })
  }
  useEffect(()=>{
    getAllCategories()
  },[])
  return (
    <div>
      <Container className='p-4'>
        <Row>
          <Col md={3}>
            <Adminmenu />
          </Col>
          <Col md={9}>
            <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName}/>
            <table className='table p-4' align='center'>
              <tbody>
                {
                  categories.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                        <Button variant="primary" onClick={()=>{handleShow(),setUpdatedName(item.name),setSelected(item)}}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Categoryform handleSubmit={handleUpdate} value={updateName} setValue={setUpdatedName}/>
        </Modal.Body>
        
      </Modal>
                        </td>
                        <Button variant="danger" onClick={()=>handleDelete(item._id)}>Delete</Button>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </Col>
        </Row>
        
      </Container>
    </div>
  )
}

export default Createcategory