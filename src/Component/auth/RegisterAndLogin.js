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
            <h1>{login? 'signin' : 'signup'}</h1>
            <form onSubmit={(e)=>handleSubmit(e, login? 'signin' : 'singnup')}>
                <input name="email" placeholder="Email"/>
                <input name="password" placeholder="password"/>
                <div className="btn-container">
                <button>{login? 'signin':'signup'}</button>
                </div>
            </form>
        </div>
    )
}
export default RegisterAndLogin


