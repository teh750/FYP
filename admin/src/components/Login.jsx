import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            console.log("Submitting login with:", { email, password });  // Log the request payload

            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });

            // Log response data for debugging
            console.log("Response data:", response.data);

            if (response.data.success) {
                setToken(response.data.token);
            } else {
                // If response is not successful, check for specific messages
                if (response.data.message === 'Invalid username or password') {
                    toast.error('Wrong Credentials: Invalid Username or Password');
                } else {
                    toast.error(response.data.message || 'An unexpected error occurred');
                }
            }

        } catch (error) {
            console.error("Error during login request:", error.response || error.message);  // Log the full error response
            if (error.response && error.response.data) {
                // Check for specific error message from backend
                if (error.response.data.message === 'Invalid username or password') {
                    toast.error('Wrong Credentials: Invalid Username or Password');
                } else {
                    toast.error(error.response.data.message || 'An unexpected error occurred');
                }
            } else {
                toast.error(error.message || 'Something went wrong');
            }
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="email"
                            placeholder='your@email.com'
                            required
                        />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="password"
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit"> Login </button>
                    <button
                        onClick={() => window.location.href = 'http://localhost:5173/'}
                        className='mt-4 w-full py-2 px-4 rounded-md text-white bg-black'>
                        Back
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
