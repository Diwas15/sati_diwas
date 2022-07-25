import React, {useState} from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import {auth} from './firebase'

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')

    const signIn = e => {
        e.preventDefault()

        //firebase login work
    }

    const register = e => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password)
        .then(auth => 
            console.log(auth))
        .catch(error => alert(error.message))
    }


  return (
    <div className="login">
        <Link to = '/'>
        <img className='login__img'
        src = 'https://seeklogo.com/images/A/amazon-logo-86547BFB54-seeklogo.com.png' alt='' />
        </Link>
        <div className="login__container">
            <h1>Sign-in</h1>
            <form action="">
                <h5>E-mail</h5>
                <input type="email" value = {email} onChange={e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value = {password} onChange={e => setPassword(e.target.value)}  />
                <button type='submit' className='login__signin' onClick={signIn} >Sign in</button>
            </form>
            <p>by signing-in you agree to the AMAZON FAKE CLONE Coditions of 
               use & sale. Please see our Privacy Notice, our Cookies Notice
               and our Interest Based Ad Notice.
            </p>
            <button className='login__register' onClick={register}>Create Amaozon Account</button>

        </div>
    </div>
  )
}

export default Login