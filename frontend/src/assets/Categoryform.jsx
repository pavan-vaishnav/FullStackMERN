import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Categoryform({handleSubmit,value,setValue}) {
  return (
      <div>        
          <Form onSubmit={handleSubmit} className='p-4 text-center'>
          <h2>Manage Category</h2>
              <Form.Group className="mb-3 w-50 mx-auto d-block" controlId="formGroupText">
                  <Form.Control type="text" placeholder="Enter Category Name" 
                  value={value} onChange={(e)=>setValue(e.target.value)}/>
              </Form.Group>
              <Button type='submit'>Add Category</Button>
          </Form>
      </div>
  )
}

export default Categoryform