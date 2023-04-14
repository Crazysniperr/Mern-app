import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';

export const Auth = () => {
  return (
    <div className="auth">
      <Register />
      <Login />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [, setCookie] = useCookies(['access']);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });
      setCookie('access', response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      console.log(response.data.token);
      console.log(response.data.userId);
      navigate('/');
    } catch (err) {
      console.error('An error occurred');
      alert('Wrong username or password.');
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Log In"
      onSubmit={onSubmit}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/auth/register', {
        username,
        password,
      });
      alert('Registration completed! You can now log in.');
    } catch (err) {
      console.error('An error occurred');
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
      showPassword={showPassword}
      
      setShowPassword={setShowPassword}
    />
  );
};


const Form = ({
    username,
    setUsername,
    password,
    setPassword,
    label,
    onSubmit,
    showPassword,
    setShowPassword,
  }) => {
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <div className="auth-container">
        <form onSubmit={onSubmit} className="form" autoComplete="off">
          <h2>{label}</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>
              <button
                type="button"
                className="show-password-button"
                onClick={toggleShowPassword}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            
            <button type='submit' className='bttn'>{label}</button>
            </form>
            </div>
    )}