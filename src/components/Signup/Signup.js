import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import './Signup.css';

const Signup = () => {
    const [error, setError] = useState('')
    const {createUser} = useContext(AuthContext)

    const submitHandle = event => {
        event.preventDefault();
        setError('')
        const form = event.target;
        const email = form.email.value;
        const passwrod = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, passwrod, confirm)
        if(confirm.length < 6) {
            setError('You Should be 6 characters password')
            return
        }

        if(passwrod !== confirm) {
            setError('Your confirm password not match')
            return
        }
        createUser(email, passwrod)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.error('error : ', error)
        })
        form.reset()
    }

    return (
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={submitHandle}>
          <div className="form-control">
            <label htmlFor="eamil">Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
          </div>
          <div className="form-control">
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" name="confirm" required />
          </div>
          <p className='text-error'>{error}</p>
          <div className="btn-login-container">
            <button className="btn-login">Signup</button>
            <p className="new-account-text">
              Already have an account?
              <Link className="new-account-link" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
};

export default Signup;