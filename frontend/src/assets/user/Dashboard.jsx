import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import {Row,Col} from 'react-bootstrap'
import { useAuth } from '../../context/auth'
import Card from 'react-bootstrap/Card';
import Usermenu from '../Usermenu'
function Dashboard() {
  const [auth]=useAuth()
  return (
    <div>
      <Container className='p-4'>
        <Row>
          <Col md={3}>
            <Usermenu />
          </Col>
          <Col md={9}>
            <Card className='w-75 mt-5'>
              <Card.Body>
                <h4>User Name: {auth?.user?.name}</h4>
                <h4>User Email: {auth?.user?.email}</h4>
                <h4>User Contact No.: {auth?.user?.phone}</h4>
                <h4>User Address: {auth?.user?.address}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard