import React, { useState,useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/auth';
import Adminmenu from '../Adminmenu';
import { useNavigate } from 'react-router-dom';
function Createproduct() {
  const [categories,setCategories]=useState([])
  const [category,setCategory]=useState("")
  const [name,setName]=useState("")
  const [price,setPrice]=useState("")
  const [quantity,setQuantity]=useState("")
  const [description,setDescription]=useState("")
  const [photo,setPhoto]=useState("")
   const [products,setProducts]=useState([])
   const navigate=useNavigate()
  const [auth]=useAuth()
  function getallprods()
      {
          fetch("https://mernbackend-ja52.onrender.com/api/product/allproducts").then((res1)=>{
              res1.json().then((res2)=>{
                  console.log(res2)
                  setProducts(res2.products)
              })
          })
      }
      useEffect(()=>{
          getallprods()
      },[])
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
    function addprod(e)
    {
      e.preventDefault()
      const prod=new FormData()
      prod.append("name",name)
      prod.append("price",price)
      prod.append("quantity",quantity)
      prod.append("description",description)
      prod.append("category",category)
      photo && prod.append("photo",photo)
      fetch("https://mernbackend-ja52.onrender.com/api/product/create-product",{
        method:"post",
        headers:{
          "authorization":auth.token
        },
        body:prod
      }).then((res1)=>{
        res1.json().then((res2)=>{
          console.log(res2)
          getallprods()
          navigate('/dashboard/admin/allproducts')
        })
      })
    }
  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
          <Adminmenu/>
          </Col>
          <Col md={9}>
          <form className='mt-4 w-50 text-center mx-auto d-block' onSubmit={addprod}>
        <h4 className='mb-4'>Create New Product</h4>
        <Form.Select aria-label="Default select example" className='mb-3' name={category} 
        onChange={(e)=>setCategory(e.target.value)}>
          <option>---select category---</option>
          {
            categories.map((c,i)=>{
              return (
                <option key={i} value={c._id}>{c.name}</option>
              )
            })
          }
        </Form.Select>
        <Form.Control type='text' placeholder='Enter Name of Product' className='mb-3'
        value={name} onChange={(e)=>setName(e.target.value)}>
        </Form.Control>
        <Form.Control type='text' placeholder='Enter Price of Product' className='mb-3'
        value={price} onChange={(e)=>setPrice(e.target.value)}>
        </Form.Control>
        <Form.Control type='text' placeholder='Enter Quantity of Product' className='mb-3'
        value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
        </Form.Control>
        <Form.Control type='text' placeholder='Enter Description of Product' className='mb-3'
        value={description} onChange={(e)=>setDescription(e.target.value)}>
        </Form.Control>
        <Form.Control type='file' placeholder='Enter Name of Product' className='mb-3'
        name={photo} accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])}>
        </Form.Control>
        <Button variant="primary" type="submit">
        Add Product
      </Button>
      </form>
          </Col>
        </Row>
      
      </Container>
    </div>
  )
}

export default Createproduct