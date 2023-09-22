import React from "react"
import { database } from "../../firebase"
import { signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import "./RegisterAndLogin.css"

function RegisterAndLogin(){

    const history = useNavigate()

    const handleSubmit =(e)=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
       
        signInWithEmailAndPassword(database, email, password).then(data=>{
            console.log(data, "authData")
            history("/home")

        }).catch(err=>{
            alert(err.code)
           
        })
    
    }
    return(
        <div className="login-container">
            
            <h1>Sign in</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="password"/>
                <div className="btn-container">
                <button>Sign in</button>
                </div>
            </form>
        </div>
    )
}
export default RegisterAndLogin





