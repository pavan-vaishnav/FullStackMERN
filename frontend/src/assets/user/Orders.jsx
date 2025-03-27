import React, { useEffect, useRef, useState } from 'react'
import { useCart } from '../../context/cart'
import { useAuth } from '../../context/auth'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Usermenu from '../Usermenu'
import DropIn from "braintree-web-drop-in-react";
import * as braintree from "braintree-web-drop-in"

function Orders() {
  const [cart,setCart]=useCart()
  const [auth,setAuth]=useAuth()
  const [clientToken,setClientToken]=useState("")
  const [instance,setInstance]=useState()

  console.log(auth)
  const totalprice=()=>{
    let total=0
    cart.map(item=>{total=total+item.price})
    return total
  }
  function removeitem(cid)
  {
    let myCart=[...cart]
    let index=myCart.findIndex(item=>item._id==cid)
    myCart.splice(index,1)
    setCart(myCart)
    localStorage.setItem("cart",JSON.stringify(myCart))
  }
  const getToken= ()=>{
    try{
      fetch("https://mernbackend-ja52.onrender.com/api/product/braintree/token").then((res1)=>{
        res1.json().then((res2)=>{
          console.log(res2)
          setClientToken(res2.clientToken)
        })
      })

    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getToken()
    //eslint-disabled-next-line
  },[auth?.token])
  function handlePay()
  {
    const { nonce } = instance.requestPaymentMethod()
    fetch("https://mernbackend-ja52.onrender.com/api/product/braintree/payment",{
      method:"post",
      headers:{
        "authorization": clientToken
      },
      body:JSON.stringify({nonce,cart})
    }).then((res1)=>{
      res1.json().then((res2)=>{
        console.log(res2)
      })
    })
    
    localStorage.removeItem("cart")
      setCart([]);
     alert("Payment Completed Successfully ") 
  }
  return (
    <div>
      <Row>
        <Col md={3}>
        <Usermenu/>
        </Col>
        <Col md={9}>
        <Container className='text-center'>
      {
        auth.token?(<>
      <h1>Hello!!, {auth.user.name}</h1>
      <h5>You have {cart.length} products in your cart.</h5> 
      
        <table className='table mt-5'>
          <thead>
            <tr><th>Image</th><th>Name</th><th>Price</th></tr>
          </thead>
          <tbody>
            {
              cart.map((c,i)=>{
                return (
                  <tr key={i}>
                    <td><img src={`https://mernbackend-ja52.onrender.com/api/product/product-photo/${c._id}`} className='img-fluid mx-auto d-block'height={80} width={80}/></td>
                    <td>{c.name}</td>
                    <td>{c.price}</td>
                    <td><i className="fa-solid fa-trash text-danger fs-4" onClick={()=>removeitem(c._id)}></i></td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr><td>Total : </td><td colSpan={2}>₹ {totalprice()}</td>
            <td></td></tr>
          </tfoot>
        </table>
        </>):"Please Login to see the products added in the cart"
      }
      <div className='mt-4'>
        {!clientToken || !cart?.length?(" "):<>
          <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

        <Button variant='primary' onClick={handlePay}>Proceed to Pay</Button>
        </>}
      
      </div>
      </Container>
        </Col>
      </Row>
      
    </div>
  )
}

export default Orders