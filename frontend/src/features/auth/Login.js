import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to handle error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with:', { email, password });

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            console.log('Login response:', res.data);
            
            // Store token in localStorage
            localStorage.setItem('authToken', res.data.token);

            // Redirect based on user role
            if (res.data.user.role === 'admin') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/jobs';
            }
        } catch (err) {
            console.error('Error during login:', err.response?.data || err.message);
            if (err.response?.status === 401 || err.response?.status === 400) {
                setError('Invalid credentials. Please try again.'); // Set error message for invalid credentials
            } else {
                setError('An error occurred. Please try again later.'); // General error message
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="login-box">
                <h2>Login</h2> {/* Added heading to the login box */}
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>} {/* Display error message */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                <button className="signup-button" onClick={() => window.location.href = '/signup'}>
                    Not Registered? Sign Up
                </button> {/* Added "Sign Up" button */}
            </div>
        </div>
    );
}

export default Login;
