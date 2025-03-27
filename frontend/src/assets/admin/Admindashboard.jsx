import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import {Row,Col} from 'react-bootstrap'
import Adminmenu from '../Adminmenu'
import { useAuth } from '../../context/auth'
import Card from 'react-bootstrap/Card';
function Admindashboard() {
  const [auth]=useAuth()
  return (
    <div>
      <Container className='p-4'>
        <Row>
          <Col md={3}>
            <Adminmenu />
          </Col>
          <Col md={9}>
            <Card className='w-75 mt-5'>
              <Card.Body>
                <h4>Admin Name: {auth?.user?.name}</h4>
                <h4>Admin Email: {auth?.user?.email}</h4>
                <h4>Admin Contact No.: {auth?.user?.phone}</h4>
                <h4>Admin Address: {auth?.user?.address}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Admindashboard