import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Adminmenu from '../Adminmenu'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
function Products() {
    const [products,setProducts]=useState([])
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
  return (
    <div>
        <Container>
            <Row className='mt-4'>
                <Col md={3}>
                <Adminmenu/>
                </Col>
                <Col md={9}>
                      <div className='row row-cols-1 row-cols-md-3 g-4'>
                          {
                              products.map((p, i) => {
                                  return (
                                    <Col key={i}>
                                        <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id}>
                                      <Card style={{ width: '16rem' }} className='text-center h-100 p-2'>
                                          <Card.Img variant="top" src={`https://mernbackend-ja52.onrender.com/api/product/product-photo/${p._id}`} className='h-50 w-50 img-fluid mx-auto d-block'/>
                                          <Card.Body>
                                              <Card.Title>{p.name}</Card.Title>
                                              <Card.Text>
                                                <p>{p.description}</p>
                                                <p>₹ {p.price}</p>
                                              </Card.Text>
                                              <Button variant="success">Add to Cart</Button>
                                          </Card.Body>
                                      </Card>
                                      </Link>
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

export default Products