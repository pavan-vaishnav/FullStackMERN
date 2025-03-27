import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom'

function Privateroute() {
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()
    useEffect(()=>{
        const authCheck=()=>{
            fetch("https://mernbackend-ja52.onrender.com/api/auth/userauth",{
                headers:{
                    "authorization":auth?.token
                }
            }).then((res)=>{
                res.json().then((res1)=>{
                    console.log(res1)
                    if(res.ok)
                        {
                            setOk(true)
                        }
                        else
                        {
                            setOk(false)
                        }
                })
            })
            
        }
        if(auth?.token)
            authCheck()
    },[auth?.token])

  return ok?<Outlet></Outlet>:null
}

export default Privateroute