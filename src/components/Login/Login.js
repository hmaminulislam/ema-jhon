import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import './Login.css';

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    
    const signInHandle = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            navigate(from, {replace: true})
        })
        .catch(error => {
            console.error(error)
        })
        form.reset()
    }
    return (
        <div className='form-container'>
            <h2>Login</h2>
            <form onSubmit={signInHandle}>
                <div className="form-control">
                    <label htmlFor="eamil">Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                </div>
                <div className='btn-login-container'>
                    <button className='btn-login'>Login</button>
                    <p className='new-account-text'>
                        New to Ema-Jhon?
                        <Link className='new-account-link' to='/signup'> Create New Account</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;