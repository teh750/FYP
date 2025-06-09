import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      if (currentState === 'Sign Up') {
        // Handle user registration
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });
  
        // Check if the response is successful
        if (response.data.success) {
          // Store token in localStorage and state
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
  
          // Log user registration activity
          await axios.post(backendUrl + '/api/user-activity/register', {
            userId: response.data.userId, // Ensure backend returns userId
            email,
          });
  
          // Switch to login state after successful registration
          setCurrentState('Login');
        } else {
          // If the response indicates failure (User already exists or other errors)
          toast.error(response.data.message); // Display backend error message (e.g., 'User already exists')
        }
      } else {
        // Handle user login
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
  
        if (response.data.success) {
          // Store token in localStorage and state
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
  
          // Log user login activity
          await axios.post(backendUrl + '/api/user-activity/login', {
            userId: response.data.userId, // Ensure backend returns userId
            email,
          });
  
          // Redirect to homepage after successful login
          navigate('/');
        } else {
          toast.error('Wrong Credentials: Invalid Username or Password');
        }
      }
    } catch (error) {
      // Handle HTTP errors (like 400, 401)
      if (error.response && error.response.data) {
        // Log the full response data for debugging
        console.error(error.response.data);
  
        // Show error message from backend response
        toast.error(error.response.data.message || 'An error occurred');
      } else {
        toast.error(error.message || 'An error occurred');
      }
    }
  };
  

  useEffect(() => {
    if (token) {
      navigate('/'); // Navigate to home if the user is logged in
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Conditional rendering for 'Name' field during SignUp */}
      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      {/* Email input field */}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      {/* Password input field */}
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        
        {/* Switch between Login and SignUp */}
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
