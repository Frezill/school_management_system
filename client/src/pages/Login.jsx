import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import '../styles/Login.scss'
import { loginUserService } from '../services/userService';
import { jwtDecode } from "jwt-decode";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLoginButton = async (event) => {
        try {
            event.preventDefault()
            let token = await loginUserService(email, password)
            let user = jwtDecode(token);
            dispatch(
                setLogin({
                    user: user,
                    token: token
                })
            );
            navigate("/");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="title">LOGIN USER</div>
                <Form.Group className='mb-3'>
                    <Form.Label><strong>Email</strong></Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
                </Form.Group>

                <Form.Group className='mb-3' >
                    <Form.Label><strong>Password</strong></Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
                </Form.Group>

                <button onClick={(event) => (handleLoginButton(event))}>Login</button>

            </div>
        </div>
    )
}

export default Login