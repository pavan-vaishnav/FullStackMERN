import React, { useState,useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/auth';
import Adminmenu from '../Adminmenu';
import { useNavigate, useParams } from 'react-router-dom';

function Updateproduct({p}) {
    const [categories,setCategories]=useState([])
    const [category,setCategory]=useState("")
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [quantity,setQuantity]=useState("")
    const [description,setDescription]=useState("")
    const [photo,setPhoto]=useState("")
     const [products,setProducts]=useState([])
     const [id,setId]=useState(null)
     const navigate=useNavigate()
    const [auth]=useAuth()
    const params=useParams()
    console.log(params)
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
      function editprod(e)
      {
        e.preventDefault()
        const prod=new FormData()
        prod.append("name",name)
        prod.append("price",price)
        prod.append("quantity",quantity)
        prod.append("description",description)
        prod.append("category",category)
        photo && prod.append("photo",photo)
        fetch(`https://mernbackend-ja52.onrender.com/api/product/update-product/${id}`,{
          method:"put",
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
    function getsingleprod()
    {
        fetch(`https://mernbackend-ja52.onrender.com/api/product/single-product/${params.slug}`).then((res1)=>{
            res1.json().then((res2)=>{
                console.log(res2)
                let prod=res2.product
                setName(prod.name)
                setCategory(prod.category.name)
                setDescription(prod.description)
                setPrice(prod.price)
                setQuantity(prod.quantity)
                setPhoto(prod.photo)
                setId(prod._id)
            })
        })
    }
    useEffect(()=>{
        getsingleprod()
    },[])
    function delprod(id)
    {
      fetch(`https://mernbackend-ja52.onrender.com/api/product/delete-product/${id}`,{
        method:"delete",
        headers:{
          "authorization":auth.token
        }
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
            <form className='mt-4 w-50 text-center mx-auto d-block' onSubmit={editprod}>
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
          Edit Product
        </Button>
        <Button variant="danger" onClick={()=>delprod(id)}>
          Delete Product
        </Button>
        </form>
            </Col>
          </Row>
        
        </Container>
      </div>
    )
}

export default Updateproduct