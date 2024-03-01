import { useEffect, useState } from "react"
import { UserDetailsApi } from "../services/Api"
import NavBar from "../components/NavBar"
import { isAuthenticated, logout } from "../services/Auth"
import { Navigate, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { getUserData } from "../services/Storage"

export default function DashboardPage(){
   const navigate= useNavigate();//hooks
//ithu router thaara function
    const [user,setUser]=useState({name:"",email:"",localId:""})
    
    useEffect(()=>{
    if (isAuthenticated()){
        let decoded=jwtDecode(getUserData());
        setUser({ name: decoded.name, email: decoded.emailId, localId: decoded.iss })
    }
    },[])

    const logoutUser=()=>{
        logout();
        navigate('/login')
    }


    return(
    <div>
        <NavBar logoutUser={logoutUser}/>
        <main role="main" className="container mt-5">
            <div className="container">
              <div className="text-center mt-5">
                <h3>Dashboard page</h3>
                {user.name && user.email && user.localId?
                    (
                        <div>
                        <p className="text-bold " >Hi {user.name}, your User ID is {user.localId}</p>
                        <p>Your email is {user.email}</p>
                        </div>
                    ):<p>Loading...</p>
                   
                }
                
                
              </div>
            </div>
        </main>
    </div>
        
    )
}