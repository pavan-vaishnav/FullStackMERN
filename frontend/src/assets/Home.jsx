import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/auth'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCart } from '../context/cart';
function Home() {
  const [auth, setAuth] = useAuth()
  const [cart,setCart]=useCart()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [checked,setChecked]=useState([])
  function getAllCategories() {
    fetch("https://mernbackend-ja52.onrender.com/api/category/allCategories").then((res1) => {
      res1.json().then((res2) => {
        console.log(res2)
        setCategories(res2.categories)
      })
    })
  }
  useEffect(() => {
    getAllCategories()
  }, [])
  function getallprods() {
    fetch("https://mernbackend-ja52.onrender.com/api/product/allproducts").then((res1) => {
      res1.json().then((res2) => {
        console.log(res2)
        setProducts(res2.products)
      })
    })
  }
  useEffect(() => {
    getallprods()
  }, [])
  function handleFilter(value,id)
  {
    let all=[...checked]
    if(value)
    {
      all.push(id)
    }
    else
    {
      all=all.filter(c=>c!==id)
    }
    setChecked(all)
  }
  function filterproducts()
  {
    let data={checked}
    fetch("https://mernbackend-ja52.onrender.com/api/product/filter",{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    }).then((res1)=>{
      res1.json().then((res2)=>{
        setProducts(res2.products)
      })
    })
  }
  useEffect(()=>{
  if(checked.length) filterproducts()
  },[checked])
  return (
    <div>
      <h1 className='text-center'>Online Shopping App</h1>
      <Container>
        <Row>
          <Col md={2}>
            <h3 className='my-4 text-center'>Categories</h3>
            {
              categories.map((c) => {
                return (
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    id={`default-checkbox`}
                    key={c._id}
                    label={`${c.name}`}
                    className='p-3'
                    onChange={(e)=>handleFilter(e.target.checked,c._id)}
                  />
                )
              })
            }
            <Button variant="secondary" className='mt-3' onClick={()=>window.location.reload()}>Clear Filters</Button>
          </Col>
          <Col md={10}>
            <div className='row row-cols-1 row-cols-md-3 g-4 mt-3'>
              {
                products.map((p, i) => {
                  return (
                    <Col key={i}>
                      <Card style={{ width: '16rem' }} className='text-center h-100 p-2'>
                        <Card.Img variant="top" src={`https://mernbackend-ja52.onrender.com/api/product/product-photo/${p._id}`} className='h-50 w-50 img-fluid mx-auto d-block' />
                        <Card.Body>
                          <Card.Title>{p.name}</Card.Title>
                          <Card.Text>
                            <p>{p.description}</p>
                            <p>₹ {p.price}</p>
                          </Card.Text>
                          <Button variant="success" onClick={()=>{
                            setCart([...cart,p])
                            localStorage.setItem('cart',JSON.stringify([...cart,p]))
                          }}>Add to Cart</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })
              }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home