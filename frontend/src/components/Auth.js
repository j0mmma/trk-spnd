import React from 'react';
import '../App.css';

const Auth = () => {
    return (
        <div className="auth-page">
            <form className="auth-form">
                <h2>Create an Account</h2>
                <input type="email" placeholder="Email" required />
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
                <p className="auth-footer">Already have an account? <span>Log in</span></p>
            </form>
        </div>
    );
};

export default Auth;
