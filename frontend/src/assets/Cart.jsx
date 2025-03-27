import React from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const [cart,setCart]=useCart()
  const [auth,setAuth]=useAuth()
  const navigate=useNavigate()
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
  return (
    <div>
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
            <td><Button variant='primary' onClick={()=>navigate('/dashboard/user/orders')}>Proceed to Checkout</Button></td></tr>
          </tfoot>
        </table>
        </>):"Please Login to see the products added in the cart"
      }
      
      </Container>
    </div>
  )
}

export default Cart