import React, {useState} from "react"
import { database } from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import "./RegisterAndLogin.css"

function RegisterAndLogin(){
    const[login, setLogin] = useState(false)

    const history = useNavigate()

    const handleSubmit =(e, type)=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        if(type === 'signup'){
        createUserWithEmailAndPassword(database, email, password).then(data=>{
            console.log(data, "authData")
            history("/home")

        }).catch(err=>{
            alert(err.code)
            setLogin(true)
        })
    }else{
        signInWithEmailAndPassword(database, email, password).then(data=>{
            console.log(data, "authData")
            history("/home")

        }).catch(err=>{
            alert(err.code)
        })
    }
    }
    return(
        <div className="login-container">
            <div className="log-status">
        <div className={login === false? 'activeColor':'pointer'} onClick={(()=>setLogin(false))}>Sign Up</div>
        <div className={login === true? 'activeColor':'pointer'} onClick={(()=>setLogin(true))}>Sign In</div>
            </div>
            <h1>{login? 'Signin' : 'Signup'}</h1>
            <form onSubmit={(e)=>handleSubmit(e, login? 'Signin' : 'Singnup')}>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="password"/>
                <div className="btn-container">
                <button>{login? 'Signin':'Signup'}</button>
                </div>
            </form>
        </div>
    )
}
export default RegisterAndLogin


