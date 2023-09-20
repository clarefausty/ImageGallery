import React from "react"
import { database } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import "./RegisterAndLogin.css"

function RegisterAndLogin(){

    const history = useNavigate()

    const handleSubmit =(e)=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        createUserWithEmailAndPassword(database, email, password).then(data=>{
            console.log(data, "authData")
            history("/home")

        })
    }
    return(
        <div className="login-container">
            <h1>Please Sign In</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input name="email" placeholder="Email"/>
                <input name="password" placeholder="password"/>
                <button>Sign In</button>
            </form>
        </div>
    )
}
export default RegisterAndLogin


