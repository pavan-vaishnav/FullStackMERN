import React from 'react'
import { useSearch } from '../context/search'
import { Container,Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
function Search() {
    const [values,setValues]=useSearch()
  return (
    <div className='text-center'>
        <h2>Search Result</h2>
        <h4>
        {
            values?.result.length<1?"No Products Found":`Total ${values?.result.length} products found`
        }
        </h4>
        <Container>
        <div className='row row-cols-1 row-cols-md-3 g-4 mt-4'>
                          {
                              values?.result.map((p, i) => {
                                  return (
                                    <Col key={i}>
                                        {/* <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id}> */}
                                      <Card style={{ width: '16rem' }} className='text-center h-100 p-2'>
                                          <Card.Img variant="top" src={`https://mernbackend-ja52.onrender.com/api/product/product-photo/${p._id}`} className='h-50 w-50 img-fluid mx-auto d-block'/>
                                          <Card.Body>
                                              <Card.Title>{p.name}</Card.Title>
                                              <Card.Text>
                                                <p>{p.description}</p>
                                                <p>{p.price}</p>
                                              </Card.Text>
                                              <Button variant="success">Add to Cart</Button>
                                          </Card.Body>
                                      </Card>
                                      {/* </Link> */}
                                      </Col>
                                  )
                              })
                          }
                      </div>
        </Container>
    </div>
  )
}

export default Search